const User = require('../model/User');

// GET all widgets
const getAllWidgets = async (req, res) => {
  const userId = req.user?._id;;

  if (!userId) {
    return res.status(403).json({ message: 'Forbidden: Missing user ID from token.' });
  }

  try {
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.widgets || []);
  } catch (err) {
    console.error('Error fetching widgets:', err);
    res.status(500).json({ message: err.message });
  }
};


// PUT to update a single entry inside a widget map
const updateWidget = async (req, res) => {
  const userId = req.user?._id;
  const { name, key, value } = req.body;

  if (!name || !key) {
    return res.status(400).json({ message: 'Widget name and key are required.' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.widgets[name].set(key, value);
    await user.save();

    res.json({ message: `Widget '${name}' updated at key '${key}'`, widgets: user.widgets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a specific entry in a specific widget type (e.g., budget, gain)
const deleteWidgetOfType = async (req, res) => {
  const authUserId = req.user._id;
  const { id: userId, type } = req.params;
  const { date } = req.body;

  if (authUserId.toString() !== userId) {
    return res.status(403).json({ message: 'Forbidden: Not your data.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const widgetMap = user.widgets[type];
    if (!widgetMap || !widgetMap.has(date)) {
      return res.status(404).json({ message: `No entry for date '${date}'.` });
    }

    widgetMap.delete(date);
    await user.save();
    res.json({ message: `Deleted ${type} on ${date}`, widgets: user.widgets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific widget type (e.g., budget, gain) for a user
const getWidgetOfType = async (req, res) => {
  const authUserId = req.user?._id;
  const { id: userId, type } = req.params;

  if (authUserId !== userId) {
    return res.status(403).json({ message: 'Forbidden: Not your data.' });
  }

  try {
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const widgetData = user.widgets?.[type];
    if (!widgetData) {
      return res.status(404).json({ message: `No widget of type '${type}' found.` });
    }

    res.json({ type, data: widgetData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST to create/update a specific widget type (e.g., budget, gain)
const createWidgetOfType = async (req, res) => {
  const authUserId = req.user?._id;
  const { id: userId, type } = req.params;
  const { data } = req.body;

  if (String(authUserId) !== String(userId)) {
    return res.status(403).json({ message: 'Forbidden: Not your data.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.widgets[type]) {
      user.widgets[type] = new Map();
    }

    Object.entries(data).forEach(([key, value]) => {
      user.widgets[type].set(key, value);
    });
    await user.save();

    res.status(201).json({ message: `Widget '${type}' updated`, widgets: user.widgets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllWidgets,
  updateWidget,
  deleteWidgetOfType,
  getWidgetOfType,
  createWidgetOfType,
};

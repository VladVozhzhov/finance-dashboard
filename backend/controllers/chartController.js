const User = require('../model/User');

// POST add new chart item
const createChartItem = async (req, res) => {
  const userId = req.user._id;
  const { name, value, bgColor, textColor } = req.body;

  if (!name || !value || !bgColor || !textColor) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    user.chart.items.push({ name, value, bgColor, textColor });
    await user.save();

    res.status(201).json({ chart: user.chart.items });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// POST create chart total (for first time)
const createChartTotal = async (req, res) => {
  const userId = req.user._id;
  const { total } = req.body;

  if (typeof total !== 'number') {
    return res.status(400).json({ message: 'Total must be a number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found'});

    user.chart.total = total;
    user.chart.items = [];
    await user.save();

    res.status(201).json({ total: user.chart.total });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// PATCH update existing total
const updateChartTotal = async (req, res) => {
    console.log('▶️  req.user._id:', req.user._id);
    console.log('▶️  req.user:', req.user);

    const userId = req.user._id;
    const { total } = req.body;
  
    if (typeof total !== 'number') {
      return res.status(400).json({ message: 'Total must be a number' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found'});
  
      if (!user.chart) {
        // create empty chart object if somehow missing
        user.chart = { total, items: [] };
      } else if (!user.chart.total) {
        // if chart exists but no total
        user.chart.total = total;
      } else {
        // normal patch (update total)
        user.chart.total = total;
      }
  
      await user.save();
  
      res.status(200).json({ total: user.chart.total });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

// DELETE delete a pie slice
const deleteChartItem = async (req, res) => {
  const userId = req.user._id;
  const { itemName } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    user.chart.items = user.chart.items.filter(item => item.name !== itemName);
    await user.save();

    res.status(200).json({ chart: user.chart.items });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// GET get full chart
const getChartData = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    res.status(200).json({ chart: user.chart });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  createChartItem,
  createChartTotal,
  updateChartTotal,
  deleteChartItem,
  getChartData
};

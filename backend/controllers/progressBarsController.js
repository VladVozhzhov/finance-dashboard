const User = require('../model/User');

// GET all progress bars for the authenticated user
const getAllProgressBars = async (req, res) => {
    const id = req.user._id;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user.progressBars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// POST create a new progress bar
const createProgressBar = async (req, res) => {
    const id = req.user._id;
    const { name, saved = 0, goal } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newBar = { name, saved, goal };
        user.progressBars.push(newBar);
        await user.save();

        const addedBar = user.progressBars[user.progressBars.length - 1];
        res.status(201).json({ message: 'Progress bar saved', progressBar: addedBar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// PATCH update a progress bar (saved amount)
const updateProgressBar = async (req, res) => {
    const id = req.user._id;
    const { pbid } = req.params;
    const { saved } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const bar = user.progressBars.id(pbid);
        if (!bar) return res.status(404).json({ message: 'Progress bar not found' });

        bar.saved = saved;
        await user.save();

        res.json({ message: 'Progress bar updated', progressBar: bar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// DELETE a progress bar
const deleteProgressBar = async (req, res) => {
    const id = req.user._id;
    const { pbid } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const bar = user.progressBars.id(pbid);
        if (!bar) return res.status(404).json({ message: `Progress bar '${pbid}' not found.` });

        bar.deleteOne();
        await user.save();

        res.json({ message: 'Progress bar deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllProgressBars,
    createProgressBar,
    updateProgressBar,
    deleteProgressBar
};

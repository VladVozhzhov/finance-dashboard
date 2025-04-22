const User = require('../model/User');

const checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await User.findOne({ username }).exec();
    const exists = !!user;

    return res.status(200).json({ exists });
  } catch (err) {
    console.error("Error checking username:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { checkUsername };

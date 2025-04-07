const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'model', 'users.json');

const checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Read the users.json file
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    // Check if the username exists
    const userExists = usersData.some((user) => user.username === username);

    if (userExists) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking username:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { checkUsername };
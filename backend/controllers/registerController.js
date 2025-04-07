const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required." });

  const duplicate = usersDB.users.find((user) => user.username === username);
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuid(),
        username,
        password: hashedPassword,
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users, null, 2) // Pretty-print JSON
    );

    res.status(201).json({ message: `User ${username} created successfully.` });
  } catch (err) {
      res.status(500).json({ message: "Error writing to JSON file" });
  }
};

module.exports = { handleRegister };
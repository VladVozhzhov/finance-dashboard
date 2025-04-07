const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request:", { username, password }); // Log received credentials
  
    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required." });
  
    const foundUser = usersDB.users.find((user) => user.username === username);
    if (!foundUser) {
      console.log("User not found");
      return res.sendStatus(401); // Unauthorized
    }
  
    try {
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            console.log("Password matched");
            const accessToken = jwt.sign(
                { username: foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            );
            const refreshToken = jwt.sign(
                { username: foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            );
        
            const otherUsers = usersDB.users.filter((user) => user.username !== foundUser.username);
            const currentUser = { ...foundUser, refreshToken };
            usersDB.setUsers([...otherUsers, currentUser]);
        
            await fsPromises.writeFile(
                path.join(__dirname, "..", "model", "users.json"),
                JSON.stringify(usersDB.users)
            );
        
            res.cookie("jwt", refreshToken, { 
                httpOnly: true, 
                secure: false, // Set to false for local development
                sameSite: "Strict", // Adjusted for better compatibility
                maxAge: 24 * 60 * 60 * 1000 
            });
            res.json({ accessToken, id: foundUser.id });
        } else {
            console.log("Password did not match");
            res.sendStatus(401); // Unauthorized
        }
    } catch (err) {
        console.error("Error during password comparison:", err);
        res.sendStatus(500); // Internal Server Error
    }
};

module.exports = { handleLogin };
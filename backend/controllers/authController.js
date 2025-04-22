const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required.' });

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.sendStatus(401);

  // Access & Refresh token payload
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        id: foundUser._id
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // change to 30s if you're testing quick expiry
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Save refresh token in DB
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  // Set refresh token as HttpOnly cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send access token in response
  res.json({ accessToken, userId: foundUser._id });
};

module.exports = { handleLogin };

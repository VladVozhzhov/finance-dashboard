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

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        id: foundUser._id
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
      id: foundUser._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax'
  });

  // Save new refresh token in DB
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  // Set new refresh token as cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({ accessToken, userId: foundUser._id });
};

module.exports = { handleLogin };

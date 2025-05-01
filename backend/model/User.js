const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chartItemSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  bgColor: { type: String, required: true },
  textColor: { type: String, required: true }
}, { _id: false });

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: {
    type: String,
    required: false
  },
  accessToken: String,
  widgets: {
    budget: { type: Map, of: Number, default: {} },
    spending: { type: Map, of: Number, default: {} },
    gain: { type: Map, of: Number, default: {} },
    balance: { type: Map, of: Number, default: {} }
  },
  progressBars: [
    {
      name: String,
      saved: Number,
      goal: Number
    }
  ],
  chart: {
    total: { type: Number, default: 0 },
    items: [chartItemSchema]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

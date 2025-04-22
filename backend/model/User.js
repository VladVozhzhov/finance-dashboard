const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
  accessToken: String,
  widgets: {
    budget: {
      type: Map,
      of: Number,
      default: {}
    },
    spending: {
      type: Map,
      of: Number,
      default: {}
    },
    gain: {
      type: Map,
      of: Number,
      default: {}
    },
    balance: {
      type: Map,
      of: Number,
      default: {}
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

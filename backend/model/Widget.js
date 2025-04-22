const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const widgetSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: String },
    gain: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    spending: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Widget', widgetSchema);

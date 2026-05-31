const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: [
        {
            productId: Number,
            productName: String,
            productPrice: Number
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
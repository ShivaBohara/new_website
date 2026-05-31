const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add to wishlist
router.post('/add', async (req, res) => {
    try {
        const { userId, productId, productName, productPrice } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    wishlist: { productId, productName, productPrice }
                }
            },
            { new: true }
        );

        res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Remove from wishlist
router.post('/remove', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { wishlist: { productId } } },
            { new: true }
        );

        res.json({ message: 'Removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Get wishlist
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
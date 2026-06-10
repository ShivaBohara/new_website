const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── SIGN UP ──────────────────────────
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Signuphit!");
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Email already registered' 
            });
        }

        // hash the password safely
        const hashedPassword = await bcrypt.hash(password, 12);

        // save to database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // create login token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error });
    }
});

// ── SIGN IN ──────────────────────────
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        // check password
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        // create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Signed in successfully',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
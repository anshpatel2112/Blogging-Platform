import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Generate JWT token
const generateToken = (userId, email, role = 'user') => {
    return jwt.sign({ userId, email, role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// User Registration
export const registerUser = async (req, res) => {
    try {
        console.log('Registration attempt:', req.body);
        
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            console.log('Missing fields:', { name: !!name, email: !!email, password: !!password });
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (name, email, password)'
            });
        }

        if (password.length < 6) {
            console.log('Password too short:', password.length);
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create new user
        console.log('Creating new user...');
        const user = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password,
            isVerified: true
        });

        const savedUser = await user.save();
        console.log('User created successfully:', savedUser._id);

        // Generate token
        const token = generateToken(savedUser._id, savedUser.email, savedUser.role);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        console.log('Registration successful for:', email);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: `Bearer ${token}`,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error during registration. Please try again.'
        });
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        console.log('Login attempt:', req.body.email);
        
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log('Invalid password for:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id, user.email, user.role);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        console.log('Login successful for:', email);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: `Bearer ${token}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Logout User
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during logout'
        });
    }
};
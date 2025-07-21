import express from 'express';
import { registerUser, loginUser, getUserProfile, logoutUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected routes
userRouter.get('/profile', auth, getUserProfile);
userRouter.post('/logout', auth, logoutUser);

export default userRouter;
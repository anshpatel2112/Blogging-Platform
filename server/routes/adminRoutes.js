import express from 'express';
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard
} from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

// Auth routes
adminRouter.post("/login", adminLogin);

// ✅ Logout route to clear cookie
adminRouter.get("/logout", (req, res) => {
  res.clearCookie('token'); // Clear JWT cookie
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Protected routes
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;

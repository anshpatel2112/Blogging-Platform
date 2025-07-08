import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //Send token in response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token, // <-- return token to frontend
    });
  } catch (error) {
    console.error('adminLogin error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 })
    res.json({ success: true, comments })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }

}
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false })

    const dashboardData = {
      blogs, comments, drafts, recentBlogs
    }
    res.json({ success: true, dashboardData })

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);

    //Delete all the comments associated with the blog.
    await Comment.deleteMany({blog: id})
    res.json({ success: true, message: "Comment deleted Successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }

}

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment Approved Successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }

}


import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  let token;

  // ✅ Try to get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

export default auth;

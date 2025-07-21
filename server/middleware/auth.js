import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Check for token in Authorization header first, then cookies
  let token = req.headers.authorization;
  
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); // Remove 'Bearer ' prefix
  } else {
    token = req.cookies?.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;           
    next();                     
  } catch (err) {

    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default auth;

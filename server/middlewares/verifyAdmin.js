export const verifyAdmin = (req, res, next) => {
  const user = req.user; // assuming you attach user via JWT middleware

  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied" });
  }
};

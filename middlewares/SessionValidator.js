export const sessionActive = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
} 
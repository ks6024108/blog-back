const isAdmin = (req, res, next) => {
  try {
    if (req.user && (req.user.role === 1 || req.user === 2)) {
      next();
    } else {
      res.code = 401;
      throw new Err("Permission denied");
    }
  } catch (error) {
    next(error);
  }
};

export default isAdmin;

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    next(error);
  }
};

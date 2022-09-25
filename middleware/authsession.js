const protect = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res
      .status(401)
      .json({ status: "Fail", msg: "User must be signed in" });
  }
  req.user = user;
  next();
};

module.exports = protect;

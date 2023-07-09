/**
 * Middleware to check if the request is authenticated.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.isAuthenticated = (req, res, next) => {
  // Check if the request is an AJAX request or if the 'xhr' property is set
  // or if the host is different from the referer
  if (req.headers["x-requested-with"] === "XMLHttpRequest" || req.xhr || req.headers.host != req.headers.referer) {
    // Validate the header token
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token, authorization denied" });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      // Validate the token
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
    }
  } else {
    // If the request is not AJAX, set req.user = session
    req.user = req.session.user;
  }
};

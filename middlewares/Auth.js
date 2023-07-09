require("dotenv").config();
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
  // if (req.headers["x-requested-with"] === "XMLHttpRequest" || req.xhr || req.headers.host != req.headers.referer) {

  if (req.hostname != process.env.HOST) {
    // Validate the header token
    if (!req.headers.authorization) {
      return res.status(401).json({ messages: "No token, authorization denied" });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      // Validate the token
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(400).json({ messages: "Invalid token" });
      }
    }
  } else {
    // If the request is not AJAX, check if the user is logged in
    if (req.session.user) {
      next();
    } else {
      return res.status(401).json({ messages: "Unauthorized" });
    }
  }
};

/**
 * Middleware function to check if the user is an admin.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.isAdmin = (req, res, next) => {
  // Check if the user's role is admin
  if (req.user.role === "admin") {
    // If the user is an admin, call the next middleware
    next();
  } else {
    // If the user is not an admin, return an error response
    return res.status(401).json({ messages: "Permission denied" });
  }
};

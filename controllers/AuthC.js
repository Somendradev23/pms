// get env variablr
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validatorjs");
const { UserM } = require("../models/index");

// Register a new user
exports.register = async (req, res, next) => {
  try {
    // Extract data from request body
    const { username, email, password, role, mobileNumber } = req.body;

    // Define validation rules for request data
    const validationRules = {
      username: "required",
      email: "required|email",
      password: ["required", "min:6", "regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/"],
      role: "required",
      mobileNumber: "required",
    };

    // Define validation error messages
    const validationMessages = {
      "required.*": ":attribute is required.",
      "email.email": "Please provide a valid email address.",
      "min.password": ":attribute must be at least 6 characters.",
      "regex.password": "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
    };

    // Validate request data
    const validation = new validator(req.body, validationRules, validationMessages);
    if (validation.fails()) {
      throw new ThrowError("ValidationError", validation.errors.all());
    }

    // Check if the email is already registered
    const existingUser = await UserM.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await UserM.create({ username, email, password: hashedPassword, role, mobileNumber });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Log in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object.
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserM.findOne({
      where: { email: email },
      attributes: ["user_id", "username", "email", "role", "mobileNumber", "password"]
    });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      mobileNumber: user.mobileNumber
    };

    if (
      req.headers["x-requested-with"] === "XMLHttpRequest" ||
      req.xhr ||
      req.headers.host != req.headers.referer
    ) {
      // Create and sign a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "24h"
      });
      
      return res.json({ token: token, user: userData });
    } else {
      session = req.session;
      session.user = userData;
      console.log(req.session);
      
      return res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get authenticated user profile
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
exports.getProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    // Find the user by ID
    const user = await UserM.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

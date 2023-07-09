const { Op } = require("sequelize");
const { UserM } = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validatorjs");
// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { draw, start, length, search, order, columns } = req.query;

    // Construct the search query
    const searchQuery = {
      [Op.or]: [{ username: { [Op.like]: `%${search.value}%` } }, { email: { [Op.like]: `%${search.value}%` } }],
    };

    console.log('====================================');
    console.log(order);
    console.log('====================================');



    // Construct the order query
    const orderQuery = [];
    for (let i = 0; i < order.length; i++) {
      const { column, dir } = order[i];
      const columnName = columns[column].data;
      orderQuery.push([columnName, dir]);
    }

    const { count, rows: users } = await UserM.findAndCountAll({
      where: searchQuery,
      attributes : ["user_id", "username", "email", "role"],
      order: orderQuery,
      offset: Number(start),
      limit: Number(length),
    });

    res.json({
      draw: Number(draw),
      recordsTotal: count,
      recordsFiltered: count,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validation rules
    const validationRules = {
      username: "required",
      email: "required|email",
      password: "required|min:6",
    };

    // Validation messages
    const validationMessages = {
      "required.*": ":attribute is required.",
      "email.email": "Please provide a valid email address.",
      "password.min": "Password must be at least 6 characters.",
    };

    // Validate request data
    const validation = new validator(req.body, validationRules, validationMessages);
    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    // Check if the email is already registered
    const existingUser = await UserM.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await UserM.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Get a specific user by ID
// This function retrieves a user from the database based on their ID and sends it as a JSON response.

/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserM.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The updated user object
 */
exports.updateUser = async (req, res, next) => {
  // Extract userId from the request parameters
  const { userId } = req.params;

  // Extract user details from the request body
  const { first_name, last_name, email, password } = req.body;

  try {
    // Find the user by userId
    const user = await UserM.findByPk(userId);

    // If user not found, return error message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;

    // Save the updated user details
    await user.save();

    // Return the updated user object
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a user.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.deleteUser = async (req, res, next) => {
  // Extract the userId from the request parameters
  const { userId } = req.params;
  
  try {
    // Find the user by their ID
    const user = await UserM.findByPk(userId);
    
    // Check if the user exists
    if (!user) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ message: "User not found" });
    }
    
    // Delete the user
    await user.destroy();
    
    // Return a 204 response to indicate successful deletion
    res.status(204).end();
  } catch (error) {
    // Pass any errors to the next middleware function
    next(error);
  }
};

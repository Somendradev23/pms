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

// Create a new user
// Create a new user
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

// Update a user
exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = await UserM.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UserM.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// IMPORT ALL ERROR MESSAGES
const BadRequest = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found-err");
const UnauthorizedAccess = require("../errors/unauthorized-access");

// CREATE USER
module.exports.createUser = async (req, res, next) => {
  try {
    // GET INFO FROM BODY
    const { email, password, name } = req.body;

    if (!(email && password && name)) {
      throw new BadRequest("All inputs are required");
    }

    // CHECK IF USER DOESNT EXIST IN DATABASE
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      throw new BadRequest("User already in database. Please login");
    }

    // USER IS NEW
    // ENCRYPT PASSWORD
    const encryptedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize
      password: encryptedPassword,
    });

    // Check if user has been created
    if (!user) {
      throw new BadRequest("User could not be created");
    }

    // User created. Return user info
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// SIGN IN
module.exports.signIn = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      throw new BadRequest("All inputs are required");
    }
    // Validate if user exists in database
    const user = await User.findOne({ email }).select("+password");
    const passworMatch = await bcrypt.compare(password, user.password);
    if (user && passworMatch) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        },
      );

      // return token
      return res.status(200).json(token);
    }
    throw new UnauthorizedAccess("Invalid credentials");
  } catch (err) {
    next(err);
  }
};

// GET MY USER PROFILE
module.exports.getMyProfile = async (req, res, next) => {
  try {
    // Get user input
    const { user_id } = req.user;

    // LOOK FOR USER BY ID
    const user = await User.findById(user_id);

    // USER NOT FOUND
    if (!user) {
      throw new NotFoundError("No User found in database");
    }
    // USER FOUND, SEND USER
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// GET ALL USERS
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    // IF NO USERS FOUND
    if (!users) {
      throw new BadRequest("No users in Database");
    }
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// GET USER BY ID
module.exports.getUserById = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await User.find({ _id: _id });

    // IF NO USER FOUND
    if (!user) {
      throw new NotFoundError("No User found in database");
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// DELETE USER
module.exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);

    // IF NO USER FOUND
    if (!user) {
      throw new NotFoundError("No User found in database");
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// EDIT USER
module.exports.editUserProfile = async (req, res, next) => {
  try {
    // GET USER ID FROM REQ AND DEFINE THE AS FILTER
    const filter = req.params.id;

    // GET UPDATE FROM BODY
    const { name } = req.body;
    const update = { name };

    // UPDATE USER AND RETURN UPDATED USER
    const user = await User.findByIdAndUpdate(filter, update, { new: true });

    // IF NO USER FOUND
    if (!user) {
      throw new NotFoundError("No User found in database");
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// EDIT USER
module.exports.editAvatar = async (req, res, next) => {
  try {
    // GET USER ID FROM REQ AND DEFINE THE AS FILTER
    const filter = req.params.id;

    // GET UPDATE FROM BODY
    const { avatar } = req.body;
    const update = { avatar };

    // UPDATE USER AND RETURN UPDATED USER
    const user = await User.findByIdAndUpdate(filter, update, { new: true });

    // IF NO USER FOUND
    if (!user) {
      throw new NotFoundError("No User found in database");
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { HttpStatus, HttpResponseMessage } = require("../enums/http");

// CREATE USER
module.exports.createUser = async (req, res) => {
  try {
    // GET INFO FROM BODY
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      return res.status(HttpStatus.BAD_REQUEST).send("All inputs are required");
    }

    // CHECK IF USER DOESNT EXIST IN DATABASE
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("User already exists. Please Login");
    }

    // USER IS NEW
    // ENCRYPT PASSWORD
    const encryptedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email: email.toLowerCase(), //sanitize
      password: encryptedPassword,
    });

    // Check if user has been created
    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("User could not be created");
    }

    //User created. Return user info
    return res.status(HttpStatus.CREATED).json(user);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(`Error: ${err}`);
  }
};

// SIGN IN
module.exports.signIn = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(HttpStatus.BAD_REQUEST).send("All inputs are required");
    }
    // Validate if user exists in database
    const user = await User.findOne({ email }).select("+password");

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // // save user token
      // user.token = token;

      // return token
      return res.status(HttpStatus.OK).json(token);
    }
    return res.status(HttpStatus.UNAUTHORIZED).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
};

// GET MY USER PROFILE
module.exports.getMyProfile = async (req, res) => {
  try {
    // Get user input
    const { user_id } = req.user;

    // LOOK FOR USER BY ID
    const user = await User.findById(user_id);

    // USER NOT FOUND
    if (!user) {
      return res
        .status(HttpResponseMessage.NOT_FOUND)
        .send({ message: HttpResponseMessage.NOT_FOUND });
    }

    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

// GET ALL USERS
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // IF NO USERS FOUND
    if (!users) {
      return res.status(204).send("No users in Database");
    }
    return res.status(HttpStatus.OK).json(users);
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

// GET USER BY ID
module.exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.find({ _id: _id });

    // IF NO USER FOUND
    if (!user) {
      return res.status(204).send("No user in Database");
    }
    return res.status(HttpStatus.OK).json(user);
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

// DELETE USER
module.exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);

    // IF NO USER FOUND
    if (!user) {
      return res.status(204).send("No user in Database");
    }
    return res.status(HttpStatus.OK).json(user);
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

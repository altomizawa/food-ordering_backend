const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user");

// CREATE USER
module.exports.createUser = async (req, res) => {
  try {
    // GET INFO FROM BODY
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      return res.status(400).send("All inputs are required");
    }

    // CHECK IF USER DOESNT EXIST IN DATABASE
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists. Please Login");
    }

    // USER IS NEW
    // ENCRYPT PASSWORD
    const encryptedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name: name,
      email: email.toLowerCase(), //sanitize
      password: encryptedPassword,
    });

    // Check if user has been created
    if (!user) {
      return res.status(400).send("User could not be created");
    }

    //User created. Return user info
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

// SIGN IN
module.exports.signIn = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All inputs are required");
    }
    // Validate if user exists in database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;

      // return user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
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
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

// GET USER'S CART ITEMS

module.exports.getCartItems = async (req, res) => {
  try {
    //FIND USER IN DATABASE
    const { _id } = req.body;
    const user = await User.findById(_id);

    //IF NO USER FOUND
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // USER FOUND. GET ITEMS ARRAY
    const cartItems = user.currentOrder;

    return res.status(200).json({ cartItems });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ADD ITEM TO USER'S CART

module.exports.addItemToCart = async (req, res) => {
  try {
    //GET INFO FROM REQUEST
    const { _id, category, name, description, link, price, onSale, salePrice } =
      req.body;

    //FIND USER IN DATABASE
    const user = await User.findById(_id);

    //IF NO USER FOUND
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // USER FOUND. CREATE NEW OBJECT AND PUSH IT TO ARRAY
    const newItem = {
      category,
      name,
      description,
      link,
      price,
      onSale,
      salePrice,
    };

    user.currentOrder.push(newItem);

    // SAVE UPDATED USER DOCUMENT
    await user.currentOrder.save();

    return res
      .status(201)
      .json({ message: "Item added to cart succesfully", newItem });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

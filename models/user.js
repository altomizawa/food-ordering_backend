const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const cartItemSchema = require("./cartItem");

const avatarURLPattern =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=,-]+(#)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return avatarURLPattern.test(v);
      },
      message: "Invalid Avatar URL",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom synchronous validator using Validator.js
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  pastOrders: [[cartItemSchema]],
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  try {
    // FIND USER BY E-MAIL, INCLUDING PASSWORD FIELD
    const user = await this.findOne({ email }).select("+password");

    // USER NOT FOUND, SEND ERROR
    if (!user) {
      throw new RequestError("Incorrect email or passwword");
    }

    // USER FOUND, COMPARE PASSWORDS USING BCRYPT
    const isMatch = await bcrypt.compare(password, user.password);

    // PASSWORDS DON'T MATCH, THROW ERROR
    if (!isMatch) {
      throw new RequestError("Incorrect email or password");
    }

    //USER FOUND AND PASSWORDS MATCH, RETURN USER
    return user;
  } catch (error) {
    res.status(500).send({ message: "Error finding user by credentials" });
  }
};

userSchema.statics.removeFromCurrentOrderById = async function (
  userId,
  itemId
) {
  try {
    const user = await this.findByIdAndUpdate(userId, {
      $pull: { currentOrder: { _id: itemId } }, // Remove item with matching ID
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user; // Return the updated user document (optional)
  } catch (err) {
    console.error(err);
    throw err; // Re-throw for handling at a higher level
  }
};

// // Usage example:
// const removedItem = await User.removeFromCurrentOrderById(userId, itemId);

module.exports = mongoose.model("User", userSchema);

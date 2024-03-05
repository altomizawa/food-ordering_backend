const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('brcrypt');

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
  pastOrders: [{}],
  currentOrder: {[]},
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      //Email not found in database, return error
      if (!user) {
        return Promise.reject(new requestError("Incorrect email or password"));
      }
      //Email found! Compare passwords

      return bcrypt.compare(password, user.password).then((matched) => {
        //Passwords dont match, return error
        if (!matched) {
          return Promise.reject(new requestError("Incorrect email or password"));
        }
        //passwords match, return user
        return user;
      });
    });
};



module.exports('user', userSchema)
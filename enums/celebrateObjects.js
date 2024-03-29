const { Joi } = require("celebrate");

const signInObject = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const signUpObject = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const updateNameObject = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(30)
  })
}

const updateAvatarObject = {
  body: Joi.object().keys({
    avatar: Joi.string().uri().required()
  })
}

module.exports = {
  signInObject,
  signUpObject,
  updateAvatarObject,
  updateNameObject
};

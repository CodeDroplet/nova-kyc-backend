import joi from "joi";

export const registerSchema = joi.object({
  firstName: joi.string().max(256).required(),
  lastName: joi.string().max(256).required(),
  email: joi.string().max(256).email().required(),
  password: joi.string().min(6).required(),
});

export const loginSchema = joi.object({
  email: joi.string().max(256).email().required(),
  password: joi.string().min(6).required(),
});

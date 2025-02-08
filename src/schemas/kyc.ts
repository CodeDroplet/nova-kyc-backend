import joi from "joi";

export const createKycRequestSchema = joi.object({
  body: joi
    .object({
      name: joi.string().max(256).required().label("Name"),
      email: joi.string().max(256).email().required().label("Email"),
    })
    .required(),
  files: joi
    .object({
      documentFront: joi.array().items(joi.object().unknown(true)).length(1).required(),
      documentBack: joi.array().items(joi.object().unknown(true)).length(1).required(),
    })
    .required(),
});

export const updateKycRequestSchema = joi.object({
  body: joi
    .object({
      status: joi.string().valid("pending", "approved", "rejected").required().label("Status"),
    })
    .required(),
});

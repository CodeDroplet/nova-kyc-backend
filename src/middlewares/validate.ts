import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

const validate =
  (schema: ObjectSchema<any>, property?: "body" | "query" | "params") =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { error } = schema.validate(property ? req[property] : req, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      return next(error);
    }

    next();
  };

export default validate;

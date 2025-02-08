import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

const validate =
  (schema: ObjectSchema<any>, property: "body" | "query" | "params") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
    });

    if (error) {
      return next(error);
    }

    next();
  };

export default validate;

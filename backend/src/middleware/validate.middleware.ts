import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '@/src/middleware/error.middleware';

export const createProductValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().greater(0).required(),
  category: Joi.string().required(),
  stock: Joi.number().min(0).required(),
});

export const updateProductValidationSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(3).required(),
  price: Joi.number().greater(0).required(),
  category: Joi.string().required(),
  stock: Joi.number().min(0).required(),
});

export const deleteProductValidationSchema = Joi.object({
  id: Joi.string(),
});
/**
 * @desc    Middleware to validate request body using Joi schema
 * @access  Depends on route
 */

export const validate =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
  

    if (!error) {
      return next();
    }

    const err = new Error(error?.details.map((detail) => detail.message)?.[0]) as any;
    err.status = 400;
    errorHandler(err, req, res, next);
  };

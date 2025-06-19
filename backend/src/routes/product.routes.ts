// @ts-nocheck
/**
 * @file_purpose  crud operation with product collection related routes
 * @author Jyoti prakash panigrahi
 * @Date_Created 19-jun-2025
 * @Date_Modified
 */

import appConfig from '@/src/config/Index';
import {
  validate,
  createProductValidationSchema,
  updateProductValidationSchema,
  deleteProductValidationSchema,
} from '@/src/middleware/validate.middleware';
import auth from '@/src/middleware/auth.middleware';
import productController from '@/src/controller/product.controller';
const setRouter = (app) => {
  const { apiVersion } = appConfig;
  app.get(apiVersion + 'get-all-product', productController.getAllProducts);
  app.post(
    apiVersion + 'create-product',
    validate(createProductValidationSchema),
    productController.createProducts
  );
  app.put(
    apiVersion + 'update-product',
    validate(updateProductValidationSchema),
    productController.updateProducts
  );
  app.delete(
    apiVersion + 'delete-product',
    validate(deleteProductValidationSchema),
    productController.deleteProduct
  );
};

module.exports = {
  setRouter: setRouter,
};

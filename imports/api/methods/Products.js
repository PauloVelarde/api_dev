/**********************************************************
**************************PRODUCTS JS**************************
***********************************************************
* @function: Metodos MongoCollection Products.
* @filejs : Publish Methods Meteor
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import Products from "../collections/Products";
import SimpleSchema from "simpl-schema";
import { JsonRoutes } from 'meteor/simple:json-routes';

// Activate Validation Errors
SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error('validation-error', error.message);
  ddpError.details = error.details;
  return ddpError;
});

// Define Schema
const productSchema = new SimpleSchema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  quantity: { type: Number },
  unitPrice: { type: Number },
  status: { type: Boolean },
  createdAt: { type: String, defaultValue: new Date() },
}).newContext();

//Initial Meteor Methods
Meteor.methods({
  /**********************************************************
   * @name: createProduct
   * @function: Insert Product
   **********************************************************/
  createProduct(product) {
    // Validate the product
    productSchema.validate(product);
    if (!productSchema.isValid()) {
      throw new Meteor.Error('validation-error', 'Product data is invalid');
    }
  
    try {
      // Insert the product with the correct date
      const productId = Products.insert(product);
      return productId;
    } catch (error) {
      throw new Meteor.Error('insert-failed', error.message);
    }
  },
  
  /**********************************************************
   * @name: updateProduct
   * @function: Update Product
   **********************************************************/
  updateProduct({ id, data }) {
    productSchema.validate(data);

    if (!productSchema.isValid()) {
      throw new Meteor.Error('validation-error', 'Product data is invalid');
    }

    try {
      const result = Products.update(id, { $set: data });
      return result ? Products.findOne(id) : null;
    } catch (error) {
      throw new Meteor.Error('update-failed', error.message);
    }
  },

  /**********************************************************
   * @name: removeProduct
   * @function: Remove Product
   **********************************************************/
  removeProduct(id) {
    try {
      const result = Products.remove({ _id: id });
      return result;
    } catch (error) {
      throw new Meteor.Error('remove-failed', error.message);
    }
  },
});

// Expose Methods as RESTful API using simple:rest
JsonRoutes.add("POST", "/api/create-product", (req, res) => {
  try {
    const product = req.body;
    const productId = Meteor.call("createProduct", product);
    JsonRoutes.sendResult(res, { code: 200, data: { productId } });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

JsonRoutes.add("PUT", "/api/update-product/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = Meteor.call("updateProduct", { id, data });
    JsonRoutes.sendResult(res, { code: 200, data: updatedProduct });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

JsonRoutes.add("DELETE", "/api/remove-product/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = Meteor.call("removeProduct", id);
    JsonRoutes.sendResult(res, { code: 200, data: { result } });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

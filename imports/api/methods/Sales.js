/**********************************************************
**************************SALES JS**************************
***********************************************************
* @function: Metodos MongoCollection Sales.
* @filejs : Publish Methods Meteor
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import Sales from "../collections/Sales";
import SimpleSchema from "simpl-schema";
import { JsonRoutes } from 'meteor/simple:json-routes';

// Activate Validation Errors
SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error('validation-error', error.message);
  ddpError.details = error.details;
  return ddpError;
});

// Define Schema
const saleSchema = new SimpleSchema({
  name: { type: String },
  customerId: { type: String },
  productId: { type: String },
  paymentMethod: { type: String },
  status: { type: Boolean },
  createdAt: { type: String, defaultValue: new Date() },
}).newContext();


//Initial Meteor Methods
Meteor.methods({
  /**********************************************************
   * @name: createSale
   * @function: Insert Sale
   **********************************************************/
  createSale(sale) {
    // Validate sale
    saleSchema.validate(sale);
    if (!saleSchema.isValid()) {
      throw new Meteor.Error('validation-error', 'Sale data is invalid');
    }
  
    try {
      // Insert the sale with the correct date
      const saleId = Sales.insert(sale);
      return saleId;
    } catch (error) {
      throw new Meteor.Error('insert-failed', error.message);
    }
  },
  
  /**********************************************************
   * @name: updateSale
   * @function: Update Sale
   **********************************************************/
  updateSale({ id, data }) {
    saleSchema.validate(data);

    if (!saleSchema.isValid()) {
      throw new Meteor.Error('validation-error', 'Sale data is invalid');
    }

    try {
      const result = Sales.update(id, { $set: data });
      return result ? Sales.findOne(id) : null;
    } catch (error) {
      throw new Meteor.Error('update-failed', error.message);
    }
  },

  /**********************************************************
   * @name: removeSale
   * @function: Remove Sale
   **********************************************************/
  removeSale(id) {
    try {
      const result = Sales.remove({ _id: id });
      return result;
    } catch (error) {
      throw new Meteor.Error('remove-failed', error.message);
    }
  },
});

// Expose Methods as RESTful API using simple:rest
JsonRoutes.add("POST", "/api/create-sale", (req, res) => {
  try {
    const sale = req.body;
    const saleId = Meteor.call("createSale", sale);
    JsonRoutes.sendResult(res, { code: 200, data: { saleId } });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

JsonRoutes.add("PUT", "/api/update-sale/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedSale = Meteor.call("updateSale", { id, data });
    JsonRoutes.sendResult(res, { code: 200, data: updatedSale });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

JsonRoutes.add("DELETE", "/api/remove-sale/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = Meteor.call("removeSale", id);
    JsonRoutes.sendResult(res, { code: 200, data: { result } });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

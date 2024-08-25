/**********************************************************
**************************CUSTOMERS JS**************************
***********************************************************
* @function: MongoCollection Customers Methods.
* @filejs : Publish Methods Meteor
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import Customers from "../collections/Customers";
import SimpleSchema from "simpl-schema";
import { JsonRoutes } from 'meteor/simple:json-routes';


// Activate Validation Errors
SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error('validation-error', error.message);
  ddpError.details = error.details;
  return ddpError;
});

// Define Schema
const customerSchema = new SimpleSchema({
  fullName: { type: String },
  identification: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  status: { type: Boolean },
  createdAt: { type: String, defaultValue: new Date() },
}).newContext();

//Initial Meteor Methods
Meteor.methods({
  /**********************************************************
   * @name: createCustomer
   * @function: Insert Customer
   **********************************************************/
  createCustomer(customer) {
    // Validate the client
    customerSchema.validate(customer);
    if (!customerSchema.isValid()) {
      throw new Meteor.Error('validation-error', 'Customer data is invalid');
    }
  
    try {
      // Insert the client with the correct date
      const customerId = Customers.insert(customer);
      return customerId;
    } catch (error) {
      throw new Meteor.Error('insert-failed', error.message);
    }
  },
  

  /**********************************************************
   * @name: updateCustomer
   * @function: Update Customer
   **********************************************************/
  updateCustomer({ id, data }) {
    customerSchema.validate(data);

    if (!customerSchema.isValid()) {
      throw new Meteor.Error('validation-error', 'Customer data is invalid');
    }

    try {
      const result = Customers.update(id, { $set: data });
      return result ? Customers.findOne(id) : null;
    } catch (error) {
      throw new Meteor.Error('update-failed', error.message);
    }
  },

  /**********************************************************
   * @name: removeCustomer
   * @function: Remove Customer
   **********************************************************/
  removeCustomer(id) {
    try {
      const result = Customers.remove({ _id: id });
      return result;
    } catch (error) {
      throw new Meteor.Error('remove-failed', error.message);
    }
  },
});

// Expose Methods as RESTful API using simple:rest
JsonRoutes.add("POST", "/api/create-customer", (req, res) => {
  try {
    const customer = req.body;
    const customerId = Meteor.call("createCustomer", customer);
    JsonRoutes.sendResult(res, { code: 200, data: { customerId } });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

JsonRoutes.add("PUT", "/api/update-customer/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedCustomer = Meteor.call("updateCustomer", { id, data });
    JsonRoutes.sendResult(res, { code: 200, data: updatedCustomer });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

JsonRoutes.add("DELETE", "/api/remove-customer/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = Meteor.call("removeCustomer", id);
    JsonRoutes.sendResult(res, { code: 200, data: { result } });
  } catch (error) {
    JsonRoutes.sendResult(res, { code: 400, data: { error: error.message } });
  }
});

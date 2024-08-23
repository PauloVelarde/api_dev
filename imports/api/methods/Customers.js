/**********************************************************
**************************CUSTOMERS JS**************************
***********************************************************
* @function: Metodos MongoCollection Customers.
* @filejs : Publish Methods Meteor
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
//Import Collections
import Customers from "../collections/Customers";
//Import SimpleSchema & Check
import SimpleSchema from "simpl-schema";
import { check } from "meteor/check";

//Activated Validation Errors
SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

//Defined Schemma
export const customerSchema = new SimpleSchema(
  {
    fullName: {
      type: String,
      label: "Nombre Completo"
    },
    identification: {
      type: String,
      unique: true,
      label: "Identificación"
    },
    address: {
      type: String,
      label: "Dirección"
    },
    phone: {
      type: String,
      label: "Teléfono"
    },
    email: {
      type: String,
      label: "Email"
    },
    status: {
      type: Boolean,
      label: "Estado (activo/inactivo)"
    },
    createdAt: {
      type: Date,
      optional: true,
      defaultValue: new Date()
    }
  },
  { check }
).newContext();

//Initial Meteor Methods
Meteor.methods({
  /***********************************************************
    * @name: CreateCustomer
    * @function: Insert Customer
    * @param: object:{customer}
    * @author: Juan Paulo Velarde 
    **********************************************************/
  createCustomer(customer) {
    customerSchema.validate(customer);
    let return_data = {};
    if (customerSchema.validationErrors().length > 0) {
      return_data = {
        status: false,
        error: customerSchema.validationErrors(),
        data: false
      };
      console.log(
        "error validacion createCustomer = ",
        customerSchema.validationErrors()
      );
      return return_data;
    }
    //Is Valid Schema
    if (customerSchema.isValid()) {
      //Catch Insert
      try {
        let customerId = customer.insert(customer);
        if (customerId) {
          return_data = {
            status: true,
            data: customerId
          };

          return return_data;
        }
      } catch (error) {
        return error;
      }
    }
  },
  /***********************************************************
    * @name: UpdateCustomer
    * @function: Update Customers
    * @param: object:{customer}
    * @author: Juan Paulo Velarde 
    **********************************************************/
  updateCustomer(customer) {
    customerSchema.validate(customer.data);
    let return_data = {};
    if (customerSchema.validationErrors().length > 0) {
      return_data = {
        status: false,
        error: customerSchema.validationErrors(),
        data: false
      };
      console.log(
        "error validacion updateCustomer = ",
        customerSchema.validationErrors()
      );
      return return_data;
    }
    //Is Valid Schema
    if (customerSchema.isValid()) {
      //Catch Update
      try {
        let customerId = Customers.update(customer.id, { $set: customer.data });
        if (customerId) {
          return_data = {
            status: true,
            data: customerId
          };

          return return_data;
        }
      } catch (error) {
        return error;
      }
    }
  },
  /***********************************************************
    * @name: removeCustomer
    * @function: Remove Customer
    * @param: id 
    * @author: Juan Paulo Velarde 
    **********************************************************/
  removeCustomer(id) {
    //Catch Remove
    try {
      let customerId = Customers.remove({ _id: id });
      if (customerId) {
        return_data = {
          status: true,
          data: customerId
        };
        return return_data;
      }
    } catch (error) {
      return error;
    }
  }
});

/**********************************************************
**************************CUSTOMERS JS**************************
***********************************************************
* @function: MongoCollection Customer Publication.
* @customersjs : Publish Methods by GET 
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import Customers from "../collections/Customers";
import { JsonRoutes } from "meteor/simple:json-routes";

/**********************************************************
********************* PUBLICATIONS ************************
**********************************************************/

/**********************************************************
* @name: customers
* @function: Get All Customers
**********************************************************/
Meteor.publish("customers", function() {
  return Customers.find();
});

/**********************************************************
* @name: customerOne
* @function: Get a Single Customer by ID
**********************************************************/
Meteor.publish("customerOne", function(id) {
  check(id, String); // Validación de entrada
  return Customers.find({ _id: id });
});

// Expose Publications as RESTful API using simple:rest
JsonRoutes.add("GET", "/api/get-customers", (req, res) => {
  const customers = Customers.find().fetch();
  JsonRoutes.sendResult(res, { code: 200, data: customers });
});

JsonRoutes.add("GET", "/api/get-customer/:id", (req, res) => {
  const id = req.params.id;
  const customer = Customers.findOne({ _id: id });
  if (customer) {
    JsonRoutes.sendResult(res, { code: 200, data: customer });
  } else {
    JsonRoutes.sendResult(res, {
      code: 404,
      data: { error: "Customer not found" }
    });
  }
});

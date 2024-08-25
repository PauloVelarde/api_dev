/**********************************************************
**************************SALES JS**************************
***********************************************************
* @function: MongoCollection Sales Publication.
* @chatsjs : Publish Methods by GET 
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import Sales from "../collections/Sales";
import { JsonRoutes } from 'meteor/simple:json-routes';

/**********************************************************
********************* PUBLICATIONS ************************
**********************************************************/

/**********************************************************
* @name: sales
* @function: Get All Sales
**********************************************************/
Meteor.publish('sales', function () {
  return Sales.find();
});

/**********************************************************
* @name: SaleOne
* @function: Get a Single Sale by ID
**********************************************************/
Meteor.publish('saleOne', function (id) {
  check(id, String);  // Validación de entrada
  return Sales.find({ _id: id });
});

// Expose Publications as RESTful API using simple:rest
JsonRoutes.add("GET", "/api/get-sales", (req, res) => {
  const sales = Sales.find().fetch();
  JsonRoutes.sendResult(res, { code: 200, data: sales });
});

JsonRoutes.add("GET", "/api/get-sale/:id", (req, res) => {
  const id = req.params.id;
  const sale = Sales.findOne({ _id: id });
  if (sale) {
    JsonRoutes.sendResult(res, { code: 200, data: sale });
  } else {
    JsonRoutes.sendResult(res, { code: 404, data: { error: "Sale not found" } });
  }
});

/**********************************************************
**************************PRODUCTS JS**************************
***********************************************************
* @function: MongoCollection Products Publication.
* @productsjs : Publish Methods by GET 
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import Products from "../collections/Products";
import { JsonRoutes } from "meteor/simple:json-routes";

/**********************************************************
********************* PUBLICATIONS ************************
**********************************************************/

/**********************************************************
* @name: products
* @function: Get All Products
**********************************************************/
Meteor.publish("products", function() {
  return Products.find();
});

/**********************************************************
* @name: productOne
* @function: Get a Single Product by ID
**********************************************************/
Meteor.publish("productOne", function(id) {
  check(id, String); // Validación de entrada
  return Products.find({ _id: id });
});

// Expose Publications as RESTful API using simple:rest
JsonRoutes.add("GET", "/api/get-products", (req, res) => {
  const products = Products.find().fetch();
  JsonRoutes.sendResult(res, { code: 200, data: products });
});

JsonRoutes.add("GET", "/api/get-product/:id", (req, res) => {
  const id = req.params.id;
  const product = Products.findOne({ _id: id });
  if (product) {
    JsonRoutes.sendResult(res, { code: 200, data: product });
  } else {
    JsonRoutes.sendResult(res, {
      code: 404,
      data: { error: "Product not found" }
    });
  }
});

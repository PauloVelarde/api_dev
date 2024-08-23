/**********************************************************
**************************PRODUCTS JS**************************
***********************************************************
* @function: Publicacion MongoCollection Products.
* @chatsjs : Publish Methods by GET or POST
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
//Import Collection
import Product from "../collections/Products";
/**********************************************************
********************* PUBLICATIONS ************************
**********************************************************/

/**********************************************************
* @name: Product
* @function: Get Product
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "products",
  function(data) {
    //Validate Data
    let _id = data && data._id ? { _id: data._id } : {};

    //Find Data Collection
    // let data_products = Product.find(_id, {
    //   fields: {
    //     name: 1,
    //     description: 1,
    //     type: 1,

    //     quantity: 1,
    //     unitPrice: 1,

    //     status: 1,
    //     createdAt: 1
    //   }
    // });
    console.log("products ", data_products);

    //Return Data
    return Product.find(); //data_products;
  },
  {
    url: "get-product",
    httpMethod: "get"
  }
);
/**********************************************************
* @name: Product
* @function: Insert Product
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "insertProduct",
  function(data) {
    //Validate Data
    if (!data) return;

    //Create Data Return
    let data_product;

    //Validate Transaction
    try {
      let insertProduct = Meteor.call("createProduct", data, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_product = Product.find({ _id: insertProduct.data });
    } catch (error) {
      console.error("error publish insertProduct = ", error);
    }

    //Return Data
    return data_product;
  },
  {
    url: "insert-product",
    httpMethod: "post"
  }
);
/**********************************************************
* @name: Product
* @function: Update Product
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "updateProduct",
  function(data) {
    //Validate Data
    if (!data) return;
    let _id = data && data._id ? { _id: data._id } : {};

    //Create Data Return
    let data_product;

    //Validate Transaction
    try {
      Meteor.call("updateProduct", data, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_product = Product.find({ _id: _id });
    } catch (error) {
      console.error("error publish updateProduct = ", error);
    }

    //Return Data
    return data_product;
  },
  {
    url: "update-product",
    httpMethod: "post"
  }
);
/**********************************************************
* @name: Product
* @function: Remove Product
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "removeProduct",
  function(data) {
    //Validate Data
    if (!data) return;
    let _id = data && data._id ? { _id: data._id } : {};

    //Create Data Return
    let data_product;

    //Validate Transaction
    try {
      Meteor.call("removeProduct", _id, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_product = Product.find({});
    } catch (error) {
      console.error("error publish removeProduct = ", error);
    }

    //Return Data
    return data_product;
  },
  {
    url: "remove-product",
    httpMethod: "post"
  }
);

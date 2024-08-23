/**********************************************************
**************************SALES JS**************************
***********************************************************
* @function: Publicacion MongoCollection Sales.
* @chatsjs : Publish Methods by GET or POST
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
//Import Collection
import Sale from "../collections/Sales";
/**********************************************************
********************* PUBLICATIONS ************************
**********************************************************/

/**********************************************************
* @name: Sales
* @function: Get Sale
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "sales",
  function(data) {
    //Validate Data
    let _id = data && data._id ? { _id: data._id } : {};

    //Find Data Collection
    let data_sales = Sale.find(_id, {
      fields: {
        date: 1,
        customerId: 1,
        productId: 1,
        paymentMethod: 1,
        status: 1,
        createdAt: 1
      }
    });

    //Return Data
    return data_sales;
  },
  {
    url: "get-sale",
    httpMethod: "get"
  }
);
/**********************************************************
* @name: Sale
* @function: Insert Sale
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "insertSale",
  function(data) {
    //Validate Data
    if (!data) return;

    //Create Data Return
    let data_sales;

    //Validate Transaction
    try {
      let insertSale = Meteor.call("createSale", data, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_sales = Sale.find({ _id: insertSale.data });
    } catch (error) {
      console.error("error publish insertSale = ", error);
    }

    //Return Data
    return data_sales;
  },
  {
    url: "insert-sale",
    httpMethod: "post"
  }
);
/**********************************************************
* @name: Sale
* @function: Update Sale
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "updateSale",
  function(data) {
    //Validate Data
    if (!data) return;
    let _id = data && data._id ? { _id: data._id } : {};

    //Create Data Return
    let data_sales;

    //Validate Transaction
    try {
      Meteor.call("updateSale", data, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_sales = Sale.find({ _id: _id });
    } catch (error) {
      console.error("error publish updateSale = ", error);
    }

    //Return Data
    return data_sales;
  },
  {
    url: "update-sale",
    httpMethod: "post"
  }
);
/**********************************************************
* @name: Sale
* @function: Remove Sale
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "removeSale",
  function(data) {
    //Validate Data
    if (!data) return;
    let _id = data && data._id ? { _id: data._id } : {};

    //Create Data Return
    let data_sales;

    //Validate Transaction
    try {
      Meteor.call("removeSale", _id, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_sales = Sale.find({});
    } catch (error) {
      console.error("error publish removeSale = ", error);
    }

    //Return Data
    return data_sales;
  },
  {
    url: "remove-sale",
    httpMethod: "post"
  }
);

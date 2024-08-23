/**********************************************************
**************************CUSTOMERS JS**************************
***********************************************************
* @function: Publicacion MongoCollection Customer.
* @chatsjs : Publish Methods by GET or POST
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
//Import Collection
import Customer from "../collections/Customers";

/**********************************************************
********************* PUBLICATIONS ************************
**********************************************************/

/**********************************************************
* @name: Customer
* @function: Get Customer
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "customers",
  function(data) {
    //Validate Data
    let _id = data && data._id ? { _id: data._id } : {};

    //Find Data Collection
    let data_customer = Customer.find(_id, {
      fields: {
        fullName: 1,
        identification: 1,
        address: 1,
        phone: 1,
        email: 1,
        status: 1,
        createdAt: 1
      }
    });

    //Return Data
    return data_customer;
  },
  {
    url: "get-customer",
    httpMethod: "get"
  }
);
/**********************************************************
* @name: Customer
* @function: Insert Customer
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "insertCustomer",
  function(data) {
    //Validate Data
    if (!data) return;

    //Create Data Return
    let data_customer;

    //Validate Transaction
    try {
      let insertCustomer = Meteor.call("createCustomer", data, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_customer = Customer.find({ _id: insertCustomer.data });
    } catch (error) {
      console.error("error publish insertCustomer = ", error);
    }

    //Return Data
    return data_customer;
  },
  {
    url: "insert-customer",
    httpMethod: "post"
  }
);

/**********************************************************
* @name: Customer
* @function: Update Customer
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "updateCustomer",
  function(data) {
    //Validate Data
    if (!data) return;
    let _id = data && data._id ? { _id: data._id } : {};

    //Create Data Return
    let data_customer;

    //Validate Transaction
    try {
      Meteor.call("updateCustomer", data, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_customer = Customer.find({ _id: _id });
    } catch (error) {
      console.error("error publish updateCustomer = ", error);
    }

    //Return Data
    return data_customer;
  },
  {
    url: "update-customer",
    httpMethod: "post"
  }
);

/**********************************************************
* @name: Customer
* @function: Remove Customer
* @author: Juan Paulo Velarde 
**********************************************************/
Meteor.publish(
  "removeCustomer",
  function(data) {
    //Validate Data
    if (!data) return;
    let _id = data && data._id ? { _id: data._id } : {};

    //Create Data Return
    let data_customer;

    //Validate Transaction
    try {
      Meteor.call("removeCustomer", _id, (e, success) => {
        if (e) return false;
        if (success) return success;
      });
      data_customer = Customer.find({});
    } catch (error) {
      console.error("error publish removeCustomer = ", error);
    }

    //Return Data
    return data_customer;
  },
  {
    url: "remove-customer",
    httpMethod: "post"
  }
);

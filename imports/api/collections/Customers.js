/**********************************************************
**************************CUSTOMERS JS**************************
***********************************************************
* @function: Create MongoCollection Customers.
* @author: Juan Paulo
* @date: 21/08/2024
**********************************************************
**********************************************************/
//Import Mongo
import { Mongo } from "meteor/mongo";
//Export Collection
export default new Mongo.Collection("customers");

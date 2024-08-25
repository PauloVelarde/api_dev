/**********************************************************
**************************SALES JS**************************
***********************************************************
* @function: Create MongoCollection Sales.
* @author: Juan Paulo
* @date: 21/08/2024
**********************************************************
**********************************************************/
//Import Mongo
import { Mongo } from "meteor/mongo";
//Export Collection
const Sales = new Mongo.Collection('sales');
export default Sales;



/**********************************************************
**************************TESTS JS**************************
***********************************************************
* @function: Create MongoCollection Tests.
* @author: Juan Paulo
* @date: 04/09/2024
**********************************************************
**********************************************************/
//Import Mongo
import { Mongo } from "meteor/mongo";
//Export Collection
const Tests = new Mongo.Collection("tests");
export default Tests;

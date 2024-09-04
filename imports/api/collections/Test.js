/**********************************************************
**************************TEST JS**************************
***********************************************************
* @function: Create MongoCollection Test.
* @author: Juan Paulo
* @date: 04/09/2024
**********************************************************
**********************************************************/
//Import Mongo
import { Mongo } from "meteor/mongo";
//Export Collection
const Test = new Mongo.Collection("test");
export default Test;

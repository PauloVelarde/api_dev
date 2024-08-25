/**********************************************************
**************************PRODUCTS JS**************************
***********************************************************
* @function: Create MongoCollection Products.
* @author: Juan Paulo
* @date: 21/08/2024
**********************************************************
**********************************************************/
//Import Mongo
import { Mongo } from "meteor/mongo";
//Export Collection
const Products = new Mongo.Collection('products');
export default Products;

/**********************************************************
***********************BOOTSTRAP JS************************
***********************************************************
* @function: Archivo de precarga de datos de la Aplicación 
*api_dev
* @bootstrapjs : Precarga de datos Aplicación Meteor
* @author: Juan Paulo Velarde 
* @date: 21/05/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
/**********************************************************
**********************CONFIGURATION************************
**********************************************************/
//Import MongoCollections Diagnosis Configuration

Meteor.startup(async () => {
  //Enabled CORS
  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    return next();
  });

  WebApp.connectHandlers.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    return next();
  });
});

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
import Products from "../imports/api/collections/Products";

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
  /**********************************************************
**********************CONFIGURATION************************
**********************************************************/
  //Validate Product
  if (Products.find({}).count() != 0) return;
  //Add Products
  const products = [
    {
      name: "Chorizo criollo",
      description:
        "Saboroso chorizo elaborado con carne de cerdo, pimentón y especias naturales. Ideal para asar o cocinar a la parrilla.",
      type: "Embutido curado",
      quantity: 500,
      unitPrice: 5.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Bistec de res",
      description:
        "Corte de carne de res jugoso y tierno, perfecto para preparar a la plancha o en un sándwich.",
      type: "Carne fresca",
      quantity: 1000,
      unitPrice: 8.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Salchichas de pollo",
      description:
        "Salchichas bajas en grasa elaboradas con carne de pollo y especias. Ideales para niños y para preparar hot dogs.",
      type: "Embutido cocido",
      quantity: 2000,
      unitPrice: 3.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Lomo de cerdo",
      description:
        "Corte de cerdo magro y versátil, perfecto para asar, hornear o guisar.",
      type: "Carne fresca",
      quantity: 800,
      unitPrice: 7.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Hamburguesas de carne",
      description:
        "Hamburguesas de carne de res 100% natural, perfectas para preparar en la parrilla.",
      type: "Carne procesada",
      quantity: 1500,
      unitPrice: 4.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Jamón serrano",
      description:
        "Jamón curado de cerdo ibérico con un sabor intenso y característico.",
      type: "Embutido curado",
      quantity: 300,
      unitPrice: 12.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Albondigas de carne",
      description:
        "Albondigas caseras de carne de res y cerdo, ideales para sopas y guisos.",
      type: "Carne procesada",
      quantity: 1000,
      unitPrice: 6.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Pechuga de pollo empanizada",
      description: "Pechuga de pollo empanizada y lista para freír o hornear.",
      type: "Carne empanizada",
      quantity: 2500,
      unitPrice: 4.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Morcilla",
      description:
        "Morcilla tradicional española elaborada con sangre de cerdo, arroz y especias.",
      type: "Embutido cocido",
      quantity: 500,
      unitPrice: 5.99,
      status: true,
      createdAt: new Date()
    },
    {
      name: "Costillas de cerdo ahumadas",
      description:
        "Costillas de cerdo ahumadas con leña de roble, tiernas y con un sabor ahumado intenso.",
      type: "Carne ahumada",
      quantity: 800,
      unitPrice: 9.99,
      status: true,
      createdAt: new Date()
    }
  ];
  //Create Produts
  let ids_products = [];
  products.forEach(product => {
    let idProduct = Products.insert(product);
    ids_products.push(idProduct);
  });
});

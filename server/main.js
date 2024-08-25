/**********************************************************
***********************MAIN JS************************
***********************************************************
* @function: api_dev Application data preload file
* @mainjs : Preloading data Meteor App
* @author: Juan Paulo Velarde 
* @date: 21/05/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

// Import API Methods and Publications
import '../imports/api/methods'
import '../imports/api/publications'

/**********************************************************
**********************CONFIGURATION************************
**********************************************************/

//Import MongoCollections api_dev Configuration
import Products from "../imports/api/collections/Products";
import Customers from "../imports/api/collections/Customers";
import Sales from "../imports/api/collections/Sales";

// Meteor startup function
Meteor.startup(async () => {
   // Enable CORS for all routes
   WebApp.rawConnectHandlers.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    
    // Handle OPTIONS method for preflight requests
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
    } else {
      next();
    }
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
      createdAt: new Date().toISOString()
    },
    {
      name: "Bistec de res",
      description:
        "Corte de carne de res jugoso y tierno, perfecto para preparar a la plancha o en un sándwich.",
      type: "Carne fresca",
      quantity: 1000,
      unitPrice: 8.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Salchichas de pollo",
      description:
        "Salchichas bajas en grasa elaboradas con carne de pollo y especias. Ideales para niños y para preparar hot dogs.",
      type: "Embutido cocido",
      quantity: 2000,
      unitPrice: 3.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Lomo de cerdo",
      description:
        "Corte de cerdo magro y versátil, perfecto para asar, hornear o guisar.",
      type: "Carne fresca",
      quantity: 800,
      unitPrice: 7.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Hamburguesas de carne",
      description:
        "Hamburguesas de carne de res 100% natural, perfectas para preparar en la parrilla.",
      type: "Carne procesada",
      quantity: 1500,
      unitPrice: 4.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Jamón serrano",
      description:
        "Jamón curado de cerdo ibérico con un sabor intenso y característico.",
      type: "Embutido curado",
      quantity: 300,
      unitPrice: 12.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Albondigas de carne",
      description:
        "Albondigas caseras de carne de res y cerdo, ideales para sopas y guisos.",
      type: "Carne procesada",
      quantity: 1000,
      unitPrice: 6.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Pechuga de pollo empanizada",
      description: "Pechuga de pollo empanizada y lista para freír o hornear.",
      type: "Carne empanizada",
      quantity: 2500,
      unitPrice: 4.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Morcilla",
      description:
        "Morcilla tradicional española elaborada con sangre de cerdo, arroz y especias.",
      type: "Embutido cocido",
      quantity: 500,
      unitPrice: 5.99,
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Costillas de cerdo ahumadas",
      description:
        "Costillas de cerdo ahumadas con leña de roble, tiernas y con un sabor ahumado intenso.",
      type: "Carne ahumada",
      quantity: 800,
      unitPrice: 9.99,
      status: true,
      createdAt: new Date().toISOString()
    }
  ];
  //Create Produts
  let ids_products = [];
  products.forEach(product => {
    let idProduct = Products.insert(product);
    ids_products.push(idProduct);
  });

  //Validate Customer
  if (Customers.find({}).count() != 0) return;
  //Add Customer
  const customers = [
    {
      fullName: "John Doe",
      identification: "123456789",
      address: "123 Main St, Anytown, USA",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      fullName: "Jane Smith",
      identification: "987654321",
      address: "456 Elm St, Anothertown, USA",
      phone: "987-654-3210",
      email: "janesmith@example.com",
      status: false,
      createdAt: new Date().toISOString()
    },
    {
      fullName: "María Rodríguez",
      identification: "12345678-K",
      address: "Calle Mayor, 123, Madrid, España",
      phone: "+34 654 321 123",
      email: "maria.rodriguez@example.com",
      status: true,
      createdAt: new Date("2023-11-22T10:35:24Z").toISOString()
    },
    {
      fullName: "Juan Pérez",
      identification: "87654321-P",
      address: "Avenida del Mar, 456, Barcelona, España",
      phone: "+34 987 654 321",
      email: "juan.perez@example.com",
      status: false,
      createdAt: new Date("2023-12-01T15:20:54Z").toISOString()
    },
    {
      fullName: "Ana García",
      identification: "55555555-A",
      address: "Plaza de la Constitución, 789, Sevilla, España",
      phone: "+34 123 456 789",
      email: "ana.garcia@example.com",
      status: true,
      createdAt: new Date().toISOString()
    },
  ];
  //Create Customers
  let ids_customers = [];
  customers.forEach(customer => {
    let idCustomer = Customers.insert(customer);
    ids_customers.push(idCustomer);
  });
  //Validate Sale
  if (Sales.find({}).count() != 0) return;
  //Add Sale
  const sales = [
    {
      name: "Venta 1",
      customerId: "wpHEgE3R8MFcdX66i",
      productId: "mzp8YuqAW7mCGDzMa",
      paymentMethod: "Tarjeta de crédito",
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Venta 2",
      customerId: "4NTXhx5wNWmdcyJjh",
      productId: "kY8jm3KPwFiAZa76C",
      paymentMethod: "Efectivo",
      status: false,
      createdAt: new Date().toISOString()
    },
    {
      name: "Venta 3",
      customerId: "WEcvNeQQmRxjujZa7",
      productId: "49f8Yb7DGS5sk5ZRE",
      paymentMethod: "Transferencia bancaria",
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      name: "Venta 4",
      customerId: "7Fg3KeZ8AXSTLGfAK",
      productId: "bmvp3YBivJsbntX6w",
      paymentMethod: "Tarjeta de débito",
      status: false,
      createdAt: new Date().toISOString()
    },
    {
      name: "Venta 5",
      customerId: "MyN4mCdk7QRGW6575",
      productId: "wjEsjsRc5RJeX5vT8",
      paymentMethod: "PayPal",
      status: true,
      createdAt: new Date().toISOString()
    }
  ];
  //Create Sales
  let ids_sales = [];
  sales.forEach(sale => {
    let idSale = Sales.insert(sale);
    ids_sales.push(idSale);
  });
});

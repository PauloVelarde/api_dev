/**********************************************************
**************************PRODUCTS JS**************************
***********************************************************
* @function: Metodos MongoCollection Products.
* @filejs : Publish Methods Meteor
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
//Import Collections
import Products from "../collections/Products";
//Import SimpleSchema & Check
import SimpleSchema from "simpl-schema";
import { check } from "meteor/check";

//Activated Validation Errors
SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

//Defined Schemma
export const productSchema = new SimpleSchema(
  {
    name: {
      type: String,
      label: "Nombre del producto"
    },
    description: {
      type: String,
      label: "Descripción del producto"
    },
    type: {
      type: String,
      label: "Tipo de producto"
    },
    piece: {
      type: String,
      label: "Pieza"
    },
    quantity: {
      type: Number,
      label: "Cantidad"
    },
    unitPrice: {
      type: Number,
      label: "Precio unitario"
    },
    expirationDate: {
      type: Date,
      label: "Fecha de vencimiento"
    },
    status: {
      type: Boolean,
      label: "Estado (activo/inactivo)"
    },
    createdAt: {
      type: Date,
      optional: true,
      defaultValue: new Date()
    }
  },
  { check }
).newContext();

//Initial Meteor Methods
Meteor.methods({
  /***********************************************************
    * @name: CreateProduct
    * @function: Insert Products
    * @param: object:{product}
    * @author: Juan Paulo Velarde 
    **********************************************************/
  createProduct(product) {
    productSchema.validate(product);
    let return_data = {};
    if (productSchema.validationErrors().length > 0) {
      return_data = {
        status: false,
        error: productSchema.validationErrors(),
        data: false
      };
      console.log(
        "error validacion createProduct = ",
        productSchema.validationErrors()
      );
      return return_data;
    }
    //Is Valid Schema
    if (productSchema.isValid()) {
      //Catch Insert
      try {
        let productId = product.insert(product);
        if (productId) {
          return_data = {
            status: true,
            data: productId
          };

          return return_data;
        }
      } catch (error) {
        return error;
      }
    }
  },
  /***********************************************************
    * @name: UpdateProduct
    * @function: Update Products
    * @param: object:{product}
    * @author: Juan Paulo Velarde 
    **********************************************************/
  updateProduct(product) {
    productSchema.validate(product.data);
    let return_data = {};
    if (productSchema.validationErrors().length > 0) {
      return_data = {
        status: false,
        error: productSchema.validationErrors(),
        data: false
      };
      console.log(
        "error validacion updateProduct = ",
        productSchema.validationErrors()
      );
      return return_data;
    }
    //Is Valid Schema
    if (productSchema.isValid()) {
      //Catch Update
      try {
        let productId = Products.update(product.id, { $set: product.data });
        if (productId) {
          return_data = {
            status: true,
            data: productId
          };

          return return_data;
        }
      } catch (error) {
        return error;
      }
    }
  },
  /***********************************************************
    * @name: removeProduct
    * @function: Remove Products
    * @param: id 
    * @author: Juan Paulo Velarde 
    **********************************************************/
  removeProduct(id) {
    //Catch Remove
    try {
      let productId = Products.remove({ _id: id });
      if (productId) {
        return_data = {
          status: true,
          data: productId
        };
        return return_data;
      }
    } catch (error) {
      return error;
    }
  }
});

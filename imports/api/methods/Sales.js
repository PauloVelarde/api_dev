/**********************************************************
**************************SALES JS**************************
***********************************************************
* @function: Metodos MongoCollection Sales.
* @filejs : Publish Methods Meteor
* @author: Juan Paulo Velarde 
* @date: 21/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
//Import Collections
import Sales from "../collections/Sales";
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
export const saleSchema = new SimpleSchema(
  {
    date: {
      type: Date,
      label: "Fecha de venta"
    },
    customerId: {
      type: String, // Suponiendo una referencia a un ID de cliente
      label: "Cliente"
    },
    productId: {
      type: Array,
      label: "Productos vendidos"
    },
    paymentMethod: {
      type: String,
      label: "Método de pago"
    },
    status: {
      type: Boolean,
      label: "Estado (completado/cancelado)"
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
    * @name: CreateSale
    * @function: Insert Sales
    * @param: object:{sale}
    * @author: Juan Paulo Velarde 
    **********************************************************/
  createSale(sale) {
    saleSchema.validate(sale);
    let return_data = {};
    if (saleSchema.validationErrors().length > 0) {
      return_data = {
        status: false,
        error: saleSchema.validationErrors(),
        data: false
      };
      console.log(
        "error validacion createSale = ",
        saleSchema.validationErrors()
      );
      return return_data;
    }
    //Is Valid Schema
    if (saleSchema.isValid()) {
      //Catch Insert
      try {
        let saleId = Sales.insert(sale);
        if (saleId) {
          return_data = {
            status: true,
            data: saleId
          };

          return return_data;
        }
      } catch (error) {
        return error;
      }
    }
  },
  /***********************************************************
    * @name: UpdateSale
    * @function: Update Sales
    * @param: object:{sale}
    * @author: Juan Paulo Velarde 
    **********************************************************/
  updateSale(sale) {
    saleSchema.validate(sale.data);
    let return_data = {};
    if (saleSchema.validationErrors().length > 0) {
      return_data = {
        status: false,
        error: saleSchema.validationErrors(),
        data: false
      };
      console.log(
        "error validacion updateSale = ",
        saleSchema.validationErrors()
      );
      return return_data;
    }
    //Is Valid Schema
    if (saleSchema.isValid()) {
      //Catch Update
      try {
        let saleId = Sales.update(sale.id, { $set: sale.data });
        if (saleId) {
          return_data = {
            status: true,
            data: saleId
          };

          return return_data;
        }
      } catch (error) {
        return error;
      }
    }
  },
  /***********************************************************
    * @name: removeSale
    * @function: Remove Sales
    * @param: id 
    * @author: Juan Paulo Velarde 
    **********************************************************/
  removeSale(id) {
    //Catch Remove
    try {
      let saleId = Sales.remove({ _id: id });
      if (saleId) {
        return_data = {
          status: true,
          data: saleId
        };
        return return_data;
      }
    } catch (error) {
      return error;
    }
  }
});

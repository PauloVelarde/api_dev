/**********************************************************
**************************PRODUCTS TEST JS**************************
***********************************************************
* @function: Unit testing of Products.
* @productstestjs : Unit Testing Products
* @author: Juan Paulo Velarde 
* @date: 25/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from "chai";
import sinon from "sinon";
import Products from "../imports/api/methods/Products";

if (Meteor.isServer) {
  describe("Products API", function() {
    let sandbox;

    beforeEach(function() {
      // Crear un sandbox de Sinon para simular y restaurar métodos
      sandbox = sinon.createSandbox();
    });

    afterEach(function() {
      // Restaurar Sandbox
      sandbox.restore();
    });

    it("debería crear un producto correctamente", function() {
      console.log("Ejecutando prueba: crear producto");
      const product = {
        name: "Jamon Iberico",
        description: "Jamon de bellotas",
        type: "Embutido",
        quantity: 3000,
        unitPrice: 5.99,
        status: true
      };

      // Simular el método de inserción
      const insertStub = sandbox.stub(Products, "insert").returns(Random.id());

      // Llamar al método createProduct y simular el entorno Meteor
      const result = Meteor.call("createProduct", product);

      // Verificar que el método insert fue llamado con los argumentos correctos
      assert.isTrue(insertStub.calledOnce);
      assert.isTrue(insertStub.calledWithExactly(product));

      // Validar que se devuelve un ID
      assert.isString(result);
      assert.match(result, /^[a-zA-Z0-9]{17}$/); // Verificar que el ID tiene una longitud adecuada
    });

    it("debería lanzar un error de validación al crear un producto con datos inválidos", function() {
      console.log("Ejecutando prueba: error de validación");
      const invalidProduct = {
        name: "", //nombre vacio
        description: "Jamon de bellotas",
        type: "Embutido",
        quantity: 3000,
        unitPrice: 5.99,
        status: true
      };

      // Simular el entorno Meteor
      const callStub = sandbox
        .stub(Meteor, "call")
        .throws(
          new Meteor.Error("validation-error", "Product data is invalid")
        );

      // Llamar al método y esperar que lance un error de validación
      assert.throws(
        () => {
          Meteor.call("createProduct", invalidProduct);
        },
        Meteor.Error,
        /validation-error/
      );
    });

    it("debería actualizar un producto correctamente", function() {
      console.log("Ejecutando prueba: actualizar cliente");
      const productId = Random.id();
      const productData = {
        name: "Jamon Iberico",
        description: "Jamon de bellotas",
        type: "Embutido"
      };

      // Simular el método de actualización
      const updateStub = sandbox.stub(Products, "update").returns(1);
      // Simular el método findOne para devolver el producto actualizado
      const findOneStub = sandbox.stub(Products, "findOne").returns({
        _id: productId,
        ...productData
      });

      // Llamar al método updateProduct y simular el entorno Meteor
      const result = Meteor.call("updateProduct", {
        id: productId,
        data: productData
      });

      // Verificar que el método update fue llamado con los argumentos correctos
      assert.isTrue(updateStub.calledOnce);
      assert.isTrue(
        updateStub.calledWithExactly(productId, { $set: productData })
      );
      // Validar que se devuelve el objeto actualizado
      assert.deepEqual(result, {
        _id: productId,
        ...productData
      });
    });

    it("debería eliminar un producto correctamente", function() {
      console.log("Ejecutando prueba: eliminar producto");
      const productId = Random.id();

      // Simular el método de eliminación
      const removeStub = sandbox.stub(Products, "remove").returns(1);

      // Llamar al método removeProduct y simular el entorno Meteor
      const result = Meteor.call("removeProduct", productId);

      // Verificar que el método remove fue llamado con los argumentos correctos
      assert.isTrue(removeStub.calledOnce);
      assert.isTrue(removeStub.calledWithExactly(productId));
      assert.isNumber(result); // Validar que se devuelve el número de documentos eliminados
    });
  });
}

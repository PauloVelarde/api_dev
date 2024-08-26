/**********************************************************
**************************CUSTOMERS TEST JS**************************
***********************************************************
* @function: Unit testing of Customers.
* @customerstestjs : Unit Testing Customers
* @author: Juan Paulo Velarde 
* @date: 25/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from "chai";
import sinon from "sinon";
import Customers from "../imports/api/collections/Customers";

if (Meteor.isServer) {
  describe("Customers API", function() {
    let sandbox;

    beforeEach(function() {
      // Crear un sandbox de Sinon para simular y restaurar métodos
      sandbox = sinon.createSandbox();
    });

    afterEach(function() {
      // Restaurar Sandbox
      sandbox.restore();
    });

    it("debería crear un cliente correctamente", function() {
      console.log("Ejecutando prueba: crear cliente");
      const customer = {
        fullName: "Santiago Marin",
        identification: "123425342",
        address: "234 Main St",
        phone: "555-2222",
        email: "saintmarin@example.com",
        status: true
      };

      // Simular el método de inserción
      const insertStub = sandbox.stub(Customers, "insert").returns(Random.id());

      // Llamar al método createCustomer y simular el entorno Meteor
      const result = Meteor.call("createCustomer", customer);

      // Verificar que el método insert fue llamado con los argumentos correctos
      assert.isTrue(insertStub.calledOnce);
      assert.isTrue(insertStub.calledWithExactly(customer));

      // Validar que se devuelve un ID
      assert.isString(result);
      assert.match(result, /^[a-zA-Z0-9]{17}$/); // Verificar que el ID tiene una longitud adecuada
    });

    it("debería lanzar un error de validación al crear un cliente con datos inválidos", function() {
      console.log("Ejecutando prueba: error de validación");
      const invalidCustomer = {
        fullName: "", // nombre vacío
        identification: "123425342",
        address: "234 Main St",
        phone: "555-2222",
        email: "saintmarin@example.com",
        status: true
      };

      // Simular el entorno Meteor
      const callStub = sandbox
        .stub(Meteor, "call")
        .throws(
          new Meteor.Error("validation-error", "Customer data is invalid")
        );

      // Llamar al método y esperar que lance un error de validación
      assert.throws(
        () => {
          Meteor.call("createCustomer", invalidCustomer);
        },
        Meteor.Error,
        /validation-error/
      );
    });

    it("debería actualizar un cliente correctamente", function() {
      console.log("Ejecutando prueba: actualizar cliente");
      const customerId = Random.id();
      const customerData = {
        fullName: "Santiago Marin",
        identification: "123425342",
        address: "234 Main St"
      };

      // Simular el método de actualización
      const updateStub = sandbox.stub(Customers, "update").returns(1);
      // Simular el método findOne para devolver el cliente actualizado
      const findOneStub = sandbox.stub(Customers, "findOne").returns({
        _id: customerId,
        ...customerData
      });

      // Llamar al método updateCustomer y simular el entorno Meteor
      const result = Meteor.call("updateCustomer", {
        id: customerId,
        data: customerData
      });

      // Verificar que el método update fue llamado con los argumentos correctos
      assert.isTrue(updateStub.calledOnce);
      assert.isTrue(
        updateStub.calledWithExactly(customerId, { $set: customerData })
      );
      // Validar que se devuelve el objeto actualizado
      assert.deepEqual(result, {
        _id: customerId,
        ...customerData
      });
    });

    it("debería eliminar un cliente correctamente", function() {
      console.log("Ejecutando prueba: eliminar cliente");
      const customerId = Random.id();

      // Simular el método de eliminación
      const removeStub = sandbox.stub(Customers, "remove").returns(1);

      // Llamar al método removeCustomer y simular el entorno Meteor
      const result = Meteor.call("removeCustomer", customerId);

      // Verificar que el método remove fue llamado con los argumentos correctos
      assert.isTrue(removeStub.calledOnce);
      assert.isTrue(removeStub.calledWithExactly(customerId));
      assert.isNumber(result); // Validar que se devuelve el número de documentos eliminados
    });
  });
}

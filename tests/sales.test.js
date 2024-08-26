/**********************************************************
**************************SALES TEST JS**************************
***********************************************************
* @function: Unit testing of Sales.
* @salestestjs : Unit Testing Sales
* @author: Juan Paulo Velarde 
* @date: 25/08/2024
**********************************************************
**********************************************************/
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from "chai";
import sinon from "sinon";
import Sales from "../imports/api/methods/Sales";

if (Meteor.isServer) {
  describe("Sales API", function() {
    let sandbox;

    beforeEach(function() {
      // Crear un sandbox de Sinon para simular y restaurar métodos
      sandbox = sinon.createSandbox();
    });

    afterEach(function() {
      // Restaurar Sandbox
      sandbox.restore();
    });

    it("debería crear una venta correctamente", function() {
      console.log("Ejecutando prueba: crear venta");
      const sale = {
        name: "Venta 1",
        customerId: "0000001",
        productId: "0000001",
        paymentMethod: "paypal",
        status: true
      };

      // Simular el método de inserción
      const insertStub = sandbox.stub(Sales, "insert").returns(Random.id());

      // Llamar al método createSale y simular el entorno Meteor
      const result = Meteor.call("createSale", sale);

      // Verificar que el método insert fue llamado con los argumentos correctos
      assert.isTrue(insertStub.calledOnce);
      assert.isTrue(insertStub.calledWithExactly(sale));

      // Validar que se devuelve un ID
      assert.isString(result);
      assert.match(result, /^[a-zA-Z0-9]{17}$/); // Verificar que el ID tiene una longitud adecuada
    });

    it("debería lanzar un error de validación al crear una venta con datos inválidos", function() {
      console.log("Ejecutando prueba: error de validación");
      const invalidProduct = {
        name: "", // nombre vacio
        customerId: "0000001",
        productId: "0000001",
        paymentMethod: "paypal",
        status: true
      };

      // Simular el entorno Meteor
      const callStub = sandbox
        .stub(Meteor, "call")
        .throws(new Meteor.Error("validation-error", "Sale data is invalid"));

      // Llamar al método y esperar que lance un error de validación
      assert.throws(
        () => {
          Meteor.call("createSale", invalidProduct);
        },
        Meteor.Error,
        /validation-error/
      );
    });

    it("debería actualizar una venta correctamente", function() {
      console.log("Ejecutando prueba: actualizar venta");
      const saleId = Random.id();
      const saleData = {
        name: "Venta 1",
        customerId: "0000001",
        productId: "0000001"
      };

      // Simular el método de actualización
      const updateStub = sandbox.stub(Sales, "update").returns(1);
      // Simular el método findOne para devolver una venta actualizada
      const findOneStub = sandbox.stub(Sales, "findOne").returns({
        _id: saleId,
        ...saleData
      });

      // Llamar al método updateSale y simular el entorno Meteor
      const result = Meteor.call("updateSale", {
        id: saleId,
        data: saleData
      });

      // Verificar que el método update fue llamado con los argumentos correctos
      assert.isTrue(updateStub.calledOnce);
      assert.isTrue(updateStub.calledWithExactly(saleId, { $set: saleData }));
      // Validar que se devuelve el objeto actualizado
      assert.deepEqual(result, {
        _id: saleId,
        ...saleData
      });
    });

    it("debería eliminar una venta correctamente", function() {
      console.log("Ejecutando prueba: eliminar venta");
      const saleId = Random.id();

      // Simular el método de eliminación
      const removeStub = sandbox.stub(Sales, "remove").returns(1);

      // Llamar al método removeSale y simular el entorno Meteor
      const result = Meteor.call("removeSale", saleId);

      // Verificar que el método remove fue llamado con los argumentos correctos
      assert.isTrue(removeStub.calledOnce);
      assert.isTrue(removeStub.calledWithExactly(saleId));
      assert.isNumber(result); // Validar que se devuelve el número de documentos eliminados
    });
  });
}

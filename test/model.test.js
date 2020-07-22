const model = require("../src/model");

//#region Fake ModelManager
function ModelManager(modelName) {
  this.modelName = modelName;
}

ModelManager.prototype.addProperty = function (
  propertyName,
  propertyType,
  propertyRules
) {};
//#endregion

test("createModel_Is_modelName_Entered", () => {
  let personModel = model.createModel("person");

  expect(personModel.modelName).toEqual("person");
});

test("createModel_Is_ReturnType_ModelManager", () => {
  let actualReturn = model.createModel("person");

  let expectedReturn = new ModelManager("person");

  expect(actualReturn).toMatchObject(expectedReturn);
});

test("createModel_Is_ModelManager_Frozen", () => {
  let personModel = model.createModel("person");

  personModel.modelName = "test";

  expect(personModel.modelName).toEqual("person");
});

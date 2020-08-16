const model = require("../src/model/model");
const {
  rulesInstance,
} = require("../src/validation/propertyValidation/generalValidation");
const {
  propertyRules,
} = require("../src/validation/propertyValidation/propertyValidation");

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

//#region createModel(modelName) tests
test("createModel_Is_modelName_Entered", () => {
  let personModel = model.createModel("person");

  expect(personModel.modelName).toBe("person");
});

test("createModel_Is_ReturnType_ModelManager", () => {
  let actualReturn = model.createModel("person");

  let expectedReturn = new ModelManager("person");

  expect(actualReturn).toMatchObject(expectedReturn);
});

test("createModel_Is_ModelManager_Frozen", () => {
  let personModel = model.createModel("person");

  personModel.modelName = "test";

  expect(personModel.modelName).toBe("person");
});
//#endregion

//#region addProperty(propertyName, propertyType, propertyRules)

test("addProperty_Should_ThrownExpection_ForNumberType_PropertyNameInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty(0, "string", [rulesInstance.required]);

  expect(callAddProperty).toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForObjectType_PropertyNameInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty({}, "string", [rulesInstance.required]);

  expect(callAddProperty).toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForBooleanType_PropertyNameInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty(false, "string", [rulesInstance.required]);

  expect(callAddProperty).toThrow(Error);
});

test("addProperty_Should_NotThrownExpection_ForString_PropertyNameInput", () => {
  let testModel = model.createModel("test");

  expect(() =>
    testModel.addProperty("noException", "string", [rulesInstance.required])
  ).not.toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForNumberType_PropertyTypeInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", 0, [rulesInstance.required]);

  expect(callAddProperty).toThrow(Error("propertyType must be string!"));
});

test("addProperty_Should_ThrownExpection_ForObjectType_PropertyTypeInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", {}, [rulesInstance.required]);

  expect(callAddProperty).toThrow(Error("propertyType must be string!"));
});

test("addProperty_Should_ThrownExpection_ForBooleanType_PropertyTypeInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", false, [rulesInstance.required]);

  expect(callAddProperty).toThrow(Error("propertyType must be string!"));
});

test("addProperty_Should_NotThrownExpection_ForStringTypeAndValue_PropertyTypeInput", () => {
  let testModel = model.createModel("test");

  expect(() =>
    testModel.addProperty("propertyName", "unexpectedValue", [
      rulesInstance.required,
    ])
  ).not.toThrow(Error("propertyType must be string!"));
});

test("addProperty_Should_ThrownExpection_ForUnexpectedValue_PropertyTypeInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", "unexpectedValue", [
      rulesInstance.required,
    ]);

  expect(callAddProperty).toThrow(
    Error("unexpectedValue is not one of the valid types!")
  );
});

test("addProperty_Should_NotThrownExpection_ForStringTypeAndValue_PropertyTypeInput", () => {
  let testModel = model.createModel("test");

  expect(() =>
    testModel.addProperty("propertyName", "string", [rulesInstance.required])
  ).not.toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForNumberType_PropertyRulesInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", "string", 1);

  expect(callAddProperty).toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForObjectType_PropertyRulesInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", "string", {});

  expect(callAddProperty).toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForBooleanType_PropertyRulesInput", () => {
  let testModel = model.createModel("test");

  let callAddProperty = () =>
    testModel.addProperty("propertyName", "string", false);

  expect(callAddProperty).toThrow(Error);
});

test("addProperty_Should_ThrownExpection_ForExisting_PropertyNameInput", () => {
  let testModel = model.createModel("test");
  testModel.addProperty("propertyName", "string", [
    propertyRules.generalRules.required,
  ]);

  let callAddProperty = () =>
    testModel.addProperty("propertyName", "string", [
      propertyRules.generalRules.required,
    ]);

  expect(callAddProperty).toThrow(Error(`propertyName is already exist!`));
});

//#endregion

//#region validate(object, additionalContent = true, caseSensitive = false) tests

test("validate_WhenAdditionalContentFalse_ShouldErrorMessageReceived", () => {
  
  // Arrange
  let testModel = model.createModel("test");

  testModel.addProperty("propertyName", "string", [rulesInstance.required]);

  let targetObj = {
    propertyName: "test",
    secondProp: "additional",
  };

  let expectedResult = {
    errorMessage: "The object contains unwanted content!",
    isValid: false,
  };

  // Act
  let actualResult = testModel.validate(targetObj, false);

  // Assert
  expect(actualResult).toEqual(expectedResult);
});

//#endregion

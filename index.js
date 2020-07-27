const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

personModel.addProperty("firstName", "string", [
  modelValidator.propertyRules.generalRules.required,
]);
personModel.addProperty("lastName", "string", [
  modelValidator.propertyRules.generalRules.required,
]);
personModel.addProperty("age", "number", [
  modelValidator.propertyRules.generalRules.required,
]);

let targetObj = {
  firstName: "Onur",
  lastName: "Kayabasi",
  age: 24,
};

let result = personModel.validate(targetObj, false, false);

console.log(result);

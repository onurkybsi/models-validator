const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");
let productModel = modelValidator.createModel("productModel");

personModel.addProperty("firstName", "string", [
  modelValidator.propertyRules.generalRules.required,
]);
personModel.addProperty("lastName", "string", [
  modelValidator.propertyRules.generalRules.required,
]);
personModel.addProperty("age", "array", [
  modelValidator.propertyRules.generalRules.required,
]);

productModel.addProperty("name", "string", [
  modelValidator.propertyRules.generalRules.required,
]);

let targetObj = {
  firstName: "Onur",
  lastName: "4",
  age: [],
};

let result = personModel.validate(targetObj, false, false);

console.log(result);

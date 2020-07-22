const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

personModel.addProperty("age", "numbeR", [
  modelValidator.propertyRules.generalRules.required,
]);

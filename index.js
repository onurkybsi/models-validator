const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

personModel.addProperty("age", "number", modelValidator.propertyRules.required);
personModel.modelName = "test";
console.log(personModel);
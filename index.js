const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

personModel.addProperty("firstName", "string");
personModel.addProperty("lastName", "string");
personModel.addProperty("age", "array");

let targetObj = {
  firstName: "onur",
  lastName: "4",
};

let result = personModel.validate(targetObj, true, false);

console.log(result);

const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

// personModel.addProperty("firstName", "string");
// personModel.addProperty("lastName", "string");
// personModel.addProperty("age", "array");

let targetObj = {
  firstName: "sa",
  lastName: "lastname",
  age: [],
  test: "extra",
};

let result = personModel.validate(targetObj, false, false);

console.log(result);

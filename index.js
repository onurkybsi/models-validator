const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel", {});

let targetObj = {
  firstName: [],
};

let result = personModel.validate(targetObj, false, true);

console.log(result);

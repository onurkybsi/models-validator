const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel", {
  firstName: "array",
});

let targetObj = {
  firstName: [],
};

let result = personModel.validate(targetObj, false, false);

console.log(result);

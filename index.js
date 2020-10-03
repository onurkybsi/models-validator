const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel", {
  firstName: "string",
  lastName: "string",
  age: "numberr"
});

let carModel = modelValidator.createModel("carModel", {
  brand: "string",
  model: "string",
  age: "number"
});

let targetObj = {
  firstName: "test",
  lastName: "test",
  age: 4
};

let targetObj2 = {
  brand: "test",
  model: "test",
  age: 4
};

let result = personModel.validate(targetObj, false, true);
let result2 = carModel.validate(targetObj2, false, true);

console.log(result);
console.log(result2);

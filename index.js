const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel", {
  firstName: "string",
  lastName: "string",
  age: "number",
});

let carModel = modelValidator.createModel("carModel", {
  brand: "string",
  modelYear: "number",
});

let validationResult1 = personModel.validate(
  {
    firstName: "Onur",
    lastName: "Kayabasi",
    age: 23,
  },
  false,
  true
);

let validationResult2 = carModel.validate(
  {
    brand: "VW",
    modelYear: 2020,
  },
  false,
  true
);

console.log(validationResult1);
console.log(personModel.modelName);
console.log(validationResult2);
console.log(carModel.modelName);

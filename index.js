const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel", {
  firstName: "string",
  lastName: "string",
  age: "number",
});

let validationResult = personModel.validate(
  {
    firstName: "Onur",
    lastName: "Kayabasi",
    age: 23,
  },
  false,
  true
);

console.log(validationResult);

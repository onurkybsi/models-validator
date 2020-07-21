const model = require("./model");

let personModel = model.createModel("person");
personModel.addProperty("firstName", "string", "required");
personModel.addProperty("lastName", "string", "required");
personModel.addProperty("age", "number", "required");
personModel.modelName = "test";
console.log(personModel);

const model = require("./model");

let testModel = model.createModel();
testModel.addProperty("firstName", "string", "required");

console.log(testModel);

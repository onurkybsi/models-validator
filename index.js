const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

<<<<<<< HEAD
personModel.addProperty("age", "numbeR", [
  modelValidator.propertyRules.generalRules.required,
]);
=======
personModel.addProperty("age", "numbeR", [modelValidator.propertyRules.required]);
>>>>>>> c5d383e81a8076bbfc258f74cea56cdc6d142289

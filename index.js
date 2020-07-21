const modelValidator = require("./model-validator");

let personModel = modelValidator.createModel("personModel");

personModel.addProperty("age", "sa", [modelValidator.propertyRules.required]);

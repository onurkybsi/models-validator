// Base module. Exports this package to external packages.

const createModel = require("./src/model/model").createModel;
const propertyRules = require("./src/validation/propertyValidation/propertyValidation").propertyRules;

module.exports = { createModel, propertyRules };

// Base module. Exports this package to external packages.

const createModel = require("./src/model").createModel;
const propertyRules = require("./src/propertyRules");

module.exports = { createModel, propertyRules };

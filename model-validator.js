// Base module. Exports this package to external packages.

const createModel = require("./src/model/model").createModel;
const modelValidatorMiddleware = require("./src/products/modelValidatorMiddleware")
  .modelValidatorMiddleware;

module.exports = { createModel, modelValidatorMiddleware };

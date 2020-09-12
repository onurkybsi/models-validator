// Base module. Exports this package to external packages.

const createModel = require("./src/model/model").createModel;

module.exports = { createModel };

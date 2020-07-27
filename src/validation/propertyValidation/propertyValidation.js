// In this module, instances of property rules are exported to external modules.

const generalValidation = require("./generalValidation");

const propertyRules = {
  generalRules: generalValidation.rulesInstance,
};
Object.freeze(propertyRules);

const propertyRulesImp = {
  requiredImp: generalValidation.impInstance,
};
Object.freeze(propertyRulesImp);

module.exports = { propertyRules, propertyRulesImp };

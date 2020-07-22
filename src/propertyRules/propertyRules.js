// In this module, instances of property rules are exported to external modules.

const generalRules = require("./propertyRules/generalRules");

const propertyRules = {
  generalRules: generalRules.instance,
};
Object.freeze(propertyRules);

module.exports = propertyRules;

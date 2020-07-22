const generalRules = require("./propertyRulesImp/generalRules");

const propertyRules = {
  generalRules: generalRules.instance,
};
Object.freeze(propertyRules);

module.exports = propertyRules;

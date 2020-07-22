const generalRules = require("./propertyRules/generalRules");

const propertyRules = {
  generalRules: generalRules.instance,
};
Object.freeze(propertyRules);

module.exports = propertyRules;

<<<<<<< HEAD
const generalRules = require("./propertyRulesImp/generalRules");

const propertyRules = {
  generalRules: generalRules.instance,
};
Object.freeze(propertyRules);

module.exports = propertyRules;
=======
const PropertyRules = function () {
  this.required = "required";
};

const propertyRules = new PropertyRules();
Object.freeze(propertyRules);
module.exports = { propertyRules };
>>>>>>> c5d383e81a8076bbfc258f74cea56cdc6d142289

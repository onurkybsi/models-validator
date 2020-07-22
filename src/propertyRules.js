const PropertyRules = function () {
  this.required = "required";
};

const propertyRules = new PropertyRules();
Object.freeze(propertyRules);
module.exports = { propertyRules };

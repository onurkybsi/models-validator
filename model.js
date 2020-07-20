const validateAddProperty = require("./modelValidations");

function Model() {
  this.properties = {};
  this.isValid = false;
}

Model.prototype.addProperty = function (
  propertyName,
  propertyType,
  propertyRules
) {
  let parametersIsValid = validateAddProperty(
    propertyName,
    propertyType,
    propertyRules
  );
  if (!parametersIsValid.isValid) {
    throw Error(parametersIsValid.errorMessage);
  }

  this.properties = {
    ...this.properties,
    [propertyName]: {
      propertyType: propertyType,
      propertyRules: propertyRules,
    },
  };
};

exports.createModel = function () {
  const model = new Model();

  for (const prop in model) {
    Object.defineProperty(model, prop, {
      writable: false,
      configurable: false,
    });
  }
  Object.preventExtensions(model);

  return model;
};

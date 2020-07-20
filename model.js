const modelValidations = require("./modelValidations");

class Model {
  constructor() {
    this.properties = {};
    this.isValid = false;
  }
  addProperty = function (propertyName, propertyType, propertyRules) {
    let parametersIsValid = modelValidations.validateAddProperty(
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
}

exports.createModel = () => new Model();

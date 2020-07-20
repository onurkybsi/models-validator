const modelValidations = require("./modelValidations");

class Model {
  constructor() {
    this._properties = {};
    this._isValid = false;
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

    this._properties = {
      ...this._properties,
      [propertyName]: {
        propertyType: propertyType,
        propertyRules: propertyRules,
      },
    };
  };
}

exports.createModel = () => new Model();

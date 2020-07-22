// Property type independent rules are implemented in this module.

const GeneralRules = function () {
  this.required = "required";
};

requiredImp = function (object, model) {
  let result = {
    errorMessage: null,
    isValid: true,
  };

  for (modelProp in model) {
    if (!object.hasOwnProperty(modelProp)) {
      result.errorMessage = `${modelProp} is required!`;
      result.isValid = false;
      break;
    }
  }

  return result;
};

const instance = new GeneralRules();
Object.freeze(instance);

module.exports = {
  instance,
};

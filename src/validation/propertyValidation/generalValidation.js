// Property type independent rules are implemented in this module.

const GeneralRules = function () {
  this.required = "required";
};

const rulesInstance = new GeneralRules();
Object.freeze(rulesInstance);

const GeneralRulesImp = function () {
  this.requiredImp = function (object, model) {
    let result = {
      errorMessage: "",
      isValid: true,
    };

    for (modelProp in model.properties) {
      if (model.properties[modelProp].rules.indexOf(rulesInstance.required) !== -1 && !object.hasOwnProperty(modelProp)) {
        result.errorMessage = `${modelProp} is required!`;
        result.isValid = false;
        break;
      }
    }

    return result;
  };
};

const impInstance = new GeneralRulesImp();
Object.freeze(impInstance);

module.exports = {
  rulesInstance,
  impInstance,
};

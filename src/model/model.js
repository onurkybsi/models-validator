const modelValidations = require("./modelMethodsValidations");

let modelRepo = {};

//#region ModelManager
function ModelManager(modelName) {
  this.modelName = modelName;
}

ModelManager.prototype.addProperty = function (
  propertyName,
  propertyType,
  propertyRules
) {
  let existingProps = modelRepo[this.modelName]["properties"];

  let parametersIsValid = modelValidations.validateAddProperty(
    propertyName,
    propertyType,
    propertyRules,
    existingProps
  );
  if (!parametersIsValid.isValid) {
    throw Error(parametersIsValid.errorMessage);
  }

  modelRepo[this.modelName] = {
    ...modelRepo[this.modelName],
    properties: {
      ...modelRepo[this.modelName].properties,
      [propertyName]: {
        type: propertyType,
        rules: propertyRules,
      },
    },
  };
};

ModelManager.prototype.validate = function (
  object,
  modelName,
  completelyValidation
) {
  let model = modelRepo[modelName];
};
//#endregion


exports.createModel = function (modelName) {
  modelRepo = {
    ...modelRepo,
    [modelName]: {
      properties: {},
      isValid: false,
    },
  };

  const newModelManager = new ModelManager(modelName);
  Object.freeze(newModelManager);
  return newModelManager;
};

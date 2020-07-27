// Creating and managing "models" are covered.

const modelValidations = require("./modelMethodsValidations");
const validation = require("../validation/validation");

let modelRepo = {};

//#region ModelManager: It gives models indirect access.
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

ModelManager.prototype.validate = function (object, additionalContent = true, caseSensitive = false) {
  let model = modelRepo[this.modelName];

  let result = validation.validate(object, model, additionalContent, caseSensitive);

  return result;
};
//#endregion

exports.createModel = function (modelName) {
  modelRepo = {
    ...modelRepo,
    [modelName]: {
      properties: {},
    },
  };

  const newModelManager = new ModelManager(modelName);
  Object.freeze(newModelManager);
  return newModelManager;
};

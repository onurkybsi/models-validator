// Creating and managing "models" are covered.

const modelValidations = require("./modelMethodsValidations");
const validation = require("../validation/validation");

let modelRepo = {};

//#region ModelManager: It gives indirect access for models.
function ModelManager(modelName) {
  this.modelName = modelName;
}

ModelManager.prototype.validate = function (
  object,
  additionalContent = true,
  caseSensitive = false
) {
  let model = modelRepo[this.modelName];

  let result = validation.validate(
    object,
    model,
    additionalContent,
    caseSensitive
  );

  return result;
};
//#endregion

exports.createModel = function (modelName, model) {
  if (typeof model === "object" && !Array.isArray(model)) {
    modelRepo = {
      ...modelRepo,
      [modelName]: model,
    };

    const newModelManager = new ModelManager(modelName);
    Object.freeze(newModelManager);
    return newModelManager;
  } else {
    return Error("The model parameter must be an object!");
  }
};

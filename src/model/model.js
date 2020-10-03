// Creating and managing "models" are covered.

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

//#region Validation of model parameter of createModel

// Invoke void validation methods that throw runtime errors
const validateModelObj = (obj) => {
  validatePropsTypes(obj);
};

const validatePropsTypes = (obj) => {
  const availableType = [
    "undefined",
    "object",
    "boolean",
    "number",
    "bigint",
    "string",
    "symbol",
    "function",
    "object",
    "array",
  ];

  for (const prop in obj) {
    if (!availableType.includes(obj[prop])) {
      throw Error(`${obj[prop]} is not of the available types!`);
    }
  }
};
//#endregion

exports.createModel = function (modelName, model) {
  if (typeof model === "object" && !Array.isArray(model)) {
    validateModelObj(model);

    modelRepo = {
      ...modelRepo,
      [modelName]: model,
    };

    const newModelManager = new ModelManager(modelName);
    Object.freeze(newModelManager);
    return newModelManager;
  } else {
    throw Error(
      "The 'model' parameter of createModel(modelName, model) must be an object!"
    );
  }
};

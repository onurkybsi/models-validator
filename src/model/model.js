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

//#region Validation of parameters of createModel
const validateCreateModelParameters = (modelName, model) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  if (!validateVariableType(modelName, "string")) {
    result.isValid = false;
    result.errorMessage =
      "The 'modelName' parameter of createModel(modelName, model) must be an string!";

    return result;
  }

  if (!validateVariableType(model, "object")) {
    result.isValid = false;
    result.errorMessage =
      "The 'model' parameter of createModel(modelName, model) must be an object!";

    return result;
  }

  if (modelRepo.hasOwnProperty(modelName)) {
    result.isValid = false;
    result.errorMessage = `${modelName} model is already available!`;

    return result;
  }

  let validationResultOfModelObj = validateModelObj(model);
  if (!validationResultOfModelObj.isValid) return validationResultOfModelObj;

  return result;
};

const validateVariableType = (variable, expectedType) => {
  if (expectedType[0] === "array") return Array.isArray(variable);
  else if (expectedType[0] === "object")
    return typeof variable === "object" && !Array.isArray(variable);
  else return typeof variable === expectedType[0];
};

const validateModelObj = (obj) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  result = validateModelObjPropTypes(obj);

  return result;
};

const validateModelObjPropTypes = (obj) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  const availableTypes = [
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
    if (!availableTypes.includes(obj[prop])) {
      result.isValid = false;
      result.errorMessage = `${obj[prop]} is not of the available types!`;

      break;
    }
  }

  return result;
};
//#endregion

exports.createModel = function (modelName, model) {
  let validationOfParameters = validateCreateModelParameters(modelName, model);

  if (validationOfParameters.isValid) {
    modelRepo = {
      ...modelRepo,
      [modelName]: model,
    };

    const newModelManager = new ModelManager(modelName);
    Object.freeze(newModelManager);
    return newModelManager;
  } else {
    throw Error(validationOfParameters.errorMessage);
  }
};

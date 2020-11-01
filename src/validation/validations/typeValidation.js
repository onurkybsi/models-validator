// Validates the data types of the properties of the validated object.
const checkPropType = function (object, model) {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  let modelProps = Object.keys(model);
  let modelPropsLowerCase = modelProps.map((p) => p.toLowerCase());
  let modelTypes = [];
  modelProps.forEach(function (prop) {
    modelTypes.push(model[prop]);
  });

  let objectProps = Object.keys(object);
  let objectPropsLowerCase = objectProps.map((p) => p.toLowerCase());
  let objectTypes = [];
  objectProps.forEach(function (prop) {
    if (Array.isArray(object[prop])) objectTypes.push("array");
    else objectTypes.push(typeof object[prop]);
  });

  modelPropsLowerCase.forEach(function (prop, index) {
    if (objectTypes[objectPropsLowerCase.indexOf(prop)] !== modelTypes[index]) {
      result.errorMessage = `Type of '${modelProps.filter(
        (mp) => mp.toLowerCase() === prop
      )}' must be ${modelTypes[index]}`;
      result.isValid = false;
    }
  });

  return result;
};

module.exports = {
  checkPropType,
};

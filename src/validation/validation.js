const modelValidation = require("./modelValidation/modelValidation");
const typeValidation = require("./typeValidation");

exports.validate = (object, model, additionalContent, caseSensitive) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  if (!additionalContent)
    result = modelValidation.checkAdditionalContent(
      object,
      model,
      caseSensitive
    );
  if (!result.isValid) return result;

  result = typeValidation.checkPropType(object, model);
  if (!result.isValid) return result;

  return result;
};

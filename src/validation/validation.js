const modelValidation = require("./modelValidation/modelValidation");
const propertyValidation = require("./propertyValidation/propertyValidation");
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

  result = propertyValidation.propertyRulesImp.requiredImp(object, model);
  if (!result.isValid) return result;

  result = typeValidation.checkPropType(object, model);
  if (!result.isValid) return result;

  return result;
};

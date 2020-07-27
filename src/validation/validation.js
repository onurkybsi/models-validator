const modelValidation = require("./modelValidation/modelValidation");
const propertyValidation = require("./propertyValidation/propertyValidation")
  .propertyRulesImp;

exports.validate = (object, model, additionalContent, caseSensitive) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  if (!additionalContent)
    result = modelValidation.checkAdditionalContent(object, model, caseSensitive);

  return result;
};

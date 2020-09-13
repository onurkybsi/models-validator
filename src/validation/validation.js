const modelValidation = require("./validations/contentValidation");
const typeValidation = require("./validations/typeValidation");

exports.validate = (object, model, additionalContent, caseSensitive) => {
  let resultOfRequiredContentCheck = modelValidation.checkRequiredContent(
    object,
    model,
    caseSensitive
  );

  if (!resultOfRequiredContentCheck.isValid)
    return resultOfRequiredContentCheck;

  if (!additionalContent) {
    let resultOfAdditionalContentCheck = modelValidation.checkAdditionalContent(
      object,
      model,
      caseSensitive
    );

    if (!resultOfAdditionalContentCheck.isValid)
      return resultOfAdditionalContentCheck;
  }

  let resultOfTPropTypeCheck = typeValidation.checkPropType(object, model);

  return resultOfTPropTypeCheck;
};

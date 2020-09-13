// It validates the required properties.
const checkRequiredContent = (object, model, caseSensitive) => {
  let props = resolveCaseSensivityForValidations(object, model, caseSensitive);

  let missingPropsInObject = identifyMissingElements(
    props.modelProps,
    props.objectProps
  );

  return prepareContentValidationsResult(
    missingPropsInObject.length > 0,
    true,
    // This operation was done to ensure that
    // the error message is exactly the same as the property name
    // regardless of case sensitivity.
    Object.keys(model).filter((p) =>
      missingPropsInObject.includes(caseSensitive ? p : p.toLowerCase())
    )
  );
};

// If additional content is not allowed,
// it validate that there is no additional content.
const checkAdditionalContent = (object, model, caseSensitive) => {
  let props = resolveCaseSensivityForValidations(object, model, caseSensitive);

  let additionalPropsInObject = identifyMissingElements(
    props.objectProps,
    props.modelProps
  );

  return prepareContentValidationsResult(
    additionalPropsInObject.length > 0,
    false,
    additionalPropsInObject
  );
};

// Returns the property names to be used in validations according to case sensitivity.
const resolveCaseSensivityForValidations = (object, model, caseSensitive) => {
  return {
    modelProps: caseSensitive
      ? Object.keys(model)
      : Object.keys(model).map((p) => p.toLowerCase()),
    objectProps: caseSensitive
      ? Object.keys(object)
      : Object.keys(object).map((p) => p.toLowerCase()),
  };
};

// Identify missing elements in another array based on an array.
const identifyMissingElements = (baseArray, checkedArray) => {
  let missingContent = [];

  baseArray.forEach((prop) => {
    if (!checkedArray.includes(prop)) {
      missingContent.push(prop);
    }
  });

  return missingContent;
};

// Prepares the return object of content validations.
const prepareContentValidationsResult = (
  isErrorResult,
  isMissingErrorResult,
  dataWithErrors
) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  if (!isErrorResult) return result;
  else {
    result.isValid = false;

    result.errorMessage = isMissingErrorResult
      ? "These properties are missing :"
      : "These properties are unwanted :";

    dataWithErrors.forEach((data) => {
      result.errorMessage += ` ${data},`;
    });

    result.errorMessage = result.errorMessage.slice(0, -1);

    return result;
  }
};

module.exports = {
  checkRequiredContent,
  checkAdditionalContent,
};

const checkRequiredContent = (object, model, caseSensitive) => {
  let props = resolveCaseSensitiveState(object, model, caseSensitive);

  let missingPropsInObject = detectMissingContent(
    props.modelProps,
    props.objectProps
  );

  return prepareResult(
    missingPropsInObject.length > 0,
    true,
    missingPropsInObject
  );
};

const checkAdditionalContent = (object, model, caseSensitive) => {
  let props = resolveCaseSensitiveState(object, model, caseSensitive);

  let additionalPropsInObject = detectMissingContent(
    props.objectProps,
    props.modelProps
  );

  return prepareResult(
    additionalPropsInObject.length > 0,
    false,
    additionalPropsInObject
  );
};

const resolveCaseSensitiveState = (object, model, caseSensitive) => {
  return {
    modelProps: caseSensitive
      ? Object.keys(model.properties)
      : Object.keys(model.properties).map((p) => p.toLowerCase()),
    objectProps: caseSensitive
      ? Object.keys(object)
      : Object.keys(object).map((p) => p.toLowerCase()),
  };
};

const detectMissingContent = (baseArray, checkedArray) => {
  let missingContent = [];

  baseArray.forEach((prop) => {
    if (!checkedArray.includes(prop)) {
      missingContent.push(prop);
    }
  });

  return missingContent;
};

const prepareResult = (isErrorResult, isMissingErrorResult, dataWithErrors) => {
  let result = {
    errorMessage: "",
    isValid: true,
  };

  if (!isErrorResult) return result;
  else {
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

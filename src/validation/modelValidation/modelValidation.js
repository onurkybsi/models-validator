// Properties other than those in the model are not accepted.
const checkAdditionalContent = (object, model, caseSensitive) => {
  let modelProps = Object.keys(model.properties);
  let objectProps = Object.keys(object);

  if (objectProps.length > modelProps.length)
    return {
      errorMessage: "The object contains unwanted content!",
      isValid: false,
    };

  let unacceptablePropCheckResult = {
    errorMessage: "",
    isValid: true,
  };

  if (caseSensitive) {
    objectProps.every((prop) => {
      if (modelProps.indexOf(prop) === -1) {
        unacceptablePropCheckResult.errorMessage = `${prop} property is not acceptable!`;
        unacceptablePropCheckResult.isValid = false;

        return false;
      }

      return true;
    });
  } else {
    var notCaseSensitiveModelKeys = modelProps.map((p) => p.toLowerCase());

    objectProps.every((prop) => {
      if (notCaseSensitiveModelKeys.indexOf(prop.toLowerCase()) === -1) {
        unacceptablePropCheckResult.errorMessage = `${prop} property is not acceptable!`;
        unacceptablePropCheckResult.isValid = false;

        return false;
      }

      return true;
    });
  }

  if (!unacceptablePropCheckResult.isValid) return unacceptablePropCheckResult;

  return {
    errorMessage: "",
    isValid: true,
  };
};

module.exports = {
  checkAdditionalContent,
};

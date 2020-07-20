exports.validateAddProperty = function (
  propertyName,
  propertyType,
  propertyRules
) {
  let errorMessage = null;
  let isValid = true;

  // Type checks
  let typeCheckIsValid = checkType({
    propertyName: "string",
    propertyType: "string",
  });

  if (!typeCheckIsValid) {
    errorMessage = typeCheckIsValid.errorMessage;
    isValid = typeCheckIsValid.isValid;
  }

  // If there is such a property, we throw an error. propertyName must be unique
  for (const prop in this.properties) {
    if (prop === propertyName) {
      errorMessage = `${propertyName} is already exist!`;
      isValid = false;
    }
  }

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
  ];

  if (availableType.indexOf(propertyType) === -1) {
    errorMessage = `${propertyType} is not one of the valid types!`;
    isValid = false;
  }

  return {
    errorMessage: errorMessage,
    isValid: isValid,
  };
};

checkType = function (params) {
  for (const param in params) {
    if (typeof param !== params[param]) {
      return {
        errorMessage: `${param} must be ${params[param]}`,
        isValid: false,
      };
    }
  }

  return {
    errorMessage: null,
    isValid: true,
  };
};

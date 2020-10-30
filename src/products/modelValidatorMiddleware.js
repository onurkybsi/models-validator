const modelValidatorMiddleware = function (modelsWithMappedPoints) {
  return function (req, res, next) {
    let model = modelsWithMappedPoints[req.path];

    if (model !== undefined) {
      let validationResult = model.validate(req.body);

      if (!validationResult.isValid) {
        res.status(400).send(validationResult);

        return;
      }
    }

    next();
  };
};

module.exports = {
  modelValidatorMiddleware: modelValidatorMiddleware,
};

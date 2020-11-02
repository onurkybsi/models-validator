# models-validator

models-validator validates JavaScript objects based on the declared model. It is easy to use, you can type-safe your JavaScript objects with a few methods.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/models-validator) to install models-validator.

```bash
npm i models-validator
```

## Usage

```javascript
const modelsValidator = require("models-validator");

let personModel = modelsValidator.createModel("personModel", {
    id: "number",
    firstName: "string",
    lastName = "string",
    birthDate = "string"
});

// Returns an object containing the isValid and errorMessage properties.
let validationResult = personModel.validate({
    id: 1,
    firstName: "Onur",
    lastName: "Kayabasi",
    birthDate: "1997-08-03"
}, false, false);
```
`personModel.validate(model, additionalContent = true, caseSensivite = false)` takes the `additionalContent` and `caseSensitive` optional parameters (by default: `true`, `false` respectively). 

You can allow additional props to the model with the additionalContent parameter, while you can allow case sensitivity in prop names with caseSensitive parameter.

You can also use models-validator for your express web APIs validity.

```javascript
const express = require("express");
const modelsValidator = require("models-validator");

const app = express()

app.use(
  modelsValidator.modelValidatorMiddleware({
    "/api/sendEmail": modelsValidator.createModel("sendEmailModel", {
      subject: "string",
      message: "string",
    }),
  })
);

app.post('/api/sendEmail', function (req, res) {
  ...
})

```

`modelsValidator.modelValidatorMiddleware(modelsWithMappedPoints)` returns validation result object which has `isValid` and `errorMessage` props with `400 Bad Request` status code if validation is unsuccessful. If the validation is successful, the request is passed on to the next middleware.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
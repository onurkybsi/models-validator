const model = require("../src/model/model");
const someModel = {
  someProp: "string",
};

//#region createModel(modelName, model) tests
test("createModel_Throw_Error_When_modelName_Type_IsNot_String", () => {
  let callCreateModel = () => model.createModel(1, someModel);

  expect(callCreateModel).toThrow(
    Error(
      "The 'modelName' parameter of createModel(modelName, model) must be an string!"
    )
  );
});

test("createModel_Not_Throw_Error_When_modelName_Type_Is_String", () => {
  let callCreateModel = () => model.createModel("testModel", someModel);

  expect(callCreateModel).not.toThrow(
    Error(
      "The 'modelName' parameter of createModel(modelName, model) must be an string!"
    )
  );
});

test("createModel_Throw_Error_When_model_Type_IsNot_Object", () => {
  let callCreateModel = () => model.createModel("testModel", []);

  expect(callCreateModel).toThrow(
    Error(
      "The 'model' parameter of createModel(modelName, model) must be an object!"
    )
  );
});

test("createModel_Not_Throw_Error_When_model_Type_Is_Object", () => {
  let callCreateModel = () => model.createModel("testModel", someModel);

  expect(callCreateModel).not.toThrow(
    Error(
      "The 'model' parameter of createModel(modelName, model) must be an object!"
    )
  );
});

test("createModel_Throw_Error_When_Model_Prop_Types_IsNot_Available", () => {
  let callCreateModel = () =>
    model.createModel("testModel2", {
      someProp: "inCorrectType",
    });

  expect(callCreateModel).toThrow(
    Error("inCorrectType is not of the available types!")
  );
});

test("createModel_Not_Throw_Error_When_Model_Prop_Types_Is_Available", () => {
  let callCreateModel = () => model.createModel("testModel3", someModel);

  expect(callCreateModel).not.toThrow(
    Error("inCorrectType is not of the available types!")
  );
});

test("createModel_Not_Throw_Any_Error_When_validationOfParameters_Is_True", () => {
  let callCreateModel = () => model.createModel("testModel4", someModel);

  expect(callCreateModel).not.toThrow(Error);
});

test("createModel_Created_Model_Name_Is_Entered_Value_As_Input", () => {
  let testModel5 = model.createModel("testModel5", someModel);

  expect(testModel5.modelName).toBe("testModel5");
});

test("createModel_Check_ModelManager_Is_Frozen_When_Change_Existing_Value", () => {
  let testModel6 = model.createModel("testModel6", someModel);

  testModel6.modelName = "canIChangeIt?";

  expect(testModel6.modelName).toBe("testModel6");
});

test("createModel_Check_ModelManager_Is_Frozen_When_Change_Add_New_Prop", () => {
  let testModel7 = model.createModel("testModel7", someModel);

  testModel7.newProp = 1;

  let doesTestModel7HaveNewProp = testModel7.hasOwnProperty("newProp");

  expect(doesTestModel7HaveNewProp).toBe(false);
});

test("createModel_Check_Return_Object", () => {
  let actualReturn = model.createModel("testModel8", someModel);

  let expectedReturn = {
    modelName: "testModel8",
  };

  expect(actualReturn).toMatchObject(expectedReturn);
});
//#endregion

//#region validate(object, additionalContent = true, caseSensitive = false) tests
test("validate_Allow_Additional_Content_As_Default", () => {
  let validateTestModel1 = model.createModel("validateTestModel1", someModel);

  let validationResult = validateTestModel1.validate({
    someProp: "someVal",
    additionalProp: "additionalVal",
  });

  expect(validationResult.isValid).toBe(true);
});

test("validate_Invalid_When_additionalContent_False_And_Obj_Contain_AdditionalContent", () => {
  let validateTestModel2 = model.createModel("validateTestModel2", someModel);

  let validationResult = validateTestModel2.validate(
    {
      someProp: "someVal",
      additionalProp: "additionalVal",
    },
    false
  );

  expect(validationResult.isValid).toBe(false);
});

test("validate_Return_Additional_Content_Error_Message_When_additionalContent_False_And_Obj_Contain_AdditionalContent", () => {
  let validateTestModel3 = model.createModel("validateTestModel3", someModel);

  let validationResult = validateTestModel3.validate(
    {
      someProp: "someVal",
      additionalProp: "additionalVal",
    },
    false
  );

  expect(
    validationResult.errorMessage.startsWith(
      "These properties are unwanted : additionalProp"
    )
  ).toBe(true);
});

test("validate_Dont_Have_Case_Sensitivity_As_Default", () => {
  let validateTestModel4 = model.createModel("validateTestModel4", someModel);

  let validationResult = validateTestModel4.validate({
    SOMEPROp: "someVal",
  });

  expect(validationResult.isValid).toBe(true);
});

test("validate_Invalid_When_Case_Sensitivity_True_And_Exists_Case_Proplem", () => {
  let validateTestModel5 = model.createModel("validateTestModel5", someModel);

  let validationResult = validateTestModel5.validate(
    {
      SOMEPROp: "someVal",
    },
    false,
    true
  );

  expect(validationResult.isValid).toBe(false);
});

test("validate_Return_Missing_Content_Error_When_CasE_Sensitivity_True_And_Exists_Case_Proplem", () => {
  let validateTestModel6 = model.createModel("validateTestModel6", someModel);

  let validationResult = validateTestModel6.validate(
    {
      SOMEPROp: "someVal",
    },
    false,
    true
  );

  expect(
    validationResult.errorMessage.startsWith(
      "These properties are missing : someProp"
    )
  ).toBe(true);
});
//#endregion

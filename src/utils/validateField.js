/*
 *
 * validate.js
 * Form input validation method
 *
 * @field{
 *   value: string (required) [field value]
 *   text: string (optional) [field label]
 *   notEmpty: bool (optional) [validate if field is not empty]
 *   regex: regex (optional) [test field value against regex]
 *   regexErrorMessage: string (optional) [regex fail error message]
 *   validated: bool (optional) [indicates field has been validated or not (default: false)]
 *   errors: Array (optional) [errors object]
 * }
 */

export default validateField = (field) => {
  let value = field.value;
  let fieldText = field.text;
  // Perform a deep clone to errors object
  let errors = JSON.parse(JSON.stringify(field.errors));
  // Check if field must not be empty
  if (field.notEmpty) {
    // Remove notEmpty error if it exists
    errors = errors.filter((error) => error.type != "notEmpty");
    if (value.length == 0) {
      // Add notEmpty error
      errors.push({
        type: "notEmpty",
        message: `${fieldText} cannot be empty`,
      });
    }
  }
  // Check if there's a regex for the field
  if (field.regex) {
    // Remove regex error if it exists
    errors = errors.filter((error) => error.type != "regex");
    if (!field.regex.test(value)) {
      // Add regex error
      errors.push({type: "regex", message: field.regexErrorMessage});
    }
  }
  // Check if there's a minimum length
  if (field.minLength) {
    // Remove minLength error if it exists
    errors = errors.filter((error) => error.type != "minLength");
    if (value.length < field.minLength) {
      // Add minLength error
      errors.push({
        type: "minLength",
        message: `${fieldText} must be atleast ${field.minLength} characters`,
      });
    }
  }
  // Check if there's an equality validation
  if (field.equality) {
    // Remove equality error if it exists
    errors = errors.filter((error) => error.type != "equality");
    if (value != field.equals) {
      // Add equality error
      errors.push({
        type: "equality",
        message: `Password Confirmation doesn't match password`, //always used for password confirmation
      });
    }
  }
  return {...field, errors, validated: true};
};

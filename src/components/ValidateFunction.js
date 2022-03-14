export default function ValidatorFn(inputs) {
    let errors = {};
    if (!inputs.userName.trim()) {
      errors.userName = "Please enter your name";
    }
    if (!inputs.address.trim()) {
      errors.address = "Please enter your address";
    }
    if (!inputs.dob.trim()) {
      errors.dob = "Please select your Date of Birth";
    }
    return errors;
  }
  
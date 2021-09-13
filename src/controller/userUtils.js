const valid = (name, email, password, cpassword) => {
  if (!name || !email || !password || !cpassword) {
    return "Please fill all the field";
  }
  if (!validateEmail(email)) {
    return "Invalid Email";
  }
  if (password.length < 6) {
    return "Password must be at least 6 character";
  }
  if (password !== cpassword) {
    return "Password do not match";
  }
};

function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
}

export default valid;

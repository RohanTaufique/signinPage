var nameRegex = /^[A-Z][a-zA-Z]*$/;
var emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validation = (
  firstName,
  lastName,
  email,
  password,
  regNo,
  degree,
  batch
) => {
  if (!nameRegex.test(firstName))
    return { error: "Invalid first name", errorIn: "firstName" };
  else if (!nameRegex.test(lastName))
    return { error: "Invalid last name", errorIn: "lastName" };
  else if (!email.match(emailRegex))
    return { error: "Invalid Email", errorIn: "email" };
  else if (!password.match(passwordRegex))
    return {
      error:
        "Password must contain minimum eight characters, at least one letter and one number.(no special characters are allowed)",
      errorIn: "password",
    };
  else return { error: "", errorIn: "" };
};
export const validationSignin = (email, password) => {
  if (!email.match(emailRegex))
    return { error: "Invalid email", errorIn: "email" };
  else if (!password.match(passwordRegex))
    return {
      error:
        "Password must contain minimum eight characters, at least one letter and one number.(no special characters are allowed)",
      errorIn: "password",
    };
  else if (password.length < 1)
    return { error: "Password Required", errorIn: "password" };
  else return { error: "", errorIn: "" };
};

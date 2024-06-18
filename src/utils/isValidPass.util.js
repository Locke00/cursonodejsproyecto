function isValidPassword(formPassword, dbPassword) {
  if (formPassword !== dbPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 40;
    throw error;
  }
}

export default isValidPassword;

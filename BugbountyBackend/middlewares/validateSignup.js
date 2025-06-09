export const validateSignup = (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    agreedToTerms = true,
    subscribeNewsletter = true, // Default to true if not provided
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (!agreedToTerms) {
    return res
      .status(400)
      .json({ message: "You must agree to the Terms of Service" });
  }

  next();
};

// import crypto from "crypto";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import Token from "../models/Token.js";
// import sendEmail from "../utils.js/sendEmail.js";

// // 📌 Register User with Email Verification
// export const signup = async (req, res) => {
//   const {
//     firstname,
//     lastname,
//     username,
//     email,
//     password,
//     subscribeNewsletter,
//     agreedToTerms,
//   } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await User.create({
//       firstname,
//       lastname,
//       username,
//       email,
//       password: hashedPassword,
//       agreedToTerms: agreedToTerms || true, // Default to true if not provided
//       subscribeNewsletter: subscribeNewsletter || true, // Default to true if not provided
//     });

//     // Generate verification token
//     const verificationToken = await Token.create({
//       userId: newUser._id,
//       token: crypto.randomBytes(32).toString("hex"),
//     });

//     const link = `${process.env.CLIENT_URL}/verify/${newUser._id}/${verificationToken.token}`;
//     await sendEmail(
//       email,
//       "Email Verification",
//       `<a href="${link}">Click here to verify your email</a>`
//     );

//     res
//       .status(201)
//       .json({ message: "Signup successful! Verification email sent." });
//   } catch (err) {
//     res.status(500).json({ message: "Signup failed", error: err.message });
//   }
// };

// 📌 Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// // 📩 Verify Email
// export const verifyEmail = async (req, res) => {
//   const { userId, token } = req.params;

//   const tokenRecord = await Token.findOne({ userId, token });
//   if (!tokenRecord)
//     return res
//       .status(400)
//       .json({ message: "Invalid or expired verification link" });

//   await User.findByIdAndUpdate(userId, { isVerified: true });
//   await tokenRecord.deleteOne();

//   res.status(200).json({ message: "Email verified successfully" });
// };

// 🔑 Password Reset Request
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "No user with this email" });

  const resetToken = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${resetToken.token}`;
  await sendEmail(
    email,
    "Password Reset",
    `<a href="${link}">Click here to reset your password</a>`
  );

  res.status(200).json({ message: "Password reset link sent to email" });
};

// 🔒 Reset Password
export const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  const tokenRecord = await Token.findOne({ userId, token });
  if (!tokenRecord)
    return res.status(400).json({ message: "Invalid or expired reset link" });

  const hashedPassword = await bcrypt.hash(password, 12);
  await User.findByIdAndUpdate(userId, { password: hashedPassword });
  await tokenRecord.deleteOne();

  res.status(200).json({ message: "Password reset successfully" });
};

// // 📌 GitHub & Google OAuth placeholders (for now)
// export const githubAuth = (req, res) => {
//   res.send("GitHub OAuth login — to be implemented");
// };

// export const googleAuth = (req, res) => {
//   res.send("Google OAuth login — to be implemented");
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 📌 Register User (no email verification)
export const signup = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    subscribeNewsletter,
    agreedToTerms,
    bio,
    location,
    portfolio,
    github,
    twitter,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      agreedToTerms: agreedToTerms ?? true, // Default true if not provided
      subscribeNewsletter: subscribeNewsletter ?? true,
      bio,
      location,
      portfolio,
      github,
      twitter,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Signup successful!",
      user: newUser,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err); // Add this!

    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// 📌 Get User Details

export const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//register
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400).json({ error: "User already registered" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });
  const token = jwt.sign(
    { email: newUser.email, username: newUser.username },
    "shineinfo"
  );

  res.status(201).json({ user: newUser, token });
});

//login
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const trimmedPassword = password.trim();
  const trimmedStoredPassword = user.password.trim();

  const isPasswordValid = trimmedPassword === trimmedStoredPassword;

  if (isPasswordValid) {
    const token = jwt.sign({ email, username }, "shineinfo");
    console.log("token", token);
    res.status(200).json({ message: "Login successful", token: token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({ data: user, message: "get all user" });
});

module.exports = { registerUser, loginUser, currentUser };

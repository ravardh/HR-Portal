import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genAuthToken } from "../config/jwtAuth.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    // Generate JWT token
    genAuthToken(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        department: user.department,
        position: user.position,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const userRegister = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      qualification,
      department,
      position,
      hiringDate,
      salary,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !qualification ||
      !department ||
      !position ||
      !hiringDate ||
      !salary ||
      !password ||
      !gender ||
      !dob
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      gender,
      dob,
      qualification,
      department,
      position,
      hiringDate,
      salary,
      password: hashedPassword,
      status: "Active",
      profilePic: "",
    });

    res.status(201).json({
      message: "User Created Successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

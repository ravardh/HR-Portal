import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genAuthToken } from "../config/jwtAuth.js";
import nodemailer from "nodemailer";
// ===================== USER LOGIN =====================
export const userLogin = async (req, res) => {
  try {
    const { emailID, password } = req.body;

    if (!emailID || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ "personalDetails.emailID": emailID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.jobDetail.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.jobDetail.status.toLowerCase() !== "active") {
      return res.status(403).json({ message: "User is not active" });
    }

    genAuthToken(user._id, res); // sets cookie/header

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.personalDetails.name,
        email: user.personalDetails.emailID,
        role: user.jobDetail.role,
        department: user.jobDetail.department,
        designation: user.jobDetail.designation,
        shiftStartTime: user.jobDetail.shiftStartTime,
        shiftEndTime: user.jobDetail.shiftEndTime,
        weekOff: user.jobDetail.weekOff,
        status: user.jobDetail.status,
        image: user.personalDetails.image,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ===================== USER REGISTRATION =====================
export const userRegister = async (req, res) => {
  try {
    const {
      personalDetails,
      emergencyContactDetails,
      educationalDetails = [],
      employmentDetails = [],
      familyDetails = [],
      professionalReferences = [],
      jobDetail,
    } = req.body;

    if (!personalDetails || !jobDetail || !emergencyContactDetails) {
      return res.status(400).json({ message: "Required sections missing." });
    }

    const {
      name,
      fatherName,
      gender,
      correspondenceAddress,
      permanentAddress,
      altNumber,
      mobile,
      emailID,
      dob,
      maritalStatus,
      panCardNo,
      bloodGroup,
      addharCardNo,
      image = "",
    } = personalDetails;

    const {
      name: emergencyName,
      relation: emergencyRelation,
      contactNo: emergencyContactNo,
    } = emergencyContactDetails;

    let {
      department,
      designation,
      hiringDate,
      salary,
      password,
      role = "Employee",
      status = "Active",
      shiftStartTime = "09:00",
      shiftEndTime = "18:00",
      weekOff = "Sunday",
      bankDetails,
    } = jobDetail;

    if (!bankDetails) {
      return res.status(400).json({ message: "Bank details are required." });
    }

    const { bankName, accountNo, ifscCode, branchAddress } = bankDetails;

    // Required fields check
    if (
      !name ||
      !fatherName ||
      !gender ||
      !correspondenceAddress ||
      !permanentAddress ||
      !mobile ||
      !emailID ||
      !dob ||
      !maritalStatus ||
      !panCardNo ||
      !bloodGroup ||
      !addharCardNo
    ) {
      return res
        .status(400)
        .json({ message: "Missing required personal details." });
    }

    if (!emergencyName || !emergencyRelation || !emergencyContactNo) {
      return res
        .status(400)
        .json({ message: "Missing emergency contact details." });
    }

    if (
      !department ||
      !designation ||
      !hiringDate ||
      !salary ||
      !bankName ||
      !accountNo ||
      !ifscCode ||
      !branchAddress
    ) {
      return res
        .status(400)
        .json({ message: "Missing required job/bank details." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { "personalDetails.emailID": emailID },
        { "personalDetails.panCardNo": panCardNo },
        { "personalDetails.addharCardNo": addharCardNo },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with same Email, PAN, or Aadhaar already exists.",
      });
    }

    // Generate default password
    let generatedPassword = password;
    if (!password) {
      const fullName = name?.trim();
      const birthYear = dob?.split("-")[0];
      if (!fullName || !birthYear) {
        return res.status(400).json({
          message:
            "Password is missing and cannot be generated (name or dob missing).",
        });
      }
      const firstName = fullName.split(" ")[0];
      generatedPassword = `${firstName}@${birthYear}`;
    }

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      personalDetails: {
        name,
        fatherName,
        gender,
        correspondenceAddress,
        permanentAddress,
        altNumber,
        mobile,
        emailID,
        dob,
        maritalStatus,
        panCardNo,
        bloodGroup,
        addharCardNo,
        image,
      },
      emergencyContactDetails: {
        name: emergencyName,
        relation: emergencyRelation,
        contactNo: emergencyContactNo,
      },
      educationalDetails,
      employmentDetails,
      familyDetails,
      professionalReferences,
      jobDetail: {
        department,
        designation,
        hiringDate,
        salary,
        password: hashedPassword,
        role,
        status,
        shiftStartTime,
        shiftEndTime,
        weekOff,
        bankDetails: {
          bankName,
          accountNo,
          ifscCode,
          branchAddress,
        },
      },
    });

    await newUser.save();

    // ========== Email Sending ==========
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // Your Gmail address
        pass: process.env.MAIL_PASS, // App password (not your Gmail password)
      },
    });

    const mailOptions = {
      from: `"HR Team" <${process.env.MAIL_USER}>`,
      to: emailID,
      subject: "Welcome to the Company - Login Credentials",
      html: `
        <h3>Dear ${name},</h3>
        <p>Your employee account has been successfully created.</p>
        <p><strong>Login Credentials:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${emailID}</li>
          <li><strong>Password:</strong> ${generatedPassword}</li>
        </ul>
        <p>Please change your password after your first login.</p>
        <br/>
        <p>Regards,<br/>HR Team</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email sending failed:", err.message);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.personalDetails.name,
        email: newUser.personalDetails.emailID,
        role: newUser.jobDetail.role,
        status: newUser.jobDetail.status,
        defaultPassword: generatedPassword, // ❗ Remove in production
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ===================== USER LOGOUT =====================
export const userLogout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res
      .status(500)
      .json({ message: "Server error during logout", error: error.message });
  }
};

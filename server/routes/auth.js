import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
import { sendWelcomeMail, sendLoginMail } from "../config/mailer.js";


const router = express.Router();

/**
 * REGISTER
  
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // ✅ Send email in background (no delay)
    sendWelcomeMail(user.email).catch(console.error);

    // ✅ Respond immediately
    res.status(201).json({ token });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     email,
//     password: hashedPassword,
//   });

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN }
//   );
//    await sendWelcomeMail(user.email);

//   res.status(201).json({ token });
// });

/**
 * LOGIN
 */
// router.post("/login", async (req, res) => {
//   console.log("Login attempt:", req.body);
//    const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN }
//   );

//   res.json({ token });
// });
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({ token });
    //Newly added: Send login notification email
    
    sendLoginMail(user.email).catch(console.error);
  } catch (error) {
  console.error("LOGIN ERROR DETAILS:", error);
  res.status(500).json({
    message: "Server error",
    error: error.message,
  });
}

});


export default router;

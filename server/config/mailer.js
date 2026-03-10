import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeMail = async (toEmail) => {
  try {
    await transporter.sendMail({
      from: `"Your App Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Welcome to Our App!",
      text: `Dear User,

Thank you for registering with us. We are excited to have you on board!

Warm regards,
The App Team`,
    });
    console.log("✅ Welcome mail sent!");
  } catch (err) {
    console.error("❌ Error sending welcome mail:", err);
  }
};

export const sendLoginMail = async (toEmail) => {
  try {
    await transporter.sendMail({
      from: `"Your App Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Welcome Back!",
      text: `Dear User,

We appreciate you logging in today. Thanks for engaging with our app!

Warm regards,
The App Team`,
    });
    console.log("✅ Appreciation mail sent!");
  } catch (err) {
    console.error("❌ Error sending login mail:", err);
  }
};
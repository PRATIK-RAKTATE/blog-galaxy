import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: true,
  debug: true,
});

export default transporter;

export const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP verified");
  } catch (err) {
    console.error("❌ SMTP verification failed", {
      message: err.message,
      code: err.code,
    });
  }
};

import nodemailer from "nodemailer";
console.log(process.env.GMAIL_USER);
console.log(process.env.GOOGLE_APP_PASSWORD);
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ariondutta33@gmail.com",
    pass: "ftshbsswzmoyjcfr",
  },
});
export const sendMail = async (to: string, subject: string, body: string) => {
  if (!process.env.GMAIL_USER || !process.env.GOOGLE_APP_PASSWORD) return;
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    html: body,
  });
};

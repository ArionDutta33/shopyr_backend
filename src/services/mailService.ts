import nodemailer from "nodemailer";

if (!process.env.GOOGLE_APP_PASSWORD) {
  throw new Error("No env loaded");
}
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
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

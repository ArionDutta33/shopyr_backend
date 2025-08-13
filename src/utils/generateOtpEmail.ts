export const generateOtpEmail = (otp: string, userName?: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">ShopEasy OTP Verification</h2>
      <p>Hi ${userName || "there"},</p>
      <p>Use the following One-Time Password (OTP) to complete your action on ShopEasy:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0b79d0;">${otp}</span>
      </div>
      
      <p style="color: #555;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      
      <p style="margin-top: 30px;">Thanks,<br />The ShopEasy Team</p>
      
      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">If you did not request this OTP, please ignore this email.</p>
    </div>
    `;
};

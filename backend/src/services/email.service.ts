import { Resend } from "resend";

export const sendVerificationOtp = async (email: string, otp: string) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing in environment variables");
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Wallet App <onboarding@resend.dev>",
    to: email,
    subject: "Your verification code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 8px; font-size: 32px;">${otp}</h1>
        <p>This code expires in <strong>10 minutes</strong>.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
};

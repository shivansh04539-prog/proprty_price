import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 1. Create a 5-minute expiration timestamp
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;

    // 2. Create a secure hash of the email, OTP, and expiration
    const data = `${email}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", process.env.OTP_SECRET).update(data).digest("hex");

    // 3. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Registration OTP",
      html: `<div style="font-family: sans-serif; padding: 20px;">
               <h2>Verify your email</h2>
               <p>Your 6-digit code is: <b style="font-size: 24px; color: #2563eb;">${otp}</b></p>
               <p>This code expires in 5 minutes.</p>
             </div>`,
    });

    // Send the hash back to the client (NOT the OTP!)
    return NextResponse.json({ success: true, hashPayload: `${hash}.${expires}` });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Email failed" }, { status: 500 });
  }
}
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "gunjan251492@gmail.com",
    pass: "pzku hyma dwch cenq",
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificate errors
  },
});
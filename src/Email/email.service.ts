import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the email transport service
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'linwood.dach@ethereal.email',
          pass: 'DxCe7eGCGhp5MvubA4'
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to, // Recipient's email address
      subject, // Email subject
      text, // Email text body
      html, // Email HTML body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email: ${error.message}`);
    }
  }
}

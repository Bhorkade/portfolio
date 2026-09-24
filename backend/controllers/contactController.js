import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

// Send email notification helper
const sendNotificationEmail = async ({ name, email, subject, message }) => {
  const emailTo = process.env.EMAIL_TO;
  const emailFrom = process.env.EMAIL_FROM || 'no-reply@portfolio.dev';
  const emailKey = process.env.EMAIL_API_KEY;

  if (!emailTo || !emailKey) {
    console.log('ℹ️ Email notification skipped: EMAIL_TO or EMAIL_API_KEY not configured.');
    return;
  }

  try {
    // Configurable transporter: supports custom SMTP, SendGrid, or standard SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'apikey',
        pass: emailKey,
      },
    });

    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: `[Portfolio Contact] New message from ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Contact Message</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">
            ${message}
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">This notification was sent from your personal portfolio contact form.</p>
        </div>
      `,
    });
    console.log(`✉️ Email notification sent to ${emailTo}`);
  } catch (err) {
    console.error('Failed to send email notification:', err.message);
  }
};

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.',
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters.',
      });
    }

    if (subject.trim().length < 2 || subject.trim().length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Subject must be between 2 and 200 characters.',
      });
    }

    if (message.trim().length < 5 || message.trim().length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 5 and 5000 characters.',
      });
    }

    // 2. Save to MongoDB if connected
    let savedContact = null;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      savedContact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      });
      console.log(`💾 Saved message from ${name} (${email}) to MongoDB`);
    } else {
      console.log(`📝 [Dev/Fallback Mode - DB Not Connected] Received contact:`, {
        name,
        email,
        subject,
        message,
        receivedAt: new Date().toISOString(),
      });
    }

    // 3. Send email notification asynchronously
    sendNotificationEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    }).catch((err) => console.error('Email error:', err));

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: savedContact ? { id: savedContact._id, createdAt: savedContact.createdAt } : null,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

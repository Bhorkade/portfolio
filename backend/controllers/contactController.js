import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import Contact from '../models/Contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to reload environment variables on demand
const reloadEnv = () => {
  dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
};

// Helper: Save message locally to backend/data/messages.json
const saveMessageToFile = (contactData) => {
  try {
    const dataDir = path.resolve(process.cwd(), 'backend', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'messages.json');
    let messages = [];
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        messages = JSON.parse(content || '[]');
      } catch (e) {
        messages = [];
      }
    }
    const newMessage = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8');
    console.log(`💾 Saved message locally to backend/data/messages.json`);
    return newMessage;
  } catch (err) {
    console.error('Failed to save message to local file:', err.message);
    return null;
  }
};

// Send notification email helper
const sendNotificationEmail = async ({ name, email, subject, message }) => {
  reloadEnv();

  const emailTo = process.env.EMAIL_TO || 'bhorkadeshrikar154@gmail.com';
  const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || 'bhorkadeshrikar154@gmail.com';
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER || 'bhorkadeshrikar154@gmail.com';
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_API_KEY || '';

  // Method 1: Web3Forms API (If WEB3FORMS_ACCESS_KEY is set)
  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: `[Portfolio] ${name}: ${subject}`,
          message,
          to_email: emailTo,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        console.log(`✉️ Email successfully delivered via Web3Forms to ${emailTo}`);
        return { success: true, provider: 'Web3Forms' };
      } else {
        console.error('Web3Forms returned error:', data.message || data);
        return { success: false, error: data.message || 'Web3Forms API error' };
      }
    } catch (err) {
      console.error('Web3Forms fetch error:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Method 2: SMTP / Nodemailer (Gmail Password/App Password or Custom SMTP)
  if (smtpHost && smtpPass) {
    try {
      const isGmail = smtpHost.includes('gmail');
      const transporterConfig = isGmail
        ? {
            service: 'gmail',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            host: smtpHost,
            port: smtpPort,
            secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          };

      const transporter = nodemailer.createTransport(transporterConfig);

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${emailFrom}>`,
        to: emailTo,
        replyTo: email,
        subject: `[Portfolio Contact] New message from ${name}: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Contact Message</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Sent to ${emailTo} via your Portfolio contact form.</p>
          </div>
        `,
      });
      console.log(`✉️ Email notification successfully sent via SMTP to ${emailTo}`);
      return { success: true, provider: 'SMTP' };
    } catch (err) {
      console.error('❌ Failed to send email via SMTP:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Method 3: Discord Webhook
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: `📬 New Portfolio Message: ${subject}`,
              color: 0x3b82f6,
              fields: [
                { name: 'From', value: `${name} (${email})`, inline: true },
                { name: 'Message', value: message },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      console.log('📢 Sent notification to Discord Webhook');
    } catch (err) {
      console.error('Failed to send Discord webhook:', err.message);
    }
  }

  console.log('ℹ️ Note: Email sending skipped because neither SMTP_PASS nor WEB3FORMS_ACCESS_KEY is configured in backend/.env.');
  return { success: false, reason: 'No email service credentials configured in backend/.env' };
};

// GET /api/contact/test-email - Endpoint to diagnose email sending
export const testEmail = async (req, res) => {
  reloadEnv();

  const smtpUser = process.env.SMTP_USER || 'bhorkadeshrikar154@gmail.com';
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_API_KEY || '';
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || '';

  if (!smtpPass && !web3Key) {
    return res.status(400).json({
      success: false,
      message: 'Email password/key is missing in backend/.env file!',
      diagnostics: {
        emailTo: process.env.EMAIL_TO || 'bhorkadeshrikar154@gmail.com',
        smtpUser: smtpUser,
        hasSmtpPass: false,
        hasWeb3FormsKey: false,
        solution: 'Please add your password to SMTP_PASS in backend/.env file',
      },
    });
  }

  const testResult = await sendNotificationEmail({
    name: 'Portfolio Email Tester',
    email: 'test@portfolio.dev',
    subject: 'Test Notification',
    message: 'This is a test notification to verify your portfolio email configuration.',
  });

  if (testResult.success) {
    return res.status(200).json({
      success: true,
      message: `Test email successfully sent to ${process.env.EMAIL_TO || 'bhorkadeshrikar154@gmail.com'} via ${testResult.provider}!`,
      details: testResult,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Failed to send test email.',
      error: testResult.error || testResult.reason,
    });
  }
};

// GET /api/contact/messages - Retrieve all saved messages
export const getMessages = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    let messages = [];

    if (isDbConnected) {
      messages = await Contact.find().sort({ createdAt: -1 }).lean();
    } else {
      const filePath = path.resolve(process.cwd(), 'backend', 'data', 'messages.json');
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        messages = JSON.parse(content || '[]');
      }
    }

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
};

// POST /api/contact - Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Input Validation
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

    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // 2. Always save to local JSON file as guaranteed backup
    const savedLocal = saveMessageToFile(cleanData);

    // 3. Save to MongoDB if connected
    let savedDb = null;
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      savedDb = await Contact.create(cleanData);
      console.log(`💾 Saved message from ${name} (${email}) to MongoDB`);
    }

    // 4. Trigger Email notification
    const emailResult = await sendNotificationEmail(cleanData).catch((err) => ({
      success: false,
      error: err.message,
    }));

    if (emailResult && emailResult.success) {
      return res.status(201).json({
        success: true,
        message: 'Message sent! An email notification has been sent to your Gmail inbox.',
        emailDelivered: true,
        data: {
          id: savedDb ? savedDb._id : savedLocal?.id,
          createdAt: savedDb ? savedDb.createdAt : savedLocal?.createdAt,
        },
      });
    } else {
      const warningMsg = emailResult?.reason || emailResult?.error || 'Email configuration missing.';
      console.warn('⚠️ Message saved, but email notification failed:', warningMsg);
      return res.status(201).json({
        success: true,
        message: `Message received and saved! (Note: Email to Gmail inbox failed: ${warningMsg})`,
        emailDelivered: false,
        emailError: warningMsg,
        data: {
          id: savedDb ? savedDb._id : savedLocal?.id,
          createdAt: savedDb ? savedDb.createdAt : savedLocal?.createdAt,
        },
      });
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

import express from 'express';
import { submitContact, getMessages, testEmail } from '../controllers/contactController.js';

const router = express.Router();

// GET /api/contact/messages - Retrieve saved messages
router.get('/messages', getMessages);

// GET /api/contact/test-email - Test email delivery configuration
router.get('/test-email', testEmail);

// POST /api/contact - Submit contact form
router.post('/', submitContact);

export default router;

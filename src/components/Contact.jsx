import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Code2,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset alert state when typing
    if (status.success || status.error) {
      setStatus({ submitting: false, success: false, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please fill out all fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    const apiUrl = import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api/contact`
      : '/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Helpful error message if local backend is offline during test
      setStatus({
        submitting: false,
        success: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={15} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="text-gradient">Impactful</span>
          </h2>
          <p className="section-desc">
            Have an open opportunity, project collaboration, or technical inquiry? Send a message directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Info */}
          <div className="glass-card contact-info-card">
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-desc">
              Feel free to reach out through the form or via my social profiles. I typically respond within 24 hours.
            </p>

            <div className="contact-details-list">
              {/* Location */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <div className="contact-item-val">Maharashtra, India</div>
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <a
                    href="mailto:bhorkadeshrikar154@gmail.com"
                    className="contact-item-val"
                  >
                    bhorkadeshrikar154@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <a
                    href="tel:+918308851018"
                    className="contact-item-val"
                  >
                    +91 8308851018
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-label">LinkedIn</div>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item-val"
                  >
                    linkedin.com/in/shrikar-bhorkade
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <GithubIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-label">GitHub</div>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item-val"
                  >
                    github.com/shrikar-bhorkade
                  </a>
                </div>
              </div>

              {/* LeetCode */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <LeetcodeIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-label">LeetCode</div>
                  <a
                    href="https://leetcode.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item-val"
                  >
                    leetcode.com/u/shrikar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card contact-form-card">
            {status.success && (
              <div className="form-alert success" id="contact-success-alert">
                <CheckCircle size={18} />
                <span>Message sent successfully!</span>
              </div>
            )}

            {status.error && (
              <div className="form-alert error" id="contact-error-alert">
                <AlertCircle size={18} />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} id="portfolio-contact-form">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Job Inquiry"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="form-textarea"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="btn btn-primary"
                id="contact-submit-btn"
                style={{ width: '100%' }}
              >
                {status.submitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef } from 'react';
import { submitContactInquiry } from '../services/contactService';
import { sanitizePlainText, checkRateLimit } from '../services/securityService';
import { Link } from '../context/RouterContext';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Game Development',
    projectTitle: '',
    budgetRange: 'Confidential / To Be Determined',
    message: '',
    consent: false,
    security_trap: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Time tracker to detect inhuman automated submission speeds (< 1.2s)
  const formMountedAt = useRef(Date.now());

  const inquiryTypes = [
    'Game Development',
    'Interactive & Real-time Software',
    'AI & Automation Services',
    'Web Development',
    'Video Editing',
    'General Studio Enquiry',
    'Data Privacy & Erasure Request (GDPR / CCPA / DPDP)'
  ];

  const budgetOptions = [
    'Confidential / To Be Determined',
    '₹25,000 — ₹50,000',
    '₹50,000 — ₹150,000',
    '₹150,000 — ₹500,000',
    '₹500,000+'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const cleanName = sanitizePlainText(formData.name, 100);
    const cleanEmail = sanitizePlainText(formData.email, 120);
    const cleanMessage = sanitizePlainText(formData.message, 4000);

    if (!cleanName) {
      newErrors.name = 'Full name is required for transmission.';
    } else if (cleanName.length > 100) {
      newErrors.name = 'Full name cannot exceed 100 characters.';
    }

    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (cleanEmail.length > 120) {
      newErrors.email = 'Email address cannot exceed 120 characters.';
    }

    if (formData.organization && formData.organization.trim().length > 120) {
      newErrors.organization = 'Organization name cannot exceed 120 characters.';
    }

    if (formData.projectTitle && formData.projectTitle.trim().length > 120) {
      newErrors.projectTitle = 'Project title cannot exceed 120 characters.';
    }

    if (!cleanMessage) {
      newErrors.message = 'Please provide details or a project brief.';
    } else if (cleanMessage.length < 15) {
      newErrors.message = 'Inquiry brief must be at least 15 characters long.';
    } else if (cleanMessage.length > 4000) {
      newErrors.message = 'Inquiry brief cannot exceed 4000 characters.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm that you are at least 16 years old and consent to transmission.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      // 1. Client-side hourly rate-limiting (max 5 submissions per hour per browser session)
      const rl = checkRateLimit('contact_submission', 5, 60 * 60 * 1000);
      if (!rl.allowed) {
        throw new Error(`Submission throttled. Excessive transmissions detected; please wait ${rl.retryAfterSeconds} seconds.`);
      }

      // 2. Strict XSS sanitization
      const sanitizedPayload = {
        name: sanitizePlainText(formData.name, 100),
        email: sanitizePlainText(formData.email, 120),
        organization: sanitizePlainText(formData.organization, 120),
        inquiryType: formData.inquiryType,
        projectTitle: sanitizePlainText(formData.projectTitle, 120),
        budgetRange: formData.budgetRange,
        message: sanitizePlainText(formData.message, 4000),
        consent: formData.consent,
        security_trap: formData.security_trap
      };

      const elapsedMs = Date.now() - formMountedAt.current;
      const response = await submitContactInquiry(sanitizedPayload, { elapsedMs });

      setSubmitResult({
        success: true,
        referenceId: response.referenceId,
        emailSent: response.emailSent,
        sandboxMode: response.sandboxMode,
        message: response.message
      });

      // Reset form fields only on successful delivery / logging
      setFormData({
        name: '',
        email: '',
        organization: '',
        inquiryType: 'Game Development',
        projectTitle: '',
        budgetRange: 'Confidential / To Be Determined',
        message: '',
        consent: false,
        security_trap: ''
      });
      formMountedAt.current = Date.now();
    } catch (err) {
      // Preserve entered formData on error so the visitor does not lose their typed brief
      setSubmitResult({
        success: false,
        message: err.message || 'Transmission encountered an error. Please retry.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      {submitResult && (
        <div
          className={`submission-banner ${
            submitResult.success ? 'banner-success' : 'banner-error'
          }`}
          role="alert"
        >
          <div className="banner-icon">{submitResult.success ? '✔' : '⚠'}</div>
          <div>
            <h4 className="banner-title hud-font">
              {submitResult.success
                ? 'TRANSMISSION DISPATCHED'
                : 'TRANSMISSION HALTED'}
            </h4>
            <p className="banner-text">{submitResult.message}</p>
            {submitResult.referenceId && (
              <p className="banner-ref hud-font">
                DISPATCH ID: <span>{submitResult.referenceId}</span>
              </p>
            )}
            {submitResult.success && (
              <p
                className="hud-font"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  marginTop: '6px',
                  color: submitResult.emailSent
                    ? 'var(--emerald-bright)'
                    : 'var(--antique-gold)'
                }}
              >
                {submitResult.emailSent
                  ? 'STATUS: NOTIFICATION DELIVERED TO STUDIO INBOX VIA EMAILJS'
                  : 'STATUS: RECORDED IN INTERNAL DISPATCH RELAY (SANDBOX MODE)'}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="contact-form">
        {/* Anti-Abuse Honeypot Trap - hidden from legitimate human visitors */}
        <div
          style={{
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
          aria-hidden="true"
        >
          <label htmlFor="security_trap">Ignore this security field</label>
          <input
            type="text"
            id="security_trap"
            name="security_trap"
            value={formData.security_trap}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="form-grid">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label hud-font">
              FULL NAME <span className="req-star">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Elena Vance"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="error-text">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="contact-email" className="form-label hud-font">
              TRANSMISSION EMAIL <span className="req-star">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              maxLength={120}
              value={formData.email}
              onChange={handleChange}
              placeholder="vance@agency.net"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="error-text">
                {errors.email}
              </p>
            )}
          </div>

          {/* Company / Organization */}
          <div className="form-group">
            <label htmlFor="contact-org" className="form-label hud-font">
              COMPANY / STUDIO <span className="opt-tag">(OPTIONAL)</span>
            </label>
            <input
              type="text"
              id="contact-org"
              name="organization"
              maxLength={120}
              value={formData.organization}
              onChange={handleChange}
              placeholder="Blackwood Interactive"
              className="form-input"
            />
            {errors.organization && (
              <p id="org-error" className="error-text">
                {errors.organization}
              </p>
            )}
          </div>

          {/* Inquiry Type */}
          <div className="form-group">
            <label htmlFor="contact-inquiry" className="form-label hud-font">
              INQUIRY CLASSIFICATION <span className="req-star">*</span>
            </label>
            <select
              id="contact-inquiry"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="form-select"
            >
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Project Title */}
          <div className="form-group">
            <label htmlFor="contact-title" className="form-label hud-font">
              PROJECT TITLE / CODENAME <span className="opt-tag">(OPTIONAL)</span>
            </label>
            <input
              type="text"
              id="contact-title"
              name="projectTitle"
              maxLength={120}
              value={formData.projectTitle}
              onChange={handleChange}
              placeholder="Project Chimera"
              className="form-input"
            />
            {errors.projectTitle && (
              <p id="title-error" className="error-text">
                {errors.projectTitle}
              </p>
            )}
          </div>

          {/* Budget Scope */}
          <div className="form-group">
            <label htmlFor="contact-budget" className="form-label hud-font">
              BUDGET SCOPE <span className="opt-tag">(OPTIONAL)</span>
            </label>
            <select
              id="contact-budget"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="form-select"
            >
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Notice for Data Privacy & Erasure Requests */}
          {formData.inquiryType === 'Data Privacy & Erasure Request (GDPR / CCPA / DPDP)' && (
            <div
              className="form-group full-width"
              style={{
                background: 'rgba(6, 59, 44, 0.2)',
                border: '1px solid var(--border-emerald)',
                borderLeft: '4px solid var(--emerald-cyan)',
                padding: '1rem 1.25rem',
                borderRadius: '2px',
                marginTop: '0.5rem'
              }}
            >
              <h5 className="hud-font" style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', color: 'var(--emerald-cyan)', margin: '0 0 0.35rem 0' }}>
                DATA SUBJECT ACCESS &amp; ERASURE PROTOCOL
              </h5>
              <p style={{ fontSize: '0.8125rem', color: 'var(--silver)', margin: 0, lineHeight: '1.5' }}>
                Your request will be prioritized and processed by the Studio Data Protection Officer within 30 statutory days. Zero promotional or marketing communications will be generated.
              </p>
            </div>
          )}
        </div>

        {/* Project Description */}
        <div className="form-group full-width">
          <label htmlFor="contact-message" className="form-label hud-font">
            PROJECT BRIEF / TRANSMISSION DETAIL <span className="req-star">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="6"
            maxLength={4000}
            value={formData.message}
            onChange={handleChange}
            placeholder="Outline the scope, creative direction, target milestones, or technical objectives..."
            className={`form-textarea ${errors.message ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'msg-error' : undefined}
          />
          {errors.message && (
            <p id="msg-error" className="error-text">
              {errors.message}
            </p>
          )}
        </div>

        {/* Privacy, Age & NDA acknowledgement */}
        <div className="form-group full-width consent-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="checkbox-custom" />
            <span className="checkbox-text">
              I confirm I am 16 years of age or older, and agree that this transmission will be handled under studio confidentiality protocols, the{' '}
              <Link to="/privacy" style={{ color: 'var(--emerald-cyan)', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
              , and{' '}
              <Link to="/terms" style={{ color: 'var(--emerald-cyan)', textDecoration: 'underline' }}>
                Terms of Service
              </Link>.
            </span>
          </label>
          {errors.consent && (
            <p className="error-text consent-error">{errors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary form-submit-btn"
          >
            {submitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span>DISPATCHING TRANSMISSION...</span>
              </>
            ) : (
              <>
                <span>TRANSMIT INQUIRY</span>
                <span className="btn-arrow">›</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

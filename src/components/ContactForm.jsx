import React, { useState, useRef } from 'react';
import { submitContactInquiry } from '../services/contactService';

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
    'AI & Autonomous Research Collaboration',
    'Technology Licensing & Tools',
    'Business & Publishing Partnership',
    'General Studio Enquiry'
  ];

  const budgetOptions = [
    'Confidential / To Be Determined',
    '$25,000 — $50,000',
    '$50,000 — $150,000',
    '$150,000 — $500,000',
    '$500,000+'
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

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required for transmission.';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Full name cannot exceed 100 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (formData.email.trim().length > 120) {
      newErrors.email = 'Email address cannot exceed 120 characters.';
    }

    if (formData.organization && formData.organization.trim().length > 120) {
      newErrors.organization = 'Organization name cannot exceed 120 characters.';
    }

    if (formData.projectTitle && formData.projectTitle.trim().length > 120) {
      newErrors.projectTitle = 'Project title cannot exceed 120 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details or a project brief.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Inquiry brief must be at least 15 characters long.';
    } else if (formData.message.trim().length > 4000) {
      newErrors.message = 'Inquiry brief cannot exceed 4000 characters.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm that you consent to transmission.';
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
      const elapsedMs = Date.now() - formMountedAt.current;
      const response = await submitContactInquiry(formData, { elapsedMs });

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
      // NOTE: Preserve entered formData on error so the visitor does not lose their typed brief!
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
              className={`form-input ${errors.organization ? 'input-error' : ''}`}
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
              className={`form-input ${errors.projectTitle ? 'input-error' : ''}`}
            />
            {errors.projectTitle && (
              <p id="title-error" className="error-text">
                {errors.projectTitle}
              </p>
            )}
          </div>

          {/* Budget Range */}
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

        {/* Privacy & NDA acknowledgement */}
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
              I acknowledge that this transmission will be handled under standard studio confidentiality and review protocols.
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

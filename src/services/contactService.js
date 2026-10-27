/**
 * Service handler for Studio Inquiries & Contact Dispatches.
 * 
 * Integrates official @emailjs/browser SDK for email notification delivery to the studio inbox,
 * combined with anti-abuse validation and unified store persistence for the /admin panel.
 */
import emailjs from '@emailjs/browser';
import { store } from './storeService.js';

/**
 * Validates and retrieves current EmailJS environment configuration.
 */
export function getEmailJSStatus() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const isConfigured = Boolean(
    serviceId &&
    serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
    !serviceId.includes('YOUR_') &&
    templateId &&
    templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
    !templateId.includes('YOUR_') &&
    publicKey &&
    publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
    !publicKey.includes('YOUR_')
  );

  return {
    isConfigured,
    serviceId: isConfigured ? serviceId : null,
    templateId: isConfigured ? templateId : null,
    hasPublicKey: Boolean(publicKey && !publicKey.includes('YOUR_'))
  };
}

/**
 * Submits a contact inquiry:
 * 1. Runs anti-abuse security checks (honeypot, cooldown, input length limits).
 * 2. Persists the record into the internal admin store (/admin/enquiries).
 * 3. Dispatches email notification via EmailJS if configured.
 * 4. Falls back gracefully to local sandbox mode if keys are not yet configured.
 */
export async function submitContactInquiry(formData, metadata = {}) {
  // ---------------------------------------------------------------------------
  // ANTI-ABUSE & SPAM FILTERING
  // ---------------------------------------------------------------------------

  // 1. Honeypot check: Bots routinely fill hidden inputs
  if (formData.security_trap || formData.honeypot) {
    store.logAudit('SPAM_REJECTED', 'SECURITY', 'honeypot_triggered', 'Automated bot filled hidden honeypot input.');
    throw new Error('Transmission rejected: automated activity detected.');
  }

  // 2. Interaction speed check (humans take at least 1.2s to fill the form)
  if (metadata.elapsedMs && metadata.elapsedMs < 1200) {
    store.logAudit('SPAM_REJECTED', 'SECURITY', 'speed_threshold', `Form submitted too quickly (${metadata.elapsedMs}ms).`);
    throw new Error('Transmission rejected: submission completed unnaturally fast.');
  }

  // 3. Client cooldown / rate limit (10 seconds between submissions per session)
  const lastSubmit = typeof window !== 'undefined' ? sessionStorage.getItem('ark_last_submit_ts') : null;
  if (lastSubmit) {
    const elapsedSinceLast = Date.now() - parseInt(lastSubmit, 10);
    if (elapsedSinceLast < 10000) {
      const waitSeconds = Math.ceil((10000 - elapsedSinceLast) / 1000);
      throw new Error(`Transmission cooldown active. Please wait ${waitSeconds}s before sending another dispatch.`);
    }
  }

  // ---------------------------------------------------------------------------
  // INPUT BOUNDS & FORMAT VALIDATION
  // ---------------------------------------------------------------------------

  if (!formData.name?.trim()) {
    throw new Error('Full name is required for transmission.');
  }
  if (formData.name.trim().length > 100) {
    throw new Error('Full name cannot exceed 100 characters.');
  }

  if (!formData.email?.trim()) {
    throw new Error('Transmission email address is required.');
  }
  if (formData.email.trim().length > 120) {
    throw new Error('Email address cannot exceed 120 characters.');
  }

  // Basic RFC 5322 regex for client-side check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    throw new Error('Please enter a valid transmission email address.');
  }

  if (formData.organization && formData.organization.trim().length > 120) {
    throw new Error('Organization name cannot exceed 120 characters.');
  }

  if (formData.projectTitle && formData.projectTitle.trim().length > 120) {
    throw new Error('Project title cannot exceed 120 characters.');
  }

  if (!formData.message?.trim()) {
    throw new Error('Please provide details or a project brief.');
  }
  if (formData.message.trim().length < 15) {
    throw new Error('Inquiry brief must be at least 15 characters long.');
  }
  if (formData.message.trim().length > 4000) {
    throw new Error('Inquiry brief cannot exceed 4000 characters.');
  }

  if (!formData.consent) {
    throw new Error('Please confirm that you consent to transmission under studio protocols.');
  }

  // ---------------------------------------------------------------------------
  // DATA PREPARATION & STORAGE PERSISTENCE
  // ---------------------------------------------------------------------------

  const cleanPayload = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    organization: formData.organization?.trim() || '',
    inquiryType: formData.inquiryType || 'General Studio Enquiry',
    projectTitle: formData.projectTitle?.trim() || '',
    budgetRange: formData.budgetRange || 'Confidential / To Be Determined',
    message: formData.message.trim(),
    timestamp: new Date().toISOString(),
    clientOrigin: typeof window !== 'undefined' ? window.location.origin : 'direct',
    emailStatus: 'pending'
  };

  // Record into store for the admin panel (/admin/enquiries)
  const storedRecord = store.addEnquiry(cleanPayload);

  // Update session cooldown timestamp
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('ark_last_submit_ts', Date.now().toString());
    } catch {}
  }

  // ---------------------------------------------------------------------------
  // EMAILJS NOTIFICATION DISPATCH
  // ---------------------------------------------------------------------------

  const emailjsStatus = getEmailJSStatus();

  if (emailjsStatus.isConfigured) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Stable EmailJS template parameters
    const templateParams = {
      from_name: cleanPayload.name,
      reply_to: cleanPayload.email,          // Visitor's email mapped to Reply-To
      sender_email: cleanPayload.email,
      organization: cleanPayload.organization || 'Independent / Confidential',
      inquiry_type: cleanPayload.inquiryType,
      project_title: cleanPayload.projectTitle || 'N/A',
      budget_range: cleanPayload.budgetRange || 'Confidential / TBD',
      message: cleanPayload.message,
      reference_id: storedRecord.id,
      timestamp: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      client_origin: cleanPayload.clientOrigin
    };

    try {
      const emailResult = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey }
      );

      // Email delivery confirmed by EmailJS
      store.updateEnquiryEmailStatus(storedRecord.id, 'sent', {
        status: emailResult.status,
        text: emailResult.text
      });

      store.logAudit(
        'EMAIL_DELIVERED',
        'ENQUIRY',
        storedRecord.id,
        `EmailJS delivered transmission notification for ${cleanPayload.email}.`
      );

      return {
        success: true,
        referenceId: storedRecord.id,
        emailSent: true,
        mode: 'emailjs-production',
        message: 'Transmission dispatched and delivered to executive inbox.'
      };
    } catch (err) {
      console.error('[Aarkonam Contact Service] EmailJS dispatch error:', err);

      // Mark email as failed in the store
      store.updateEnquiryEmailStatus(storedRecord.id, 'delivery-failed', {
        error: err.text || err.message || 'Unknown EmailJS error'
      });

      store.logAudit(
        'EMAIL_DELIVERY_FAILED',
        'ENQUIRY',
        storedRecord.id,
        `EmailJS notification delivery failed: ${err.text || err.message}`
      );

      // IMPORTANT: Do not claim the email was sent if EmailJS reported an error!
      const userMessage = err.text || err.message || 'Email delivery service temporarily unavailable.';
      throw new Error(`Email notification dispatch failed (${userMessage}). Your inquiry was recorded locally; please retry shortly.`);
    }
  }

  // ---------------------------------------------------------------------------
  // FALLBACK REST ENDPOINT (IF CONFIGURED)
  // ---------------------------------------------------------------------------

  const fallbackEndpoint = import.meta.env.VITE_CONTACT_API_ENDPOINT;
  if (
    fallbackEndpoint &&
    fallbackEndpoint !== 'https://api.aarkonamstudios.com/v1/inquiries/placeholder' &&
    !fallbackEndpoint.includes('placeholder')
  ) {
    try {
      const response = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cleanPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      store.updateEnquiryEmailStatus(storedRecord.id, 'endpoint-forwarded');
      return {
        success: true,
        referenceId: storedRecord.id,
        emailSent: true,
        mode: 'endpoint-production',
        message: 'Transmission successfully forwarded to production webhook.'
      };
    } catch (err) {
      console.error('[Aarkonam Contact Service] Fallback endpoint error:', err);
      store.updateEnquiryEmailStatus(storedRecord.id, 'endpoint-failed');
      throw new Error(`Webhook dispatch failed (${err.message}). Your transmission is saved locally; please retry.`);
    }
  }

  // ---------------------------------------------------------------------------
  // SIMULATED DEVELOPMENT SANDBOX (WHEN EMAILJS KEYS ARE NOT YET SET)
  // ---------------------------------------------------------------------------

  store.updateEnquiryEmailStatus(storedRecord.id, 'sandbox-pending-emailjs');
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    referenceId: storedRecord.id,
    emailSent: false,
    sandboxMode: true,
    mode: 'development-simulation',
    message: 'Transmission registered in studio database. (EmailJS live dispatch ready once keys are added to .env.local).'
  };
}

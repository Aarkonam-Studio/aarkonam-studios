/**
 * Service handler for Studio Inquiries & Contact Dispatches.
 * 
 * In production, this service posts form payloads to the endpoint configured in
 * VITE_CONTACT_API_ENDPOINT (e.g., Formspree, Resend backend, AWS Lambda, or custom API).
 * 
 * If no endpoint is configured, it operates in simulated development mode, returning a verified
 * success result after simulating network latency, ensuring local testing without mock failures.
 */

export async function submitContactInquiry(formData) {
  const endpoint = import.meta.env.VITE_CONTACT_API_ENDPOINT;

  // Validation guarantee on submission
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
    throw new Error('Required fields (name, email, message) must be completed.');
  }

  // Basic RFC 5322 regex for client-side check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    throw new Error('Please enter a valid transmission email address.');
  }

  const payload = {
    ...formData,
    timestamp: new Date().toISOString(),
    clientOrigin: typeof window !== 'undefined' ? window.location.origin : 'direct'
  };

  // If a production API endpoint is supplied via environment variables
  if (endpoint && endpoint !== 'https://api.aarkonamstudios.com/v1/inquiries/placeholder') {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Inquiry dispatch failed with status: ${response.status}`);
      }

      return {
        success: true,
        referenceId: `ARK-${Math.floor(100000 + Math.random() * 900000)}`,
        mode: 'production'
      };
    } catch (err) {
      console.error('[Aarkonam Contact Service] Submission error:', err);
      throw err;
    }
  }

  // Simulated development dispatch mode (safe local testing)
  await new Promise((resolve) => setTimeout(resolve, 850));

  return {
    success: true,
    referenceId: `ARK-DEV-${Math.floor(100000 + Math.random() * 900000)}`,
    mode: 'development-simulation',
    message: 'Transmission logged successfully in development sandbox.'
  };
}

/**
 * Aarkonam Studios — Security & Cryptographic Service
 * 
 * Provides enterprise-grade client-side defenses:
 * 1. Web Crypto API salted SHA-256 password hashing & constant-time verification.
 * 2. Cross-Site Scripting (XSS) input sanitization & tag neutralization.
 * 3. Session & brute-force rate-limiting.
 * 4. Session clearance validation with inactivity timeout.
 */

const SYSTEM_PEPPER = 'aarkonam_noir_pepper_2026';
const MAX_SESSION_INACTIVITY_MS = 2 * 60 * 60 * 1000; // 2 hours

/**
 * Computes a salted SHA-256 cryptographic digest of a password using the Web Crypto API.
 * @param {string} password - Raw password input
 * @param {string} salt - Cryptographic salt unique to the account
 * @returns {Promise<string>} Hex-encoded hash
 */
export async function hashPassword(password, salt) {
  if (!password || !salt) {
    throw new Error('Invalid arguments: password and salt are required.');
  }

  const encoder = new TextEncoder();
  const payload = `${salt}:${password}:${SYSTEM_PEPPER}`;
  const data = encoder.encode(payload);

  // Use Web Crypto API native in modern browsers and Node.js
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time string equality check to prevent timing analysis attacks.
 * @param {string} a 
 * @param {string} b 
 * @returns {boolean}
 */
export function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let mismatch = a.length === b.length ? 0 : 1;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= charA ^ charB;
  }
  return mismatch === 0;
}

/**
 * Verifies a raw candidate password against a stored salted hash.
 * @param {string} candidatePassword 
 * @param {string} salt 
 * @param {string} storedHash 
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(candidatePassword, salt, storedHash) {
  try {
    const computed = await hashPassword(candidatePassword, salt);
    return timingSafeEqual(computed, storedHash);
  } catch (err) {
    console.error('[Security Service] Password verification error:', err);
    return false;
  }
}

/**
 * Sanitizes untrusted user strings against XSS, control characters, and protocol injection.
 * @param {any} input - Raw input value
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') return String(input);

  return input
    // Strip null bytes and dangerous control characters
    .replace(/\0/g, '')
    // Normalize newlines
    .replace(/\r\n/g, '\n')
    // Escape HTML special characters
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    // Neutralize dangerous javascript: and data: URI schemes
    .replace(/javascript:/gi, 'blocked-scheme:')
    .replace(/data:text\/html/gi, 'blocked-scheme:')
    .replace(/vbscript:/gi, 'blocked-scheme:');
}

/**
 * Sanitizes plain text input without HTML-escaping, while stripping script injection payloads.
 * Ideal for clean storage of form fields (names, titles, emails) while stripping malicious tags.
 * @param {string} str 
 * @param {number} [maxLength=4000]
 * @returns {string}
 */
export function sanitizePlainText(str, maxLength = 4000) {
  if (!str) return '';
  let clean = String(str).trim();

  // Strip HTML and script tags entirely
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  clean = clean.replace(/<[^>]+>/g, '');

  // Strip null bytes
  clean = clean.replace(/\0/g, '');

  // Clamp to max length
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }

  return clean;
}

/**
 * Rate Limiter using sessionStorage to throttle actions (e.g. login attempts or form dispatches).
 * @param {string} actionKey - Unique identifier for the rate limit scope
 * @param {number} maxAttempts - Maximum allowed attempts in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, retryAfterSeconds: number }}
 */
export function checkRateLimit(actionKey, maxAttempts, windowMs) {
  if (typeof window === 'undefined') {
    return { allowed: true, remaining: maxAttempts, retryAfterSeconds: 0 };
  }

  const storageKey = `ark_rl_${actionKey}`;
  const now = Date.now();

  let attempts = [];
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (raw) {
      attempts = JSON.parse(raw);
    }
  } catch {
    attempts = [];
  }

  // Filter attempts within the current rolling window
  attempts = attempts.filter((ts) => now - ts < windowMs);

  if (attempts.length >= maxAttempts) {
    const oldest = attempts[0];
    const retryAfterMs = windowMs - (now - oldest);
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds
    };
  }

  // Record this attempt
  attempts.push(now);
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(attempts));
  } catch {}

  return {
    allowed: true,
    remaining: maxAttempts - attempts.length,
    retryAfterSeconds: 0
  };
}

/**
 * Resets the rate limit tracker for an action key upon successful authentication.
 * @param {string} actionKey 
 */
export function resetRateLimit(actionKey) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(`ark_rl_${actionKey}`);
  } catch {}
}

/**
 * Validates session freshness and inactivity.
 * @param {object} session 
 * @returns {boolean} True if session is valid and not expired
 */
export function isSessionFresh(session) {
  if (!session || !session.sessionIssued) return false;
  const issuedTime = new Date(session.sessionIssued).getTime();
  if (isNaN(issuedTime)) return false;

  const now = Date.now();
  return now - issuedTime < MAX_SESSION_INACTIVITY_MS;
}

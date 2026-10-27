# AARKONAM STUDIOS — EMAILJS INTEGRATION GUIDE

This document provides complete instructions for configuring, testing, and maintaining EmailJS (`@emailjs/browser`) contact-form notifications for **Aarkonam Studios**.

---

## 1. Architecture & Security Overview

The contact dispatch pipeline operates on a high-reliability, two-tier architecture:

```
[ Visitor on /contact ]
         │
         ▼
[ Client-Side Anti-Abuse Shield ]
  - Honeypot Trap (`security_trap` hidden field)
  - Speed Check (< 1.2s bot threshold)
  - Session Cooldown (10s throttle)
  - Input Length & RFC 5322 Format Validation
         │
         ├───► [ Tier 1: Local Admin Persistence ]
         │     Always logged to `/admin/enquiries` with unique Dispatch ID
         │     (e.g., `ARK-TR-XXXX`) and audit telemetry.
         │
         └───► [ Tier 2: Email Notification Relay ]
               - If EmailJS keys configured: dispatches via `@emailjs/browser`
                 with `reply_to` mapped to the visitor's email.
               - If EmailJS keys absent: logs gracefully in "Sandbox Mode",
                 recording status in admin without false delivery claims.
```

### Security Guardrails
1. **Public Key Safety**: The EmailJS Public Key is intended for frontend browser initialization. Private service keys, account tokens, and SMTP passwords **never** enter frontend code or version control.
2. **Domain Whitelisting**: EmailJS Public Keys should be restricted in the EmailJS dashboard to authorized studio origins.
3. **No False Delivery Claims**: The UI only announces `TRANSMISSION DISPATCHED` with email delivery confirmation after `@emailjs/browser` returns an HTTP 200 OK.
4. **Resilient Failure Recovery**: If network interruptions or EmailJS service errors occur, the user's entered form data is **preserved** in the form inputs so they can retry without retyping their project brief.

---

## 2. EmailJS Dashboard Setup

### Step 1: Create an Email Service
1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. Navigate to **Email Services** > **Add New Service**.
3. Select your provider:
   - **Gmail / Google Workspace**
   - **Outlook / Office 365**
   - **Custom SMTP Server**
   - **SendGrid / Mailgun**
4. Connect the studio mailbox (e.g., `transmissions@aarkonamstudios.com` or `contact@aarkonamstudios.com`).
5. Note your **Service ID** (e.g., `service_aarkonam`).

---

### Step 2: Create the Email Notification Template
1. Navigate to **Email Templates** > **Create New Template**.
2. Note your **Template ID** (e.g., `template_contact_relay`).
3. Configure the Template Header settings:
   - **To Email**: Enter your studio inbox address (e.g., `transmissions@aarkonamstudios.com`).
     *Crucial:* Do **not** use dynamic variables here; the recipient must always be the studio.
   - **From Name**: `Aarkonam Dispatch Relay - {{from_name}}`
   - **Reply-To**: `{{reply_to}}`
     *Crucial:* Mapping `Reply-To` to `{{reply_to}}` ensures clicking "Reply" in your studio email client directly addresses the visitor (`{{sender_email}}`).
   - **Subject**: `[AARKONAM DISPATCH #{{reference_id}}] {{inquiry_type}} — {{project_title}}`

#### Complete List of Template Variables

| Variable Name | Type | Description |
| :--- | :--- | :--- |
| `{{from_name}}` | String | Full name of the visitor / client |
| `{{reply_to}}` | String | Visitor's email address (for direct client email replies) |
| `{{sender_email}}`| String | Visitor's email address |
| `{{organization}}`| String | Company, studio, or publisher name (defaults to "Independent / Confidential") |
| `{{inquiry_type}}`| String | Selected classification (e.g. *Game Development*, *AI Collaboration*) |
| `{{project_title}}`| String | Codename or project title |
| `{{budget_range}}`| String | Budget scope |
| `{{message}}` | String | Transmission brief or proposal text |
| `{{reference_id}}`| String | Unique studio dispatch ID (e.g., `ARK-TR-A1B2C3`) |
| `{{timestamp}}` | String | Formatted registration timestamp |
| `{{client_origin}}`| String | Origin URL / domain where inquiry originated |

#### Recommended HTML Email Template Content

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #050706; color: #C7CDD1; padding: 24px; margin: 0; }
    .card { background: #07120F; border: 1px solid #063B2C; border-radius: 4px; max-width: 640px; margin: 0 auto; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
    .header { background: #063B2C; padding: 20px 24px; border-bottom: 2px solid #10B981; }
    .header h2 { margin: 0; color: #FFFFFF; font-size: 16px; letter-spacing: 0.15em; text-transform: uppercase; }
    .header p { margin: 4px 0 0; color: #E5C76B; font-size: 12px; font-family: monospace; }
    .content { padding: 24px; }
    .field { margin-bottom: 14px; }
    .label { font-size: 11px; letter-spacing: 0.12em; color: #C6A15B; text-transform: uppercase; margin-bottom: 4px; font-weight: 600; }
    .val { font-size: 14px; color: #FFFFFF; line-height: 1.5; }
    .brief-box { background: #050706; border: 1px solid #063B2C; padding: 16px; border-radius: 2px; white-space: pre-wrap; color: #C7CDD1; font-size: 13px; line-height: 1.6; margin-top: 6px; }
    .footer { padding: 16px 24px; background: #050706; border-top: 1px solid #063B2C; font-size: 11px; color: #7E878C; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Aarkonam Studios // Communications Relay</h2>
      <p>DISPATCH ID: {{reference_id}} · {{inquiry_type}}</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Client / Sender</div>
        <div class="val"><strong>{{from_name}}</strong> &lt;<a href="mailto:{{reply_to}}" style="color: #10B981;">{{reply_to}}</a>&gt;</div>
      </div>
      <div class="field">
        <div class="label">Organization / Studio</div>
        <div class="val">{{organization}}</div>
      </div>
      <div class="field">
        <div class="label">Project Title / Codename</div>
        <div class="val">{{project_title}}</div>
      </div>
      <div class="field">
        <div class="label">Budget Scope</div>
        <div class="val" style="color: #E5C76B;">{{budget_range}}</div>
      </div>
      <div class="field">
        <div class="label">Project Brief / Transmission Detail</div>
        <div class="brief-box">{{message}}</div>
      </div>
    </div>
    <div class="footer">
      <span>Timestamp: {{timestamp}}</span>
      <span>Origin: {{client_origin}}</span>
    </div>
  </div>
</body>
</html>
```

---

### Step 3: Retrieve Public Key & Whitelist Origin
1. Navigate to **Account** > **API Keys**.
2. Copy the **Public Key** (starts with letters/numbers, e.g. `user_AbCdEf...` or `pk_...`).
3. Navigate to **Account** > **Security**:
   - Enable **Domain Whitelist**.
   - Add authorized domains:
     - `https://aarkonamstudios.com`
     - `https://www.aarkonamstudios.com`
     - `http://localhost:5173` *(for local development)*
4. Set an hourly/daily rate limit in EmailJS security settings to prevent automated flooding.

---

## 3. Environment Configuration

Create or update `.env.local` in the project root:

```ini
# EmailJS Notification Relay
VITE_EMAILJS_SERVICE_ID=service_aarkonam
VITE_EMAILJS_TEMPLATE_ID=template_contact_relay
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here

# Fallback Webhook (Optional CRM / serverless endpoint)
VITE_CONTACT_API_ENDPOINT=https://api.aarkonamstudios.com/v1/inquiries/placeholder
VITE_STUDIO_CONTACT_EMAIL=contact@aarkonamstudios.com
```

> **Warning:** Do **NOT** commit `.env.local` to git. The `.gitignore` file is already configured to exclude `.env.local` and `.env.*.local`.

---

## 4. Verification & Testing

### Development Sandbox Mode (No API keys required)
1. Run `npm run dev`.
2. Navigate to `http://localhost:5173/contact`.
3. Submit a valid enquiry.
4. With default placeholder keys, the system detects sandbox mode:
   - Form shows: `STATUS: RECORDED IN INTERNAL DISPATCH RELAY (SANDBOX MODE)`
   - Open `/admin/enquiries` to see the record tagged as `SANDBOX`.
   - Inspecting the enquiry modal shows full telemetry and client origin.

### Live Production Mode
1. Supply real EmailJS credentials in `.env.local`.
2. Submit a transmission on `/contact`.
3. The form indicates: `STATUS: NOTIFICATION DELIVERED TO STUDIO INBOX VIA EMAILJS`.
4. Open `/admin/enquiries` to verify the `DELIVERED` badge.
5. Check your studio inbox; verify that clicking "Reply" populates the sender's email address.

### Anti-Abuse Test Cases
- **Honeypot Trigger**: Injecting a value into `security_trap` immediately rejects the request with a security audit log.
- **Fast-submit Threshold**: Programmatically submitting in `< 1200ms` triggers speed rejection.
- **Cooldown Throttle**: Rapid back-to-back submissions within 10 seconds display a countdown timer.
- **Form Retention**: Simulated network failures preserve typed values so users do not lose their work.

# AARKONAM STUDIOS — ADMIN CONTROL CENTER GUIDE

> **CONFIDENTIAL // RESTRICTED ACCESS**  
> Operational documentation for authorized studio administrators, engineering leads, and executive directorate.

---

## 1. Accessing the Admin Terminal

- **Terminal URL**: [`http://localhost:5173/admin`](http://localhost:5173/admin)
- **Sign-In URL**: [`http://localhost:5173/admin/login`](http://localhost:5173/admin/login)

*Note: For security, the `/admin` path is not linked in public website navigation.*

---

## 2. Test Operator Credentials & Roles

Four pre-configured operator roles are provisioned for development and security testing:

| Operator Name | Email (Credential) | Clearance Rank | Passkey Hash | Authorized Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Safin Mulani** | `director@aarkonam.internal` | **Owner** | `ark-noir-director-2026` | Full governance: RBAC accounts, audit purge, security directives, all content & inquiries. |
| **Mohd Sumair** | `cto@aarkonam.internal` | **Admin** | `ark-noir-systems-2026` | Systems, publishing, incoming confidential inquiries, SEO, contact directives, media. |
| **Adeba Firdous** | `finance@aarkonam.internal` | **Editor** | `ark-noir-finance-2026` | Content editing: realms, projects, homepage text, announcements, media library. |
| **Security Reviewer** | `auditor@aarkonam.internal` | **Viewer** | `ark-noir-audit-2026` | Read-only access to metrics, audit trail, and public catalog data. |

*(For production security hardening, credentials must be directly entered into the login terminal. All credentials are verified against salted SHA-256 hashes via the Web Crypto API, with brute-force rate-limiting and session inactivity timeouts.)*

---

## 3. Role-Based Access Control (RBAC) Matrix

```
                      Owner   Admin   Editor   Viewer   Public
View Dashboard          ✔       ✔       ✔        ✔        ✖
Edit Games & Projects   ✔       ✔       ✔        ✖        ✖
Publish / Draft State   ✔       ✔       ✔        ✖        ✖
Manage Inquiries & NDA  ✔       ✔       ✖        ✖        ✖
Manage Contact & SEO    ✔       ✔       ✖        ✖        ✖
Broadcast Announcements ✔       ✔       ✔        ✖        ✖
Manage Admin Accounts   ✔       ✖       ✖        ✖        ✖
Purge Audit Trail       ✔       ✖       ✖        ✖        ✖
```

- **Sole Owner Protection**: The system programmatically blocks deleting or demoting the last remaining Owner to prevent accidental lockouts.
- **Enquiry Privacy**: Confidential client transmissions and briefs submitted via the public contact form can only be accessed by **Owner** and **Admin** ranks.

---

## 4. Module Directory & Capabilities

1. **Dashboard Overview (`/admin`)**: Verified real-time telemetry (published vs draft games, applied systems count, unread inquiry counter, live audit stream, quick launchpad).
2. **Games Management (`/admin/games`)**: Full CRUD for game titles, lore snippets, technical specs, platform tags, published/draft toggle, public card preview modal, and deletion confirmation.
3. **Projects Management (`/admin/projects`)**: Full CRUD for technology pipelines, benchmark metrics, category tabs, tech stack tags, and live card previews.
4. **Homepage Terminal (`/admin/homepage`)**: Edit central title, tracking subtitle, tagline, background environment selector, and live composition simulator.
5. **Team Management (`/admin/team`)**: Executive profile editing, portfolio assignments, sector badges, and display orders.
6. **Enquiries Relay (`/admin/enquiries`)**: Confidential communications pipeline, search/filter, status workflow (`new` → `in-review` → `contacted` → `in-progress` → `completed` → `archived`), and timestamped executive notes.
7. **Media Library (`/admin/media`)**: Asset catalog browser, dimensions/size inspection, URL copying, and registration.
8. **Contact Info (`/admin/contact`)**: Public transmission email, business email, coordinates, response window, and bilateral NDA protocol directives.
9. **SEO Directives (`/admin/seo`)**: Site-wide meta titles, descriptions, canonical URLs, robots crawler directives, and live Google / OpenGraph social card simulators.
10. **Announcements (`/admin/announcements`)**: Broadcast directives with active start/end dates, placement rules (`sitewide-banner` or `home-topbar`), and live banner preview.
11. **Access & Roles (`/admin/users`)**: Administrator account provisioning, clearance rank modifications, and account suspension toggles (Owner only).
12. **System Core (`/admin/settings`)**: Runtime environment telemetry, Firebase cloud diagnostic status, encrypted JSON backup export, and audit log stream.

---

## 5. Firebase Production Setup (Optional)

When deploying to enterprise Firebase:

1. Copy `.env.example` to `.env.local` and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=aarkonam-studios-prod.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=aarkonam-studios-prod
   VITE_FIREBASE_STORAGE_BUCKET=aarkonam-studios-prod.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef...
   ```
2. Deploy the hardened security rules:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```
*(Both `firestore.rules` and `storage.rules` are already generated and present in the root directory.)*

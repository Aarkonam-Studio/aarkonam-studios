import { gamesData } from '../data/games';
import { projectsData } from '../data/projects';
import { teamMembers } from '../data/team';

const STORAGE_KEY_PREFIX = 'ark_cms_';

function getStored(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`[Aarkonam Store] Read error for ${key}:`, err);
    return fallback;
  }
}

function setStored(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value));
    notifySubscribers();
  } catch (err) {
    console.error(`[Aarkonam Store] Write error for ${key}:`, err);
  }
}

// Event subscribers for real-time reactivity across components
const subscribers = new Set();
export function subscribeToStore(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}
function notifySubscribers() {
  subscribers.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error('[Aarkonam Store] Subscriber notification error:', e);
    }
  });
}

// -----------------------------------------------------------------------------
// INITIAL SEED DATA BUILDERS
// -----------------------------------------------------------------------------

const initialGames = gamesData.map((g, idx) => ({
  ...g,
  slug: g.id,
  shortDescription: g.tagline,
  heroImage: g.image,
  coverImage: g.image,
  published: true,
  featured: idx === 0,
  sortOrder: idx + 1,
  seoTitle: `${g.title} | Official Aarkonam Realm`,
  seoDescription: g.description.slice(0, 155),
  createdAt: '2026-03-01T10:00:00.000Z',
  updatedAt: new Date().toISOString()
}));

const initialProjects = projectsData.map((p, idx) => ({
  ...p,
  slug: p.id,
  shortDescription: p.scope,
  coverImage: p.image,
  heroImage: p.image,
  published: true,
  featured: idx === 0,
  sortOrder: idx + 1,
  technologies: p.techStack,
  seoTitle: `${p.title} | Aarkonam Systems`,
  seoDescription: p.description.slice(0, 155),
  createdAt: '2026-03-01T10:00:00.000Z',
  updatedAt: new Date().toISOString()
}));

const initialTeam = teamMembers.map((m, idx) => ({
  ...m,
  shortBio: m.division,
  biography: m.focus,
  portrait: '/icons/aarkonam-emblem.png',
  published: true,
  sortOrder: idx + 1,
  socialLinks: [],
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: new Date().toISOString()
}));

const initialMedia = [
  {
    id: 'm-wordmark',
    name: 'aarkonam-wordmark.png',
    path: '/images/aarkonam-wordmark.png',
    type: 'image/png',
    category: 'Branding',
    size: '712 KB',
    dimensions: '1672 × 380',
    alt: 'Aarkonam Studios Official Wordmark'
  },
  {
    id: 'm-emblem',
    name: 'aarkonam-emblem.png',
    path: '/icons/aarkonam-emblem.png',
    type: 'image/png',
    category: 'Branding',
    size: '322 KB',
    dimensions: '512 × 512',
    alt: 'Aarkonam Geometric Studio Insignia'
  },
  {
    id: 'm-home-bg',
    name: 'home-background.png',
    path: '/images/home-background.png',
    type: 'image/png',
    category: 'Environments',
    size: '3.2 MB',
    dimensions: '1672 × 941',
    alt: 'Neo-Aarkonam Metropolis Skyline'
  },
  {
    id: 'm-grand-archive',
    name: 'studio-grand-archive.png',
    path: '/images/studio-grand-archive.png',
    type: 'image/png',
    category: 'Environments',
    size: '806 KB',
    dimensions: '768 × 432',
    alt: 'The Grand Emerald Archives'
  },
  {
    id: 'm-flagship',
    name: 'game-emerald-flagship.jpg',
    path: '/images/game-emerald-flagship.jpg',
    type: 'image/jpeg',
    category: 'Realms',
    size: '390 KB',
    dimensions: '1024 × 512',
    alt: 'The Emerald Galleon Dreadnought'
  },
  {
    id: 'm-citadel',
    name: 'game-gothic-citadel.jpg',
    path: '/images/game-gothic-citadel.jpg',
    type: 'image/jpeg',
    category: 'Realms',
    size: '366 KB',
    dimensions: '1024 × 574',
    alt: 'Sanctum of the Void Dark Citadel'
  },
  {
    id: 'm-metropolis',
    name: 'game-coastal-metropolis.jpg',
    path: '/images/game-coastal-metropolis.jpg',
    type: 'image/jpeg',
    category: 'Realms',
    size: '355 KB',
    dimensions: '1024 × 576',
    alt: 'Aetheria Coastal Sunset Metropolis'
  },
  {
    id: 'm-dusk',
    name: 'game-neo-aarkonam-dusk.jpg',
    path: '/images/game-neo-aarkonam-dusk.jpg',
    type: 'image/jpeg',
    category: 'Systems',
    size: '469 KB',
    dimensions: '1024 × 576',
    alt: 'World Engine Urban Traffic Simulation'
  }
];

const initialHomepage = {
  heroEyebrow: 'INDEPENDENT CREATIVE STUDIO',
  heroTitle: 'AARKONAM',
  heroSubtitle: 'S T U D I O S',
  heroTagline: 'BUILDING WORLDS BEYOND THE SCREEN',
  heroSubnote: 'GAMES · SOFTWARE · EXPERIMENTAL TECHNOLOGY',
  backgroundImage: '/images/home-background.png',
  featuredGameId: 'leviathan-emerald-odyssey',
  featuredProjectId: 'aarkonam-world-engine',
  radarStatus: 'ONLINE',
  radarCoordinates: '18.5204° N  73.8567° E'
};

const initialContact = {
  publicEmail: 'contact@aarkonamstudios.placeholder',
  businessEmail: 'executive@aarkonamstudios.placeholder',
  headquarters: 'Pune, Maharashtra, India',
  coordinates: '18.5204° N, 73.8567° E',
  responseWindow: '24 — 48 Business Hours',
  encryptionStatus: 'TLS 1.3 / AES-256 Protocol',
  inquiryNotice: 'All mutual proprietary concepts are treated under bilateral NDA standards upon request.'
};

const initialSEO = {
  siteTitle: 'Aarkonam Studios | Building Worlds Beyond the Screen',
  siteDescription: 'Independent game development, interactive simulation, and next-generation creative technology studio based in India.',
  canonicalDomain: 'https://aarkonamstudios.com',
  ogImage: '/images/home-background.png',
  robots: 'index, follow',
  twitterHandle: '@aarkonam_dev'
};

const initialAnnouncements = [
  {
    id: 'ann-1',
    title: 'STUDIO DIRECTIVE // PRODUCTION INITIALIZATION',
    message: 'Leviathan: Emerald Odyssey has commenced core mechanical integration on next-gen platforms.',
    type: 'intel',
    placement: 'sitewide-banner',
    published: true,
    startsAt: '2026-10-01',
    endsAt: '2026-12-31',
    createdAt: '2026-10-01T08:00:00.000Z'
  }
];

const initialUsers = [
  {
    id: 'usr-1',
    name: 'Safin Mulani',
    email: 'director@aarkonam.internal',
    role: 'owner',
    title: 'Chief Executive Officer',
    active: true,
    lastLogin: '2026-10-22T14:15:00.000Z'
  },
  {
    id: 'usr-2',
    name: 'Mohd Sumair',
    email: 'cto@aarkonam.internal',
    role: 'admin',
    title: 'Chief Technology Officer',
    active: true,
    lastLogin: '2026-10-21T18:30:00.000Z'
  },
  {
    id: 'usr-3',
    name: 'Adeba Firdous',
    email: 'finance@aarkonam.internal',
    role: 'editor',
    title: 'Chief Financial Officer',
    active: true,
    lastLogin: '2026-10-20T11:45:00.000Z'
  },
  {
    id: 'usr-4',
    name: 'Compliance Auditor',
    email: 'auditor@aarkonam.internal',
    role: 'viewer',
    title: 'Security Reviewer',
    active: true,
    lastLogin: '2026-10-18T09:20:00.000Z'
  }
];

const initialEnquiries = [
  {
    id: 'ARK-2026-9041',
    name: 'Marcus Sterling',
    email: 'm.sterling@celestial-games.io',
    organization: 'Celestial Interactive Group',
    inquiryType: 'Business & Publishing Partnership',
    projectTitle: 'Leviathan Co-Publishing & Distribution',
    budgetRange: '$500,000+',
    message: 'Requesting an executive briefing regarding co-development and multi-platform distribution rights for Leviathan: Emerald Odyssey across European and North American territories.',
    status: 'in-review',
    notes: ['Initial review approved by CEO office. NDA requested.', 'Forwarded to Adeba Firdous for financial structure evaluation.'],
    timestamp: '2026-10-21T15:32:00.000Z',
    clientOrigin: 'https://aarkonamstudios.com/contact'
  },
  {
    id: 'ARK-2026-8812',
    name: 'Dr. Aris Thorne',
    email: 'thorne@neural-dynamics.tech',
    organization: 'Neural Dynamics Labs',
    inquiryType: 'AI & Autonomous Research Collaboration',
    projectTitle: 'Sentinel Behavioral Heuristics Evaluation',
    budgetRange: '$150,000 — $500,000',
    message: 'We are seeking licensing terms for the Sentinel memory retention framework to evaluate in autonomous tactical NPC simulation environments.',
    status: 'new',
    notes: ['Automated validation passed.'],
    timestamp: '2026-10-22T08:14:00.000Z',
    clientOrigin: 'https://aarkonamstudios.com/contact'
  }
];

const initialAuditLogs = [
  {
    id: 'log-1',
    timestamp: '2026-10-22T14:15:20.000Z',
    actorName: 'Safin Mulani (Owner)',
    action: 'ADMIN_SIGN_IN',
    entityType: 'AUTH',
    entityId: 'director@aarkonam.internal',
    details: 'Authenticated successfully through terminal access clearance.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-22T14:22:10.000Z',
    actorName: 'Safin Mulani (Owner)',
    action: 'SYSTEM_SETTINGS_UPDATE',
    entityType: 'SETTINGS',
    entityId: 'system_core',
    details: 'Verified Emerald Noir telemetry status and node routes.'
  }
];

// -----------------------------------------------------------------------------
// STORE ACCESSORS & MUTATORS
// -----------------------------------------------------------------------------

export const store = {
  // Games
  getGames() {
    return getStored('games', initialGames);
  },
  getPublishedGames() {
    return this.getGames().filter((g) => g.published !== false);
  },
  saveGame(game) {
    const games = this.getGames();
    const index = games.findIndex((g) => g.id === game.id);
    const updated = {
      ...game,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      games[index] = updated;
    } else {
      updated.createdAt = new Date().toISOString();
      games.unshift(updated);
    }
    setStored('games', games);
    return updated;
  },
  deleteGame(id) {
    const games = this.getGames().filter((g) => g.id !== id);
    setStored('games', games);
  },

  // Projects
  getProjects() {
    return getStored('projects', initialProjects);
  },
  getPublishedProjects() {
    return this.getProjects().filter((p) => p.published !== false);
  },
  saveProject(project) {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    const updated = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      projects[index] = updated;
    } else {
      updated.createdAt = new Date().toISOString();
      projects.unshift(updated);
    }
    setStored('projects', projects);
    return updated;
  },
  deleteProject(id) {
    const projects = this.getProjects().filter((p) => p.id !== id);
    setStored('projects', projects);
  },

  // Team
  getTeam() {
    return getStored('team', initialTeam);
  },
  getPublishedTeam() {
    return this.getTeam().filter((t) => t.published !== false);
  },
  saveTeamMember(member) {
    const team = this.getTeam();
    const index = team.findIndex((t) => t.id === member.id);
    const updated = {
      ...member,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      team[index] = updated;
    } else {
      updated.createdAt = new Date().toISOString();
      team.push(updated);
    }
    setStored('team', team);
    return updated;
  },
  deleteTeamMember(id) {
    const team = this.getTeam().filter((t) => t.id !== id);
    setStored('team', team);
  },

  // Enquiries
  getEnquiries() {
    return getStored('enquiries', initialEnquiries);
  },
  addEnquiry(enquiry) {
    const enquiries = this.getEnquiries();
    const newRecord = {
      id: `ARK-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      status: 'new',
      notes: [],
      ...enquiry
    };
    enquiries.unshift(newRecord);
    setStored('enquiries', enquiries);
    this.logAudit('ENQUIRY_RECEIVED', 'ENQUIRY', newRecord.id, `Inquiry from ${newRecord.name} (${newRecord.email})`);
    return newRecord;
  },
  updateEnquiryEmailStatus(id, emailStatus, emailMetadata = null) {
    const enquiries = this.getEnquiries();
    const target = enquiries.find((e) => e.id === id);
    if (!target) return null;
    target.emailStatus = emailStatus;
    if (emailMetadata) {
      target.emailMetadata = emailMetadata;
    }
    target.updatedAt = new Date().toISOString();
    setStored('enquiries', enquiries);
    return target;
  },
  updateEnquiryStatus(id, status, newNote) {
    const enquiries = this.getEnquiries();
    const target = enquiries.find((e) => e.id === id);
    if (!target) return null;
    target.status = status;
    target.updatedAt = new Date().toISOString();
    if (newNote && newNote.trim()) {
      target.notes = target.notes || [];
      target.notes.unshift(`[${new Date().toLocaleDateString()}] ${newNote.trim()}`);
    }
    setStored('enquiries', enquiries);
    this.logAudit('ENQUIRY_STATUS_CHANGE', 'ENQUIRY', id, `Status updated to ${status}`);
    return target;
  },
  deleteEnquiry(id) {
    const enquiries = this.getEnquiries().filter((e) => e.id !== id);
    setStored('enquiries', enquiries);
    this.logAudit('ENQUIRY_DELETED', 'ENQUIRY', id, 'Inquiry record permanently purged.');
  },

  // Media Library
  getMedia() {
    return getStored('media', initialMedia);
  },
  addMedia(item) {
    const media = this.getMedia();
    const newMedia = {
      id: `m-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...item
    };
    media.unshift(newMedia);
    setStored('media', media);
    this.logAudit('MEDIA_UPLOAD', 'MEDIA', newMedia.name, `New asset registered: ${newMedia.name}`);
    return newMedia;
  },
  deleteMedia(id) {
    const media = this.getMedia().filter((m) => m.id !== id);
    setStored('media', media);
    this.logAudit('MEDIA_DELETE', 'MEDIA', id, 'Media asset record deleted.');
  },

  // Homepage Settings
  getHomepage() {
    return getStored('homepage', initialHomepage);
  },
  saveHomepage(data) {
    const current = this.getHomepage();
    const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
    setStored('homepage', updated);
    this.logAudit('HOMEPAGE_UPDATE', 'HOMEPAGE', 'root', 'Homepage terminal content modified.');
    return updated;
  },

  // Public Contact Details
  getContact() {
    return getStored('contact', initialContact);
  },
  saveContact(data) {
    const current = this.getContact();
    const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
    setStored('contact', updated);
    this.logAudit('CONTACT_INFO_UPDATE', 'CONTACT', 'directives', 'Public contact details updated.');
    return updated;
  },

  // SEO
  getSEO() {
    return getStored('seo', initialSEO);
  },
  saveSEO(data) {
    const current = this.getSEO();
    const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
    setStored('seo', updated);
    this.logAudit('SEO_UPDATE', 'SEO', 'metadata', 'Site-wide SEO & meta directives updated.');
    return updated;
  },

  // Announcements
  getAnnouncements() {
    return getStored('announcements', initialAnnouncements);
  },
  getActiveAnnouncement() {
    const all = this.getAnnouncements();
    return all.find((a) => a.published !== false);
  },
  saveAnnouncement(ann) {
    const list = this.getAnnouncements();
    const index = list.findIndex((a) => a.id === ann.id);
    const updated = {
      ...ann,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      list[index] = updated;
    } else {
      updated.id = `ann-${Date.now()}`;
      updated.createdAt = new Date().toISOString();
      list.unshift(updated);
    }
    setStored('announcements', list);
    this.logAudit('ANNOUNCEMENT_SAVE', 'ANNOUNCEMENT', updated.id, `Saved announcement: ${updated.title}`);
    return updated;
  },
  deleteAnnouncement(id) {
    const list = this.getAnnouncements().filter((a) => a.id !== id);
    setStored('announcements', list);
    this.logAudit('ANNOUNCEMENT_DELETE', 'ANNOUNCEMENT', id, 'Announcement record removed.');
  },

  // Users & Roles
  getUsers() {
    return getStored('users', initialUsers);
  },
  saveUser(user) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === user.id || u.email === user.email);
    const updated = {
      ...user,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      // Prevent demoting the last owner
      const current = users[index];
      if (current.role === 'owner' && updated.role !== 'owner') {
        const ownerCount = users.filter((u) => u.role === 'owner').length;
        if (ownerCount <= 1) {
          throw new Error('Action aborted: cannot demote the sole remaining Owner.');
        }
      }
      users[index] = updated;
    } else {
      updated.id = `usr-${Date.now()}`;
      updated.createdAt = new Date().toISOString();
      users.push(updated);
    }
    setStored('users', users);
    this.logAudit('USER_UPDATE', 'USER', updated.email, `User profile/role updated to ${updated.role}`);
    return updated;
  },
  deleteUser(id) {
    const users = this.getUsers();
    const target = users.find((u) => u.id === id);
    if (!target) return;
    if (target.role === 'owner') {
      const ownerCount = users.filter((u) => u.role === 'owner').length;
      if (ownerCount <= 1) {
        throw new Error('Action aborted: cannot delete the sole remaining Owner.');
      }
    }
    const filtered = users.filter((u) => u.id !== id);
    setStored('users', filtered);
    this.logAudit('USER_DELETE', 'USER', id, `User account ${target.email} purged.`);
  },

  // Audit Logs
  getAuditLogs() {
    return getStored('auditLogs', initialAuditLogs);
  },
  logAudit(action, entityType, entityId, details, actorName = 'Admin Directorate') {
    const logs = this.getAuditLogs();
    const logEntry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actorName,
      action,
      entityType,
      entityId: String(entityId),
      details
    };
    logs.unshift(logEntry);
    if (logs.length > 250) logs.length = 250; // Cap log length
    setStored('auditLogs', logs);
    return logEntry;
  },
  clearAuditLogs() {
    setStored('auditLogs', []);
  }
};

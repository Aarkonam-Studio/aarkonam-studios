import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import CookieConsent from './components/CookieConsent';

// Public Pages
import Home from './pages/Home';
import Studio from './pages/Studio';
import Games from './pages/Games';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Legal & Compliance Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import RefundPolicy from './pages/RefundPolicy';

// Admin Pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminGames from './admin/pages/AdminGames';
import AdminProjects from './admin/pages/AdminProjects';
import AdminHomepage from './admin/pages/AdminHomepage';
import AdminTeam from './admin/pages/AdminTeam';
import AdminEnquiries from './admin/pages/AdminEnquiries';
import AdminMedia from './admin/pages/AdminMedia';
import AdminContact from './admin/pages/AdminContact';
import AdminSEO from './admin/pages/AdminSEO';
import AdminAnnouncements from './admin/pages/AdminAnnouncements';
import AdminUsers from './admin/pages/AdminUsers';
import AdminSettings from './admin/pages/AdminSettings';

// Public & Security Styles
import './styles/design-tokens.css';
import './styles/global.css';
import './styles/navigation.css';
import './styles/footer.css';
import './styles/components.css';
import './styles/studio.css';
import './styles/games.css';
import './styles/projects.css';
import './styles/team.css';
import './styles/contact.css';
import './styles/legal.css';
import './styles/cookie-consent.css';

function AppRoutes() {
  const { currentPath } = useRouter();

  // Normalize path by stripping trailing slash (except for root '/')
  const normalizedPath =
    currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

  const lowerPath = normalizedPath.toLowerCase();

  switch (lowerPath) {
    // Public Routes
    case '':
    case '/':
      return <Home />;
    case '/studio':
      return <Studio />;
    case '/games':
      return <Games />;
    case '/projects':
      return <Projects />;
    case '/team':
      return <Team />;
    case '/contact':
      return <Contact />;

    // Legal & Compliance Routes
    case '/privacy':
      return <PrivacyPolicy />;
    case '/terms':
      return <TermsOfService />;
    case '/cookies':
      return <CookiePolicy />;
    case '/refund':
      return <RefundPolicy />;

    // Admin Routes (Guarded by cryptographic auth & RBAC permissions)
    case '/admin/login':
      return <AdminLogin />;
    case '/admin':
      return (
        <AdminProtectedRoute requiredPermission="view_dashboard" moduleName="DASHBOARD">
          <AdminDashboard />
        </AdminProtectedRoute>
      );
    case '/admin/games':
      return (
        <AdminProtectedRoute requiredPermission="view_content" moduleName="GAMES MANAGEMENT">
          <AdminGames />
        </AdminProtectedRoute>
      );
    case '/admin/projects':
      return (
        <AdminProtectedRoute requiredPermission="view_content" moduleName="PROJECTS MANAGEMENT">
          <AdminProjects />
        </AdminProtectedRoute>
      );
    case '/admin/homepage':
      return (
        <AdminProtectedRoute requiredPermission="view_content" moduleName="HOMEPAGE TERMINAL">
          <AdminHomepage />
        </AdminProtectedRoute>
      );
    case '/admin/team':
      return (
        <AdminProtectedRoute requiredPermission="view_content" moduleName="TEAM MANAGEMENT">
          <AdminTeam />
        </AdminProtectedRoute>
      );
    case '/admin/enquiries':
      return (
        <AdminProtectedRoute requiredPermission="manage_enquiries" moduleName="TRANSMISSIONS & ENQUIRIES">
          <AdminEnquiries />
        </AdminProtectedRoute>
      );
    case '/admin/media':
      return (
        <AdminProtectedRoute requiredPermission="view_content" moduleName="MEDIA LIBRARY">
          <AdminMedia />
        </AdminProtectedRoute>
      );
    case '/admin/contact':
      return (
        <AdminProtectedRoute requiredPermission="manage_contact" moduleName="CONTACT DIRECTIVES">
          <AdminContact />
        </AdminProtectedRoute>
      );
    case '/admin/seo':
      return (
        <AdminProtectedRoute requiredPermission="manage_seo" moduleName="SEO DIRECTIVES">
          <AdminSEO />
        </AdminProtectedRoute>
      );
    case '/admin/announcements':
      return (
        <AdminProtectedRoute requiredPermission="manage_announcements" moduleName="ANNOUNCEMENT RELAY">
          <AdminAnnouncements />
        </AdminProtectedRoute>
      );
    case '/admin/users':
      return (
        <AdminProtectedRoute requiredPermission="manage_users" moduleName="OPERATOR ACCESS & ROLES">
          <AdminUsers />
        </AdminProtectedRoute>
      );
    case '/admin/settings':
      return (
        <AdminProtectedRoute requiredPermission="view_dashboard" moduleName="SYSTEM CORE">
          <AdminSettings />
        </AdminProtectedRoute>
      );

    // Catch-all 404
    default:
      return <NotFound />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <AdminAuthProvider>
        {/* Accessibility Skip-to-Content Link */}
        <a href="#main-content" className="skip-to-content-link">
          Skip to main content
        </a>
        <AppRoutes />
        <CookieConsent />
      </AdminAuthProvider>
    </RouterProvider>
  );
}

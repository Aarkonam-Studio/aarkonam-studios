import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';

// Public Pages
import Home from './pages/Home';
import Studio from './pages/Studio';
import Games from './pages/Games';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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

// Public Styles
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

    // Admin Routes
    case '/admin/login':
      return <AdminLogin />;
    case '/admin':
      return <AdminDashboard />;
    case '/admin/games':
      return <AdminGames />;
    case '/admin/projects':
      return <AdminProjects />;
    case '/admin/homepage':
      return <AdminHomepage />;
    case '/admin/team':
      return <AdminTeam />;
    case '/admin/enquiries':
      return <AdminEnquiries />;
    case '/admin/media':
      return <AdminMedia />;
    case '/admin/contact':
      return <AdminContact />;
    case '/admin/seo':
      return <AdminSEO />;
    case '/admin/announcements':
      return <AdminAnnouncements />;
    case '/admin/users':
      return <AdminUsers />;
    case '/admin/settings':
      return <AdminSettings />;

    // Catch-all 404
    default:
      return <NotFound />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </RouterProvider>
  );
}

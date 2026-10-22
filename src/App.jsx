import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';

// Pages
import Home from './pages/Home';
import Studio from './pages/Studio';
import Games from './pages/Games';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Styles
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
  const normalizedPath = currentPath.length > 1 && currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;

  switch (normalizedPath.toLowerCase()) {
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
    default:
      return <NotFound />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}

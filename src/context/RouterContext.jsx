import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Handle browser back and forward actions
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return;
    
    // Normalize target path
    const target = to.startsWith('/') ? to : `/${to}`;
    
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
      setCurrentPath(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({ to, children, className = '', activeClassName = '', onClick, ...props }) {
  const { currentPath, navigate } = useRouter();
  const normalizedTarget = to.startsWith('/') ? to : `/${to}`;
  const isActive = currentPath === normalizedTarget;
  const combinedClass = `${className} ${isActive ? activeClassName : ''}`.trim();

  const handleClick = (e) => {
    if (onClick) onClick(e);

    // Allow standard behavior for special key clicks (Ctrl/Cmd + click opens new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    navigate(normalizedTarget);
  };

  return (
    <a
      href={normalizedTarget}
      className={combinedClass}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

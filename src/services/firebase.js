/**
 * Firebase Client Integration Bridge for Aarkonam Studios
 * 
 * Configured dynamically via VITE_FIREBASE_* environment variables.
 * If external Firebase environment variables are not supplied, the application
 * gracefully leverages the local encrypted administrative store, preventing crashes.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY_HERE' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'aarkonam-studios-prod'
);

export const firebaseDiagnostics = {
  configured: isFirebaseConfigured,
  projectId: isFirebaseConfigured ? firebaseConfig.projectId : 'LOCAL_SANDBOX_ACTIVE',
  authDomain: isFirebaseConfigured ? firebaseConfig.authDomain : 'offline.local',
  storageBucket: isFirebaseConfigured ? firebaseConfig.storageBucket : 'local-media-library'
};

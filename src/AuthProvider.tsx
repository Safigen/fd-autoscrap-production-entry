import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import App from './App';
import { PasswordScreen } from './PasswordScreen';
import { EmailScreen } from './EmailScreen';

const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3001' : '');

posthog.init('phc_QIgbD8nFuxMwPrURQbXJxKqI1uEwrmWrnorrr5v1oto', {
  api_host: 'https://us.i.posthog.com',
  loaded: (ph) => {
    const email = localStorage.getItem('user_email');
    if (email) {
      ph.identify(email);
    }
  },
});

export function AuthProvider() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasEmail, setHasEmail] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const email = localStorage.getItem('user_email');

    if (email) setHasEmail(true);

    if (!token) {
      setChecking(false);
      return;
    }

    fetch(`${API_URL}/api/check`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) setAuthenticated(true);
        else localStorage.removeItem('auth_token');
      })
      .catch(() => localStorage.removeItem('auth_token'))
      .finally(() => setChecking(false));
  }, []);

  if (checking) return null;

  if (!authenticated) {
    return (
      <PasswordScreen
        onVerified={() => setAuthenticated(true)}
      />
    );
  }

  if (!hasEmail) {
    return (
      <EmailScreen
        onSubmit={(email) => {
          posthog.identify(email);
          setHasEmail(true);
        }}
      />
    );
  }

  return <App />;
}

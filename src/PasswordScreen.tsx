import { useState } from 'react';
import { Button } from '@guidewheel/ui/button';
import { Input } from '@guidewheel/ui/input';
import { FlexColumn } from '@guidewheel/ui/layout';
import { Field, FieldLabel, FieldError } from '@guidewheel/ui/field';
import { GuidewheelLogo } from '@guidewheel/ui/assets';

const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3001' : '');

interface PasswordScreenProps {
  onVerified: (token: string) => void;
}

export function PasswordScreen({ onVerified }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("That password doesn't look right. Please try again.");
        setLoading(false);
        return;
      }

      const { token } = await res.json();
      localStorage.setItem('auth_token', token);
      onVerified(token);
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm px-6">
        <FlexColumn spacing={6} className="items-center">
          <GuidewheelLogo className="w-48" />
          <Field className="w-full">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter site password"
              autoFocus
            />
            {error && <FieldError>{error}</FieldError>}
          </Field>
          <Button color="primary" type="submit" className="w-full" loading={loading}>
            Continue
          </Button>
        </FlexColumn>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@guidewheel/ui/button';
import { Input } from '@guidewheel/ui/input';
import { FlexColumn } from '@guidewheel/ui/layout';
import { Field, FieldLabel, FieldError } from '@guidewheel/ui/field';
import { GuidewheelLogo } from '@guidewheel/ui/assets';

interface EmailScreenProps {
  onSubmit: (email: string) => void;
}

export function EmailScreen({ onSubmit }: EmailScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    localStorage.setItem('user_email', trimmed);
    onSubmit(trimmed);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm px-6">
        <FlexColumn spacing={6} className="items-center">
          <GuidewheelLogo className="w-48" />
          <p className="text-muted-foreground text-center">
            What's your email address?
          </p>
          <Field className="w-full">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoFocus
            />
            {error && <FieldError>{error}</FieldError>}
          </Field>
          <Button color="primary" type="submit" className="w-full">
            Continue
          </Button>
        </FlexColumn>
      </form>
    </div>
  );
}

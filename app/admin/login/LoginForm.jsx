'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/admin';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setPending(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Login failed.');
        setPending(false);
        return;
      }
      router.replace(nextPath.startsWith('/admin') ? nextPath : '/admin');
      router.refresh();
    } catch {
      setError('Could not reach the server.');
      setPending(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={onSubmit} noValidate>
      <div className="admin-field">
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-describedby={error ? 'admin-login-error' : undefined}
          aria-invalid={error ? 'true' : undefined}
        />
      </div>
      {error ? (
        <p id="admin-login-error" className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="cta-btn" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

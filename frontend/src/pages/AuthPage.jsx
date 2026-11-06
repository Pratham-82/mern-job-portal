import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

export default function AuthPage({ mode }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'applicant' });
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(form);
      } else {
        await client.post('/auth/register', form);
        await login(form);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message ?? 'Something went wrong.');
    }
  };

  const fillDemo = (email, password) => {
    setForm(prev => ({ ...prev, email, password }));
  };

  return (
    <section className="auth-card">
      <p className="eyebrow">Welcome to CareerNest</p>
      <h1>{isLogin ? 'Good to see you again.' : 'Start your next chapter.'}</h1>
      <form onSubmit={submit}>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </label>
        {!isLogin && (
          <>
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              Joining as
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
              >
                <option value="applicant">Applicant</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </label>
          </>
        )}
        <label>
          Password
          <input
            type="password"
            minLength="8"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="button" type="submit">
          {isLogin ? 'Sign in' : 'Create account'}
        </button>
      </form>

      {isLogin && (
        <div style={{ marginTop: '20px', padding: '14px', background: '#f2eee3', borderRadius: '6px', fontSize: '13px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#354338' }}>Demo Accounts (Click to auto-fill):</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="button small secondary"
              style={{ padding: '6px 10px', fontSize: '12px' }}
              onClick={() => fillDemo('applicant@example.com', 'password123')}
            >
              Applicant
            </button>
            <button
              type="button"
              className="button small secondary"
              style={{ padding: '6px 10px', fontSize: '12px' }}
              onClick={() => fillDemo('recruiter@example.com', 'password123')}
            >
              Recruiter
            </button>
            <button
              type="button"
              className="button small secondary"
              style={{ padding: '6px 10px', fontSize: '12px' }}
              onClick={() => fillDemo('admin@example.com', 'password123')}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      <p style={{ marginTop: '20px' }}>
        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
        <Link to={isLogin ? '/register' : '/login'}>
          {isLogin ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </section>
  );
}

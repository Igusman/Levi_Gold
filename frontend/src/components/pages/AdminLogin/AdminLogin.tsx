import React, { useState } from 'react';
import { signin } from '../../../services/customerService';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signin(userName, password);
      window.dispatchEvent(new Event('storage'));
      navigate('/team');
    } catch (err: any) {
      setError(err.response?.data?.message || 'שגיאת כניסה');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="admin-login-page" dir="rtl">
      <div className="admin-login-card">
        <p className="admin-login-eyebrow">גישה למנהל</p>
        <h2 className="admin-login-title">כניסת בעל עסק</h2>
        <p className="admin-login-subtitle">הזן פרטי התחברות כדי לנהל תורים ולקוחות</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label className="admin-login-label" htmlFor="admin-username">שם משתמש</label>
          <input
            id="admin-username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="לדוגמה: admin"
            className="admin-login-input"
            autoComplete="username"
            required
          />

          <label className="admin-login-label" htmlFor="admin-password">סיסמה</label>
          <input
            id="admin-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="הכנס סיסמה"
            type="password"
            className="admin-login-input"
            autoComplete="current-password"
            required
          />

          {error && <div className="admin-login-error">{error}</div>}

          <button type="submit" className="admin-login-button" disabled={isSubmitting}>
            {isSubmitting ? 'מתחבר...' : 'התחבר'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin;

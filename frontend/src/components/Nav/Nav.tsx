import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../images/logo2.jpg'
import './Nav.css'

function Nav() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="AK Barbershop" className="navbar-logo-img" />
          <span className="navbar-brand-text">AK Barbershop</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">בית</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services" className="navbar-link">שירותים</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">אודות</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">צור קשר</Link>
          </li>
          {isLoggedIn && (
            <li className="navbar-item">
              <Link to="/admin" className="navbar-link">ניהול</Link>
            </li>
          )}
        </ul>

        {/* Right Buttons */}
        <div className="navbar-actions">
          <Link to="/reservations" className="btn-reserve">
            הזמנה
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-logout">
              התנתק
            </button>
          ) : (
            <Link to="/admin-login" className="btn-login">
              כניסה
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`navbar-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>בית</Link>
          <Link to="/services" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>שירותים</Link>
          <Link to="/about" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>אודות</Link>
          <Link to="/contact" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>צור קשר</Link>
          {isLoggedIn && <Link to="/admin" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>ניהול</Link>}
          <Link to="/reservations" className="mobile-menu-link btn-reserve-mobile" onClick={() => setMobileMenuOpen(false)}>הזמנה</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="mobile-menu-link btn-logout-mobile">
              התנתק
            </button>
          ) : (
            <Link to="/admin-login" className="mobile-menu-link btn-login-mobile" onClick={() => setMobileMenuOpen(false)}>
              כניסה
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Nav
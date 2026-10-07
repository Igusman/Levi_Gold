import React, { useState } from 'react'
import logo from '../../images/logo2.jpg'
import { Link } from 'react-router-dom'
import './Footer.css'
import whatsapp from '../../images/whatsapp-icon.png'
export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false)

  const addressQuery = encodeURIComponent('חיפה, נווה שאנן, רחוב גדליהו 3')
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`
  const wazeUrl = `https://waze.com/ul?q=${addressQuery}`

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section - 4 Columns */}
        <div className="footer-content">
          
          {/* Brand Column */}
          <div className="footer-section">
            <div className="footer-logo-wrapper">
              <img src={logo} alt="AK Barbershop" className="footer-logo" />
            </div>
            <p className="footer-description">
              חנות ספרות חדישה עם שירותים מעולים וצוות מקצועי
            </p>
            <p className="footer-tagline">
              יחס אישי ואווירה טובה בשילוב של רמה גבוהה
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">קישורים מהירים</h3>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">🏠 בית</Link></li>
              <li><Link to="/services" className="footer-link">✂️ שירותים</Link></li>
              <li><Link to="/about" className="footer-link">ℹ️ אודות</Link></li>
              <li><Link to="/contact" className="footer-link">📧 צור קשר</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">השירותים שלנו</h3>
            <ul className="footer-list">
              <li><span className="footer-service">✂️ גיזוז ספרים</span></li>
              <li><span className="footer-service">💈 שונדאז</span></li>
              <li><span className="footer-service">🧔 טיפול בזקן</span></li>
              <li><span className="footer-service">💇 עיצוב שיער</span></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h3 className="footer-title">צור קשר</h3>
            <div className="footer-contact">
              <a href="tel:+972501234567" className="footer-contact-item" aria-label="חייג למספר 050-123-4567">
                <span className="contact-icon">☎️</span>
                <span>050-123-4567</span>
              </a>
              <button
                type="button"
                className="footer-contact-item footer-contact-button"
                onClick={() => setIsMapPickerOpen(true)}
                aria-label="פתח אפשרויות ניווט לכתובת"
              >
                <span className="contact-icon">📍</span>
                <span>חיפה, נווה שאנן, רחוב גדליהו 3</span>
              </button>
              <a
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noreferrer"
                className="footer-contact-item footer-whatsapp-item"
                aria-label="שלח הודעת וואטסאפ"
              >
                <img className="contact-icon-img" src={whatsapp} alt="WhatsApp" />
                <span>+972 50-123-4567</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="footer-social">
              <a 
                href="https://www.facebook.com/amir.kadry.3" 
                target="_blank" 
                rel="noreferrer"
                className="social-icon facebook"
                title="Facebook"
              >
                <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png" alt="Facebook" />
              </a>
              <a 
                href="https://www.instagram.com/ak_barberman/" 
                target="_blank" 
                rel="noreferrer"
                className="social-icon instagram"
                title="Instagram"
              >
                <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png" alt="Instagram" />
              </a>
              <a 
                href="https://twitter.com/AKBarbershop" 
                target="_blank" 
                rel="noreferrer"
                className="social-icon twitter"
                title="Twitter"
              >
                <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-512.png" alt="Twitter" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} AK Barbershop. כל הזכויות שמורות.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">תנאי שימוש</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-bottom-link">מדיניות פרטיות</a>
          </div>
        </div>
      </div>

      {isMapPickerOpen && (
        <div className="map-picker-overlay" onClick={() => setIsMapPickerOpen(false)}>
          <div className="map-picker-modal" onClick={(e) => e.stopPropagation()}>
            <h4 className="map-picker-title">בחר אפליקציה לניווט</h4>
            <p className="map-picker-subtitle">לאן לפתוח את הכתובת?</p>
            <div className="map-picker-actions">
              <a href={wazeUrl} target="_blank" rel="noreferrer" className="map-picker-link">
                Waze
              </a>
              <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="map-picker-link">
                Google Maps
              </a>
            </div>
            <button type="button" className="map-picker-close" onClick={() => setIsMapPickerOpen(false)}>
              סגור
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer

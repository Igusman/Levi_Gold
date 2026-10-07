import React from 'react'
import { Link } from 'react-router-dom'
import './VideoBanner.css'
import barbervid from '../videos/barbervid.mp4'
function VideoBanner() {
  return (
    <div className="video-banner">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="banner-video"
      >
        <source src={`${barbervid}`} type="video/mp4" />

      </video>

      {/* Dark Overlay - פחות כהה */}
      <div className="Dark-overlay">
        <div className="banner-overlay"></div>
      </div>

      {/* Content */}
      <div className="banner-content">
        <Link to="/reservations" className="btn-reserve-large">
          <span className="btn-icon">⏰</span>
          הזמן תור עכשיו
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>
    </div>
  )
}

export default VideoBanner
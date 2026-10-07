import React, { useEffect } from 'react'
import scrollToTop from '../../../helpers/scrollToTop'
import telegram2 from '../../../images/telegram-icon.png'
import gmail from '../../../images/email-icon.png'
import whatsapp from '../../../images/whatsapp-icon.png'
import waze from '../../../images/waze-icon.png'
import googlemaps from '../../../images/google-maps-icon.png'
import './Contact.css'

function Contact() {
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 contact-page'>
      {/* תמונת כותרת */}
      <div className='relative shadow-md'>
        <img
          className='brightness-50 object-cover h-[30vh] object-left-bottom w-full'
          src='https://lella.qodeinteractive.com/wp-content/uploads/2019/08/title-area-img-1.jpg'
          alt='Contact banner'
        />
  
      </div>

      {/* תוכן העמוד */}
      <div className="container mx-auto px-4 py-10 md:py-14 flex flex-col items-center gap-10">

        <div className="text-center">
          
          <p className="text-gray-600" dir="rtl">בחר את הדרך הנוחה ביותר ליצירת קשר</p>
        </div>

        {/* Contact Methods */}
        <div className="contact-methods w-full">
          {/* Phone */}
          <a href="tel:+972587414769" className="contact-card group">
            <div className="contact-icon-emoji">📞</div>
            <h4 className="contact-card-title">טלפון</h4>
            <p className="contact-card-text">+972 58-741-4769</p>
          </a>

          {/* Email */}
          <a href="mailto:igusman018@gmail.com" className="contact-card group">
            <img className="contact-icon-img" src={gmail} alt="Email" />
            <h4 className="contact-card-title">אימייל</h4>
            <p className="contact-card-text">igusman018@gmail.com</p>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/972587414769" target="_blank" rel="noopener noreferrer" className="contact-card group">
            <img className="contact-icon-img" src={whatsapp} alt="WhatsApp" />
            <h4 className="contact-card-title">וואטסאפ</h4>
            <p className="contact-card-text">שלח הודעה</p>
          </a>

          {/* Telegram */}
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="contact-card group">
            <img className="contact-icon-img" src={telegram2} alt="Telegram" />
            <h4 className="contact-card-title">טלגרם</h4>
            <p className="contact-card-text">פתח שיחה</p>
          </a>
        </div>
        <br />
        <br />
        {/* Location */}
        <div className="contact-location w-full mt-2" dir="rtl">
          <h3 className="text-2xl md:text-3xl font-bold text-red-900 mb-3">📍 המיקום שלנו</h3>
          <p className="text-base md:text-lg font-semibold text-gray-700 mb-6">חיפה, נווה שאנן, רחוב גדליהו 3</p>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center md:justify-start flex-wrap" dir="ltr">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=חיפה,+נווה+שאנן,+רחוב+גדליהו"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-pill"
            >
              <img src={googlemaps} alt="Google Maps" />
              <span>Google Maps</span>
            </a>

            <a
              href="https://waze.com/ul?q=חיפה%20נווה%20שאנן%20רחוב%20גדליהו"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-pill"
            >
              <img src={waze} alt="Waze" />
              <span>Waze</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}


export default Contact

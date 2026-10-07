import React, { useEffect } from 'react'
import scrollToTop from '../../../helpers/scrollToTop';
import amirPic from '../../../images/amir-pic.png'
import './About.css'

function About() {
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 about-page'>
      <div className='relative shadow-md'>
        <img className='brightness-50 object-cover h-[30vh] object-left-bottom w-full' src='https://lella.qodeinteractive.com/wp-content/uploads/2019/08/title-area-img-5.jpg' alt="About"></img>
        <br />
        <br />
      </div>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="about-split about-split-reverse">
            <div className="about-media-wrap">
              <img src={amirPic} className="about-media" alt="Amir"></img>
            </div>
            <div className="about-content" dir="rtl">
              <p className="about-eyebrow">Founder Story</p>
              <h3 className="about-title">מי אני</h3>
              <p className="about-subtitle">Amir Kadry</p>
              <p className="about-highlight">"יחס אישי, דיוק בפרטים וחוויה שאתה רוצה לחזור אליה."</p>
              <p className="about-text">
                At Billy's Barber, our journey began with a deep passion for the art of barbering and a strong commitment to serving our community. Our story unfolds in a small, modest barbershop where Billy, our founder, honed his craft and built lasting relationships with our very first clients.
              </p>
              <p className="about-text">From those early days, word quickly spread about the quality of service and the welcoming atmosphere we offered. As our reputation grew, so did our barbershop. We expanded our team of skilled barbers, always focusing on delivering precision haircuts and classic shaves that left our clients feeling confident and looking their best.</p>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="about-split">
            <div className="about-media-wrap">
              <img src='https://images.pexels.com/photos/7195808/pexels-photo-7195808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="about-media" alt="Team"></img>
            </div>
            <div className="about-content">
              <p className="about-eyebrow">Our Identity</p>
              <h3 className="about-title">Who We Are</h3>
              <p className="about-subtitle">Dedicated Professionals</p>
              <p className="about-text">
                In the heart of our town, a small, unassuming barbershop opened its doors. It was in this modest space that Billy embarked on his journey, armed with his trusty scissors, razors, and a relentless pursuit of perfection. From the very beginning, it was clear that Billy's dedication to his craft set him apart.
              </p>
              <p className="about-text">As time went on, Billy's reputation as a master barber grew. He built not only a thriving business but also strong, lasting relationships with his clients. The barbershop became a place where friends gathered, stories were shared, and laughter echoed through the air.</p>
              <p className="about-text">Today, Billy's Barber has evolved, but our commitment to excellence remains unchanged. We've expanded our team of talented barbers, each handpicked for their skill and dedication to the art of barbering. Our barbers are not just professionals; they're artists, craftsmen who understand that a great haircut is more than just a service - it's an experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
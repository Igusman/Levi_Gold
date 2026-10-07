import React, { useEffect } from 'react'
import BarberServices from './BarberServices/BarberServices'
// import SalonServices from '../components/SalonServices'
import scrollToTop from '../../helpers/scrollToTop'

function Services() {
  useEffect(() => {
    scrollToTop()
  },[])
    return (
      <div className='min-h-screen bg-gray-50'>
          <div className='relative shadow-md'>
              <img className='brightness-50 object-cover h-[30vh] object-left-bottom w-full' src='https://lella.qodeinteractive.com/wp-content/uploads/2019/08/title-area-img-3.jpg' alt="Services"></img>
              
          </div>
          <section className="py-10 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              
              <div className="mx-auto max-w-3xl">
                <BarberServices/>
              </div>
            </div>
          </section>
      </div>
    )
}

export default Services
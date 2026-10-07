import React, { useEffect } from 'react'
import BarberShopReservation from './BarberShopReservation/BarberShopReservation'
import scrollToTop from '../../helpers/scrollToTop'

export function Reservations() {
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <div className='min-h-screen'>
      <div className='relative'>
        <img className='brightness-75 grayscale object-cover h-[30vh] object-left-bottom w-full' src='https://lella.qodeinteractive.com/wp-content/uploads/2019/08/title-area-img-2.jpg' alt="Reservations" />
        <h2 className="absolute h-full top-0 flex items-center left-1/2 -translate-x-1/2 text-center py-4 text-3xl md:text-4xl font-bold text-red-800">הזמנות</h2>
      </div>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <BarberShopReservation/>
        </div>
      </section>
    </div>
  )
}

export default Reservations
import './BarberServices.css'
export const BarberServices = () => {
  const services = [
    { title: 'שיער + עיצוב זקן', price: '₪60' },
    { title: 'שיער', price: '₪60' },
    { title: 'תספורות ילדים - עד 13', price: '₪50' },
    { title: 'עיצוב זקן', price: '₪50' }
  ]

  return (
    <section className="barber-services" dir="rtl">
      <ul className="barber-services-list">
        {services.map((service) => (
          <li key={service.title} className="barber-service-item">
            <h2 className="barber-service-title">{service.title}</h2>
            <span className="barber-service-divider" />
            <p className="barber-service-price">{service.price}</p>
          </li>
        ))}
      </ul>
    </section>

  );
}

export default BarberServices;
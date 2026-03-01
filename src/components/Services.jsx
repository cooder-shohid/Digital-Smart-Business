import React from 'react';
import { useNavigate } from 'react-router-dom';


const Service = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, name: 'Facebook Marketing', icon: '📘' },
    { id: 2, name: 'Website Development', icon: '🌐' },
    { id: 3, name: 'Graphic Design', icon: '🎨' },
    { id: 4, name: 'SEO Optimization', icon: '🔍' },
    { id: 5, name: 'Video Production', icon: '🎬' },
    { id: 6, name: 'Email Marketing', icon: '📧' },
    { id: 7, name: 'Data Analytics', icon: '📊' },
    { id: 8, name: 'Cybersecurity', icon: '🔐' },
  ];

  const handleOrderNow = (serviceName) => {
    navigate(`/service-order?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <section className="services-section">
      <div className="container">
        <h2>Our Services</h2>
        <p>Digital solutions & quality products in one place</p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>High-quality service tailored to your business needs</p>
              <button 
                className="btn-order"
                onClick={() => handleOrderNow(service.name)}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
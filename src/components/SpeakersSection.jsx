import React, { useState, useRef, useEffect } from 'react';
import './SpeakersSection.css';
import samirImg from '../assets/Samir.png';
import santiagoImg from '../assets/Santiago-Maiz.png';
import leandroImg from '../assets/Leandro-Site.png';
import sergioImg from '../assets/Sergio-Laurel-.png';
import ivetteImg from '../assets/Ivette-Cross---PepsiCo-Latam.png';
import pepsicoLogo from '../assets/PepsiCo-LOGO.png';
import unileverLogo from '../assets/Unilever-LOGO.png';

const SpeakersSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const speakers = [
    {
      name: "Samir Ramos",
      title: "Co-Founder & CIO smarters",
      bio: "Emprendedor con +20 años en tecnología, fundó tres empresas y trabaja con IA desde 2011. Desde hace una década, trabaja en la construcción de la internet de los agentes, desarrollando agentes que conectan marcas y consumidores.",
      image: samirImg
    },
    {
      name: "Leandro Ramos",
      title: "Director de Partnership smarters",
      bio: "Leandro lidera alianzas estratégicas y la expansión en Latinoamérica (México, Argentina, Perú y Brasil). Con más de 27 años de experiencia internacional en empresas globales, impulsa el desarrollo de soluciones de marketing conversacional y partnerships estratégicos con grandes marcas.",
      image: leandroImg
    },
    {
      name: "Santiago Maiz",
      title: "COO Bermuda",
      bio: "Con más de 25 años de trayectoria, trabaja en la intersección entre creatividad, tecnología y experiencias phygital para agencias y marcas que buscan contar nuevas historias.",
      image: santiagoImg
    },
    {
      name: "Sergio Laurel",
      title: "Unilever",
      bio: "Con más de 2 años en Unilever, gestiona la estrategia de medios retail y negociaciones con JBP a nivel nacional, posicionando a la marca como referente en el ecosistema digital y de point of purchase. Su enfoque combina visión de negocio, optimización de presupuestos y toma de decisiones basada en datos para maximizar el impacto en medios pagados y earned media.",
      image: sergioImg,
      logo: unileverLogo,
      metaLabel: "Líderes de Meta"
    },
    {
      name: "Ivette Cross",
      title: "PepsiCo Latam",
      bio: "Con más de 7 años en PepsiCo, lidera la estrategia de marketing para Latinoamérica con foco en programas especiales, deportes, partnerships y promociones. Su experiencia abarca mercados clave como México, Argentina, Chile, Uruguay y Paraguay, impulsando iniciativas de innovación y comercialización para marcas globales.",
      image: ivetteImg,
      logo: pepsicoLogo,
      metaLabel: "Líderes de Meta"
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector('.speaker-card');
      const cardWidth = firstCard ? firstCard.clientWidth + 40 : 300;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="speakers-section animate-fade-up delay-3">
      <div className="speakers-container">
        <h2 className="speakers-title">SPEAKERS</h2>
        <p className="speakers-subtitle">Y panel con líderes de Meta</p>

        <div className="speakers-grid-wrapper">
          {showLeftArrow && (
            <button className="carousel-arrow left" onClick={() => scroll('left')} aria-label="Anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          )}

          <div className="speakers-grid" ref={scrollRef} onScroll={handleScroll}>
            {speakers.map((speaker, index) => (
              <div key={index} className="speaker-card">
                {speaker.metaLabel && (
                  <div className="speaker-meta-top-banner">
                    {speaker.metaLabel}
                  </div>
                )}
                <div className="speaker-image-container">
                  <img src={speaker.image} alt={speaker.name} className="speaker-image" />
                </div>
                <div className="speaker-info">
                  <div className="speaker-header">
                    <h3 className="speaker-name">{speaker.name}</h3>
                    {speaker.logo && (
                      <div className="speaker-right-content">
                        <img src={speaker.logo} alt={`${speaker.title} logo`} className="speaker-logo" />
                      </div>
                    )}
                  </div>
                  <p className="speaker-title">{speaker.title}</p>
                  {speaker.bio && <p className="speaker-bio">{speaker.bio}</p>}
                </div>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button className="carousel-arrow right" onClick={() => scroll('right')} aria-label="Siguiente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;

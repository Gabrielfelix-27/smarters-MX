import React, { useState, useRef, useEffect } from 'react';
import './SpeakersSection.css';
import samirImg from '../assets/Samir.png';
import santiagoImg from '../assets/Santiago-Maiz.png';
import leandroImg from '../assets/Leandro-Site.png';
import sergioImg from '../assets/Sergio-Laurel-.png';
import ivetteImg from '../assets/Ivette-Cross---PepsiCo-Latam.png';
import elizabethImg from '../assets/elizabeth-macias.jpeg';
import pepsicoLogo from '../assets/PepsiCo-LOGO.png';
import unileverLogo from '../assets/Unilever-LOGO.png';
import smartersLogo from '../assets/smarters-txt.png';
import bermudaLogo from '../assets/Bermuda.png';
import metaLogo from '../assets/meta-logo.png';

const SpeakersSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const speakers = [
    {
      name: "Samir Ramos",
      title: "Co-Founder & CIO smarters",
      bio: "Emprendedor con +20 años en tecnología, fundó tres empresas y trabalha con IA desde 2011. Desde hace una década, trabaja en la construcción de la internet de los agentes, desarrollando agentes que conectan marcas y consumidores.",
      image: samirImg,
      logo: smartersLogo,
      logoClass: "logo-smarters"
    },
    {
      name: "Santiago Maiz",
      title: "COO Bermuda",
      bio: "Con más de 25 años de trayectoria, trabaja en la intersección entre creatividad, tecnología y experiencias phygital para agencias y marcas que buscan contar nuevas historias.",
      image: santiagoImg,
      logo: bermudaLogo,
      logoClass: "logo-bermuda"
    },
    {
      name: "Leandro Ramos",
      title: "Director de Partnership smarters",
      bio: "Lidera alianzas estratégicas y la expansión en Latinoamérica (México, Argentina, Perú y Brasil). Con más de 27 años de experiencia internacional en empresas globales, impulsa el desarrollo de soluciones de marketing conversacional y partnerships estratégicos con grandes marcas.",
      image: leandroImg,
      logo: smartersLogo,
      logoClass: "logo-smarters"
    },
    {
      name: "Elizabeth Macías",
      title: "Channel Partner Manager Meta",
      bio: "Partner Manager for Business Messaging at Meta since 2021, leading growth with strategic partners across LATAM. With 15+ years in tech, she held partnerships and sales roles at Hewlett Packard Enterprise and Dell Technologies. She holds degrees in International Business from San Diego State University and Tecnológico de Monterrey, an MBA from Tec de Monterrey, and a certificate from Harvard Extension School.",
      image: elizabethImg,
      logo: metaLogo,
      logoClass: "logo-meta"
    },
    {
      name: "Ivette Cross",
      title: "Marketing Strategy Manager PepsiCo",
      bio: "Ivette Cross lidera la agenda de Consumer Engagement para Latinoamérica desde el equipo de Brand Strategy en PepsiCo, con foco en licencias, sports marketing y sponsorships. Se especializa en transformar estrategias globales en experiencias locales que conectan con los consumidores y generan impacto a escala regional.",
      image: ivetteImg,
      logo: pepsicoLogo
    },
    {
      name: "Sergio Laurel",
      title: "Media and Retail Manager Unilever",
      bio: "Sergio Laurel es Manager de Medios y E-commerce en Unilever México, donde lidera la estrategia de comunicación para el portafolio de alimentos, con foco en performance y retail media. Cuenta con más de una década de experiencia en agencias, tecnología y marcas, con una visión integral del ecosistema de medios y un enfoque en audiencias social-first e innovación con IA.",
      image: sergioImg,
      logo: unileverLogo
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
        <p className="speakers-subtitle">Y panel con líderes de Meta, PepsiCo y Unilever</p>

        <div className="speakers-grid-wrapper">
          {showLeftArrow && (
            <button className="carousel-arrow left" onClick={() => scroll('left')} aria-label="Anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          )}

          <div className="speakers-grid" ref={scrollRef} onScroll={handleScroll}>
            {speakers.map((speaker, index) => (
              <div key={index} className="speaker-card">
                <div className="speaker-image-container">
                  <img src={speaker.image} alt={speaker.name} className="speaker-image" />
                </div>
                <div className="speaker-info">
                  <div className="speaker-header">
                    <h3 className="speaker-name">{speaker.name}</h3>
                    {speaker.logo && (
                      <div className="speaker-right-content">
                        <img src={speaker.logo} alt={`${speaker.title} logo`} className={`speaker-logo ${speaker.logoClass || ''}`} />
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

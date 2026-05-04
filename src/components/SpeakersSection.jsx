import React from 'react';
import './SpeakersSection.css';
import samirImg from '../assets/Samir.png';
import santiagoImg from '../assets/Santiago-Maiz.png';
import leandroImg from '../assets/Leandro-Site.png';

const SpeakersSection = () => {
  const speakers = [
    {
      name: "Samir Ramos",
      title: "Co-founder & CIO, smarters",
      bio: "Emprendedor con +20 años en tecnología, fundó tres empresas y trabaja con IA desde 2011. Desde hace una década, trabaja en la construcción de la internet de los agentes, desarrollando agentes que conectan marcas y consumidores.",
      image: samirImg
    },
    {
      name: "Leandro Ramos",
      title: "Director of Strategic Partnerships, smarters",
      bio: "Leandro lidera alianzas estratégicas y la expansión en Latinoamérica (México, Argentina, Perú y Brasil). Con más de 27 años de experiencia internacional en empresas globales, impulsa el desarrollo de soluciones de marketing conversacional y partnerships estratégicos con grandes marcas.",
      image: leandroImg
    },
    {
      name: "Santiago Maiz",
      title: "COO The Bermudas",
      bio: "Con más de 25 años de trayectoria, trabaja en la intersección entre creatividad, tecnología y experiencias phygital para agencias y marcas que buscan contar nuevas historias.",
      image: santiagoImg
    }
  ];

  return (
    <section className="speakers-section animate-fade-up delay-3">
      <div className="speakers-container">
        <h2 className="speakers-title">SPEAKERS</h2>
        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div key={index} className="speaker-card">
              <div className="speaker-image-container">
                <img src={speaker.image} alt={speaker.name} className="speaker-image" />
              </div>
              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-title">{speaker.title}</p>
                <p className="speaker-bio">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;

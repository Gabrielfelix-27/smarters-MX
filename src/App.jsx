import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import smartersLogo from './assets/smarters-txt.png';
import smartersMonoLogo from './assets/smarters-mono.png';
import bermudaLogo from './assets/Bermuda.png';
import eventLogo from './assets/nome-evento.png';
import metaLogo from './assets/meta-logo.png';
import RegistrationModal from './components/RegistrationModal';
import SpeakersSection from './components/SpeakersSection';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 12 de Mayo de 2026, 09:00
    const targetDate = new Date('2026-05-12T09:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegistration = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Dynamic Mesh Background Elements */}
      <div className="bg-mesh-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      <div style={{ zoom: 0.9 }}>
        <div className="app-container">
          {/* Top Navbar */}
          <nav className="top-navbar animate-fade-up">
            <div className="partners-logos">
              <a href="https://smarters.ai/pt" target="_blank" rel="noopener noreferrer">
                <img src={smartersLogo} alt="Smarters" className="partner-img smarters-img" />
              </a>
              <div className="divider"></div>
              <a href="https://www.thebermuda.com/" target="_blank" rel="noopener noreferrer">
                <img src={bermudaLogo} alt="The Bermuda" className="partner-img bermuda-img" />
              </a>
            </div>
          </nav>



          {/* LEFT PANE - LOGO & IDENTITY */}
          <div className="left-pane">
            <div className="main-logo animate-fade-up delay-1">
              <span className="word-whatsapp">WhatsApp</span>
              <span className="word-toolbox">Toolbox.</span>
              <p className="main-subtitle">
                Construyendo adquisición, conversión y<br />
                <span className="subtitle-second-line">relaciones en WhatsApp</span>
              </p>
            </div>

            <div className="bubbles-container animate-fade-up delay-2">
              <div className="bubble bubble-dark bubble-left">
                CDMX
              </div>
              <div className="bubble bubble-light bubble-right">
                12 DE MAYO | 9:00 AM - 12:30 PM
              </div>
              <div className="bubble bubble-dark bubble-left meta-bubble">
                <img src={metaLogo} alt="Meta" className="meta-icon" />
                OFICINAS DE META
              </div>
            </div>
          </div>

          {/* RIGHT PANE - CTA */}
          <div className="right-pane">
            <div className="cta-card animate-fade-up delay-3">
              <h2>Confirma tu asistencia</h2>
              <p>Descubre cómo las marcas están usando WhatsApp para generar resultados reales.</p>

              <button onClick={handleRegistration} className="cta-btn">
                Registrarse <ArrowRight size={20} />
              </button>
            </div>

            {/* Countdown Timer */}
            <div className="countdown-container animate-fade-up delay-3">
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="countdown-label">Días</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Horas</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Minutos</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Segundos</span>
              </div>
            </div>
          </div>
        </div>

        {/* SPEAKERS SECTION */}
        <SpeakersSection />

        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    // Update HTML element language attribute
    document.documentElement.lang = lng;
    document.documentElement.setAttribute('lang', lng);
    localStorage.setItem('language', lng);
  };

  const navLinkStyle = {
    color: '#fdf8f2',
    textDecoration: 'none',
    fontSize: 'clamp(14px, 4vw, 18px)',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '6px',
    position: 'relative'
  };

  const disabledStyle = {
    ...navLinkStyle,
    cursor: 'not-allowed',
    opacity: '0.6'
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700&display=swap');

        /* ── TAMIL LANGUAGE SPECIFIC ADJUSTMENTS ── */
        html[lang="ta"] .navbar-brand-title {
          font-size: clamp(1.2rem, 3vw, 1.6rem) !important;
        }

        html[lang="ta"] .navbar-brand-subtitle {
          font-size: clamp(0.85rem, 2vw, 1.1rem) !important;
        }

        html[lang="ta"] .desktop-nav {
          gap: clamp(15px, 3vw, 30px) !important;
        }

        html[lang="ta"] .desktop-nav a,
        html[lang="ta"] .desktop-nav select {
          font-size: 13px !important;
        }

        html[lang="ta"] .navbar-tagline {
          font-size: clamp(0.8rem, 1.8vw, 1.1rem) !important;
        }

        /* ── NAVBAR BRANDING ── */
        .navbar-brand-container {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 20px);
          flex-shrink: 0;
        }

        .navbar-logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 4px solid #E8B76A;
          padding: 6px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(232, 183, 106, 0.3), inset 0 1px 2px rgba(255,255,255,0.15);
          animation: float 3s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .navbar-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .navbar-brand-text {
          display: flex;
          flex-direction: column;
          gap: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .navbar-brand-text:hover {
          transform: translateY(-2px);
        }

        .navbar-brand-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.03em;
          line-height: 1.1;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .navbar-brand-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 600;
          color: #E8B76A;
          letter-spacing: 0.02em;
          line-height: 1;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
          .navbar-brand-container {
            gap: 10px;
          }

          .navbar-logo {
            width: 52px;
            height: 52px;
            border-width: 3px;
          }

          .navbar-brand-title {
            font-size: clamp(1.2rem, 3.5vw, 1.6rem);
          }

          .navbar-brand-subtitle {
            font-size: clamp(0.9rem, 2vw, 1.2rem);
          }

          html[lang="ta"] .navbar-brand-title {
            font-size: clamp(1rem, 3vw, 1.4rem) !important;
          }

          html[lang="ta"] .navbar-brand-subtitle {
            font-size: clamp(0.8rem, 1.8vw, 1rem) !important;
          }

          html[lang="ta"] .mobile-menu a,
          html[lang="ta"] .mobile-menu div {
            font-size: clamp(12px, 2.5vw, 14px) !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-brand-container {
            gap: 8px;
          }

          .navbar-logo {
            width: 48px;
            height: 48px;
          }

          .navbar-brand-title {
            font-size: clamp(1rem, 3vw, 1.4rem);
          }

          .navbar-brand-subtitle {
            font-size: clamp(0.8rem, 1.8vw, 1rem);
          }

          html[lang="ta"] .navbar-brand-title {
            font-size: clamp(0.9rem, 2.8vw, 1.2rem) !important;
          }

          html[lang="ta"] .navbar-brand-subtitle {
            font-size: clamp(0.7rem, 1.6vw, 0.9rem) !important;
          }

          html[lang="ta"] .mobile-menu a,
          html[lang="ta"] .mobile-menu div {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #6B1825 0%, #5A1620 100%);
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 0;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
            z-index: 999;
            max-height: 80vh;
            overflow-y: auto;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .mobile-menu.closed {
            display: none;
          }
          
          .mobile-menu a,
          .mobile-menu div {
            padding: clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px) !important;
            border-bottom: 1px solid rgba(232,183,106,0.1);
            color: #fdf8f2 !important;
            text-decoration: none !important;
            cursor: pointer !important;
            text-align: left;
            font-size: clamp(13px, 3vw, 16px) !important;
            transition: all 0.2s ease;
          }
          
          .mobile-menu a:hover,
          .mobile-menu div:hover {
            background: rgba(232,183,106,0.15);
            padding-left: clamp(20px, 5vw, 24px) !important;
          }
          
          .hamburger {
            display: flex;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            padding: 8px;
          }
          
          .hamburger span {
            width: 24px;
            height: 2.5px;
            background: #E8B76A;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            display: block;
            border-radius: 2px;
          }
          
          .hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translateY(10px);
          }
          
          .hamburger.open span:nth-child(2) {
            opacity: 0;
          }
          
          .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translateY(-10px);
          }
          
          .desktop-nav {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .mobile-menu {
            top: 56px;
          }
          
          .mobile-menu a,
          .mobile-menu div {
            padding: 12px 14px !important;
            font-size: 14px !important;
          }
        }
        
        @media (min-width: 769px) {
          .hamburger {
            display: none;
          }
          
          .mobile-menu {
            display: none !important;
          }
        }

        /* ── NAVBAR TAGLINE ── */
        .navbar-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.9rem, 2vw, 1.3rem);
          color: #E8B76A;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-align: center;
          flex: 1;
          margin: 0 20px;
          text-shadow: 
            0 0 10px rgba(232, 183, 106, 0.8),
            0 0 20px rgba(232, 183, 106, 0.5),
            0 0 30px rgba(232, 183, 106, 0.3);
          animation: glow 2s ease-in-out infinite;
          word-wrap: break-word;
          overflow-wrap: break-word;
          line-height: 1.5;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(232, 183, 106, 0.8),
              0 0 20px rgba(232, 183, 106, 0.5),
              0 0 30px rgba(232, 183, 106, 0.3);
          }
          50% {
            text-shadow: 
              0 0 15px rgba(232, 183, 106, 1),
              0 0 25px rgba(232, 183, 106, 0.8),
              0 0 40px rgba(232, 183, 106, 0.5);
          }
        }

        @media (max-width: 768px) {
          .navbar-tagline {
            flex: 0 1 auto;
            margin: 0 10px;
            font-size: clamp(0.75rem, 1.8vw, 1rem);
            order: 3;
            width: 100%;
            padding-top: 8px;
          }
        }

        @media (max-width: 360px) {
          .navbar-tagline {
            font-size: clamp(0.7rem, 1.5vw, 0.9rem);
            margin: 0 8px;
            padding-top: 6px;
          }

          html[lang="ta"] .navbar-brand-title {
            font-size: clamp(0.85rem, 2.5vw, 1.1rem) !important;
          }

          html[lang="ta"] .navbar-brand-subtitle {
            font-size: clamp(0.65rem, 1.4vw, 0.85rem) !important;
          }

          html[lang="ta"] .navbar-tagline {
            font-size: clamp(0.65rem, 1.3vw, 0.8rem) !important;
          }
        }
      `}</style>

      <nav style={{
        background: 'linear-gradient(135deg, #7B1C2E 0%, #5A1620 100%)',
        padding: 'clamp(12px, 2.5vw, 16px) clamp(16px, 5vw, 30px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo and Text */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
          <div className="navbar-brand-container">
            <div className="navbar-logo">
              <img src="/assets/chennai_profiles.png" alt="Chennai Profiles Logo" 
                onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <div className="navbar-brand-text">
              <div className="navbar-brand-title">Chennai</div>
              <div className="navbar-brand-subtitle">Profiles</div>
            </div>
          </div>
        </Link>
        
        {/* Navbar Tagline */}
        {/* <div className="navbar-tagline">Where Hearts Meet Their Perfect Match ❤️</div> */}
        
        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{
          display: 'flex',
          gap: 'clamp(20px, 5vw, 40px)',
          alignItems: 'center'
        }}>
          <Link to="/" style={navLinkStyle} 
            onMouseEnter={(e) => {
              e.target.style.color = '#E8B76A';
              e.target.style.backgroundColor = 'rgba(232,183,106,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fdf8f2';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
            {t('navbar.home')}
          </Link>
          
          <Link to="/registration" style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#E8B76A';
              e.target.style.backgroundColor = 'rgba(232,183,106,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fdf8f2';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
            {t('navbar.registration')}
          </Link>

          <Link to="/search" style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#E8B76A';
              e.target.style.backgroundColor = 'rgba(232,183,106,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fdf8f2';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
            {t('navbar.search')}
          </Link>

          <Link to="/contact" style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#E8B76A';
              e.target.style.backgroundColor = 'rgba(232,183,106,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fdf8f2';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
            {t('navbar.contact')}
          </Link>

          {/* Language Switcher */}
          <select 
            value={i18n.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '2px solid #E8B76A',
              backgroundColor: 'rgba(232,183,106,0.1)',
              color: '#fdf8f2',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(232,183,106,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(232,183,106,0.1)';
            }}
          >
            <option value="en" style={{ backgroundColor: '#2A1810', color: '#fdf8f2' }}>English</option>
            <option value="ta" style={{ backgroundColor: '#2A1810', color: '#fdf8f2' }}>தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Mobile Hamburger Menu */}
        <div 
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${!menuOpen ? 'closed' : ''}`}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/registration" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>{t('navbar.registration')}</Link>
          <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>{t('navbar.search')}</Link>
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>{t('navbar.contact')}</Link>
          <select 
            value={i18n.language}
            onChange={(e) => { handleLanguageChange(e.target.value); setMenuOpen(false); }}
            style={{
              padding: '10px 15px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: 'rgba(232,183,106,0.15)',
              color: '#fdf8f2',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              margin: '10px 20px'
            }}
          >
            <option value="en" style={{ backgroundColor: '#2A1810', color: '#fdf8f2' }}>English</option>
            <option value="ta" style={{ backgroundColor: '#2A1810', color: '#fdf8f2' }}>தமிழ் (Tamil)</option>
          </select>
        </div>
      </nav>
    </>
  );
}

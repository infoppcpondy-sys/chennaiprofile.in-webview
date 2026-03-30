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
      `}</style>

      <nav style={{
        background: 'linear-gradient(135deg, #7B1C2E 0%, #5A1620 100%)',
        padding: 'clamp(12px, 3vw, 15px) clamp(16px, 5vw, 30px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        position: 'relative',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: 'clamp(18px, 5vw, 24px)',
          fontWeight: 'bold',
          color: '#E8B76A',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          animation: 'glow 2s ease-in-out infinite'
        }}
        onMouseEnter={(e) => e.target.style.textShadow = '0 0 12px rgba(232,183,106,0.4)'}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}>
          <style>{`
            @keyframes glow {
              0%, 100% { text-shadow: 0 0 8px rgba(232,183,106,0.2); }
              50% { text-shadow: 0 0 16px rgba(232,183,106,0.3); }
            }
          `}</style>
          Chennai Profiles
        </div>
        
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
            Search
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
          <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>Search</Link>
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

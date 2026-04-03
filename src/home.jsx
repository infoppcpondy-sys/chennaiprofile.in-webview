import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Dummy profile data (same as search.jsx)
const DUMMY = [
  { id:1,  regId:"MAT1001", name:"Aravind Kumar",    caste:"Brahmin",     gender:"Male",   language:"Tamil",     marital:"Single",           age:27, phone:"9876543211", photo:"https://i.pravatar.cc/80?img=11" },
  { id:2,  regId:"MAT1002", name:"Priya Devi",        caste:"Vellalar",    gender:"Female", language:"Tamil",     marital:"Single",           age:24, phone:"9876543212", photo:"https://i.pravatar.cc/80?img=47" },
  { id:3,  regId:"MAT1003", name:"Karthik Raja",      caste:"Gounder",     gender:"Male",   language:"Tamil",     marital:"Divorce",          age:31, phone:"9876543213", photo:"https://i.pravatar.cc/80?img=15" },
  { id:4,  regId:"MAT1004", name:"Meena Lakshmi",     caste:"Nadar",       gender:"Female", language:"Tamil",     marital:"Widow",            age:29, phone:"9876543214", photo:"https://i.pravatar.cc/80?img=49" },
  { id:5,  regId:"MAT1005", name:"Venkatesh Raman",   caste:"Pillai",      gender:"Male",   language:"Telugu",    marital:"Single",           age:26, phone:"9876543215", photo:"https://i.pravatar.cc/80?img=13" },
  { id:6,  regId:"MAT1006", name:"Anitha Selvam",     caste:"Mudaliar",    gender:"Female", language:"Tamil",     marital:"Awaiting Divorce", age:33, phone:"9876543216", photo:"https://i.pravatar.cc/80?img=44" },
  { id:7,  regId:"MAT1007", name:"Suresh Balaji",     caste:"Vishwakarma", gender:"Male",   language:"Tamil",     marital:"Single",           age:28, phone:"9876543217", photo:"https://i.pravatar.cc/80?img=17" },
  { id:8,  regId:"MAT1008", name:"Kavitha Nair",      caste:"Others",      gender:"Female", language:"Malayalam", marital:"Single",           age:25, phone:"9876543218", photo:"https://i.pravatar.cc/80?img=48" },
  { id:9,  regId:"MAT1009", name:"Dinesh Kannan",     caste:"Chettiar",    gender:"Male",   language:"Tamil",     marital:"Divorce",          age:35, phone:"9876543219", photo:"https://i.pravatar.cc/80?img=19" },
  { id:10, regId:"MAT1010", name:"Saranya Priya",     caste:"Brahmin",     gender:"Female", language:"Tamil",     marital:"Single",           age:23, phone:"9876543220", photo:"https://i.pravatar.cc/80?img=46" },
  { id:11, regId:"MAT1011", name:"Manikandan S",      caste:"Thevar",      gender:"Male",   language:"Tamil",     marital:"Single",           age:30, phone:"9876543221", photo:"https://i.pravatar.cc/80?img=12" },
  { id:12, regId:"MAT1012", name:"Deepa Sundaram",    caste:"Naicker",     gender:"Female", language:"Telugu",    marital:"Widow",            age:32, phone:"9876543222", photo:"https://i.pravatar.cc/80?img=45" },
  { id:13, regId:"MAT1013", name:"Rajesh Pandian",    caste:"Agamudayar",  gender:"Male",   language:"Tamil",     marital:"Single",           age:29, phone:"9876543223", photo:"https://i.pravatar.cc/80?img=14" },
  { id:14, regId:"MAT1014", name:"Lakshmi Priya",     caste:"Vellalar",    gender:"Female", language:"Tamil",     marital:"Single",           age:26, phone:"9876543224", photo:"https://i.pravatar.cc/80?img=43" },
  { id:15, regId:"MAT1015", name:"Balamurugan K",     caste:"Yadav",       gender:"Male",   language:"Tamil",     marital:"Single",           age:27, phone:"9876543225", photo:"https://i.pravatar.cc/80?img=16" },
];

// Split by gender
const DUMMY_MALE   = DUMMY.filter(p => p.gender === 'Male');
const DUMMY_FEMALE = DUMMY.filter(p => p.gender === 'Female');

// Duplicate for seamless loop
const DUMMY_MALE_LOOP   = [...DUMMY_MALE,   ...DUMMY_MALE,   ...DUMMY_MALE];
const DUMMY_FEMALE_LOOP = [...DUMMY_FEMALE, ...DUMMY_FEMALE, ...DUMMY_FEMALE];

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Get caste options and other translations
  const casteOptions = t("registration.casteOptions", { returnObjects: true }) || [];
  const languageOptions = t("search.languageOptions", { returnObjects: true }) || [];
  const maritalOptions = t("search.maritalOptions", { returnObjects: true }) || [];
  const genderOptions = t("search.genderOptions", { returnObjects: true }) || [];
  
  const [quickSearch, setQuickSearch] = useState({
    gender: '',
    language: '',
    caste: '',
    subcaste: '',
  });

  const [regNumber, setRegNumber] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    createdFor: '',
    name: '',
    countryCode: '+91',
    phone: '',
  });
  const [isPausedMale,   setIsPausedMale]   = useState(false);
  const [isPausedFemale, setIsPausedFemale] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilterResultsModal, setShowFilterResultsModal] = useState(false);

  // Refs for vertical scrollers
  const maleScrollRef    = useRef(null);
  const femaleScrollRef  = useRef(null);
  const maleAnimRef      = useRef(null);
  const femaleAnimRef    = useRef(null);
  const malePosRef       = useRef(0);
  const femalePosRef     = useRef(0);

  // Advertisement images array
  const adImages = [
    '/assets/addcarimg.png',
    '/assets/coming.png',
    '/assets/pondymatri_Ads.jpeg',
  ];

  // Auto-rotate ads every 5 seconds
  useEffect(() => {
    const adTimer = setInterval(() => {
      setAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
    }, 5000);
    return () => clearInterval(adTimer);
  }, [adImages.length]);

  // Auto-scroll male vertical carousel
  useEffect(() => {
    const el = maleScrollRef.current;
    if (!el) return;
    const speed = 0.6;
    const step = () => {
      if (!isPausedMale && el) {
        malePosRef.current += speed;
        const oneSetHeight = el.scrollHeight / 3;
        if (malePosRef.current >= oneSetHeight) malePosRef.current = 0;
        el.scrollTop = malePosRef.current;
      }
      maleAnimRef.current = requestAnimationFrame(step);
    };
    maleAnimRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(maleAnimRef.current);
  }, [isPausedMale]);

  // Auto-scroll female vertical carousel
  useEffect(() => {
    const el = femaleScrollRef.current;
    if (!el) return;
    const speed = 0.6;
    const step = () => {
      if (!isPausedFemale && el) {
        femalePosRef.current += speed;
        const oneSetHeight = el.scrollHeight / 3;
        if (femalePosRef.current >= oneSetHeight) femalePosRef.current = 0;
        el.scrollTop = femalePosRef.current;
      }
      femaleAnimRef.current = requestAnimationFrame(step);
    };
    femaleAnimRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(femaleAnimRef.current);
  }, [isPausedFemale]);

  // Profile data
  const maleProfiles = [
    { id: 1, name: 'Arjun', age: '28' },
    { id: 2, name: 'Vikram', age: '26' },
    { id: 3, name: 'Rohan', age: '30' },
    { id: 4, name: 'Aditya', age: '27' },
    { id: 5, name: 'Karthik', age: '29' },
    { id: 6, name: 'Nikhil', age: '25' },
    { id: 7, name: 'Rahul', age: '31' },
  ];

  const femaleProfiles = [
    { id: 1, name: 'Ananya', age: '26' },
    { id: 2, name: 'Priya', age: '24' },
    { id: 3, name: 'Divya', age: '28' },
    { id: 4, name: 'Sneha', age: '25' },
    { id: 5, name: 'Mehira', age: '27' },
    { id: 6, name: 'Sakshi', age: '23' },
    { id: 7, name: 'Kavya', age: '29' },
  ];

  const loopMaleProfiles = [...maleProfiles, ...maleProfiles];
  const loopFemaleProfiles = [...femaleProfiles, ...femaleProfiles];

  const handleQuickSearchChange = (e) => {
    const { name, value } = e.target;
    setQuickSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    
    if (regNumber.trim()) {
      const profile = DUMMY.find(p => p.regId.toLowerCase() === regNumber.toLowerCase());
      if (profile) {
        setSearchResult(profile);
        setShowSearchResultModal(true);
        setFeedbackMessage(t('home.profileSearch'));
        setTimeout(() => setFeedbackMessage(''), 2000);
        return;
      } else {
        setFeedbackMessage('Profile not found');
        setTimeout(() => setFeedbackMessage(''), 3000);
        return;
      }
    }
    
    const results = DUMMY.filter(profile => {
      if (quickSearch.gender && profile.gender !== quickSearch.gender) return false;
      if (quickSearch.language && quickSearch.language !== 'Any' && profile.language !== quickSearch.language) return false;
      if (quickSearch.caste && profile.caste !== quickSearch.caste) return false;
      if (quickSearch.subcaste && quickSearch.subcaste !== 'Any' && quickSearch.subcaste !== '') { }
      return true;
    });
    
    if (results.length > 0) {
      setFilteredResults(results);
      setShowFilterResultsModal(true);
      setFeedbackMessage(t('home.foundProfiles') || `Found ${results.length} profile(s)`);
    } else {
      setFeedbackMessage(t('home.noProfilesFound') || 'No profiles found matching your criteria');
    }
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleRegSearchSubmit = (e) => {
    e.preventDefault();
    const profile = DUMMY.find(p => p.regId.toLowerCase() === regNumber.toLowerCase());
    if (profile) {
      setSearchResult(profile);
      setShowSearchResultModal(true);
      setFeedbackMessage(t('home.profileSearch'));
      setTimeout(() => setFeedbackMessage(''), 2000);
    } else {
      setFeedbackMessage('Profile not found');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    const phoneStr = phone.toString();
    if (phoneStr.length <= 5) return phoneStr;
    return phoneStr.substring(0, 5) + "*".repeat(phoneStr.length - 5);
  };

  const getLabel = (options, value) => {
    const found = options.find(o => o.value === value);
    return found ? found.label : value;
  };

  const maritalColor = (m) => ({ "Single":"#e8fdf0:#1a7a40", "Divorce":"#fff3e0:#d35400", "Widow":"#f3e8fd:#7d3c98", "Awaiting Divorce":"#fef9e7:#b7950b" }[m] || "#f0f0f0:#666").split(":");

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", minHeight: '100vh', background: '#fdf8f2' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --maroon: #7B1C2E;
          --maroon-light: #9B2A40;
          --maroon-dark: #5A1620;
          --gold: #C9913A;
          --gold-light: #E8B76A;
          --gold-dark: #A97324;
          --cream: #fdf8f2;
          --cream-dark: #f5ede0;
          --text-dark: #2A1810;
          --text-mid: #5a3828;
          --text-light: #8a6a5a;
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
          --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
          --shadow-lg: 0 12px 32px rgba(0,0,0,0.15);
        }

        .page-wrapper {
          background: linear-gradient(135deg, var(--cream) 0%, #faf4ec 100%);
          min-height: 100vh;
        }

        /* ── HEADER ── */
        .header {
          background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%);
          position: relative;
          overflow: hidden;
          padding: 0;
          box-shadow: 0 8px 24px rgba(123, 28, 46, 0.2);
        }

        .header-pattern {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(45deg, rgba(201,145,58,0.12) 0px, rgba(201,145,58,0.12) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(-45deg, rgba(201,145,58,0.08) 0px, rgba(201,145,58,0.08) 1px, transparent 1px, transparent 12px);
          animation: slidePattern 20s linear infinite;
        }

        @keyframes slidePattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(12px, 12px); }
        }

        .header-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(20px, 5vw, 36px) clamp(16px, 5vw, 32px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 4vw, 32px);
          flex-wrap: wrap;
        }

        .header-logo-container {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 24px);
          flex-shrink: 0;
        }

        .header-logo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 4px solid var(--gold-light);
          padding: 8px;
          background: rgba(255,255,255,0.12);
          flex-shrink: 0;
          box-shadow: 0 12px 32px rgba(232, 183, 106, 0.3), inset 0 1px 2px rgba(255,255,255,0.2);
          animation: float 3s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .header-text { 
          flex: 0 1 auto;
          text-align: center;
        }

        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.03em;
          line-height: 1.1;
          text-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .header-title span {
          color: var(--gold-light);
          display: block;
        }

        .header-sub {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-top: 10px;
          font-weight: 400;
        }

        .header-divider {
          width: 2px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, rgba(201,145,58,0.5), transparent);
          flex-shrink: 0;
          display: none;
        }

        .header-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          max-width: 180px;
          line-height: 1.5;
        }

        .whatsapp-card {
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          border-radius: 12px;
          padding: 14px 16px;
          border: 1px solid rgba(201,145,58,0.15);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          text-decoration: none;
        }

        .whatsapp-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(201,145,58,0.3);
        }

        .whatsapp-card:hover .whatsapp-card-image {
          transform: scale(1.08);
        }

        .whatsapp-card:hover .whatsapp-card-text {
          color: var(--maroon);
        }

        .whatsapp-card-text {
          font-size: 13px;
          color: var(--text-dark);
          font-weight: 600;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.05em;
          transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .whatsapp-card-image {
          width: auto;
          height: 50px;
          object-fit: contain;
          display: block;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── VERTICAL PROFILE CAROUSEL (AUTO-SCROLL) ── */
        .vertical-carousel-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(201,145,58,0.15);
          box-shadow: var(--shadow-sm);
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          flex: 1;
        }

        /* Fade gradient top/bottom for polish */
        .vertical-carousel-wrapper::before,
        .vertical-carousel-wrapper::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 40px;
          z-index: 2;
          pointer-events: none;
        }
        .vertical-carousel-wrapper::before {
          top: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.95), transparent);
        }
        .vertical-carousel-wrapper::after {
          bottom: 0;
          background: linear-gradient(to top, rgba(255,255,255,0.95), transparent);
        }

        .profiles-scroller-vertical {
          display: flex;
          flex-direction: column;
          gap: 0;
          height: 420px;
          overflow-y: hidden;
          scroll-behavior: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0;
          position: relative;
        }

        .profile-card-vertical {
          flex: 0 0 auto;
          background: transparent;
          border-radius: 0;
          overflow: hidden;
          transition: background 0.25s ease;
          cursor: pointer;
          border-bottom: 1px solid rgba(201,145,58,0.10);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px 10px;
        }

        .profile-card-vertical:hover {
          background: rgba(123, 28, 46, 0.04);
        }

        .profile-card-vertical:last-child {
          border-bottom: none;
        }

        .profile-image-vertical {
          width: 95px;
          height: 95px;
          object-fit: cover;
          border-radius: 4px;
          border: 2px solid rgba(201,145,58,0.3);
          flex-shrink: 0;
          background: linear-gradient(135deg, var(--gold-light), var(--maroon-light));
          display: block;
        }

        .profile-info-vertical {
          flex: 1;
          min-width: 0;
          text-align: center;
          width: 100%;
        }

        .profile-name-vertical {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .profile-age-vertical {
          font-family: 'Jost', sans-serif;
          font-size: 0.92rem;
          color: var(--text-light);
          letter-spacing: 0.03em;
          margin-bottom: 2px;
        }

        .profile-badge-vertical {
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 10px;
          flex-shrink: 0;
          letter-spacing: 0.03em;
          margin-top: 2px;
        }

        /* ── SPLIT CAROUSEL CONTAINER ── */
        .split-carousel-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          flex: 1;
        }

        @media (max-width: 480px) {
          .split-carousel-container {
            grid-template-columns: 1fr;
          }
        }

        /* ── TOAST ── */
        .toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%);
          color: #fff;
          padding: clamp(12px, 2vw, 16px) clamp(20px, 3vw, 28px);
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.8rem, 2vw, 0.85rem);
          letter-spacing: 0.08em;
          z-index: 999;
          border-left: 4px solid var(--gold-light);
          box-shadow: 0 12px 40px rgba(123,28,46,0.4);
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── MAIN ── */
        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(16px, 4vw, 24px) clamp(16px, 5vw, 32px) clamp(40px, 8vw, 64px);
        }

        .section-label {
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.65rem, 2vw, 0.72rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-dark);
          font-weight: 600;
          margin-bottom: 4px;
          animation: fadeInDown 0.6s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.4rem);
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: clamp(16px, 3vw, 24px);
          line-height: 1.2;
          background: linear-gradient(135deg, var(--text-dark) 0%, var(--maroon) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── SEARCH CARDS ── */
        .cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 100%;
          margin: 0;
        }

        .cards-column-left {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: stretch;
        }

        .cards-column-right {
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: auto;
          min-height: fit-content;
          align-items: stretch;
        }

        @media (max-width: 720px) {
          .cards-grid { grid-template-columns: 1fr; gap: 28px; }
          .cards-column-right { display: flex; order: -1; }
          .header-inner { flex-direction: column; text-align: center; gap: 28px; padding: 40px 16px 28px; }
          .header-logo-container { flex-direction: column; gap: 16px; }
          .header-divider { display: none; }
          .header-tagline { max-width: 100%; text-align: center; }
          .stats-grid { grid-template-columns: 1fr; }
          .main { padding: 32px 16px 40px; }
          .section-heading { font-size: clamp(1.4rem, 2vw, 1.8rem); margin-bottom: 24px; }
          .card { padding: clamp(24px, 5vw, 32px); }
          .card-title { font-size: clamp(1.2rem, 3vw, 1.55rem); }
          .fields-row { grid-template-columns: 1fr; gap: 12px; }
          .footer-inner { flex-direction: column; text-align: center; gap: 12px; }
          .footer { padding: 24px 16px; }
          .profiles-scroller-vertical { height: 320px; }
          .scroller-title { font-size: clamp(1.2rem, 2vw, 1.4rem); }
          .profile-card { flex: 0 0 160px; }
          .profile-card:hover { transform: translateY(-6px) scale(1); }
          .scroller-section { margin-top: 36px; }
          .profiles-scroller { gap: 16px; }
          .profile-image { height: 170px; font-size: 2.8rem; }
          .profile-info { padding: 12px; }
          .profile-name { font-size: 0.95rem; }
          .ad-carousel { height: 220px; }
          .ad-nav-btn { width: 35px; height: 35px; }
          .btn-create-profile { padding: 14px 24px; font-size: 0.95rem; }
        }

        @media (min-width: 721px) and (max-width: 1024px) {
          .cards-grid { grid-template-columns: 1.2fr 0.8fr; gap: 24px; }
          .cards-column-right { gap: 10px; }
          .main { padding: 28px 20px 48px; }
          .profiles-scroller-vertical { height: 380px; }
          .scroller-section { margin-top: 40px; }
          .profile-card { flex: 0 0 180px; }
          .profile-image { height: 180px; font-size: 2.8rem; }
        }

        @media (max-width: 480px) {
          .header-inner { gap: 16px; padding: 28px 12px 20px; }
          .header-logo { width: 56px; height: 56px; }
          .header-title { font-size: clamp(1.6rem, 4vw, 2.2rem); }
          .header-logo-container { gap: 12px; }
          .main { padding: 24px 12px 32px; }
          .section-heading { font-size: clamp(1.2rem, 2.5vw, 1.6rem); margin-bottom: 16px; }
          .section-label { font-size: 0.65rem; }
          .card { padding: 20px 16px; }
          .card-header { gap: 10px; margin-bottom: 20px; padding-bottom: 16px; }
          .card-icon { width: 36px; height: 36px; font-size: 1rem; }
          .card-title { font-size: clamp(1rem, 2.5vw, 1.3rem); }
          .card-subtitle { font-size: 0.7rem; }
          .field label { font-size: 0.7rem; margin-bottom: 6px; }
          .field select, .field input { padding: 10px 12px; font-size: 14px; }
          .btn-primary, .btn-secondary { padding: 12px 20px; font-size: 0.8rem; margin-top: 6px; }
          .stat-card { padding: 24px 16px; }
          .stat-number { font-size: 1.8rem; }
          .stat-label { font-size: 0.7rem; }
          .tip-box { padding: 12px 14px; gap: 10px; margin: 16px 0 6px; }
          .tip-box-text { font-size: 0.75rem; }
          .tip-box-icon { font-size: 1rem; }
          .ornament { gap: 10px; margin-bottom: 6px; }
          .profiles-scroller-vertical { height: 280px; }
          .profile-card-vertical { padding: 6px 8px; gap: 8px; }
          .profile-image-vertical { width: 38px; height: 38px; }
          .profile-name-vertical { font-size: 0.85rem; }
          .scroller-title { font-size: 1.1rem; }
          .scroller-title-icon { font-size: 1.4rem; }
          .profile-card { flex: 0 0 140px; }
          .profile-image { height: 150px; font-size: 2.5rem; }
          .profile-info { padding: 10px; }
          .profile-name { font-size: 0.9rem; }
          .profile-age { font-size: 0.65rem; }
          .ad-carousel { height: 200px; }
          .ad-image { border-radius: 10px; }
          .ad-nav-btn { width: 30px; height: 30px; font-size: 1.2rem; }
          .btn-create-profile { padding: 14px 20px; font-size: 0.9rem; }
        }

        @media (max-width: 360px) {
          .header-logo { display: none; }
          .header-inner { padding: 16px 8px 12px; }
          .header-title { font-size: clamp(1.4rem, 3vw, 1.8rem); }
          .main { padding: 16px 8px 24px; }
          .card { padding: 16px 12px; }
          .field select, .field input { font-size: 13px; }
          .profiles-scroller-vertical { height: 240px; }
          .profile-card { flex: 0 0 120px; }
          .profile-image { height: 130px; font-size: 2rem; }
          .ad-carousel { height: 150px; }
          .ad-nav-btn { width: 28px; height: 28px; }
          .btn-create-profile { padding: 12px 16px; font-size: 0.85rem; }
          .scroller-section { margin-top: 28px; }
          .profiles-scroller { gap: 12px; }
          .scroller-track { gap: 12px; }
        }

        .card {
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          border-radius: 16px;
          padding: clamp(20px, 5vw, 36px) clamp(16px, 4vw, 32px);
          border: 1px solid rgba(201,145,58,0.15);
          box-shadow: var(--shadow-md);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--maroon), var(--gold));
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        .card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-6px);
          border-color: rgba(201,145,58,0.3);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(201,145,58,0.15);
          transition: border-color 0.3s ease;
        }

        .card:hover .card-header {
          border-bottom-color: rgba(201,145,58,0.3);
        }

        .card-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-light) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(123, 28, 46, 0.2);
          transition: all 0.3s ease;
        }

        .card:hover .card-icon {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 6px 20px rgba(123, 28, 46, 0.3);
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem;
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.1;
        }

        .card-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          color: var(--text-light);
          margin-top: 3px;
          letter-spacing: 0.05em;
        }

        /* ── FORM ELEMENTS ── */
        .field { margin-bottom: 20px; }

        .field label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-mid);
          margin-bottom: 8px;
        }

        .field label .req { color: var(--maroon); margin-left: 2px; }

        .field select,
        .field input {
          width: 100%;
          padding: clamp(10px, 2vw, 12px) clamp(12px, 3vw, 16px);
          border: 2px solid rgba(201,145,58,0.2);
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: clamp(13px, 3vw, 0.92rem);
          color: var(--text-dark);
          background: linear-gradient(135deg, var(--cream) 0%, #fbf9f6 100%);
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          appearance: none;
          -webkit-appearance: none;
          min-height: 44px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.04);
        }

        .field select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9913A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .field select:focus,
        .field input:focus {
          border-color: var(--gold-dark);
          box-shadow: 0 0 0 4px rgba(201,145,58,0.15), inset 0 2px 4px rgba(0,0,0,0.04);
          background: #fff;
          transform: translateY(-2px);
        }

        .field input::placeholder {
          color: #bbb;
          font-style: italic;
        }

        .fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* ── BUTTONS ── */
        .btn-primary {
          width: 100%;
          padding: clamp(12px, 2vw, 14px) clamp(16px, 4vw, 24px);
          background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-light) 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: clamp(6px, 2vw, 8px);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          min-height: 44px;
          box-shadow: 0 4px 16px rgba(123, 28, 46, 0.2);
        }

        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,145,58,0.0), rgba(201,145,58,0.3));
          opacity: 0;
          transition: opacity 0.35s;
        }

        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(123,28,46,0.35); }
        .btn-primary:active { transform: translateY(-1px); }

        .btn-secondary {
          width: 100%;
          padding: clamp(12px, 2vw, 14px) clamp(16px, 4vw, 24px);
          background: transparent;
          color: var(--maroon);
          border: 2px solid var(--maroon);
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: clamp(6px, 2vw, 8px);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 44px;
        }

        .btn-secondary:hover {
          background: var(--maroon);
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(123,28,46,0.25);
          border-color: var(--maroon);
        }

        .btn-create-profile {
          width: 100%;
          padding: clamp(12px, 2vw, 14px) clamp(16px, 4vw, 24px);
          background: linear-gradient(135deg, #E8B76A 0%, #C9913A 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 0;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          min-height: 44px;
          box-shadow: 0 4px 16px rgba(201, 145, 58, 0.3), 0 0 20px rgba(232, 183, 106, 0.4);
        }

        .btn-create-profile::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.0), rgba(255,255,255,0.2));
          opacity: 0;
          transition: opacity 0.35s;
        }

        .btn-create-profile:hover::after { opacity: 1; }
        .btn-create-profile:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 8px 28px rgba(201,145,58,0.5), 0 0 30px rgba(232, 183, 106, 0.6); 
        }
        .btn-create-profile:active { transform: translateY(-1px); }

        /* ── PROFILE SCROLLERS ── */
        .scroller-section {
          margin-top: 48px;
        }

        .scroller-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .scroller-title-icon {
          font-size: 1.4rem;
        }

        .profiles-scroller {
          display: flex;
          gap: 20px;
          overflow: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--gold) transparent;
          position: relative;
        }

        .scroller-track {
          display: flex;
          gap: 20px;
          animation: scrollLoop 60s linear infinite;
        }

        .scroller-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .profile-card {
          flex: 0 0 200px;
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 2px solid rgba(201, 145, 58, 0.15);
        }

        .profile-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 24px rgba(123, 28, 46, 0.2);
          border-color: rgba(201, 145, 58, 0.4);
        }

        .profile-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--maroon-light) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .profile-info {
          padding: 14px;
          text-align: center;
        }

        .profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 4px;
        }

        .profile-age {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          color: var(--text-light);
          letter-spacing: 0.05em;
        }

        /* ── REGISTRATION MODAL ── */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(42, 24, 16, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(123, 28, 46, 0.3);
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
          background: linear-gradient(135deg, #27A74A 0%, #1F8A3D 100%);
          padding: 28px 24px;
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .modal-header::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 12px);
        }

        .modal-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          position: relative;
          z-index: 2;
          letter-spacing: 0.02em;
        }

        .modal-body { padding: 32px 24px; }

        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-dark);
          text-align: center;
          margin-bottom: 28px;
        }

        .modal-form-group { margin-bottom: 20px; }

        .modal-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-mid);
          margin-bottom: 8px;
        }

        .modal-select,
        .modal-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #ccc;
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          color: var(--text-dark);
          background: #fff;
          outline: none;
          transition: all 0.3s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .modal-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .modal-select:focus,
        .modal-input:focus {
          border-color: var(--gold-dark);
          box-shadow: 0 0 0 4px rgba(201,145,58,0.15);
        }

        .modal-form-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 12px;
        }

        .modal-phone-code {
          border: 2px solid #ccc;
          border-radius: 10px;
          padding: 12px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          color: var(--text-dark);
          background: #f5f5f5;
          outline: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .modal-phone-code:focus { border-color: var(--gold-dark); }

        .modal-button {
          width: 100%;
          padding: 14px 20px;
          background: linear-gradient(135deg, #FF8C00 0%, #E67E22 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          box-shadow: 0 4px 16px rgba(255, 140, 0, 0.3);
        }

        .modal-button:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255, 140, 0, 0.4); }
        .modal-button:active { transform: translateY(0); }

        .modal-disclaimer {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          color: var(--text-light);
          text-align: center;
          margin-top: 16px;
          line-height: 1.5;
        }

        .modal-disclaimer a {
          color: var(--maroon);
          text-decoration: underline;
          cursor: pointer;
        }

        .modal-close-btn {
          position: absolute;
          top: 16px; right: 16px;
          width: 36px; height: 36px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-close-btn:hover { background: rgba(255, 255, 255, 0.3); }
        .modal-close-btn:active { transform: scale(0.9); }

        /* ── TIP BOX ── */
        .tip-box {
          background: linear-gradient(135deg, #fdf1e4 0%, #fdf8f2 100%);
          border: 2px solid rgba(201,145,58,0.25);
          border-radius: 10px;
          padding: 16px 18px;
          margin: 20px 0 8px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          box-shadow: 0 2px 8px rgba(201,145,58,0.08);
          transition: all 0.3s ease;
        }

        .tip-box:hover {
          border-color: rgba(201,145,58,0.4);
          box-shadow: 0 4px 16px rgba(201,145,58,0.12);
          transform: translateX(2px);
        }

        .tip-box-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }

        .tip-box-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          color: var(--text-mid);
          line-height: 1.6;
        }

        .tip-box-text strong { color: var(--gold); font-weight: 600; }

        /* ── ORNAMENT ── */
        .ornament {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 16px);
          margin-bottom: clamp(4px, 1vw, 8px);
          animation: fadeInSlide 0.6s ease;
        }

        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ornament-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(201,145,58,0.4), transparent);
          transition: all 0.3s ease;
        }

        .ornament:hover .ornament-line {
          background: linear-gradient(to right, transparent, rgba(201,145,58,0.6), transparent);
          height: 3px;
        }

        .ornament-diamond {
          width: 8px; height: 8px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          transform: rotate(45deg);
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(201,145,58,0.3);
          transition: all 0.3s ease;
        }

        .ornament:hover .ornament-diamond {
          transform: rotate(45deg) scale(1.2);
          box-shadow: 0 4px 12px rgba(201,145,58,0.5);
        }

        /* ── AD CAROUSEL ── */
        .ad-carousel {
          position: relative;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(201,145,58,0.15);
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          margin-top: auto;
        }

        .ad-carousel:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-6px);
          border-color: rgba(201,145,58,0.3);
        }

        .ad-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .ad-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
        }

        .ad-image.fade-out {
          opacity: 0;
          position: absolute;
          top: 0; left: 0;
        }

        .ad-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .ad-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ad-dot.active {
          background: rgba(201, 145, 58, 0.8);
          border-color: rgba(201, 145, 58, 1);
          transform: scale(1.2);
        }

        .ad-dot:hover { background: rgba(255, 255, 255, 0.7); }

        .ad-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          z-index: 5;
        }

        .ad-nav-btn:hover {
          background: rgba(255, 255, 255, 0.4);
          border-color: rgba(255, 255, 255, 0.7);
          transform: translateY(-50%) scale(1.1);
        }

        .ad-nav-btn.prev { left: 16px; }
        .ad-nav-btn.next { right: 16px; }

        /* ── ANNOUNCEMENT BAR ── */
        .top-scroll-bar {
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%);
          padding: 10px 0;
          box-shadow: 0 4px 12px rgba(123, 28, 46, 0.2);
        }

        .top-scroll-bar:hover .scroll-text {
          animation-play-state: paused;
        }

        .scroll-row {
          display: flex;
          gap: 0;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
        }

        .scroll-text {
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.75rem, 1.5vw, 0.9rem);
          color: var(--gold-light);
          font-weight: 500;
          letter-spacing: 0.05em;
          padding-left: 100%;
          padding-right: 30px;
          will-change: transform;
          animation: scrollLeft 50s linear infinite;
          flex-shrink: 0;
          display: inline-block;
        }

        @keyframes scrollLeft {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }

        /* ── VERTICAL CAROUSEL HEADER ── */
        .vertical-carousel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px 0;
          margin-bottom: 0;
        }

        .vertical-carousel-title {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }

        .vertical-carousel-count {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          color: var(--text-light);
          background: rgba(201,145,58,0.1);
          padding: 2px 7px;
          border-radius: 10px;
        }

        /* ── GENDER LABEL BAR ── */
        .gender-label-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px 4px;
          border-bottom: 1px solid rgba(201,145,58,0.12);
        }

        .gender-label-icon {
          font-size: 0.85rem;
        }

        .gender-label-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .gender-label-count {
          margin-left: auto;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          color: var(--text-light);
          background: rgba(201,145,58,0.1);
          padding: 1px 6px;
          border-radius: 8px;
        }
      `}</style>

      {/* Combined Announcement Bar */}
      <div className="top-scroll-bar">
        <div className="scroll-row">
          <span className="scroll-text">✨ Chennai Profiles – Find your perfect life partner ❤️ | Verified Profiles | 100% Secure | Tamil & English Support | Register Now ✨ | சென்னை ப்ரொஃபைல்ஸ் – உங்கள் வாழ்க்கை துணையை இன்று கண்டுபிடிக்கவும் ❤️ | உறுதிப்படுத்தப்பட்ட ப்ரொஃபைல்கள் | பாதுகாப்பான சேவை | இப்போது பதிவு செய்யுங்கள் ✨</span>
        </div>
      </div>

      {/* Toast */}
      {feedbackMessage && (
        <div className="toast">{feedbackMessage}</div>
      )}

      {/* Main */}
      <main className="main">

        <div className="section-label">{t('home.beginJourney')}</div>
        <div className="ornament">
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>
        <div className="section-heading">{t('home.title')}</div>

        <div className="cards-grid">

          {/* Left Column */}
          <div className="cards-column-left">
            {/* Create New Profile Button */}
            <div style={{marginTop: '0', marginBottom: '8px'}}>
              <button type="button" className="btn-create-profile" onClick={() => setShowRegistrationModal(true)}>
                <span>{t('home.createNewProfile')}</span>
              </button>
            </div>

            {/* Quick Search Card */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon">🔍</div>
                <div>
                  <div className="card-title">{t('home.quickSearch')}</div>
                  <div className="card-subtitle">{t('home.quickSearchSubtitle')}</div>
                </div>
              </div>

              <form onSubmit={handleQuickSearchSubmit}>
                <div className="field">
                  <label>{t('home.regNumber')}</label>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder={t('home.regNumberPlaceholder')}
                  />
                </div>

                <div className="fields-row">
                  <div className="field">
                    <label>{t('home.gender')}</label>
                    <select name="gender" value={quickSearch.gender} onChange={handleQuickSearchChange}>
                      <option value="">{t('common.select')}</option>
                      <option value="Male">{t('home.genderMale')}</option>
                      <option value="Female">{t('home.genderFemale')}</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>{t('home.language')}</label>
                    <select name="language" value={quickSearch.language} onChange={handleQuickSearchChange}>
                      <option value="">{t('common.select')}</option>
                      <option value="Any">{t('home.languageAny')}</option>
                      <option value="Tamil">{t('home.languageTamil')}</option>
                      <option value="Telugu">{t('home.languageTelugu')}</option>
                      <option value="Malayalam">{t('home.languageMalayalam')}</option>
                      <option value="Hindi">{t('home.languageHindi')}</option>
                    </select>
                  </div>
                </div>

                <div className="fields-row">
                  <div className="field">
                    <label>{t('home.caste')}</label>
                    <select name="caste" value={quickSearch.caste} onChange={handleQuickSearchChange}>
                      <option value="">{t('common.select')}</option>
                      {casteOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>{t('home.subcaste')}</label>
                    <select name="subcaste" value={quickSearch.subcaste} onChange={handleQuickSearchChange}>
                      <option value="">Select</option>
                      <option value="Any">Any</option>
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  <span>{t('home.findProfile')}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* Our Other Services Heading */}
            <div className="ornament">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line" />
            </div>
            <div className="section-heading">{t('home.otherServicesTitle') || 'Our Other Services'}</div>

            {/* Advertisement Carousel */}
            <div className="ad-carousel">
              <div className="ad-image-container">
                {adImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Advertisement ${index + 1}`}
                    className="ad-image"
                    style={{
                      opacity: index === adIndex ? 1 : 0,
                      position: index === adIndex ? 'relative' : 'absolute',
                      transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ))}
              </div>
              <button className="ad-nav-btn prev" onClick={() => setAdIndex((prev) => (prev - 1 + adImages.length) % adImages.length)} aria-label="Previous ad">‹</button>
              <button className="ad-nav-btn next" onClick={() => setAdIndex((prev) => (prev + 1) % adImages.length)} aria-label="Next ad">›</button>
              <div className="ad-dots">
                {adImages.map((_, index) => (
                  <button key={index} className={`ad-dot ${index === adIndex ? 'active' : ''}`} onClick={() => setAdIndex(index)} aria-label={`Go to ad ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - WhatsApp + Split Male/Female Vertical Carousels */}
          <div className="cards-column-right">
            {/* WhatsApp Contact Card */}
            <a href="https://wa.me/9715976299" target="_blank" rel="noopener noreferrer" className="whatsapp-card" title="Contact us on WhatsApp">
              <span className="whatsapp-card-text">{t('home.whatsappCardText')}</span>
              <img src="/assets/whatsapp_contact_edit.png" alt="WhatsApp Contact" className="whatsapp-card-image"
                onError={(e) => { e.target.style.display = 'none'; }} />
            </a>

            {/* Split Male / Female Vertical Carousels */}
            <div className="split-carousel-container">

              {/* ── MALE CAROUSEL ── */}
              <div className="vertical-carousel-wrapper">
                <div className="gender-label-bar">
                  <span className="gender-label-icon">👨</span>
                  <span className="gender-label-text" style={{ color: '#1a6ea8' }}>Grooms</span>
                  <span className="gender-label-count">{DUMMY_MALE.length}</span>
                </div>
                <div
                  className="profiles-scroller-vertical"
                  ref={maleScrollRef}
                  onMouseEnter={() => setIsPausedMale(true)}
                  onMouseLeave={() => setIsPausedMale(false)}
                >
                  {DUMMY_MALE_LOOP.map((profile, index) => {
                    const [bg, fg] = maritalColor(profile.marital);
                    return (
                      <div
                        key={`m-${profile.id}-${index}`}
                        className="profile-card-vertical"
                        onClick={() => navigate(`/detail/${profile.id}`, { state: { profile } })}
                      >
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="profile-image-vertical"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=1a6ea8&color=fff&size=80`;
                          }}
                        />
                        <div className="profile-info-vertical">
                          <div className="profile-name-vertical">{profile.name}</div>
                          <div className="profile-age-vertical">{profile.age} yrs · {profile.caste}</div>
                        </div>
                        <span
                          className="profile-badge-vertical"
                          style={{ background: bg, color: fg }}
                        >
                          {profile.marital === 'Awaiting Divorce' ? 'Await.' : profile.marital}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── FEMALE CAROUSEL ── */}
              <div className="vertical-carousel-wrapper">
                <div className="gender-label-bar">
                  <span className="gender-label-icon">👩</span>
                  <span className="gender-label-text" style={{ color: '#c0392b' }}>Brides</span>
                  <span className="gender-label-count">{DUMMY_FEMALE.length}</span>
                </div>
                <div
                  className="profiles-scroller-vertical"
                  ref={femaleScrollRef}
                  onMouseEnter={() => setIsPausedFemale(true)}
                  onMouseLeave={() => setIsPausedFemale(false)}
                >
                  {DUMMY_FEMALE_LOOP.map((profile, index) => {
                    const [bg, fg] = maritalColor(profile.marital);
                    return (
                      <div
                        key={`f-${profile.id}-${index}`}
                        className="profile-card-vertical"
                        onClick={() => navigate(`/detail/${profile.id}`, { state: { profile } })}
                      >
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="profile-image-vertical"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c0392b&color=fff&size=80`;
                          }}
                        />
                        <div className="profile-info-vertical">
                          <div className="profile-name-vertical">{profile.name}</div>
                          <div className="profile-age-vertical">{profile.age} yrs · {profile.caste}</div>
                        </div>
                        <span
                          className="profile-badge-vertical"
                          style={{ background: bg, color: fg }}
                        >
                          {profile.marital === 'Awaiting Divorce' ? 'Await.' : profile.marital}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>{/* end split-carousel-container */}
          </div>
        </div>

        {/* Profile Scrollers */}
        <div className="scroller-section">
          {/* Male Profiles Scroller */}
          <div>
            <div className="scroller-title">
              <span className="scroller-title-icon">👨</span>
              <span>{t('home.findMaleProfiles')}</span>
            </div>
            <div className="profiles-scroller">
              <div className="scroller-track">
                {loopMaleProfiles.map((profile, index) => (
                  <div
                    key={index}
                    className="profile-card"
                    onClick={() => navigate(`/detail/${profile.id}`, { state: { profile } })}
                  >
                    <div className="profile-image">👤</div>
                    <div className="profile-info">
                      <div className="profile-name">{profile.name}</div>
                      <div className="profile-age">{profile.age} years</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Female Profiles Scroller */}
          <div style={{marginTop: '40px'}}>
            <div className="scroller-title">
              <span className="scroller-title-icon">👩</span>
              <span>{t('home.findFemaleProfiles')}</span>
            </div>
            <div className="profiles-scroller">
              <div className="scroller-track">
                {loopFemaleProfiles.map((profile, index) => (
                  <div
                    key={index}
                    className="profile-card"
                    onClick={() => navigate(`/detail/${profile.id}`, { state: { profile } })}
                  >
                    <div className="profile-image">👤</div>
                    <div className="profile-info">
                      <div className="profile-name">{profile.name}</div>
                      <div className="profile-age">{profile.age} years</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="modal-overlay" onClick={() => setShowRegistrationModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close-btn" onClick={() => setShowRegistrationModal(false)}>✕</button>
              <div className="modal-header-title">{t('login.headerTitle')}</div>
            </div>
            <div className="modal-body">
              <div className="modal-title">{t('login.subtitle')}</div>
              <form onSubmit={(e) => {
                e.preventDefault();
                setFeedbackMessage(t('login.registrationInProgress'));
                setShowRegistrationModal(false);
                setTimeout(() => setFeedbackMessage(''), 3000);
              }}>
                <div className="modal-form-group">
                  <label className="modal-label">{t('login.profileCreatedFor')}</label>
                  <select className="modal-select" value={registrationData.createdFor} onChange={(e) => setRegistrationData({...registrationData, createdFor: e.target.value})} required>
                    <option value="">{t('login.selectOption')}</option>
                    <option value="Myself">{t('login.myself')}</option>
                    <option value="Daughter">{t('login.daughter')}</option>
                    <option value="Son">{t('login.son')}</option>
                    <option value="Sister">{t('login.sister')}</option>
                    <option value="Brother">{t('login.brother')}</option>
                    <option value="Relative">{t('login.relative')}</option>
                    <option value="Friend">{t('login.friend')}</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">{t('login.enterName')}</label>
                  <input type="text" className="modal-input" placeholder={t('login.enterNamePlaceholder')} value={registrationData.name} onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})} required />
                </div>
                <div className="modal-form-group">
                  <label className="modal-label">{t('login.phoneNumber')}</label>
                  <div className="modal-form-row">
                    <select className="modal-phone-code" value={registrationData.countryCode} onChange={(e) => setRegistrationData({...registrationData, countryCode: e.target.value})}>
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                    </select>
                    <input type="tel" className="modal-input" placeholder={t('login.enterNumber')} value={registrationData.phone} onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})} required />
                  </div>
                </div>
                <button type="submit" className="modal-button">
                  <span>{t('login.registerFree')}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="modal-disclaimer">
                  {t('login.disclaimer')} <a href="#">{t('login.termsConditions')}</a> {t('login.and')} <a href="#">{t('login.privacyPolicy')}</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Search Result Modal */}
      {showSearchResultModal && searchResult && (
        <div className="modal-overlay" onClick={() => setShowSearchResultModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close-btn" onClick={() => setShowSearchResultModal(false)}>✕</button>
              <div className="modal-header-title">{t('detail.profileDetails')}</div>
            </div>
            <div className="modal-body">
              <div style={{ background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "2px solid rgba(201, 145, 58, 0.15)" }}>
                <img
                  src={searchResult.photo}
                  alt={searchResult.name}
                  style={{ width: "100%", height: 240, objectFit: "cover", background: "linear-gradient(135deg, #fdecea, #fff)" }}
                  onError={(e) => { e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(searchResult.name)}&background=c0392b&color=fff&size=280`; }}
                />
                <div style={{ padding: "16px 14px" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{searchResult.name}</div>
                  <div style={{ fontSize: 11, color: "#999", fontFamily: "Georgia,serif", marginBottom: 10, background: "#fdecea", color: "#c0392b", padding: "3px 9px", borderRadius: 4, display: "inline-block" }}>{searchResult.regId}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12, marginTop: 8 }}>
                    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 16, fontSize: 11, fontWeight: 600, fontFamily: "Georgia,serif", background: searchResult.gender === "Male" ? "#e8f4fd" : "#fde8f0", color: searchResult.gender === "Male" ? "#1a6ea8" : "#c0392b" }}>
                      {getLabel(genderOptions, searchResult.gender)}
                    </span>
                    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 16, fontSize: 11, fontWeight: 600, fontFamily: "Georgia,serif", background: "#f5f5f5", color: "#666" }}>{searchResult.age} {t("detail.yrs")}</span>
                    {(() => {
                      const [bg, fg] = maritalColor(searchResult.marital);
                      return (
                        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 16, fontSize: 11, fontWeight: 600, fontFamily: "Georgia,serif", background: bg, color: fg }}>
                          {getLabel(maritalOptions, searchResult.marital)}
                        </span>
                      );
                    })()}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12, fontSize: 12, color: "#666", fontFamily: "Georgia,serif" }}>
                    <div><span style={{ fontWeight: 700, color: "#7B1C2E" }}>{t("search.casteLabel")}:</span> {searchResult.caste}</div>
                    <div><span style={{ fontWeight: 700, color: "#7B1C2E" }}>{t("search.languageLabel")}:</span> {getLabel(languageOptions, searchResult.language)}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                    <button
                      onClick={() => { setShowSearchResultModal(false); navigate(`/detail/${searchResult.id}`, { state: { profile: searchResult } }); }}
                      style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: "Georgia,serif", fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg, #7B1C2E, #9B2A40)", color: "#fff", transition: "all 0.2s" }}
                      onMouseOver={(e) => e.target.style.background = "linear-gradient(135deg, #5A1620, #7B1C2E)"}
                      onMouseOut={(e) => e.target.style.background = "linear-gradient(135deg, #7B1C2E, #9B2A40)"}
                    >
                      {t("search.moreDetails") || "More Details"}
                    </button>
                    <button
                      onClick={() => setShowContact(!showContact)}
                      style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", fontSize: 12, fontFamily: "Georgia,serif", fontWeight: 600, cursor: "pointer", background: "#f0f0f0", color: "#333", transition: "all 0.2s" }}
                      onMouseOver={(e) => e.target.style.background = "#e8e8e8"}
                      onMouseOut={(e) => e.target.style.background = "#f0f0f0"}
                    >
                      {showContact ? `✕ ${t('common.hide')}` : `📞 ${t('common.contact')}`}
                    </button>
                  </div>
                  {showContact && (
                    <div style={{ background: "#fdecea", padding: "10px 12px", borderRadius: 6, marginTop: 10, textAlign: "center", border: "1px solid #e0c8c8" }}>
                      <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{t("search.phoneLabel") || "Phone"}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#7B1C2E", fontFamily: "monospace", letterSpacing: "1px" }}>{maskPhone(searchResult.phone)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Results Modal */}
      {showFilterResultsModal && (
        <div className="modal-overlay" onClick={() => setShowFilterResultsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close-btn" onClick={() => setShowFilterResultsModal(false)}>✕</button>
              <div className="modal-header-title">{t('home.searchResults') || 'Search Results'}</div>
            </div>
            <div className="modal-body">
              <div style={{ fontSize: 12, color: "#666", marginBottom: 16, textAlign: "center" }}>
                Found {filteredResults.length} {filteredResults.length === 1 ? 'profile' : 'profiles'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr', gap: 16, maxHeight: '60vh', overflowY: 'auto' }}>
                {filteredResults.map((profile) => (
                  <div key={profile.id} style={{ background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "2px solid rgba(201, 145, 58, 0.15)", transition: "all 0.3s ease" }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(123,28,46,0.2)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"; }}>
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      style={{ width: "100%", height: 160, objectFit: "cover", background: "linear-gradient(135deg, #fdecea, #fff)" }}
                      onError={(e) => { e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c0392b&color=fff&size=200`; }}
                    />
                    <div style={{ padding: "14px 12px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{profile.name}</div>
                      <div style={{ fontSize: 11, color: "#999", fontFamily: "Georgia,serif", marginBottom: 8, background: "#fdecea", color: "#c0392b", padding: "3px 9px", borderRadius: 4, display: "inline-block" }}>{profile.regId}</div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10, marginTop: 6 }}>
                        <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "Georgia,serif", background: profile.gender === "Male" ? "#e8f4fd" : "#fde8f0", color: profile.gender === "Male" ? "#1a6ea8" : "#c0392b" }}>
                          {profile.gender}
                        </span>
                        <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "Georgia,serif", background: "#fff3e0", color: "#d35400" }}>
                          {profile.language}
                        </span>
                        <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "Georgia,serif", background: "#f0f0f0", color: "#666" }}>
                          {profile.caste}
                        </span>
                      </div>
                      <button
                        onClick={() => { setShowFilterResultsModal(false); navigate(`/detail/${profile.id}`, { state: { profile } }); }}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: 6, border: "none", fontSize: 11, fontFamily: "Georgia,serif", fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg, #7B1C2E, #9B2A40)", color: "#fff", transition: "all 0.2s" }}
                        onMouseOver={(e) => e.target.style.background = "linear-gradient(135deg, #5A1620, #7B1C2E)"}
                        onMouseOut={(e) => e.target.style.background = "linear-gradient(135deg, #7B1C2E, #9B2A40)"}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
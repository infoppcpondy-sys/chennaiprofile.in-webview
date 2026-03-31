import { useState } from "react";

const WHY_CHOOSE = [
  { icon: "✅", title: "Verified Profiles", desc: "Every profile on our platform undergoes a thorough manual and document-based verification process to ensure authenticity and build trust among our members." },
  { icon: "📱", title: "Easy-to-Use Platform", desc: "Our intuitive, clutter-free interface makes it simple to create a profile, search for matches, and connect — whether you're on mobile, tablet, or desktop." },
  { icon: "🔐", title: "Secure Data Handling", desc: "Your personal information is encrypted and stored securely. We never sell your data to third parties and give you full control over your privacy settings." },
  { icon: "🎧", title: "Dedicated Support", desc: "Our trained customer support team is available 6 days a week to assist you with profile setup, match queries, and any concerns you may have." },
  { icon: "💡", title: "Smart Matching", desc: "Our intelligent recommendation engine factors in religion, caste, education, horoscope compatibility, and personal preferences to suggest the most relevant matches." },
  { icon: "🌐", title: "Tamil Cultural Values", desc: "We celebrate Chennai's rich cultural heritage. Our platform is designed with a deep understanding of Tamil traditions, customs, and family values." },
];

const SERVICES = [
  { icon: "📝", title: "Profile Creation", desc: "Create a detailed, photo-enabled profile showcasing your personality, background, horoscope, and preferences in just a few minutes.", color: "#fdecea" },
  { icon: "🔍", title: "Partner Search", desc: "Use our advanced multi-filter search to find profiles by caste, sub-caste, age, education, occupation, location, and much more.", color: "#fff3e0" },
  { icon: "💑", title: "Match Recommendations", desc: "Receive daily curated match suggestions based on your preferences and compatibility score, delivered to your inbox or dashboard.", color: "#e8fdf0" },
  { icon: "👑", title: "Premium Membership", desc: "Unlock unlimited contact viewing, priority profile placement, horoscope matching tools, and exclusive access to premium verified profiles.", color: "#f3e8fd" },
];

const STORIES = [
  { names: "Aravind & Priya", since: "Married Jan 2023", location: "Mylapore, Chennai", quote: "We never imagined an online platform would feel so personal. Within three months of joining, we found each other and knew it was meant to be. Our families are so grateful.", avatar1: "https://i.pravatar.cc/80?img=11", avatar2: "https://i.pravatar.cc/80?img=47", stars: 5 },
  { names: "Karthik & Deepa", since: "Married May 2023", location: "T. Nagar, Chennai", quote: "The verification process gave our parents confidence. We exchanged horoscopes through the platform, met twice, and the rest is history. Truly a blessing.", avatar1: "https://i.pravatar.cc/80?img=15", avatar2: "https://i.pravatar.cc/80?img=44", stars: 5 },
  { names: "Suresh & Kavitha", since: "Married Oct 2024", location: "Adyar, Chennai", quote: "As a working professional I had very little time to search. The daily recommendations were spot on. Kavitha was suggested on my first week — I should have joined sooner!", avatar1: "https://i.pravatar.cc/80?img=17", avatar2: "https://i.pravatar.cc/80?img=48", stars: 5 },
];

const TEAM = [
  { name: "Mr. Rajasekar M", role: "Founder & CEO", icon: "👨‍💼", desc: "25+ years in community services" },
  { name: "Ms. Ananya K", role: "Head of Operations", icon: "👩‍💼", desc: "Ensuring seamless user experience" },
  { name: "Mr. Vignesh S", role: "Technology Lead", icon: "👨‍💻", desc: "Building secure, smart systems" },
  { name: "Ms. Lavanya R", role: "Customer Relations", icon: "👩‍🎧", desc: "Dedicated to member satisfaction" },
];

const STATS = [
  { value: "1,20,000+", label: "Registered Profiles" },
  { value: "18,500+", label: "Successful Matches" },
  { value: "98%", label: "Verified Profiles" },
  { value: "15+", label: "Years of Service" },
];

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeStory, setActiveStory] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }

        /* ── NAV ── */
        .au-nav { background: #fff; border-bottom: 2px solid #f5e0e0; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 16px rgba(192,57,43,0.08); }
        .au-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .au-nav-logo-icon { width: 38px; height: 38px; background: linear-gradient(135deg, #c0392b, #e74c3c); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .au-nav-logo-text { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 900; color: #c0392b; }
        .au-nav-links { display: flex; align-items: center; gap: 24px; }
        .au-nav-link { font-family: 'Crimson Pro', serif; font-size: 15px; color: #555; text-decoration: none; transition: color 0.2s; }
        .au-nav-link:hover { color: #c0392b; }
        .au-nav-link.active { color: #c0392b; font-weight: 600; }
        .au-nav-cta { background: linear-gradient(135deg, #c0392b, #e74c3c); color: #fff; border: none; padding: 8px 20px; border-radius: 6px; font-size: 13px; font-family: 'Playfair Display', serif; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .au-nav-cta:hover { box-shadow: 0 4px 14px rgba(192,57,43,0.35); transform: translateY(-1px); }

        /* ── HERO ── */
        .au-hero { background: linear-gradient(135deg, #7b1111 0%, #c0392b 45%, #e74c3c 80%, #ff6b6b 100%); min-height: 88vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 24px; text-align: center; position: relative; overflow: hidden; }
        .au-hero::before { content:''; position:absolute; inset:0; background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.04) 0%, transparent 50%); }
        .au-hero::after { content:'💍'; position:absolute; right:8%; bottom:10%; font-size:160px; opacity:0.05; transform:rotate(-15deg); pointer-events:none; }
        .au-hero-ornament { position:absolute; top:12%; left:6%; font-size:80px; opacity:0.06; transform:rotate(20deg); }
        .au-hero-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); border-radius:50px; padding:7px 22px; margin-bottom:24px; backdrop-filter:blur(6px); animation:fadeUp 0.6s ease both; }
        .au-hero-tag span { font-size:11px; color:#fff; letter-spacing:2.5px; font-weight:700; text-transform:uppercase; font-family:'Playfair Display',serif; }
        .au-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(36px,7vw,72px); font-weight:900; color:#fff; line-height:1.05; margin-bottom:16px; text-shadow:0 4px 30px rgba(0,0,0,0.2); animation:fadeUp 0.7s 0.1s ease both; }
        .au-hero h1 em { font-style:italic; opacity:0.9; }
        .au-hero p { font-family:'Crimson Pro',serif; font-size:clamp(16px,2.5vw,22px); color:rgba(255,255,255,0.88); max-width:620px; line-height:1.7; margin-bottom:36px; font-style:italic; animation:fadeUp 0.7s 0.2s ease both; }
        .au-hero-btns { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; animation:fadeUp 0.7s 0.3s ease both; }
        .btn-hero-p { background:#fff; color:#c0392b; border:none; padding:14px 34px; border-radius:8px; font-size:15px; font-family:'Playfair Display',serif; font-weight:700; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 20px rgba(0,0,0,0.15); }
        .btn-hero-p:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.2); }
        .btn-hero-s { background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.6); padding:14px 30px; border-radius:8px; font-size:15px; font-family:'Playfair Display',serif; font-weight:600; cursor:pointer; transition:all 0.2s; backdrop-filter:blur(4px); }
        .btn-hero-s:hover { background:rgba(255,255,255,0.15); border-color:#fff; }

        /* ── STATS STRIP ── */
        .au-stats { background:#fff; border-top:4px solid #c0392b; padding:0; }
        .au-stats-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .au-stat { padding:28px 20px; text-align:center; border-right:1px solid #f5e0e0; transition:background 0.2s; }
        .au-stat:last-child { border-right:none; }
        .au-stat:hover { background:#fff8f8; }
        .au-stat-val { font-family:'Playfair Display',serif; font-size:clamp(24px,3vw,36px); font-weight:900; color:#c0392b; display:block; }
        .au-stat-lbl { font-family:'Crimson Pro',serif; font-size:14px; color:#888; margin-top:4px; display:block; }

        /* ── SECTION COMMON ── */
        .au-section { padding:80px 24px; }
        .au-section-inner { max-width:1100px; margin:0 auto; }
        .au-section-alt { background:linear-gradient(160deg,#fff8f8 0%,#fff 100%); }
        .au-section-white { background:#fff; }
        .au-section-dark { background:linear-gradient(135deg,#7b1111,#c0392b); }
        .au-label { display:inline-flex; align-items:center; gap:7px; background:#fdecea; border:1px solid #f5c6c6; border-radius:50px; padding:5px 16px; font-size:11px; color:#c0392b; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; font-family:'Playfair Display',serif; margin-bottom:14px; }
        .au-title { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,42px); font-weight:900; color:#c0392b; line-height:1.15; margin-bottom:14px; }
        .au-title-white { color:#fff; }
        .au-subtitle { font-family:'Crimson Pro',serif; font-size:clamp(15px,2vw,18px); color:#777; line-height:1.8; max-width:660px; }
        .au-subtitle-white { color:rgba(255,255,255,0.8); }
        .au-divider { width:56px; height:4px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:2px; margin:16px 0 28px; }
        .au-divider-white { background:rgba(255,255,255,0.5); }
        .section-center { text-align:center; }
        .section-center .au-divider { margin:16px auto 28px; }
        .section-center .au-subtitle { margin:0 auto; }

        /* ── INTRO ── */
        .au-intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
        .au-intro-text p { font-family:'Crimson Pro',serif; font-size:16px; color:#555; line-height:1.9; margin-bottom:16px; }
        .au-intro-visual { background:linear-gradient(135deg,#fdecea,#fff5f5); border-radius:20px; padding:32px; border:1px solid #f5c6c6; display:flex; flex-direction:column; gap:16px; box-shadow:0 8px 32px rgba(192,57,43,0.1); }
        .au-intro-card { display:flex; align-items:center; gap:14px; background:#fff; border-radius:12px; padding:14px 16px; border:1px solid #f0dada; box-shadow:0 2px 8px rgba(192,57,43,0.06); }
        .au-intro-card-icon { font-size:22px; flex-shrink:0; }
        .au-intro-card-text { font-family:'Crimson Pro',serif; font-size:14px; color:#444; line-height:1.5; }
        .au-intro-card-text strong { color:#c0392b; display:block; font-size:15px; margin-bottom:2px; }

        /* ── MISSION VISION ── */
        .au-mv-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; }
        .au-mv-card { border-radius:16px; padding:36px 32px; position:relative; overflow:hidden; }
        .au-mv-card-mission { background:linear-gradient(135deg,#c0392b,#e74c3c); color:#fff; }
        .au-mv-card-vision { background:#fff; border:2px solid #f0dada; color:#333; }
        .au-mv-card::before { content:''; position:absolute; bottom:-20px; right:-20px; width:120px; height:120px; border-radius:50%; background:rgba(255,255,255,0.07); }
        .au-mv-card-icon { font-size:40px; margin-bottom:16px; display:block; }
        .au-mv-card h3 { font-family:'Playfair Display',serif; font-size:24px; font-weight:900; margin-bottom:14px; }
        .au-mv-card-mission h3 { color:#fff; }
        .au-mv-card-vision h3 { color:#c0392b; }
        .au-mv-card p { font-family:'Crimson Pro',serif; font-size:15px; line-height:1.8; }
        .au-mv-card-mission p { color:rgba(255,255,255,0.88); }
        .au-mv-card-vision p { color:#666; }
        .au-mv-bullets { list-style:none; margin-top:14px; display:flex; flex-direction:column; gap:8px; }
        .au-mv-bullets li { display:flex; align-items:flex-start; gap:9px; font-family:'Crimson Pro',serif; font-size:14px; }
        .au-mv-card-mission .au-mv-bullets li { color:rgba(255,255,255,0.85); }
        .au-mv-card-vision .au-mv-bullets li { color:#666; }
        .au-mv-bullets li::before { content:'✦'; font-size:10px; margin-top:4px; flex-shrink:0; }
        .au-mv-card-mission .au-mv-bullets li::before { color:rgba(255,255,255,0.6); }
        .au-mv-card-vision .au-mv-bullets li::before { color:#c0392b; }

        /* ── WHY CHOOSE ── */
        .au-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .au-why-card { background:#fff; border:1px solid #f0dada; border-radius:14px; padding:26px 22px; transition:all 0.25s; cursor:default; }
        .au-why-card:hover, .au-why-card.hovered { border-color:#c0392b; box-shadow:0 8px 32px rgba(192,57,43,0.15); transform:translateY(-4px); }
        .au-why-icon { width:52px; height:52px; background:linear-gradient(135deg,#fdecea,#fbd5d5); border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:14px; transition:all 0.25s; }
        .au-why-card:hover .au-why-icon, .au-why-card.hovered .au-why-icon { background:linear-gradient(135deg,#c0392b,#e74c3c); transform:scale(1.1); }
        .au-why-card h3 { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#c0392b; margin-bottom:8px; }
        .au-why-card p { font-family:'Crimson Pro',serif; font-size:14px; color:#666; line-height:1.7; }

        /* ── SERVICES ── */
        .au-services-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; margin-top:40px; }
        .au-service-card { border-radius:16px; padding:28px 24px; border:1px solid #f0dada; transition:all 0.22s; }
        .au-service-card:hover { box-shadow:0 8px 32px rgba(192,57,43,0.14); transform:translateY(-3px); border-color:#c0392b; }
        .au-service-top { display:flex; align-items:center; gap:14px; margin-bottom:12px; }
        .au-service-icon { width:48px; height:48px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
        .au-service-card h3 { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#c0392b; }
        .au-service-card p { font-family:'Crimson Pro',serif; font-size:14.5px; color:#666; line-height:1.75; }

        /* ── STORIES ── */
        .au-stories-nav { display:flex; gap:10px; justify-content:center; margin-top:24px; }
        .au-story-dot { width:10px; height:10px; border-radius:50%; border:2px solid #c0392b; background:transparent; cursor:pointer; transition:all 0.2s; }
        .au-story-dot.active { background:#c0392b; width:28px; border-radius:5px; }
        .au-story-card { max-width:680px; margin:40px auto 0; background:#fff; border:1px solid #f0dada; border-radius:20px; padding:36px 32px; box-shadow:0 8px 36px rgba(192,57,43,0.12); position:relative; overflow:hidden; }
        .au-story-card::before { content:'❝'; position:absolute; top:12px; left:20px; font-size:72px; color:#fdecea; font-family:Georgia; line-height:1; pointer-events:none; }
        .au-story-couple { display:flex; align-items:center; gap:0; justify-content:center; margin-bottom:22px; }
        .au-story-avatar { width:72px; height:72px; border-radius:50%; object-fit:cover; border:3px solid #c0392b; }
        .au-story-heart { font-size:22px; margin:0 -6px; z-index:1; }
        .au-story-quote { font-family:'Crimson Pro',serif; font-size:16px; color:#555; line-height:1.85; text-align:center; font-style:italic; margin-bottom:20px; }
        .au-story-meta { text-align:center; }
        .au-story-names { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#c0392b; display:block; margin-bottom:3px; }
        .au-story-info { font-size:13px; color:#999; font-family:'Crimson Pro',serif; }
        .au-story-stars { color:#f39c12; font-size:16px; display:block; margin-bottom:4px; }

        /* ── TEAM ── */
        .au-team-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:40px; }
        .au-team-card { background:#fff; border:1px solid #f0dada; border-radius:14px; padding:24px 18px; text-align:center; transition:all 0.22s; }
        .au-team-card:hover { box-shadow:0 6px 24px rgba(192,57,43,0.14); transform:translateY(-3px); border-color:#c0392b; }
        .au-team-icon { width:64px; height:64px; background:linear-gradient(135deg,#fdecea,#fbd5d5); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 14px; border:2px solid #f5c6c6; }
        .au-team-card h4 { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:#c0392b; margin-bottom:4px; }
        .au-team-card span { font-size:12px; color:#888; font-family:'Crimson Pro',serif; display:block; }

        /* ── CONTACT ── */
        .au-contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; }
        .au-contact-info { display:flex; flex-direction:column; gap:16px; }
        .au-contact-item { display:flex; align-items:flex-start; gap:16px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); border-radius:14px; padding:18px 20px; backdrop-filter:blur(4px); }
        .au-contact-item-icon { width:44px; height:44px; background:rgba(255,255,255,0.2); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
        .au-contact-item-text label { font-size:11px; color:rgba(255,255,255,0.65); font-family:'Playfair Display',serif; font-weight:700; letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:3px; }
        .au-contact-item-text span { font-size:16px; color:#fff; font-family:'Crimson Pro',serif; font-weight:600; }
        .au-contact-form { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:18px; padding:28px; backdrop-filter:blur(6px); }
        .au-contact-form h3 { font-family:'Playfair Display',serif; color:#fff; font-size:20px; font-weight:700; margin-bottom:20px; }
        .au-field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
        .au-field label { font-size:11px; color:rgba(255,255,255,0.75); font-family:'Playfair Display',serif; font-weight:700; letter-spacing:1px; text-transform:uppercase; }
        .au-field input, .au-field textarea { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:8px; padding:10px 14px; color:#fff; font-family:'Crimson Pro',serif; font-size:14px; outline:none; transition:border-color 0.2s; }
        .au-field input::placeholder, .au-field textarea::placeholder { color:rgba(255,255,255,0.45); }
        .au-field input:focus, .au-field textarea:focus { border-color:rgba(255,255,255,0.6); background:rgba(255,255,255,0.2); }
        .au-field textarea { resize:vertical; min-height:90px; }
        .btn-contact { background:#fff; color:#c0392b; border:none; padding:12px 32px; border-radius:8px; font-size:15px; font-family:'Playfair Display',serif; font-weight:700; cursor:pointer; width:100%; transition:all 0.2s; }
        .btn-contact:hover { background:#fdecea; box-shadow:0 4px 16px rgba(0,0,0,0.15); transform:translateY(-1px); }

        /* ── FOOTER ── */
        .au-footer { background:#1a0505; padding:24px; text-align:center; }
        .au-footer p { color:rgba(255,255,255,0.5); font-size:13px; font-family:'Crimson Pro',serif; }
        .au-footer strong { color:rgba(255,255,255,0.8); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }

        /* ── RESPONSIVE ── */
        @media(max-width:960px) {
          .au-nav-links { display:none; }
          .au-intro-grid { grid-template-columns:1fr; gap:32px; }
          .au-mv-grid { grid-template-columns:1fr; }
          .au-why-grid { grid-template-columns:repeat(2,1fr); }
          .au-team-grid { grid-template-columns:repeat(2,1fr); }
          .au-contact-grid { grid-template-columns:1fr; gap:24px; }
          .au-stats-inner { grid-template-columns:repeat(2,1fr); }
          .au-stat { border-right:none; border-bottom:1px solid #f5e0e0; }
          .au-stat:nth-child(odd) { border-right:1px solid #f5e0e0; }
        }
        @media(max-width:640px) {
          .au-section { padding:56px 16px; }
          .au-why-grid { grid-template-columns:1fr; }
          .au-services-grid { grid-template-columns:1fr; }
          .au-team-grid { grid-template-columns:repeat(2,1fr); }
          .au-story-card { padding:28px 20px; }
          .au-hero-btns { flex-direction:column; align-items:center; }
          .au-hero-btns button { width:100%; max-width:280px; }
          .au-mv-card { padding:26px 22px; }
        }
        @media(max-width:420px) {
          .au-team-grid { grid-template-columns:1fr; }
          .au-stats-inner { grid-template-columns:1fr; }
          .au-stat { border-right:none; }
        }
      `}</style>

      <div style={{ fontFamily:"'Crimson Pro',Georgia,serif" }}>

        {/* ── WHY CHOOSE US ── */}
        <section className="au-section au-section-white">
          <div className="au-section-inner">
            <div className="section-center">
              <div className="au-label" style={{ margin:"0 auto 14px" }}>✦ Why Us</div>
              <h2 className="au-title">Why Choose Chennai Matrimony?</h2>
              <div className="au-divider" style={{ margin:"16px auto" }}/>
              <p className="au-subtitle">We combine cutting-edge technology with deep cultural understanding to deliver an experience unlike any other matrimonial platform.</p>
            </div>
            <div className="au-why-grid">
              {WHY_CHOOSE.map((c,i)=>(
                <div key={i} className={`au-why-card ${hoveredCard===i?"hovered":""}`}
                  onMouseEnter={()=>setHoveredCard(i)} onMouseLeave={()=>setHoveredCard(null)}>
                  <div className="au-why-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="au-section au-section-alt">
          <div className="au-section-inner">
            <div className="section-center">
              <div className="au-label" style={{ margin:"0 auto 14px" }}>✦ What We Offer</div>
              <h2 className="au-title">Our Services</h2>
              <div className="au-divider" style={{ margin:"16px auto" }}/>
              <p className="au-subtitle">From free profile creation to premium membership, we offer a suite of services designed to maximize your chances of finding the right match.</p>
            </div>
            <div className="au-services-grid">
              {SERVICES.map((s,i)=>(
                <div key={i} className="au-service-card" style={{ background:s.color }}>
                  <div className="au-service-top">
                    <div className="au-service-icon">{s.icon}</div>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUCCESS STORIES ── */}
        <section className="au-section au-section-white">
          <div className="au-section-inner">
            <div className="section-center">
              <div className="au-label" style={{ margin:"0 auto 14px" }}>✦ Happy Couples</div>
              <h2 className="au-title">Success Stories</h2>
              <div className="au-divider" style={{ margin:"16px auto" }}/>
              <p className="au-subtitle">Over 18,500 couples have found their perfect match through Chennai Matrimony. Here are a few of their beautiful stories.</p>
            </div>
            <div className="au-story-card">
              <div className="au-story-couple">
                <img src={STORIES[activeStory].avatar1} alt="" className="au-story-avatar" onError={e=>{e.target.src=`https://ui-avatars.com/api/?name=Groom&background=c0392b&color=fff&size=72`;}}/>
                <span className="au-story-heart">❤️</span>
                <img src={STORIES[activeStory].avatar2} alt="" className="au-story-avatar" onError={e=>{e.target.src=`https://ui-avatars.com/api/?name=Bride&background=e74c3c&color=fff&size=72`;}}/>
              </div>
              <p className="au-story-quote">"{STORIES[activeStory].quote}"</p>
              <div className="au-story-meta">
                <span className="au-story-stars">{"★".repeat(STORIES[activeStory].stars)}</span>
                <span className="au-story-names">{STORIES[activeStory].names}</span>
                <span className="au-story-info">{STORIES[activeStory].since} · {STORIES[activeStory].location}</span>
              </div>
            </div>
            <div className="au-stories-nav">
              {STORIES.map((_,i)=>(
                <div key={i} className={`au-story-dot ${activeStory===i?"active":""}`} onClick={()=>setActiveStory(i)}/>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

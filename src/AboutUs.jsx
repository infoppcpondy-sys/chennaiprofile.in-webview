import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeStory, setActiveStory] = useState(0);

  const WHY_CHOOSE = t("about.whyChoose", { returnObjects: true });
  const SERVICES   = t("about.services",  { returnObjects: true });
  const STORIES    = t("about.stories",   { returnObjects: true });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }
        .au-label { display:inline-flex; align-items:center; gap:7px; background:#fdecea; border:1px solid #f5c6c6; border-radius:50px; padding:5px 16px; font-size:11px; color:#c0392b; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; font-family:'Playfair Display',serif; margin-bottom:14px; }
        .au-title { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,42px); font-weight:900; color:#c0392b; line-height:1.15; margin-bottom:14px; }
        .au-divider { width:56px; height:4px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:2px; margin:16px auto 28px; }
        .au-subtitle { font-family:'Crimson Pro',serif; font-size:clamp(15px,2vw,18px); color:#777; line-height:1.8; max-width:660px; }
        .section-center { text-align:center; }
        .section-center .au-subtitle { margin:0 auto; }
        .au-section { padding:80px 24px; }
        .au-section-white { background:#fff; }
        .au-section-alt { background:linear-gradient(160deg,#fff8f8 0%,#fff 100%); }

        /* Why grid */
        .au-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:40px; }
        .au-why-card { background:#fff; border:1px solid #f0dada; border-radius:14px; padding:26px 22px; transition:all 0.25s; cursor:default; }
        .au-why-card:hover,.au-why-card.hovered { border-color:#c0392b; box-shadow:0 8px 32px rgba(192,57,43,0.15); transform:translateY(-4px); }
        .au-why-icon { width:52px; height:52px; background:linear-gradient(135deg,#fdecea,#fbd5d5); border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:14px; transition:all 0.25s; }
        .au-why-card:hover .au-why-icon,.au-why-card.hovered .au-why-icon { background:linear-gradient(135deg,#c0392b,#e74c3c); transform:scale(1.1); }
        .au-why-card h3 { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#c0392b; margin-bottom:8px; }
        .au-why-card p { font-family:'Crimson Pro',serif; font-size:14px; color:#666; line-height:1.7; }

        /* Services */
        .au-services-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; margin-top:40px; }
        .au-service-card { border-radius:16px; padding:28px 24px; border:1px solid #f0dada; transition:all 0.22s; }
        .au-service-card:hover { box-shadow:0 8px 32px rgba(192,57,43,0.14); transform:translateY(-3px); border-color:#c0392b; }
        .au-service-top { display:flex; align-items:center; gap:14px; margin-bottom:12px; }
        .au-service-icon { width:48px; height:48px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
        .au-service-card h3 { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#c0392b; }
        .au-service-card p { font-family:'Crimson Pro',serif; font-size:14.5px; color:#666; line-height:1.75; }

        /* Stories */
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

        @media(max-width:960px) {
          .au-why-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:640px) {
          .au-section { padding:56px 16px; }
          .au-why-grid { grid-template-columns:1fr; }
          .au-services-grid { grid-template-columns:1fr; }
          .au-story-card { padding:28px 20px; }
        }
      `}</style>

      <div style={{ fontFamily:"'Crimson Pro',Georgia,serif" }}>

        {/* ── WHY CHOOSE US ── */}
        <section className="au-section au-section-white">
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div className="section-center">
              <div className="au-label" style={{ margin:"0 auto 14px" }}>{t("about.whyUsLabel")}</div>
              <h2 className="au-title">{t("about.whyUsTitle")}</h2>
              <div className="au-divider"/>
              <p className="au-subtitle">{t("about.whyUsSubtitle")}</p>
            </div>
            <div className="au-why-grid">
              {WHY_CHOOSE.map((c, i) => (
                <div key={i} className={`au-why-card ${hoveredCard === i ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}>
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
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div className="section-center">
              <div className="au-label" style={{ margin:"0 auto 14px" }}>{t("about.servicesLabel")}</div>
              <h2 className="au-title">{t("about.servicesTitle")}</h2>
              <div className="au-divider"/>
              <p className="au-subtitle">{t("about.servicesSubtitle")}</p>
            </div>
            <div className="au-services-grid">
              {SERVICES.map((s, i) => (
                <div key={i} className="au-service-card" style={{ background: ["#fdecea","#fff3e0","#e8fdf0","#f3e8fd"][i] }}>
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
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div className="section-center">
              <div className="au-label" style={{ margin:"0 auto 14px" }}>{t("about.storiesLabel")}</div>
              <h2 className="au-title">{t("about.storiesTitle")}</h2>
              <div className="au-divider"/>
              <p className="au-subtitle">{t("about.storiesSubtitle")}</p>
            </div>
            <div className="au-story-card">
              <div className="au-story-couple">
                <img src={`https://i.pravatar.cc/80?img=${[11,15,17][activeStory]}`} alt="" className="au-story-avatar"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=Groom&background=c0392b&color=fff&size=72`; }}/>
                <span className="au-story-heart">❤️</span>
                <img src={`https://i.pravatar.cc/80?img=${[47,44,48][activeStory]}`} alt="" className="au-story-avatar"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=Bride&background=e74c3c&color=fff&size=72`; }}/>
              </div>
              <p className="au-story-quote">"{STORIES[activeStory].quote}"</p>
              <div className="au-story-meta">
                <span className="au-story-stars">{"★".repeat(5)}</span>
                <span className="au-story-names">{STORIES[activeStory].names}</span>
                <span className="au-story-info">{STORIES[activeStory].since} · {STORIES[activeStory].location}</span>
              </div>
            </div>
            <div className="au-stories-nav">
              {STORIES.map((_, i) => (
                <div key={i} className={`au-story-dot ${activeStory === i ? "active" : ""}`} onClick={() => setActiveStory(i)}/>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
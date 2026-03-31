import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(null);

  // Pull sections array and quick stats from JSON translation file
  const sections = t("privacy.sections", { returnObjects: true }) || [];
  const quickStats = t("privacy.quickStats", { returnObjects: true }) || [];
  const complianceBadges = t("privacy.complianceBadges", { returnObjects: true }) || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }

        .pp-wrap { min-height: 100vh; background: linear-gradient(160deg, #fff8f8 0%, #ffffff 55%, #fff5f0 100%); font-family: 'Crimson Pro', Georgia, serif; }

        /* Hero */
        .pp-hero { background: linear-gradient(135deg, #6b0f0f 0%, #c0392b 45%, #e74c3c 100%); padding: 56px 24px 48px; text-align: center; position: relative; overflow: hidden; }
        .pp-hero::before { content:''; position:absolute; inset:0; background: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 60px); }
        .pp-hero::after { content:'🔒'; position:absolute; right:5%; top:50%; transform:translateY(-50%); font-size:120px; opacity:0.06; pointer-events:none; }
        .pp-hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); border-radius:50px; padding:6px 20px; margin-bottom:20px; backdrop-filter:blur(4px); }
        .pp-hero-badge span { font-size:11px; color:#fff; letter-spacing:2px; font-weight:600; text-transform:uppercase; font-family:'Playfair Display',serif; }
        .pp-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(28px,5vw,48px); font-weight:900; color:#fff; margin-bottom:14px; line-height:1.1; text-shadow:0 2px 20px rgba(0,0,0,0.2); }
        .pp-hero p { color:rgba(255,255,255,0.85); font-size:16px; max-width:580px; margin:0 auto 24px; line-height:1.7; font-style:italic; }

        /* Stats strip */
        .pp-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:0; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.15); }
        .pp-stat { padding:14px 10px; text-align:center; border-right:1px solid rgba(255,255,255,0.1); }
        .pp-stat:last-child { border-right:none; }
        .pp-stat .si { font-size:22px; display:block; margin-bottom:3px; }
        .pp-stat .sl { font-size:12px; color:#fff; font-weight:700; font-family:'Playfair Display',serif; display:block; }
        .pp-stat .ss { font-size:11px; color:rgba(255,255,255,0.65); display:block; margin-top:1px; }

        /* Layout */
        .pp-body { max-width:1100px; margin:0 auto; padding:40px 20px 60px; display:grid; grid-template-columns:260px 1fr; gap:32px; }

        /* Sidebar */
        .pp-sidebar { position:sticky; top:24px; align-self:start; display:flex; flex-direction:column; gap:16px; }
        .pp-toc { background:#fff; border:1px solid #f0dada; border-radius:14px; overflow:hidden; box-shadow:0 4px 24px rgba(192,57,43,0.08); }
        .pp-toc-header { background:linear-gradient(135deg,#c0392b,#e74c3c); padding:14px 18px; }
        .pp-toc-header h3 { color:#fff; font-family:'Playfair Display',serif; font-size:14px; font-weight:700; letter-spacing:0.5px; margin:0; }
        .pp-toc-item { display:flex; align-items:center; gap:10px; padding:9px 16px; cursor:pointer; border-bottom:1px solid #fdf0f0; transition:all 0.18s; text-decoration:none; font-size:13px; color:#555; font-family:'Crimson Pro',serif; }
        .pp-toc-item:hover { background:#fff5f5; color:#c0392b; padding-left:22px; }
        .pp-toc-item.active { background:#fdecea; color:#c0392b; font-weight:600; border-left:3px solid #c0392b; }

        /* Compliance card */
        .pp-compliance { background:#fff; border:1px solid #f0dada; border-radius:14px; padding:16px; box-shadow:0 4px 16px rgba(192,57,43,0.07); }
        .pp-compliance h4 { font-family:'Playfair Display',serif; color:#c0392b; font-size:13px; margin-bottom:10px; font-weight:700; }
        .pp-badge { display:inline-flex; align-items:center; gap:6px; background:#fdecea; border:1px solid #f5c6c6; border-radius:6px; padding:5px 10px; font-size:12px; color:#c0392b; font-weight:600; margin:3px; }

        /* Main */
        .pp-main { display:flex; flex-direction:column; gap:22px; }

        .pp-updated { background:#fff; border:1px solid #f0dada; border-radius:10px; padding:14px 20px; display:flex; align-items:center; gap:12px; box-shadow:0 2px 10px rgba(192,57,43,0.06); }
        .pp-updated-dot { width:10px; height:10px; background:#27ae60; border-radius:50%; flex-shrink:0; animation:gpulse 2.5s infinite; }
        @keyframes gpulse { 0%,100%{box-shadow:0 0 0 0 rgba(39,174,96,0.4)} 50%{box-shadow:0 0 0 6px rgba(39,174,96,0)} }
        .pp-updated p { font-size:13px; color:#888; margin:0; font-family:'Crimson Pro',serif; }
        .pp-updated strong { color:#c0392b; }

        /* Section cards */
        .pp-section { background:#fff; border:1px solid #f0dada; border-radius:14px; overflow:hidden; box-shadow:0 2px 16px rgba(192,57,43,0.07); transition:box-shadow 0.2s,transform 0.2s; }
        .pp-section:hover { box-shadow:0 6px 28px rgba(192,57,43,0.13); transform:translateY(-1px); }
        .pp-section-header { display:flex; align-items:center; gap:14px; padding:18px 22px; cursor:pointer; user-select:none; border-bottom:1px solid transparent; transition:border-color 0.2s; }
        .pp-section-header:hover { background:#fff8f8; }
        .pp-section.open .pp-section-header { border-bottom-color:#f0dada; background:#fff8f8; }
        .pp-section-icon { width:42px; height:42px; background:linear-gradient(135deg,#fdecea,#fbd5d5); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .pp-section-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#c0392b; flex:1; }
        .pp-section-chevron { font-size:12px; color:#c0392b; transition:transform 0.25s; }
        .pp-section.open .pp-section-chevron { transform:rotate(180deg); }
        .pp-section-body { padding:0 22px; max-height:0; overflow:hidden; transition:max-height 0.4s ease, padding 0.3s; }
        .pp-section.open .pp-section-body { max-height:2000px; padding:18px 22px 22px; }
        .pp-section-text { font-size:15px; color:#444; line-height:1.8; margin-bottom:14px; }
        .pp-bullets { list-style:none; display:flex; flex-direction:column; gap:9px; }
        .pp-bullets li { display:flex; align-items:flex-start; gap:10px; font-size:14.5px; color:#555; line-height:1.7; }
        .pp-bullets li::before { content:''; width:7px; height:7px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:50%; margin-top:7px; flex-shrink:0; }

        /* Highlight box */
        .pp-highlight { background:linear-gradient(135deg,#fff8f8,#fff); border-left:4px solid #c0392b; border-radius:0 10px 10px 0; padding:16px 20px; box-shadow:0 2px 12px rgba(192,57,43,0.08); }
        .pp-highlight h4 { font-family:'Playfair Display',serif; color:#c0392b; font-size:15px; margin-bottom:8px; font-weight:700; }
        .pp-highlight p { font-size:14px; color:#666; line-height:1.7; }

        /* Bottom note */
        .pp-note { background:linear-gradient(135deg,#fff8f8,#fff); border:1px solid #f0dada; border-radius:14px; padding:20px 22px; box-shadow:0 2px 14px rgba(192,57,43,0.08); }
        .pp-note h3 { font-family:'Playfair Display',serif; color:#c0392b; font-size:16px; margin-bottom:10px; font-weight:700; }
        .pp-note p { font-size:14px; color:#666; line-height:1.8; font-family:'Crimson Pro',serif; }

        /* Footer */
        .pp-footer { background:linear-gradient(135deg,#6b0f0f,#c0392b); padding:28px 24px; text-align:center; margin-top:0; }
        .pp-footer p { color:rgba(255,255,255,0.75); font-size:13px; font-family:'Crimson Pro',serif; }
        .pp-footer strong { color:#fff; }

        /* Responsive */
        @media(max-width:860px) {
          .pp-body { grid-template-columns:1fr; gap:24px; padding:24px 16px 48px; }
          .pp-sidebar { position:static; }
          .pp-toc { display:none; }
          .pp-stats { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:480px) {
          .pp-hero { padding:40px 16px 36px; }
          .pp-stats { grid-template-columns:repeat(2,1fr); }
          .pp-section-title { font-size:15px; }
        }
      `}</style>

      <div className="pp-wrap">

        {/* ── Hero ── */}
        <div className="pp-hero">
          <div className="pp-hero-badge">
            <span>{t("privacy.heroBadge")}</span>
          </div>
          <h1>{t("privacy.heroTitle")}</h1>
          <p>{t("privacy.heroSubtitle")}</p>

          {/* Quick stats strip */}
          <div className="pp-stats">
            {quickStats.map((stat, i) => (
              <div className="pp-stat" key={i}>
                <span className="si">{stat.icon}</span>
                <span className="sl">{stat.label}</span>
                <span className="ss">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pp-body">

          {/* ── Sidebar ── */}
          <aside className="pp-sidebar">
            <nav className="pp-toc">
              <div className="pp-toc-header">
                <h3>{t("privacy.tableOfContents")}</h3>
              </div>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`pp-toc-item ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => setActiveSection(s.id)}
                >
                  <span style={{ fontSize: 14 }}>{s.icon}</span>
                  {s.title}
                </a>
              ))}
            </nav>

            {/* Compliance badges */}
            <div className="pp-compliance">
              <h4>{t("privacy.compliance")}</h4>
              {complianceBadges.map((badge) => (
                <span key={badge} className="pp-badge">{badge}</span>
              ))}
            </div>
          </aside>

          {/* ── Main ── */}
          <main className="pp-main">

            {/* Last updated bar */}
            <div className="pp-updated">
              <div className="pp-updated-dot" />
              <p>
                {t("privacy.lastUpdated")}{" "}
                <strong>{t("privacy.lastUpdatedDate")}</strong>
                {t("privacy.lastUpdatedSuffix")}
              </p>
            </div>

            {/* Privacy commitment highlight */}
            <div className="pp-highlight">
              <h4>{t("privacy.commitment")}</h4>
              <p>{t("privacy.commitmentText")}</p>
            </div>

            {/* Section accordion cards */}
            {sections.map((s) => {
              const isOpen = activeSection === s.id;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className={`pp-section ${isOpen ? "open" : ""}`}
                >
                  <div
                    className="pp-section-header"
                    onClick={() => setActiveSection(isOpen ? null : s.id)}
                  >
                    <div className="pp-section-icon">{s.icon}</div>
                    <div className="pp-section-title">{s.title}</div>
                    <span className="pp-section-chevron">▼</span>
                  </div>
                  <div className="pp-section-body">
                    <p className="pp-section-text">{s.content}</p>
                    {Array.isArray(s.bullets) && s.bullets.length > 0 && (
                      <ul className="pp-bullets">
                        {s.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Important note footer card */}
            <div className="pp-note">
              <h3>{t("privacy.importantNote")}</h3>
              <p>
                {t("privacy.importantNoteText")}{" "}
                <strong style={{ color: "#c0392b" }}>
                  {t("privacy.dpoEmail")}
                </strong>
                .
              </p>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TermsAndConditions() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Pull sections array from JSON translation file
  const sections = t("terms.sections", { returnObjects: true }) || [];

  const handleAccept = () => {
    setAccepted(true);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }

        .tc-wrap { min-height: 100vh; background: linear-gradient(160deg, #fff8f8 0%, #ffffff 50%, #fff5f0 100%); font-family: 'Crimson Pro', Georgia, serif; }

        /* Hero */
        .tc-hero { background: linear-gradient(135deg, #8b0000 0%, #c0392b 45%, #e74c3c 100%); padding: 56px 24px 48px; text-align: center; position: relative; overflow: hidden; }
        .tc-hero::before { content:''; position:absolute; inset:0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        .tc-hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); border-radius:50px; padding:6px 20px; margin-bottom:20px; backdrop-filter:blur(4px); }
        .tc-hero-badge span { font-size:11px; color:#fff; letter-spacing:2px; font-weight:600; text-transform:uppercase; font-family:'Playfair Display',serif; }
        .tc-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(28px,5vw,48px); font-weight:900; color:#fff; margin-bottom:14px; line-height:1.1; text-shadow:0 2px 20px rgba(0,0,0,0.2); }
        .tc-hero p { color:rgba(255,255,255,0.85); font-size:16px; max-width:580px; margin:0 auto 20px; line-height:1.7; font-style:italic; }
        .tc-hero-meta { display:inline-flex; gap:24px; flex-wrap:wrap; justify-content:center; }
        .tc-hero-meta span { font-size:13px; color:rgba(255,255,255,0.75); display:flex; align-items:center; gap:6px; }

        /* Layout */
        .tc-body { max-width:1100px; margin:0 auto; padding:40px 20px 60px; display:grid; grid-template-columns:260px 1fr; gap:32px; }

        /* Sidebar TOC */
        .tc-sidebar { position:sticky; top:24px; align-self:start; }
        .tc-toc { background:#fff; border:1px solid #f0dada; border-radius:14px; overflow:hidden; box-shadow:0 4px 24px rgba(192,57,43,0.08); }
        .tc-toc-header { background:linear-gradient(135deg,#c0392b,#e74c3c); padding:14px 18px; }
        .tc-toc-header h3 { color:#fff; font-family:'Playfair Display',serif; font-size:14px; font-weight:700; letter-spacing:0.5px; margin:0; }
        .tc-toc-item { display:flex; align-items:center; gap:10px; padding:10px 16px; cursor:pointer; border-bottom:1px solid #fdf0f0; transition:all 0.18s; text-decoration:none; font-size:13px; color:#555; font-family:'Crimson Pro',serif; }
        .tc-toc-item:hover { background:#fff5f5; color:#c0392b; padding-left:22px; }
        .tc-toc-item.active { background:#fdecea; color:#c0392b; font-weight:600; border-left:3px solid #c0392b; }
        .tc-toc-item span.icon { font-size:14px; flex-shrink:0; }

        /* Main content */
        .tc-main { display:flex; flex-direction:column; gap:22px; }

        /* Last updated bar */
        .tc-updated { background:#fff; border:1px solid #f0dada; border-radius:10px; padding:14px 20px; display:flex; align-items:center; gap:12px; box-shadow:0 2px 10px rgba(192,57,43,0.06); }
        .tc-updated-dot { width:10px; height:10px; background:#c0392b; border-radius:50%; flex-shrink:0; animation:pulse 2s infinite; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,0.4)} 50%{box-shadow:0 0 0 6px rgba(192,57,43,0)} }
        .tc-updated p { font-size:13px; color:#888; margin:0; font-family:'Crimson Pro',serif; }
        .tc-updated strong { color:#c0392b; }

        /* Section cards */
        .tc-section { background:#fff; border:1px solid #f0dada; border-radius:14px; overflow:hidden; box-shadow:0 2px 16px rgba(192,57,43,0.07); transition:box-shadow 0.2s, transform 0.2s; }
        .tc-section:hover { box-shadow:0 6px 28px rgba(192,57,43,0.13); transform:translateY(-1px); }
        .tc-section-header { display:flex; align-items:center; gap:14px; padding:18px 22px; cursor:pointer; user-select:none; border-bottom:1px solid transparent; transition:border-color 0.2s; }
        .tc-section-header:hover { background:#fff8f8; }
        .tc-section.open .tc-section-header { border-bottom-color:#f0dada; background:#fff8f8; }
        .tc-section-icon { width:42px; height:42px; background:linear-gradient(135deg,#fdecea,#fbd5d5); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .tc-section-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#c0392b; flex:1; }
        .tc-section-chevron { font-size:12px; color:#c0392b; transition:transform 0.25s; }
        .tc-section.open .tc-section-chevron { transform:rotate(180deg); }
        .tc-section-body { padding:0 22px; max-height:0; overflow:hidden; transition:max-height 0.4s ease, padding 0.3s; }
        .tc-section.open .tc-section-body { max-height:2000px; padding:18px 22px 22px; }
        .tc-section-text { font-size:15px; color:#444; line-height:1.8; margin-bottom:14px; font-family:'Crimson Pro',serif; }
        .tc-bullets { list-style:none; display:flex; flex-direction:column; gap:9px; }
        .tc-bullets li { display:flex; align-items:flex-start; gap:10px; font-size:14.5px; color:#555; line-height:1.7; font-family:'Crimson Pro',serif; }
        .tc-bullets li::before { content:''; width:7px; height:7px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:50%; margin-top:7px; flex-shrink:0; }

        /* Accept box */
        .tc-accept { background:linear-gradient(135deg,#fff8f8,#fff); border:2px solid #f0c8c8; border-radius:14px; padding:24px 22px; display:flex; flex-direction:column; gap:16px; box-shadow:0 4px 20px rgba(192,57,43,0.1); }
        .tc-accept-check { display:flex; align-items:flex-start; gap:12px; cursor:pointer; }
        .tc-accept-check input[type=checkbox] { width:18px; height:18px; accent-color:#c0392b; margin-top:3px; cursor:pointer; flex-shrink:0; }
        .tc-accept-check p { font-size:14px; color:#555; line-height:1.7; font-family:'Crimson Pro',serif; }
        .tc-accept-check p strong { color:#c0392b; }
        .tc-accept-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .btn-accept { background:linear-gradient(135deg,#c0392b,#e74c3c); color:#fff; border:none; padding:12px 32px; border-radius:8px; font-size:15px; font-family:'Playfair Display',serif; font-weight:700; cursor:pointer; letter-spacing:0.5px; box-shadow:0 4px 16px rgba(192,57,43,0.3); transition:all 0.2s; }
        .btn-accept:hover:not(:disabled) { background:linear-gradient(135deg,#a93226,#c0392b); transform:translateY(-1px); box-shadow:0 6px 22px rgba(192,57,43,0.4); }
        .btn-accept:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .btn-decline { background:#fff; color:#c0392b; border:1.5px solid #c0392b; padding:12px 28px; border-radius:8px; font-size:15px; font-family:'Playfair Display',serif; font-weight:600; cursor:pointer; transition:all 0.2s; }
        .btn-decline:hover { background:#fdf0ef; }

        /* Banner */
        .tc-banner { position:fixed; top:20px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#27ae60,#2ecc71); color:#fff; padding:14px 28px; border-radius:50px; font-family:'Playfair Display',serif; font-size:14px; font-weight:700; z-index:1000; box-shadow:0 8px 30px rgba(39,174,96,0.4); animation:slideDown 0.3s ease; white-space:nowrap; }
        @keyframes slideDown { from{transform:translateX(-50%) translateY(-60px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }

        /* Footer */
        .tc-footer { background:linear-gradient(135deg,#8b0000,#c0392b); padding:28px 24px; text-align:center; margin-top:40px; }
        .tc-footer p { color:rgba(255,255,255,0.75); font-size:13px; font-family:'Crimson Pro',serif; }
        .tc-footer strong { color:#fff; }

        /* Responsive */
        @media(max-width:860px) {
          .tc-body { grid-template-columns:1fr; gap:24px; padding:24px 16px 48px; }
          .tc-sidebar { position:static; }
          .tc-toc { display:none; }
        }
        @media(max-width:520px) {
          .tc-hero { padding:40px 16px 36px; }
          .tc-hero-meta { gap:14px; }
          .tc-section-title { font-size:15px; }
          .tc-accept-btns { flex-direction:column; }
          .tc-accept-btns button { width:100%; }
        }
      `}</style>

      {/* Toast banner on accept */}
      {showBanner && (
        <div className="tc-banner">{t("terms.acceptedBanner")}</div>
      )}

      <div className="tc-wrap">
        <div className="tc-body">

          {/* ── Sidebar TOC ── */}
          <aside className="tc-sidebar">
            <nav className="tc-toc">
              <div className="tc-toc-header">
                <h3>{t("terms.tableOfContents")}</h3>
              </div>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`tc-toc-item ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => setActiveSection(s.id)}
                >
                  <span className="icon">{s.icon}</span>
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* ── Main Content ── */}
          <main className="tc-main">

            {/* Last updated */}
            <div className="tc-updated">
              <div className="tc-updated-dot" />
              <p>
                {t("terms.lastUpdated")}{" "}
                <strong>27th March 2026</strong>.
              </p>
            </div>

            {/* Section accordion cards */}
            {sections.map((s) => {
              const isOpen = activeSection === s.id;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className={`tc-section ${isOpen ? "open" : ""}`}
                >
                  <div
                    className="tc-section-header"
                    onClick={() => setActiveSection(isOpen ? null : s.id)}
                  >
                    <div className="tc-section-icon">{s.icon}</div>
                    <div className="tc-section-title">{s.title}</div>
                    <span className="tc-section-chevron">▼</span>
                  </div>
                  <div className="tc-section-body">
                    <p className="tc-section-text">{s.content}</p>
                    {Array.isArray(s.bullets) && s.bullets.length > 0 && (
                      <ul className="tc-bullets">
                        {s.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* ── Agreement / Accept box ── */}
            <div className="tc-accept">
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  color: "#c0392b",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {t("terms.agreementTitle")}
              </h3>

              <label className="tc-accept-check">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <p>{t("terms.agreementText")}</p>
              </label>

              <div className="tc-accept-btns">
                <button
                  className="btn-accept"
                  disabled={!accepted}
                  onClick={handleAccept}
                >
                  {t("terms.acceptBtn")}
                </button>
                <button
                  className="btn-decline"
                  onClick={() => setAccepted(false)}
                >
                  {t("terms.declineBtn")}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
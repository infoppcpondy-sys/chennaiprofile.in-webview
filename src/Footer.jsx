import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <style>{`
        .footer { background:#2a0a0e; padding:clamp(40px,8vw,60px) clamp(16px,5vw,32px); margin-top:40px; border-top:1px solid rgba(201,145,58,0.15); }
        .footer-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:clamp(30px,5vw,50px); padding:0 clamp(16px,5vw,32px); }
        .footer-section { display:flex; flex-direction:column; gap:12px; }
        .footer-section-title { font-family:'Cormorant Garamond',serif; font-size:1.1rem; color:rgba(255,255,255,0.95); font-weight:700; margin-bottom:8px; letter-spacing:0.02em; }
        .footer-brand { font-family:'Cormorant Garamond',serif; font-size:1.3rem; color:rgba(255,255,255,0.85); font-weight:600; }
        .footer-brand span { color:#c9913a; }
        .footer-copy { font-family:'Jost',sans-serif; font-size:0.75rem; color:rgba(255,255,255,0.4); letter-spacing:0.06em; line-height:1.6; }
        .footer-item { font-family:'Jost',sans-serif; font-size:0.85rem; color:rgba(255,255,255,0.6); display:flex; align-items:flex-start; gap:10px; line-height:1.5; transition:all 0.3s ease; }
        .footer-item:hover { color:rgba(255,255,255,0.85); }
        .footer-item-icon { font-size:1.1rem; flex-shrink:0; margin-top:2px; }
        .footer-item-text { flex:1; }
        .footer-item a { color:#c9913a; text-decoration:none; transition:all 0.3s ease; cursor:pointer; }
        .footer-item a:hover { color:#e8b76a; text-decoration:underline; }
        .footer-bottom { border-top:1px solid rgba(201,145,58,0.2); margin-top:30px; padding-top:20px; grid-column:1/-1; text-align:center; }
        .footer-bottom-text { font-family:'Jost',sans-serif; font-size:0.75rem; color:rgba(255,255,255,0.3); letter-spacing:0.06em; }
        @media(max-width:768px) { .footer { padding:24px 16px; } .footer-item { justify-content:center; } }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-section">
            <div className="footer-brand">Chennai <span>Profiles</span></div>
            <div className="footer-copy">{t("footer.tagline")}</div>
          </div>

          <div className="footer-section">
            <div className="footer-section-title">{t("footer.contactUs")}</div>
            <div className="footer-item">
              <span className="footer-item-icon">📞</span>
              <div className="footer-item-text">
                <a href="tel:+919876543210">{t("footer.phone")}</a>
              </div>
            </div>
            <div className="footer-item">
              <span className="footer-item-icon">💬</span>
              <div className="footer-item-text">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">{t("footer.whatsapp")}</a>
              </div>
            </div>
            <div className="footer-item">
              <span className="footer-item-icon">✉️</span>
              <div className="footer-item-text">
                <a href={`mailto:${t("footer.email")}`}>{t("footer.email")}</a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-section-title">{t("footer.addressSection")}</div>
            <div className="footer-item">
              <span className="footer-item-icon">📍</span>
              <div className="footer-item-text" style={{ whiteSpace:"pre-line" }}>
                {t("footer.fullAddress")}
              </div>
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-section-title">{t("footer.quickLinks")}</div>
            <div className="footer-item">
              <a onClick={() => navigate("/terms-and-conditions")}>{t("footer.terms")}</a>
            </div>
            <div className="footer-item">
              <a onClick={() => navigate("/privacy-policy")}>{t("footer.privacy")}</a>
            </div>
            <div className="footer-item">
              <a onClick={() => navigate("/about-us")}>{t("footer.aboutUs")}</a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-text">{t("footer.bottomText")}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
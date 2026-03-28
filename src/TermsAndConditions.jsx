import { useState } from "react";

const SECTIONS = [
  {
    id: "intro",
    icon: "📜",
    title: "1. Introduction",
    content: `Welcome to MatrimonyConnect, India's trusted matrimonial platform dedicated to helping individuals find their life partners. By accessing or using our website, mobile application, or any related services (collectively referred to as the "Platform"), you agree to be bound by these Terms & Conditions.

These Terms constitute a legally binding agreement between you ("User," "you," or "your") and MatrimonyConnect ("we," "us," or "our"). Please read these terms carefully before registering, browsing, or using any features of our Platform. If you do not agree with any part of these terms, you must discontinue use of the Platform immediately.`,
    bullets: []
  },
  {
    id: "eligibility",
    icon: "✅",
    title: "2. User Eligibility",
    content: "To use MatrimonyConnect, you must meet the following eligibility criteria:",
    bullets: [
      "You must be at least 18 years of age (or the legal age of marriage in your jurisdiction, whichever is higher).",
      "You must be legally eligible to enter into a binding contract under applicable laws.",
      "You must not be currently married, unless seeking a remarriage profile after legal separation, divorce, or widowhood.",
      "You must be a citizen or lawful resident of the country in which you are registering.",
      "You must not have been previously suspended or removed from MatrimonyConnect for violations of our policies.",
      "Corporate entities, agents, and bots are not permitted to register as users on this Platform."
    ]
  },
  {
    id: "registration",
    icon: "📝",
    title: "3. Account Registration",
    content: "When creating an account on MatrimonyConnect, you agree to the following:",
    bullets: [
      "Provide accurate, complete, and up-to-date personal information including your real name, date of birth, and contact details.",
      "Maintain the confidentiality of your login credentials and not share your account with any third party.",
      "Notify us immediately at support@matrimonyconnect.in if you suspect any unauthorized use of your account.",
      "You are solely responsible for all activities that occur under your registered account.",
      "Each individual is permitted to maintain only one active profile on the Platform.",
      "We reserve the right to verify the information provided and may request supporting documents at any time.",
      "Profiles created on behalf of another person (e.g., by parents or guardians) must clearly indicate this and receive consent from the individual concerned."
    ]
  },
  {
    id: "responsibilities",
    icon: "🤝",
    title: "4. User Responsibilities",
    content: "As a registered user of MatrimonyConnect, you are responsible for:",
    bullets: [
      "Ensuring all profile information, photographs, and details you upload are genuine and belong to you.",
      "Treating other users with dignity, respect, and courtesy at all times during communication.",
      "Conducting your own due diligence before meeting or proceeding with any match found through the Platform.",
      "Updating your profile promptly to reflect any changes in your marital status, employment, or contact information.",
      "Using the Platform solely for matrimonial purposes and not for any commercial, political, or promotional activities.",
      "Complying with all applicable local, national, and international laws while using the Platform.",
      "Not engaging in any activity that could damage, overload, or impair the Platform's infrastructure or security."
    ]
  },
  {
    id: "prohibited",
    icon: "🚫",
    title: "5. Prohibited Activities",
    content: "The following activities are strictly prohibited on MatrimonyConnect. Violation may result in immediate account termination:",
    bullets: [
      "Creating fake, misleading, or impersonating profiles using another person's identity or photographs.",
      "Posting obscene, vulgar, abusive, threatening, or harassing content to any user.",
      "Soliciting money, financial assistance, or gifts from other users under any circumstances.",
      "Sharing or distributing another user's personal information, photos, or contact details without their explicit consent.",
      "Using automated tools, bots, or scripts to scrape, crawl, or harvest data from the Platform.",
      "Uploading any content that violates intellectual property rights, including copyrighted images or text.",
      "Attempting to hack, reverse-engineer, or interfere with the Platform's technical systems.",
      "Using the Platform to promote illegal activities, caste-based discrimination, or communal hatred."
    ]
  },
  {
    id: "payment",
    icon: "💳",
    title: "6. Payment & Subscription",
    content: "MatrimonyConnect offers both free and premium subscription plans. By subscribing to a paid plan, you agree to the following:",
    bullets: [
      "All subscription fees are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.",
      "Payments are processed through secure third-party payment gateways. We do not store your complete card or banking details.",
      "Subscription plans are non-transferable and are valid only for the account under which they were purchased.",
      "Refunds will not be provided for partial use of a subscription period unless required by applicable consumer protection laws.",
      "We reserve the right to modify subscription pricing with prior notice of at least 30 days.",
      "In the event of fraudulent or unauthorized transactions, please contact our support team within 48 hours.",
      "Auto-renewal subscriptions may be cancelled at any time from your account settings before the renewal date."
    ]
  },
  {
    id: "profile",
    icon: "👤",
    title: "7. Profile Approval & Removal",
    content: "MatrimonyConnect maintains the right to review, approve, or remove profiles to ensure a safe community:",
    bullets: [
      "All profiles are subject to a manual or automated verification process before being made publicly visible.",
      "We reserve the right to reject or remove any profile that violates these Terms, contains inappropriate content, or appears fraudulent.",
      "Profiles reported by multiple users for suspicious activity will be reviewed and may be suspended pending investigation.",
      "Users whose profiles are removed due to policy violations will not be eligible for a refund of any subscription fees.",
      "You may request permanent deletion of your profile and associated data by contacting our support team.",
      "Inactive accounts (no login for more than 12 months) may be deactivated and archived without prior notice.",
      "Profile removal by user choice does not constitute a refund claim unless within the refund-eligible window."
    ]
  },
  {
    id: "privacy",
    icon: "🔒",
    title: "8. Privacy & Data Usage",
    content: "Your privacy is of utmost importance to us. Please review our Privacy Policy for detailed information. Key highlights include:",
    bullets: [
      "We collect personal information such as name, age, religion, caste, education, and contact details solely to facilitate matrimonial matching.",
      "Your data is stored on secure, encrypted servers and is not sold to third parties for commercial advertising.",
      "Aggregate, anonymized data may be used for internal analytics to improve Platform features and user experience.",
      "By using the Platform, you consent to receiving service-related communications via email, SMS, or push notifications.",
      "You may opt out of promotional communications at any time through your notification settings.",
      "We comply with applicable data protection regulations including the Information Technology Act, 2000, and relevant amendments.",
      "Cookies and tracking technologies may be used to personalize your experience on the Platform."
    ]
  },
  {
    id: "liability",
    icon: "⚖️",
    title: "9. Limitation of Liability",
    content: "MatrimonyConnect provides a platform to connect individuals and does not guarantee successful matches. Please note:",
    bullets: [
      "We are not liable for the accuracy, completeness, or truthfulness of information provided by users in their profiles.",
      "We are not responsible for any loss, harm, or damage arising from interactions, meetings, or relationships formed through the Platform.",
      "The Platform is provided on an 'as is' and 'as available' basis without warranties of any kind, express or implied.",
      "In no event shall MatrimonyConnect's total liability exceed the amount paid by you in subscription fees in the past three months.",
      "We are not responsible for third-party websites, services, or links that may be accessible through the Platform.",
      "Users are strongly advised to exercise personal judgment and caution before meeting any match in person."
    ]
  },
  {
    id: "termination",
    icon: "🔚",
    title: "10. Termination",
    content: "Either party may terminate access to the Platform under the following circumstances:",
    bullets: [
      "You may terminate your account at any time by contacting support or using the account deletion option in your profile settings.",
      "We may suspend or permanently terminate your account without prior notice if you violate these Terms & Conditions.",
      "Upon termination, your right to access the Platform ceases immediately, and your profile will be removed from public view.",
      "We may retain certain data as required by law or for legitimate business purposes even after account deletion.",
      "Termination by either party does not relieve you of any obligations incurred prior to termination.",
      "Appeals for wrongful termination may be submitted to our grievance officer within 30 days of the action."
    ]
  },
  {
    id: "changes",
    icon: "🔄",
    title: "11. Changes to Terms",
    content: "MatrimonyConnect reserves the right to update these Terms & Conditions at any time:",
    bullets: [
      "Changes to these Terms will be communicated via email notification and/or a prominent banner on the Platform.",
      "Continued use of the Platform after the effective date of changes constitutes your acceptance of the revised Terms.",
      "We encourage users to review these Terms periodically to stay informed of any updates.",
      "In the case of material changes affecting user rights, we will provide at least 15 days' notice before implementation.",
      "Archived versions of previous Terms may be requested by contacting our support team."
    ]
  },
  {
    id: "contact",
    icon: "📞",
    title: "12. Contact Information",
    content: "If you have any questions, concerns, or grievances regarding these Terms & Conditions, please reach out to us:",
    bullets: [
      "📧 Email: legal@matrimonyconnect.in",
      "📞 Phone: +91-9876543210 (Mon–Sat, 9:00 AM – 6:00 PM IST)",
      "🏢 Registered Office: MatrimonyConnect Pvt. Ltd., 4th Floor, Titan Towers, Anna Salai, Chennai – 600002, Tamil Nadu, India",
      "🛡️ Grievance Officer: Mr. Rajan Subramaniam | grievance@matrimonyconnect.in",
      "⏱️ We aim to resolve all queries within 7 working days of receipt."
    ]
  }
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

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

      {showBanner && (
        <div className="tc-banner">✅ Terms Accepted — Welcome to Chennai Matrimony Connect!</div>
      )}

      <div className="tc-wrap">
        {/* Hero */}
        <div className="tc-hero">
          <div className="tc-hero-badge"><span>💍 MatrimonyConnect</span></div>
          <h1>Terms &amp; Conditions</h1>
          <p>Please read these terms carefully. By using our platform, you agree to be bound by the following conditions.</p>
          <div className="tc-hero-meta">
            <span>📅 Effective: 1st January 2025</span>
            <span>🔄 Last Updated: 27th March 2026</span>
            <span>📋 12 Sections</span>
          </div>
        </div>

        {/* Body */}
        <div className="tc-body">
          {/* Sidebar TOC */}
          <aside className="tc-sidebar">
            <nav className="tc-toc">
              <div className="tc-toc-header"><h3>📌 Table of Contents</h3></div>
              {SECTIONS.map(s => (
                <a key={s.id} href={`#${s.id}`} className={`tc-toc-item ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => setActiveSection(s.id)}>
                  <span className="icon">{s.icon}</span>
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="tc-main">
            {/* Updated bar */}
            <div className="tc-updated">
              <div className="tc-updated-dot"/>
              <p>These Terms were last updated on <strong>27th March 2026</strong>. Continued use of the Platform after this date implies acceptance of these terms.</p>
            </div>

            {/* Sections */}
            {SECTIONS.map(s => {
              const isOpen = activeSection === s.id;
              return (
                <div key={s.id} id={s.id} className={`tc-section ${isOpen ? "open" : ""}`}>
                  <div className="tc-section-header" onClick={() => setActiveSection(isOpen ? null : s.id)}>
                    <div className="tc-section-icon">{s.icon}</div>
                    <div className="tc-section-title">{s.title}</div>
                    <span className="tc-section-chevron">▼</span>
                  </div>
                  <div className="tc-section-body">
                    <p className="tc-section-text">{s.content}</p>
                    {s.bullets.length > 0 && (
                      <ul className="tc-bullets">
                        {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Accept box */}
            <div className="tc-accept">
              <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#c0392b", fontSize:18, fontWeight:700 }}>📋 Agreement Acknowledgement</h3>
              <label className="tc-accept-check">
                <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
                <p>I have read, understood, and agree to the <strong>Terms &amp; Conditions</strong> of MatrimonyConnect. I confirm that all information I provide will be accurate and truthful, and I will use this platform responsibly and in accordance with the stated guidelines.</p>
              </label>
              <div className="tc-accept-btns">
                <button className="btn-accept" disabled={!accepted} onClick={handleAccept}>✔ I Accept These Terms</button>
                <button className="btn-decline" onClick={() => setAccepted(false)}>✕ Decline</button>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="tc-footer">
          <p>© 2026 <strong>MatrimonyConnect Pvt. Ltd.</strong> · All rights reserved · Chennai, Tamil Nadu, India</p>
          <p style={{ marginTop:6 }}>📧 legal@matrimonyconnect.in &nbsp;|&nbsp; 📞 +91-9876543210</p>
        </footer>
      </div>
    </>
  );
}

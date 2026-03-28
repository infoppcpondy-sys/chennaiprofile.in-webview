import { useState } from "react";

const PRIVACY_SECTIONS = [
  {
    id: "overview",
    icon: "🛡️",
    title: "1. Privacy Overview",
    content: `At MatrimonyConnect, your privacy is not just a legal obligation — it is a core value. We understand that you share sensitive personal information with us, including details about your background, family, religion, and preferences. This Privacy Policy explains how we collect, use, store, and protect that information.

This policy applies to all users of the MatrimonyConnect website, mobile application, and related services. By registering or using our Platform, you consent to the practices described in this document. If you do not agree with this policy, please refrain from using the Platform.`,
    bullets: []
  },
  {
    id: "collection",
    icon: "📥",
    title: "2. Information We Collect",
    content: "We collect information in multiple ways to provide you with a meaningful matrimonial experience:",
    bullets: [
      "Personal Identity: Full name, date of birth, gender, religion, caste, sub-caste, mother tongue, and marital status.",
      "Contact Details: Mobile number, email address, residential city, state, and pincode.",
      "Professional Information: Highest educational qualification, occupation, employer name (optional), and annual income range.",
      "Physical Attributes: Height, weight, skin tone (optional), and any physical disability information voluntarily shared.",
      "Family Background: Parents' names, occupations, family status, sibling details, and family values.",
      "Partner Preferences: Preferred age range, height, religion, caste, education, location, and other match criteria.",
      "Profile Media: Photographs and any other images you upload to your profile.",
      "Device & Usage Data: IP address, browser type, device model, operating system, pages visited, and session duration.",
      "Communication Records: Messages exchanged through our in-Platform chat system (used for safety monitoring only).",
      "Payment Information: Transaction ID, subscription type, and billing history (card details are not stored by us)."
    ]
  },
  {
    id: "usage",
    icon: "⚙️",
    title: "3. How We Use Your Information",
    content: "Your information is used exclusively to improve your experience and ensure platform safety:",
    bullets: [
      "To create, display, and manage your matrimonial profile on the Platform.",
      "To generate and suggest compatible matches based on your preferences and profile attributes.",
      "To send you match notifications, profile views, and interest alerts via SMS, email, or push notifications.",
      "To verify your identity and prevent fraudulent or fake profiles from being listed.",
      "To process subscription payments and maintain billing records for our premium services.",
      "To improve our matching algorithms, Platform features, and overall user experience through anonymized analytics.",
      "To respond to your support requests, grievances, and queries in a timely manner.",
      "To send important service updates, policy changes, and security alerts.",
      "To comply with legal obligations and cooperate with law enforcement where required."
    ]
  },
  {
    id: "sharing",
    icon: "🔗",
    title: "4. Information Sharing & Disclosure",
    content: "We do not sell your personal data. However, limited sharing occurs in specific situations:",
    bullets: [
      "With Other Users: Your profile details (excluding contact information) are visible to registered members based on your privacy settings.",
      "Contact Sharing: Your phone number or email is only shared when you or the other party explicitly expresses mutual interest.",
      "Service Providers: Trusted third-party vendors (e.g., payment processors, SMS gateways, cloud storage) may access limited data strictly to perform their services.",
      "Legal Compliance: We may disclose your information to government authorities, courts, or law enforcement if required by applicable law or court order.",
      "Business Transfers: In the event of a merger, acquisition, or asset sale, your data may be transferred to the new entity with prior notice.",
      "Safety Situations: If we believe disclosure is necessary to protect the safety of any user or the public, we may act accordingly.",
      "Aggregated Data: Non-identifiable, aggregate statistics may be shared with research or analytics partners."
    ]
  },
  {
    id: "cookies",
    icon: "🍪",
    title: "5. Cookies & Tracking Technologies",
    content: "We use cookies and similar technologies to enhance your Platform experience:",
    bullets: [
      "Session Cookies: Temporary cookies that enable you to stay logged in and navigate the Platform seamlessly.",
      "Preference Cookies: Store your language, display, and notification preferences for future visits.",
      "Analytics Cookies: Help us understand how users interact with the Platform (e.g., Google Analytics). These are anonymized.",
      "Security Cookies: Used to detect unusual login activity and protect your account from unauthorized access.",
      "You may disable cookies through your browser settings; however, some Platform features may not function optimally without them.",
      "We do not use third-party advertising cookies or behavioral targeting cookies for commercial ads."
    ]
  },
  {
    id: "security",
    icon: "🔐",
    title: "6. Data Security",
    content: "We implement industry-standard measures to safeguard your personal information:",
    bullets: [
      "All data transmitted between your device and our servers is encrypted using SSL/TLS protocols (HTTPS).",
      "Sensitive data fields such as passwords are stored using one-way hashing algorithms (bcrypt).",
      "Our servers are hosted in ISO 27001-certified data centers with 24/7 physical and digital security monitoring.",
      "Access to user data is restricted to authorized personnel on a strict need-to-know basis.",
      "We conduct regular security audits, penetration testing, and vulnerability assessments.",
      "In the event of a data breach affecting your personal information, we will notify you within 72 hours as required by applicable law.",
      "Despite our best efforts, no system is completely immune to security risks. We encourage users to use strong passwords and enable two-factor authentication."
    ]
  },
  {
    id: "retention",
    icon: "📦",
    title: "7. Data Retention",
    content: "We retain your data only for as long as necessary to fulfill the purposes for which it was collected:",
    bullets: [
      "Active profiles are retained for the duration of your registration on the Platform.",
      "Upon account deletion, your profile will be removed from public view within 24 hours and fully deleted from our systems within 30 days.",
      "Billing and transaction records are retained for a period of 7 years as required by Indian tax and financial regulations.",
      "Chat and communication logs may be retained for up to 12 months for safety and dispute resolution purposes.",
      "Anonymized usage data (stripped of all identifiers) may be retained indefinitely for platform improvement purposes.",
      "You may request early deletion of your data by contacting our Data Protection Officer."
    ]
  },
  {
    id: "rights",
    icon: "✋",
    title: "8. Your Rights & Choices",
    content: "You have the following rights with respect to your personal data on MatrimonyConnect:",
    bullets: [
      "Right to Access: You may request a copy of all personal data we hold about you at any time.",
      "Right to Correction: You may update or correct inaccurate information through your profile settings or by contacting support.",
      "Right to Deletion: You may request permanent deletion of your account and associated data, subject to legal retention requirements.",
      "Right to Restrict Processing: You may request that we limit how we use your data while a dispute is under review.",
      "Right to Data Portability: You may request your data in a machine-readable format for transfer to another service.",
      "Right to Opt-Out: You may unsubscribe from promotional communications at any time via email settings or the Platform's notification preferences.",
      "Right to Withdraw Consent: Where processing is based on your consent, you may withdraw it at any time without affecting prior lawful processing."
    ]
  },
  {
    id: "children",
    icon: "👶",
    title: "9. Children's Privacy",
    content: "MatrimonyConnect is strictly intended for adults:",
    bullets: [
      "Our Platform is not directed at or intended for use by individuals under the age of 18.",
      "We do not knowingly collect personal information from minors.",
      "If we discover that a minor has registered on the Platform, we will immediately delete their account and all associated data.",
      "Parents or guardians who believe their child has registered should contact us immediately at safety@matrimonyconnect.in.",
      "Age verification may be enforced through document submission for suspicious accounts."
    ]
  },
  {
    id: "thirdparty",
    icon: "🌐",
    title: "10. Third-Party Links & Services",
    content: "Our Platform may contain links to or integrations with external services:",
    bullets: [
      "Links to third-party websites (e.g., payment gateways, social media) are provided for convenience only.",
      "We are not responsible for the privacy practices or content of any third-party site or service.",
      "We recommend reviewing the privacy policies of any external service before using it.",
      "Social login features (e.g., Google Sign-In) are governed by the respective provider's privacy policies.",
      "Any data you voluntarily share with third-party services integrated into our Platform is subject to their own privacy terms."
    ]
  },
  {
    id: "updates",
    icon: "🔄",
    title: "11. Updates to This Policy",
    content: "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements:",
    bullets: [
      "Material updates will be communicated via email notification and a prominent notice on the Platform.",
      "The effective date at the top of this policy reflects the most recent revision.",
      "Your continued use of the Platform after changes take effect constitutes acceptance of the revised policy.",
      "Previous versions of this policy are available on request from our support team.",
      "We encourage you to review this page periodically to remain informed about how we protect your information."
    ]
  },
  {
    id: "contact",
    icon: "📞",
    title: "12. Contact & Data Protection Officer",
    content: "For any privacy-related queries, requests, or concerns, please contact us through the following channels:",
    bullets: [
      "📧 Privacy Email: privacy@matrimonyconnect.in",
      "🛡️ Data Protection Officer: Ms. Ananya Krishnamurthy | dpo@matrimonyconnect.in",
      "📞 Helpline: +91-9876543210 (Monday to Saturday, 9:00 AM – 6:00 PM IST)",
      "🏢 Postal Address: MatrimonyConnect Pvt. Ltd., 4th Floor, Titan Towers, Anna Salai, Chennai – 600002, Tamil Nadu, India",
      "⏱️ Response Time: We will acknowledge your request within 48 hours and resolve it within 15 working days.",
      "🔏 To exercise any of your data rights, please email us with your registered email ID and a clear description of your request."
    ]
  }
];

const QUICK_STATS = [
  { icon:"🔒", label:"SSL Encrypted", sub:"All data in transit" },
  { icon:"🏢", label:"ISO 27001", sub:"Certified data centers" },
  { icon:"⏱️", label:"72-Hour Notice", sub:"On any data breach" },
  { icon:"🗑️", label:"30-Day Deletion", sub:"Upon account removal" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

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
        {/* Hero */}
        <div className="pp-hero">
          <div className="pp-hero-badge"><span>🔒 Privacy First</span></div>
          <h1>Privacy Policy</h1>
          <p>We are committed to protecting your personal information and your right to privacy. This policy explains exactly how we handle your data.</p>
          <div className="pp-stats">
            {QUICK_STATS.map((s,i) => (
              <div key={i} className="pp-stat">
                <span className="si">{s.icon}</span>
                <span className="sl">{s.label}</span>
                <span className="ss">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="pp-body">
          {/* Sidebar */}
          <aside className="pp-sidebar">
            <nav className="pp-toc">
              <div className="pp-toc-header"><h3>📌 Table of Contents</h3></div>
              {PRIVACY_SECTIONS.map(s => (
                <a key={s.id} href={`#${s.id}`}
                  className={`pp-toc-item ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => setActiveSection(s.id)}>
                  <span style={{ fontSize:14 }}>{s.icon}</span>
                  {s.title}
                </a>
              ))}
            </nav>

            <div className="pp-compliance">
              <h4>🏅 Compliance</h4>
              {["IT Act 2000", "GDPR Ready", "ISO 27001", "SSL/TLS", "Data Minimization", "Right to Erasure"].map(b => (
                <span key={b} className="pp-badge">{b}</span>
              ))}
            </div>
          </aside>

          {/* Main */}
          <main className="pp-main">
            <div className="pp-updated">
              <div className="pp-updated-dot"/>
              <p>This Privacy Policy was last updated on <strong>27th March 2026</strong>. We encourage you to review it periodically for any changes.</p>
            </div>

            <div className="pp-highlight">
              <h4>🌟 Our Privacy Commitment</h4>
              <p>MatrimonyConnect will never sell your personal data to advertisers or third-party brokers. Your information is used solely to help you find a compatible life partner and to maintain a safe, trusted community on our Platform.</p>
            </div>

            {PRIVACY_SECTIONS.map(s => {
              const isOpen = activeSection === s.id;
              return (
                <div key={s.id} id={s.id} className={`pp-section ${isOpen ? "open" : ""}`}>
                  <div className="pp-section-header" onClick={() => setActiveSection(isOpen ? null : s.id)}>
                    <div className="pp-section-icon">{s.icon}</div>
                    <div className="pp-section-title">{s.title}</div>
                    <span className="pp-section-chevron">▼</span>
                  </div>
                  <div className="pp-section-body">
                    <p className="pp-section-text">{s.content}</p>
                    {s.bullets.length > 0 && (
                      <ul className="pp-bullets">
                        {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Bottom note */}
            <div style={{ background:"linear-gradient(135deg,#fff8f8,#fff)", border:"1px solid #f0dada", borderRadius:14, padding:"20px 22px", boxShadow:"0 2px 14px rgba(192,57,43,0.08)" }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#c0392b", fontSize:16, marginBottom:10, fontWeight:700 }}>📌 Important Note</h3>
              <p style={{ fontSize:14, color:"#666", lineHeight:1.8, fontFamily:"'Crimson Pro',serif" }}>
                This Privacy Policy forms an integral part of our <strong style={{ color:"#c0392b" }}>Terms &amp; Conditions</strong>. By using MatrimonyConnect, you acknowledge that you have read and understood both documents. For any clarifications, please reach out to our Data Protection Officer at <strong style={{ color:"#c0392b" }}>dpo@matrimonyconnect.in</strong>.
              </p>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="pp-footer">
          <p>© 2026 <strong>MatrimonyConnect Pvt. Ltd.</strong> · All rights reserved · Chennai, Tamil Nadu, India</p>
          <p style={{ marginTop:6 }}>🔒 privacy@matrimonyconnect.in &nbsp;|&nbsp; 📞 +91-9876543210 &nbsp;|&nbsp; 🛡️ dpo@matrimonyconnect.in</p>
        </footer>
      </div>
    </>
  );
}

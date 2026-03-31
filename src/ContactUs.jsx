import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div style={{ 
      background: "#fff", 
      minHeight: "100vh", 
      padding: "80px 24px",
      fontFamily: "'Crimson Pro', 'Georgia', serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

        .au-label { display:inline-flex; align-items:center; gap:7px; background:#fdecea; border:1px solid #f5c6c6; border-radius:50px; padding:5px 16px; font-size:11px; color:#c0392b; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; font-family:'Playfair Display',serif; margin-bottom:14px; }
        .au-title { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,42px); font-weight:900; color:#c0392b; line-height:1.15; margin-bottom:14px; }
        .au-divider { width:56px; height:4px; background:linear-gradient(135deg,#c0392b,#e74c3c); border-radius:2px; margin:16px auto 28px; }
        .au-subtitle { font-family:'Crimson Pro',serif; font-size:clamp(15px,2vw,18px); color:#777; line-height:1.8; }
        .au-contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start; }
        .au-contact-info { display:flex; flex-direction:column; gap:16px; }
        .au-contact-item { display:flex; align-items:flex-start; gap:16px; background:#fff8f8; border:1px solid #f0dada; border-radius:14px; padding:18px 20px; }
        .au-contact-item-icon { width:44px; height:44px; background:linear-gradient(135deg,#fdecea,#fbd5d5); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
        .au-contact-item-text label { font-size:11px; color:#c0392b; font-family:'Playfair Display',serif; font-weight:700; letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:3px; }
        .au-contact-item-text span { font-size:16px; color:#333; font-family:'Crimson Pro',serif; font-weight:600; }
        .au-contact-form { background:#fff; border:1px solid #f0dada; border-radius:18px; padding:28px; }
        .au-contact-form h3 { font-family:'Playfair Display',serif; color:#c0392b; font-size:20px; font-weight:700; margin-bottom:20px; }
        .au-field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
        .au-field label { font-size:11px; color:#c0392b; font-family:'Playfair Display',serif; font-weight:700; letter-spacing:1px; text-transform:uppercase; }
        .au-field input, .au-field textarea { background:#fafafa; border:1px solid #e0c8c8; border-radius:8px; padding:10px 14px; color:#333; font-family:'Crimson Pro',serif; font-size:14px; outline:none; transition:border-color 0.2s; }
        .au-field input::placeholder, .au-field textarea::placeholder { color:#aaa; }
        .au-field input:focus, .au-field textarea:focus { border-color:#c0392b; background:#fff; }
        .au-field textarea { resize:vertical; min-height:90px; }
        .btn-contact { background:linear-gradient(135deg,#c0392b,#e74c3c); color:#fff; border:none; padding:12px 32px; border-radius:8px; font-size:15px; font-family:'Playfair Display',serif; font-weight:700; cursor:pointer; width:100%; transition:all 0.2s; }
        .btn-contact:hover { box-shadow:0 4px 16px rgba(192,57,43,0.2); transform:translateY(-1px); }

        @media (max-width: 768px) {
          .au-contact-grid { grid-template-columns:1fr; gap:24px; }
          .au-title { font-size: clamp(24px, 6vw, 36px); }
          .au-subtitle { font-size: clamp(14px, 3vw, 16px); }
        }
        
        @media (max-width: 480px) {
          .au-contact-form { padding: 20px; }
          .au-field input, .au-field textarea { font-size: 16px; padding: 10px 12px; }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div className="au-label">✦ Get in Touch</div>
          <h2 className="au-title">Contact Us</h2>
          <div className="au-divider"/>
          <p className="au-subtitle">Have questions? Our friendly support team is here to help you find your perfect match.</p>
        </div>
        <div className="au-contact-grid">
          <div className="au-contact-info">
            {[
              { icon:"📧", label:"Email Us", value:"support@chennaimatrimony.in" },
              { icon:"📞", label:"Call Us", value:"+91-9876543210" },
              { icon:"🏢", label:"Visit Us", value:"No. 12, Anna Salai, Chennai – 600002" },
              { icon:"⏰", label:"Working Hours", value:"Mon–Sat · 9:00 AM to 6:00 PM IST" },
            ].map((item,i)=>(
              <div key={i} className="au-contact-item">
                <div className="au-contact-item-icon">{item.icon}</div>
                <div className="au-contact-item-text">
                  <label>{item.label}</label>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="au-contact-form">
            <h3>Send Us a Message</h3>
            <div className="au-field"><label>Your Name</label><input placeholder="Enter your full name"/></div>
            <div className="au-field"><label>Email Address</label><input type="email" placeholder="your@email.com"/></div>
            <div className="au-field"><label>Phone Number</label><input placeholder="+91-XXXXXXXXXX"/></div>
            <div className="au-field"><label>Message</label><textarea placeholder="How can we help you?"/></div>
            <button className="btn-contact">✉ Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

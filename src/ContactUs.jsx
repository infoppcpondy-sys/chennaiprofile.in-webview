import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #f8f5f2 0%, #faf4ec 100%)", 
      minHeight: "100vh", 
      padding: "clamp(20px, 5vw, 40px)",
      fontFamily: "'Cormorant Garamond', 'Georgia', serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-header {
          animation: slideUp 0.6s ease;
        }

        .contact-item {
          animation: slideUp 0.8s ease both;
        }

        .contact-item:nth-child(2) {
          animation-delay: 0.1s;
        }

        .contact-item:nth-child(3) {
          animation-delay: 0.2s;
        }

        @media (max-width: 768px) {
          .contact-container {
            max-width: 100%;
            padding: 0 !important;
          }
          
          .contact-h1 {
            font-size: clamp(24px, 6vw, 36px) !important;
          }
          
          .contact-p {
            font-size: clamp(14px, 3vw, 16px) !important;
          }
          
          .contact-box {
            padding: clamp(16px, 4vw, 30px) !important;
          }
          
          .contact-item h3 {
            font-size: clamp(16px, 4vw, 20px) !important;
          }
          
          .contact-item p {
            font-size: clamp(13px, 3vw, 16px) !important;
          }
        }
        
        @media (max-width: 480px) {
          .contact-container {
            padding: 0 !important;
          }
          
          .contact-box {
            border-radius: 8px !important;
          }
        }
      `}</style>

      <div className="contact-container" style={{ 
        maxWidth: "800px", 
        margin: "0 auto",
        padding: "clamp(16px, 4vw, 40px)"
      }}>
        
        <div className="contact-header">
          <h1 className="contact-h1" style={{ 
            color: "#8b1e2d", 
            fontSize: "clamp(28px, 7vw, 40px)", 
            marginBottom: "10px",
            fontWeight: "700",
            lineHeight: "1.2"
          }}>
            {t('contact.title')}
          </h1>

          <p className="contact-p" style={{ 
            color: "#555", 
            marginBottom: "30px",
            fontSize: "clamp(14px, 4vw, 16px)",
            lineHeight: "1.6"
          }}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="contact-box" style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
          padding: "clamp(20px, 5vw, 30px)",
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(139,30,45,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(16px, 4vw, 20px)",
          border: "1px solid rgba(139,30,45,0.1)",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(139,30,45,0.15)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(139,30,45,0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }}>
          
          <div className="contact-item" style={{ marginBottom: "0" }}>
            <h3 style={{ 
              color: "#8b1e2d",
              fontSize: "clamp(16px, 4vw, 20px)",
              marginBottom: "8px",
              fontWeight: "600"
            }}>
              {t('contact.email')}
            </h3>
            <p style={{ 
              fontSize: "clamp(13px, 3vw, 16px)",
              color: "#333",
              wordBreak: "break-word",
              margin: "0"
            }}>
              {t('contact.emailAddress')}
            </p>
          </div>

          <div className="contact-item" style={{ marginBottom: "0" }}>
            <h3 style={{ 
              color: "#8b1e2d",
              fontSize: "clamp(16px, 4vw, 20px)",
              marginBottom: "8px",
              fontWeight: "600"
            }}>
              {t('contact.phone')}
            </h3>
            <p style={{ 
              fontSize: "clamp(13px, 3vw, 16px)",
              color: "#333",
              wordBreak: "break-word",
              margin: "0"
            }}>
              {t('contact.phoneNumber')}
            </p>
          </div>

          <div className="contact-item" style={{ marginBottom: "0" }}>
            <h3 style={{ 
              color: "#8b1e2d",
              fontSize: "clamp(16px, 4vw, 20px)",
              marginBottom: "8px",
              fontWeight: "600"
            }}>
              {t('contact.address')}
            </h3>
            <p style={{ 
              fontSize: "clamp(13px, 3vw, 16px)",
              color: "#333",
              wordBreak: "break-word",
              margin: "0"
            }}>
              {t('contact.addressText')}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;

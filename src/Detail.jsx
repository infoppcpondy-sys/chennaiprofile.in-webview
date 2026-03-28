import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [interested, setInterested] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Get profile from location state (passed from carousel click)
  const profile = location.state?.profile;

  if (!profile) {
    return (
      <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", minHeight: '100vh', background: '#fdf8f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{`
          :root {
            --maroon: #7B1C2E;
            --maroon-light: #9B2A40;
            --maroon-dark: #5A1620;
            --gold: #C9913A;
            --gold-light: #E8B76A;
            --gold-dark: #A97324;
            --cream: #fdf8f2;
            --cream-dark: #f5ede0;
          }

          .detail-not-found {
            text-align: center;
            padding: 40px 20px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(123, 28, 46, 0.1);
            max-width: 500px;
          }

          .detail-not-found h1 {
            font-size: 2.5rem;
            color: var(--maroon);
            margin-bottom: 20px;
            font-weight: 700;
          }

          .detail-not-found p {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
          }

          .detail-back-btn {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(201, 145, 58, 0.3);
          }

          .detail-back-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(201, 145, 58, 0.4);
          }
        `}</style>
        <div className="detail-not-found">
          <h1>Profile Not Found</h1>
          <p>The profile you're looking for doesn't exist.</p>
          <button className="detail-back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", minHeight: '100vh', background: '#fdf8f2', paddingTop: '40px', paddingBottom: '40px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --maroon: #7B1C2E;
          --maroon-light: #9B2A40;
          --maroon-dark: #5A1620;
          --gold: #C9913A;
          --gold-light: #E8B76A;
          --gold-dark: #A97324;
          --cream: #fdf8f2;
          --cream-dark: #f5ede0;
        }

        .detail-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .detail-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--maroon);
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 30px;
          cursor: pointer;
          border: none;
          background: none;
          font-size: 1rem;
          font-family: 'Jost', sans-serif;
          transition: color 0.3s ease;
        }

        .detail-back-link:hover {
          color: var(--gold);
        }

        .detail-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 50px rgba(123, 28, 46, 0.15);
          overflow: hidden;
        }

        .detail-header {
          background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-light) 100%);
          padding: 40px 30px;
          color: white;
        }

        .detail-header-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
          align-items: center;
        }

        .detail-image-container {
          display: flex;
          justify-content: center;
        }

        .detail-image {
          width: 200px;
          height: 280px;
          background: linear-gradient(135deg, var(--cream-dark) 0%, var(--cream) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          border: 4px solid rgba(255, 255, 255, 0.3);
        }

        .detail-header-info h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin: 0 0 10px 0;
        }

        .detail-header-info p {
          font-size: 1.3rem;
          margin: 0 0 20px 0;
          opacity: 0.95;
        }

        .detail-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .detail-header-item {
          background: rgba(255, 255, 255, 0.15);
          padding: 12px;
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .detail-header-item-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.8;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .detail-header-item-value {
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Jost', sans-serif;
        }

        .detail-action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .detail-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Jost', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-btn-primary {
          background: var(--gold);
          color: white;
          box-shadow: 0 4px 15px rgba(201, 145, 58, 0.3);
        }

        .detail-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 145, 58, 0.4);
        }

        .detail-btn-secondary {
          background: white;
          color: var(--maroon);
          border: 2px solid var(--maroon);
        }

        .detail-btn-secondary:hover {
          background: var(--cream);
        }

        .detail-content {
          padding: 40px 30px;
        }

        .detail-section {
          margin-bottom: 40px;
          border-bottom: 2px solid var(--cream-dark);
          padding-bottom: 30px;
        }

        .detail-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .detail-section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--maroon);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid var(--gold);
          display: inline-block;
        }

        .detail-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .detail-info-item {
          background: var(--cream);
          padding: 16px;
          border-radius: 8px;
          border-left: 3px solid var(--gold);
        }

        .detail-info-label {
          font-size: 0.75rem;
          color: var(--maroon);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .detail-info-value {
          font-size: 1.05rem;
          color: #2A1810;
          font-weight: 600;
          font-family: 'Jost', sans-serif;
          line-height: 1.5;
        }

        .detail-full-details {
          background: var(--cream);
          padding: 20px;
          border-radius: 8px;
          border-left: 3px solid var(--gold);
          margin-top: 20px;
        }

        .detail-full-details-label {
          font-size: 0.75rem;
          color: var(--maroon);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        .detail-full-details-value {
          font-size: 1rem;
          color: #2A1810;
          line-height: 1.8;
          font-family: 'Jost', sans-serif;
        }

        .detail-chat-section {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          border-left: 4px solid var(--maroon);
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .detail-chat-section-title {
          color: var(--maroon);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .detail-chat-section-text {
          color: #333;
          font-family: 'Jost', sans-serif;
        }

        .detail-footer {
          background: linear-gradient(135deg, var(--cream-dark) 0%, var(--cream) 100%);
          padding: 30px;
          border-top: 2px solid #ddd;
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .detail-header-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .detail-image {
            width: 150px;
            height: 220px;
            font-size: 60px;
          }

          .detail-header {
            padding: 20px;
          }

          .detail-content {
            padding: 20px;
          }

          .detail-action-buttons {
            flex-direction: column;
          }

          .detail-btn {
            width: 100%;
            justify-content: center;
          }

          .detail-footer {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="detail-container">
        {/* Back Button */}
        <button className="detail-back-link" onClick={() => navigate('/')}>
          ← Back to Profiles
        </button>

        {/* Main Card */}
        <div className="detail-card">
          {/* Header Section */}
          <div className="detail-header">
            <div className="detail-header-content">
              <div className="detail-image-container">
                <div className="detail-image">👤</div>
              </div>

              <div className="detail-header-info">
                <h1>{profile.name}</h1>
                <p>{profile.age} years old</p>

                <div className="detail-header-grid">
                  <div className="detail-header-item">
                    <div className="detail-header-item-label">Location</div>
                    <div className="detail-header-item-value">📍 {profile.location || 'Chennai, TN'}</div>
                  </div>
                  <div className="detail-header-item">
                    <div className="detail-header-item-label">Caste</div>
                    <div className="detail-header-item-value">{profile.caste || 'N/A'}</div>
                  </div>
                  <div className="detail-header-item">
                    <div className="detail-header-item-label">Occupation</div>
                    <div className="detail-header-item-value">{profile.occupation || 'Professional'}</div>
                  </div>
                  <div className="detail-header-item">
                    <div className="detail-header-item-label">Status</div>
                    <div className="detail-header-item-value">Never Married</div>
                  </div>
                </div>

                <div className="detail-action-buttons">
                  <button 
                    className="detail-btn detail-btn-primary"
                    onClick={() => setInterested(!interested)}
                  >
                    {interested ? '❤️' : '♡'} {interested ? 'Interested' : 'Express Interest'}
                  </button>
                  <button 
                    className="detail-btn detail-btn-secondary"
                    onClick={() => setShowChat(!showChat)}
                  >
                    💬 Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          {showChat && (
            <div style={{ padding: '0 30px' }}>
              <div className="detail-chat-section">
                <div className="detail-chat-section-title">💬 Chat Feature</div>
                <div className="detail-chat-section-text">
                  Contact via WhatsApp or Email. Please express interest first for contact details.
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="detail-content">
            {/* Basic Details */}
            <section className="detail-section">
              <div className="detail-section-title">👤 Basic Details</div>
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <div className="detail-info-label">Name</div>
                  <div className="detail-info-value">{profile.name}</div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-label">Age</div>
                  <div className="detail-info-value">{profile.age}</div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-label">Caste</div>
                  <div className="detail-info-value">{profile.caste || 'Not Specified'}</div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-label">Sub-Caste</div>
                  <div className="detail-info-value">{profile.subcaste || 'Not Specified'}</div>
                </div>
              </div>
            </section>

            {/* Astrology Details */}
            <section className="detail-section">
              <div className="detail-section-title">⭐ Astrology Details</div>
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <div className="detail-info-label">Star (Nakshatra)</div>
                  <div className="detail-info-value">⭐ {profile.nakshtram || 'Not Specified'}</div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-label">Raasi (Moon Sign)</div>
                  <div className="detail-info-value">🌙 {profile.raasi || 'Not Specified'}</div>
                </div>
              </div>
            </section>

            {/* Career Details */}
            <section className="detail-section">
              <div className="detail-section-title">💼 Career Details</div>
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <div className="detail-info-label">Occupation</div>
                  <div className="detail-info-value">{profile.occupation || 'Professional'}</div>
                </div>
                <div className="detail-info-item">
                  <div className="detail-info-label">Location</div>
                  <div className="detail-info-value">📍 {profile.location || 'Chennai, TN'}</div>
                </div>
              </div>
            </section>

            {/* Full Details */}
            {profile.fullDetails && (
              <section className="detail-section">
                <div className="detail-section-title">📋 Full Details</div>
                <div className="detail-full-details">
                  <div className="detail-full-details-label">Registration Details</div>
                  <div className="detail-full-details-value">{profile.fullDetails}</div>
                </div>
              </section>
            )}
          </div>

          {/* Footer CTA */}
          <div className="detail-footer">
            <button 
              className="detail-btn detail-btn-primary"
              onClick={() => setInterested(!interested)}
            >
              {interested ? '❤️' : '♡'} {interested ? 'Already Interested' : 'Express Interest'}
            </button>
            <button 
              className="detail-btn detail-btn-secondary"
              onClick={() => navigate('/')}
            >
              ← Back to Browse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

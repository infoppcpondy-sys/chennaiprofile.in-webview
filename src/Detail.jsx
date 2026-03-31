// Detail.jsx
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;

  if (!profile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #F9EEF0; font-family: 'Lato', sans-serif; }
        `}</style>
        <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#F9EEF0,#FFF8F0)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Lato',sans-serif" }}>
          <div style={{ textAlign:'center', padding:48, background:'white', borderRadius:24, boxShadow:'0 20px 60px rgba(139,0,0,0.12)', maxWidth:460, border:'1px solid rgba(196,30,58,0.1)' }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🔍</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", color:'#8B0000', fontSize:'1.8rem', marginBottom:10 }}>Profile Not Found</h2>
            <p style={{ color:'#7A4050', marginBottom:28, lineHeight:1.6, fontSize:'0.95rem' }}>The profile you're looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/')} style={{ background:'linear-gradient(135deg,#8B0000,#C41E3A)', color:'white', border:'none', padding:'12px 32px', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:'0.95rem', letterSpacing:'0.05em', boxShadow:'0 4px 16px rgba(139,0,0,0.3)' }}>
              ← Back to Profiles
            </button>
          </div>
        </div>
      </>
    );
  }

  const p = profile;

  const InfoCard = ({ label, value, icon }) => (
    <div style={{ background:'#FFFAF9', borderRadius:10, padding:'14px 16px', border:'1px solid rgba(196,30,58,0.1)', borderLeft:'3px solid #C41E3A' }}>
      <div style={{ fontSize:'0.68rem', fontWeight:700, color:'#8B0000', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6, display:'flex', alignItems:'center', gap:5 }}>
        {icon && <span>{icon}</span>}{label}
      </div>
      <div style={{ fontSize:'0.92rem', color:'#2A0A0E', fontWeight:600, lineHeight:1.5 }}>
        {value || <span style={{ color:'#C4A0A8', fontStyle:'italic', fontWeight:400 }}>Not specified</span>}
      </div>
    </div>
  );

  const SectionTitle = ({ icon, title }) => (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, paddingBottom:12, borderBottom:'1px solid rgba(139,0,0,0.1)' }}>
      <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#8B0000,#C41E3A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0, boxShadow:'0 3px 10px rgba(139,0,0,0.2)' }}>{icon}</div>
      <h3 style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', fontWeight:700, color:'#5A0010', letterSpacing:'0.02em' }}>{title}</h3>
      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(139,0,0,0.15),transparent)' }} />
    </div>
  );

  const grid2 = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 };
  const grid3 = { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 };
  const grid4 = { display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14 };
  const sectionCard = { background:'white', borderRadius:16, padding:'28px 28px', marginBottom:20, boxShadow:'0 2px 20px rgba(139,0,0,0.06)', border:'1px solid rgba(196,30,58,0.1)' };

  const buildSiblingText = (prefix) => {
    const fields = [
      { label:'Elder Brother', key:`sib${prefix}EB` },
      { label:'Younger Brother', key:`sib${prefix}YB` },
      { label:'Elder Sister', key:`sib${prefix}ES` },
      { label:'Younger Sister', key:`sib${prefix}YS` },
    ];
    const parts = fields.filter(f => p[f.key] && p[f.key] !== '-' && p[f.key] !== '0').map(f => `${f.label}: ${p[f.key]}`);
    return parts.length ? parts.join('  |  ') : 'None';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F9EEF0; font-family: 'Lato', sans-serif; }
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .g4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 14px; }
        
        @media (max-width: 1024px) {
          .g4 { grid-template-columns: 1fr 1fr 1fr; }
        }
        
        @media (max-width: 768px) {
          .g2, .g3, .g4 { grid-template-columns: 1fr 1fr; }
          .detail-header-grid { grid-template-columns: 1fr 1fr !important; }
          .photo-strip { flex-direction: column !important; }
        }
        
        @media (max-width: 600px) {
          .g2, .g3, .g4 { grid-template-columns: 1fr; }
          .detail-header-grid { grid-template-columns: 1fr !important; }
          .photo-strip { flex-direction: column !important; }
          
          body { font-size: 14px; }
          input, select, textarea { font-size: 16px !important; }
        }
        
        @media (max-width: 480px) {
          .g2, .g3, .g4 { grid-template-columns: 1fr; }
          .detail-header-grid { grid-template-columns: 1fr !important; }
          .photo-strip { flex-direction: column !important; }
          
          body { font-size: 13px; }
          h1 { font-size: clamp(1.2rem, 3vw, 1.8rem) !important; }
          h2 { font-size: clamp(1rem, 2.5vw, 1.3rem) !important; }
          h3 { font-size: clamp(0.9rem, 2vw, 1.1rem) !important; }
          
          input, select, textarea {
            font-size: 14px !important;
            padding: 8px 10px !important;
          }
          
          button { padding: 8px 16px !important; font-size: 0.8rem !important; }
          
          p { font-size: clamp(0.8rem, 2vw, 0.9rem) !important; }
        }
        
        @media (max-width: 360px) {
          h1 { font-size: clamp(1rem, 2.5vw, 1.4rem) !important; }
          input, select, textarea {
            font-size: 13px !important;
            padding: 7px 8px !important;
          }
        }
      `}</style>

      <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#F9EEF0 0%,#FFF8F0 50%,#F9EEF0 100%)', paddingBottom:60, fontFamily:"'Lato',sans-serif" }}>

        {/* Hero Banner */}
        <div style={{ background:'linear-gradient(135deg,#5A0010 0%,#8B0000 45%,#C41E3A 100%)', padding:'40px 24px 50px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 15% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:-50, right:-50, width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.07)' }} />
          <div style={{ position:'absolute', bottom:-80, left:-40, width:240, height:240, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)' }} />

          <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
            <div style={{ display:'flex', gap:32, alignItems:'center', flexWrap:'wrap' }}>
              {/* Avatar */}
              <div style={{ flexShrink:0 }}>
                {p.photoPreviews && p.photoPreviews[0] ? (
                  <img src={p.photoPreviews[0]} alt={p.name} style={{ width:130, height:170, objectFit:'cover', borderRadius:14, border:'3px solid rgba(255,255,255,0.3)', boxShadow:'0 12px 40px rgba(0,0,0,0.3)' }} />
                ) : (
                  <div style={{ width:130, height:170, borderRadius:14, background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, border:'3px solid rgba(255,255,255,0.2)', backdropFilter:'blur(10px)' }}>
                    {p.gender === 'Female' ? '👩' : '👨'}
                  </div>
                )}
              </div>

              {/* Header Info */}
              <div style={{ flex:1, minWidth:260 }}>
                <div style={{ display:'inline-block', background:'rgba(255,255,255,0.12)', borderRadius:50, padding:'4px 16px', marginBottom:12, fontSize:'0.72rem', letterSpacing:'0.12em', color:'rgba(255,220,200,0.85)', textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.15)' }}>
                  {p.maritalStatus || 'Unmarried'} · {p.motherTongue || 'Tamil'}
                </div>
                <h1 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:700, marginBottom:6, textShadow:'0 2px 20px rgba(0,0,0,0.3)' }}>
                  {p.name}
                </h1>
                <p style={{ color:'rgba(255,215,200,0.9)', fontSize:'1.05rem', marginBottom:20, fontWeight:300 }}>
                  {p.dob ? `${new Date().getFullYear() - new Date(p.dob).getFullYear()} yrs` : p.age ? `${p.age} yrs` : ''} {p.dob && p.placeBirth ? '·' : ''} {p.placeBirth || p.location || ''}
                </p>

                <div className="detail-header-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                  {[
                    { label:'Caste', value: p.caste && p.caste !== '-Select-' ? p.caste : p.caste || '—' },
                    { label:'Occupation', value: p.job || p.occupation || '—' },
                    { label:'Star', value: p.star && p.star !== '-Select-' ? p.star : p.nakshtram || '—' },
                    { label:'Raasi', value: p.raasi && p.raasi !== '-Select Rasi-' && p.raasi !== '-Select Rasi ' ? p.raasi : '—' },
                    { label:'Height', value: p.height && p.height !== '-Select-' ? p.height : '—' },
                    { label:'Diet', value: p.diet || '—' },
                  ].map(item => (
                    <div key={item.label} style={{ background:'rgba(255,255,255,0.13)', padding:'10px 12px', borderRadius:8, backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,200,180,0.8)', marginBottom:3, fontWeight:600 }}>{item.label}</div>
                      <div style={{ fontSize:'0.88rem', color:'white', fontWeight:600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo strip if multiple photos */}
            {p.photoPreviews && p.photoPreviews.filter(Boolean).length > 1 && (
              <div className="photo-strip" style={{ display:'flex', gap:10, marginTop:20 }}>
                {p.photoPreviews.filter(Boolean).slice(1).map((src, i) => (
                  <img key={i} src={src} alt={`Photo ${i+2}`} style={{ width:80, height:100, objectFit:'cover', borderRadius:8, border:'2px solid rgba(255,255,255,0.2)', boxShadow:'0 4px 12px rgba(0,0,0,0.2)' }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth:860, margin:'-20px auto 0', padding:'0 16px', position:'relative', zIndex:10 }}>

          {/* Personal Details */}
          <div style={sectionCard}>
            <SectionTitle icon="👤" title="Personal Details" />
            <div className="g3">
              <InfoCard label="Full Name" value={p.name} icon="🏷️" />
              <InfoCard label="Gender" value={p.gender && p.gender !== '-Select-' ? p.gender : null} icon="⚧" />
              <InfoCard label="Date of Birth" value={p.dob ? new Date(p.dob).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }) : null} icon="🗓️" />
              <InfoCard label="Time of Birth" value={p.birthHour && p.birthMin ? `${p.birthHour}:${p.birthMin} ${p.birthAmPm}` : null} icon="⏰" />
              <InfoCard label="Place of Birth" value={p.placeBirth} icon="📍" />
              <InfoCard label="Nativity" value={p.nativity} icon="🏡" />
              <InfoCard label="Mother Tongue" value={p.motherTongue !== 'Select' ? p.motherTongue : null} icon="🗣️" />
              <InfoCard label="Marital Status" value={p.maritalStatus} icon="💍" />
              <InfoCard label="Complexion" value={p.complexion} icon="✨" />
            </div>
            {p.others && (
              <div style={{ marginTop:16, background:'linear-gradient(135deg,rgba(139,0,0,0.03),rgba(196,30,58,0.05))', borderRadius:10, padding:'16px 18px', border:'1px solid rgba(139,0,0,0.08)', borderLeft:'3px solid #C41E3A' }}>
                <div style={{ fontSize:'0.68rem', fontWeight:700, color:'#8B0000', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>Additional Details</div>
                <p style={{ fontSize:'0.9rem', color:'#3D1020', lineHeight:1.8 }}>{p.others}</p>
              </div>
            )}
          </div>

          {/* Family Details */}
          <div style={sectionCard}>
            <SectionTitle icon="👨‍👩‍👧‍👦" title="Family Details" />
            <div className="g2" style={{ marginBottom:14 }}>
              <InfoCard label="Father's Name" value={p.fatherName} icon="👨" />
              <InfoCard label="Father's Occupation" value={p.fatherJob} icon="💼" />
              <InfoCard label="Mother's Name" value={p.motherName} icon="👩" />
              <InfoCard label="Mother's Occupation" value={p.motherJob} icon="💼" />
            </div>
            <div className="g2">
              <InfoCard label="Father Status" value={p.fatherAlive === 'yes' ? '✅ Alive' : p.fatherAlive === 'no' ? 'Deceased' : null} />
              <InfoCard label="Mother Status" value={p.motherAlive === 'yes' ? '✅ Alive' : p.motherAlive === 'no' ? 'Deceased' : null} />
            </div>

            {/* Siblings */}
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:'0.68rem', fontWeight:700, color:'#8B0000', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12 }}>Siblings</div>
              <div style={{ overflowX:'auto', borderRadius:10, border:'1px solid rgba(196,30,58,0.12)' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.84rem' }}>
                  <thead>
                    <tr style={{ background:'linear-gradient(135deg,#8B0000,#C41E3A)' }}>
                      <th style={{ padding:'11px 16px', color:'white', fontWeight:700, textAlign:'left', fontSize:'0.78rem', letterSpacing:'0.05em' }}>Status</th>
                      {['Elder Brother','Younger Brother','Elder Sister','Younger Sister'].map(h => (
                        <th key={h} style={{ padding:'11px 14px', color:'white', fontWeight:600, textAlign:'center', fontSize:'0.75rem' }}>{h}</th>
                      ))}
                    </tr>
                    <tr style={{ background:'#FFF5F7' }}>
                      <td style={{ padding:'10px 16px', fontWeight:700, color:'#5A0010', fontSize:'0.82rem' }}>Married</td>
                      {['sibMarriedEB','sibMarriedYB','sibMarriedES','sibMarriedYS'].map(k => (
                        <td key={k} style={{ padding:'10px', textAlign:'center', color:'#2A0A0E', fontWeight:600 }}>{p[k] && p[k] !== '-' ? p[k] : '—'}</td>
                      ))}
                    </tr>
                    <tr style={{ background:'white' }}>
                      <td style={{ padding:'10px 16px', fontWeight:700, color:'#5A0010', fontSize:'0.82rem' }}>Unmarried</td>
                      {['sibUnmarriedEB','sibUnmarriedYB','sibUnmarriedES','sibUnmarriedYS'].map(k => (
                        <td key={k} style={{ padding:'10px', textAlign:'center', color:'#2A0A0E', fontWeight:600 }}>{p[k] && p[k] !== '-' ? p[k] : '—'}</td>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div style={sectionCard}>
            <SectionTitle icon="⚖️" title="Physical Attributes" />
            <div className="g4">
              <InfoCard label="Height" value={p.height && p.height !== '-Select-' ? p.height : null} icon="📏" />
              <InfoCard label="Weight" value={p.weight && p.weight !== '-Select-' ? p.weight : null} icon="⚖️" />
              <InfoCard label="Blood Group" value={p.bloodGroup && p.bloodGroup !== '-Select-' ? p.bloodGroup : null} icon="🩸" />
              <InfoCard label="Complexion" value={p.complexion} icon="🌟" />
            </div>
            <div className="g2" style={{ marginTop:14 }}>
              <InfoCard label="Diet Preference" value={p.diet} icon="🍽️" />
              <InfoCard label="Disability" value={p.disability} icon="♿" />
            </div>
          </div>

          {/* Education & Career */}
          <div style={sectionCard}>
            <SectionTitle icon="🎓" title="Education & Career" />
            <div className="g2">
              <InfoCard label="Qualification" value={p.qualification} icon="📚" />
              <InfoCard label="Job / Occupation" value={p.job || p.occupation} icon="💼" />
              <InfoCard label="Place of Job" value={p.placeJob || p.location} icon="📍" />
              <InfoCard label="Monthly Income" value={p.incomeMonth} icon="💰" />
            </div>
          </div>

          {/* Astrology Details */}
          <div style={sectionCard}>
            <SectionTitle icon="🪐" title="Astrology & Religion" />
            <div className="g3">
              <InfoCard label="Caste" value={p.caste && p.caste !== '-Select-' ? p.caste : null} icon="🏛️" />
              <InfoCard label="Sub Caste" value={p.subCaste && p.subCaste !== '-select-' ? p.subCaste : null} icon="🏛️" />
              <InfoCard label="Gothram" value={p.gothram} icon="🔱" />
              <InfoCard label="Star (Nakshatra)" value={p.star && p.star !== '-Select-' ? p.star : p.nakshtram} icon="⭐" />
              <InfoCard label="Raasi (Moon Sign)" value={p.raasi && p.raasi !== '-Select Rasi-' && p.raasi !== '-Select Rasi ' ? p.raasi : null} icon="🌙" />
              <InfoCard label="Padam" value={p.padam && p.padam !== '-Select Padam-' ? p.padam : null} icon="🌸" />
            </div>
            <div style={{ marginTop:14, maxWidth:300 }}>
              <InfoCard label="Laknam" value={p.laknam && p.laknam !== '-Select Laknam-' ? p.laknam : null} icon="🔮" />
            </div>

            {/* Horoscope Photos */}
            {(p.horoscopePreview?.rasi || p.horoscopePreview?.amsam) && (
              <div style={{ marginTop:20 }}>
                <div style={{ fontSize:'0.68rem', fontWeight:700, color:'#8B0000', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>Horoscope Charts</div>
                <div className="g2">
                  {p.horoscopePreview?.rasi && (
                    <div style={{ borderRadius:12, overflow:'hidden', border:'2px solid rgba(196,30,58,0.2)', boxShadow:'0 4px 16px rgba(139,0,0,0.1)' }}>
                      <img src={p.horoscopePreview.rasi} alt="Rasi Chart" style={{ width:'100%', display:'block' }} />
                      <div style={{ padding:'8px 12px', background:'linear-gradient(135deg,#8B0000,#C41E3A)', color:'white', fontSize:'0.78rem', fontWeight:600, textAlign:'center' }}>Rasi Chart (Janma Kundali)</div>
                    </div>
                  )}
                  {p.horoscopePreview?.amsam && (
                    <div style={{ borderRadius:12, overflow:'hidden', border:'2px solid rgba(196,30,58,0.2)', boxShadow:'0 4px 16px rgba(139,0,0,0.1)' }}>
                      <img src={p.horoscopePreview.amsam} alt="Amsam Chart" style={{ width:'100%', display:'block' }} />
                      <div style={{ padding:'8px 12px', background:'linear-gradient(135deg,#8B0000,#C41E3A)', color:'white', fontSize:'0.78rem', fontWeight:600, textAlign:'center' }}>Amsam Chart (Navamsa)</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Partner Expectations */}
          <div style={sectionCard}>
            <SectionTitle icon="💑" title="Partner Expectations" />
            <div className="g3">
              <InfoCard label="Qualification" value={p.partnerQualification} icon="🎓" />
              <InfoCard label="Job Preference" value={p.partnerJob ? `${p.partnerJob} (${p.partnerJobRequirement || 'Optional'})` : null} icon="💼" />
              <InfoCard label="Monthly Income" value={p.partnerIncomeMonth} icon="💰" />
              <InfoCard label="Preferred Age" value={p.partnerAgeFrom && p.partnerAgeTo ? `${p.partnerAgeFrom} – ${p.partnerAgeTo} yrs` : p.partnerAgeFrom ? `From ${p.partnerAgeFrom} yrs` : null} icon="🗓️" />
              <InfoCard label="Diet Preference" value={p.partnerDiet} icon="🍽️" />
              <InfoCard label="Horoscope Required" value={p.partnerHoroscopeRequired} icon="🔮" />
              <InfoCard label="Caste Preference" value={p.partnerCaste} icon="🏛️" />
              <InfoCard label="Sub Caste" value={p.partnerSubCaste} icon="🏛️" />
              <InfoCard label="Marital Status" value={p.partnerMaritalStatus} icon="💍" />
            </div>
            {p.partnerOtherRequirement && (
              <div style={{ marginTop:14, background:'rgba(139,0,0,0.03)', borderRadius:10, padding:'16px 18px', border:'1px solid rgba(139,0,0,0.08)', borderLeft:'3px solid #C41E3A' }}>
                <div style={{ fontSize:'0.68rem', fontWeight:700, color:'#8B0000', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>Additional Requirements</div>
                <p style={{ fontSize:'0.9rem', color:'#3D1020', lineHeight:1.8 }}>{p.partnerOtherRequirement}</p>
              </div>
            )}
          </div>

          {/* Communication Details */}
          <div style={sectionCard}>
            <SectionTitle icon="📞" title="Contact Information" />
            <div className="g2">
              <InfoCard label="Permanent Address" value={p.permanentAddress} icon="🏠" />
              <InfoCard label="Present Address" value={p.presentAddress} icon="📌" />
              <InfoCard label="Contact Person" value={p.contactPerson} icon="👤" />
              <InfoCard label="Contact Number" value={p.contactNumber ? `📱 ${p.contactNumber}` : null} icon="📞" />
            </div>
          </div>

          <p style={{ textAlign:'center', color:'#C4A0A8', fontSize:'0.75rem', marginTop:16 }}>
            Profile last updated · All information is kept confidential
          </p>
        </div>
      </div>
    </>
  );
}
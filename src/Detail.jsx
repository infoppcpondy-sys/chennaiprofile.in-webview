// Detail.jsx
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const profile = location.state?.profile;
  const [showContact, setShowContact] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  if (!profile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');
          * { box-sizing:border-box; margin:0; padding:0; }
        `}</style>
        <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#F9EEF0,#FFF8F0)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Lato',sans-serif" }}>
          <div style={{ textAlign:"center", padding:48, background:"white", borderRadius:24, boxShadow:"0 20px 60px rgba(139,0,0,0.12)", maxWidth:460, border:"1px solid rgba(196,30,58,0.1)" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🔍</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", color:"#8B0000", fontSize:"1.8rem", marginBottom:10 }}>{t("detail.profileNotFound")}</h2>
            <p style={{ color:"#7A4050", marginBottom:28, lineHeight:1.6, fontSize:"0.95rem" }}>{t("detail.profileNotFoundDesc")}</p>
            <button onClick={() => navigate("/")} style={{ background:"linear-gradient(135deg,#8B0000,#C41E3A)", color:"white", border:"none", padding:"12px 32px", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:"0.95rem", letterSpacing:"0.05em", boxShadow:"0 4px 16px rgba(139,0,0,0.3)" }}>
              {t("detail.backToProfiles")}
            </button>
          </div>
        </div>
      </>
    );
  }

  const p = profile;

  // Single-line label : value row
  const InfoRow = ({ label, value }) => (
    <div style={{
      display: "flex",
      alignItems: "baseline",
      gap: 0,
      padding: "11px 0",
      borderBottom: "1px solid rgba(196,30,58,0.07)",
    }}>
      <span style={{
        fontSize: "0.82rem",
        fontWeight: 700,
        color: "#8B0000",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        minWidth: 180,
        flexShrink: 0,
      }}>{label}</span>
      <span style={{ color: "#5A0010", fontSize: "0.72rem", fontWeight: 700, margin: "0 10px", flexShrink: 0 }}>:</span>
      <span style={{
        fontSize: "0.92rem",
        color: value ? "#1A0008" : "#C4A0A8",
        fontWeight: value ? 600 : 400,
        fontStyle: value ? "normal" : "italic",
        flex: 1,
      }}>
        {value || t("detail.notSpecified")}
      </span>
    </div>
  );

  const SectionTitle = ({ icon, title }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, paddingBottom:12, borderBottom:"2px solid rgba(139,0,0,0.1)" }}>
      <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#8B0000,#C41E3A)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, boxShadow:"0 3px 10px rgba(139,0,0,0.2)" }}>{icon}</div>
      <h3 style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", fontWeight:700, color:"#5A0010", letterSpacing:"0.02em" }}>{title}</h3>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(139,0,0,0.15),transparent)" }}/>
    </div>
  );

  const sectionCard = {
    background:"white",
    borderRadius:16,
    padding:"28px 28px",
    marginBottom:20,
    boxShadow:"0 2px 20px rgba(139,0,0,0.06)",
    border:"1px solid rgba(196,30,58,0.1)"
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#F9EEF0; font-family:'Lato',sans-serif; }

        .info-rows-col { display:grid; grid-template-columns:1fr 1fr; gap:0 40px; }
        @media(max-width:700px) { .info-rows-col { grid-template-columns:1fr; } .detail-header-grid { grid-template-columns:1fr 1fr !important; } }
        @media(max-width:500px) { .detail-header-grid { grid-template-columns:1fr !important; } }

        /* Contact card animation */
        .contact-reveal {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
          opacity: 0;
        }
        .contact-reveal.open {
          max-height: 600px;
          opacity: 1;
        }

        /* View Contact button */
        .contact-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 26px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.06em;
          cursor: pointer;
          border: none;
          transition: all 0.35s ease;
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .contact-btn:hover::before { transform: translateX(0); }
        .contact-btn.show {
          background: linear-gradient(135deg,#8B0000,#C41E3A);
          color: white;
          box-shadow: 0 6px 24px rgba(139,0,0,0.35);
        }
        .contact-btn.hide {
          background: white;
          color: #8B0000;
          box-shadow: 0 2px 12px rgba(139,0,0,0.12);
          border: 1.5px solid rgba(196,30,58,0.4);
        }
        .contact-btn:hover { transform: translateY(-1px); }

        /* Contact info row inside reveal */
        .contact-info-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg,#FFFAF9,#FFF5F5);
          border: 1px solid rgba(196,30,58,0.12);
          margin-bottom: 12px;
          transition: box-shadow 0.2s;
        }
        .contact-info-row:hover { box-shadow: 0 4px 18px rgba(139,0,0,0.1); }
        .contact-icon-wrap {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg,#8B0000,#C41E3A);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(139,0,0,0.25);
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#F9EEF0 0%,#FFF8F0 50%,#F9EEF0 100%)", paddingBottom:60, fontFamily:"'Lato',sans-serif" }}>

        {/* Hero Banner */}
        <div style={{ background:"linear-gradient(135deg,#5A0010 0%,#8B0000 45%,#C41E3A 100%)", padding:"40px 24px 50px", position:"relative", overflow:"hidden" }}>
          <div style={{ maxWidth:860, margin:"0 auto", position:"relative" }}>
            <div style={{ display:"flex", gap:32, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ flexShrink:0 }}>
                {p.photoPreviews && p.photoPreviews[0] ? (
                  <img src={p.photoPreviews[0]} alt={p.name} style={{ width:130, height:170, objectFit:"cover", borderRadius:14, border:"3px solid rgba(255,255,255,0.3)", boxShadow:"0 12px 40px rgba(0,0,0,0.3)" }}/>
                ) : (
                  <div style={{ width:130, height:170, borderRadius:14, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, border:"3px solid rgba(255,255,255,0.2)" }}>
                    {p.gender === "Female" ? "👩" : "👨"}
                  </div>
                )}
              </div>
              <div style={{ flex:1, minWidth:260 }}>
                <div style={{ display:"inline-block", background:"rgba(255,255,255,0.12)", borderRadius:50, padding:"4px 16px", marginBottom:12, fontSize:"0.72rem", letterSpacing:"0.12em", color:"rgba(255,220,200,0.85)", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.15)" }}>
                  {p.maritalStatus || t("detail.unmarried")} · {p.motherTongue || "Tamil"}
                </div>
                <h1 style={{ fontFamily:"'Playfair Display',serif", color:"white", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, marginBottom:6, textShadow:"0 2px 20px rgba(0,0,0,0.3)" }}>{p.name}</h1>
                <p style={{ color:"rgba(255,215,200,0.9)", fontSize:"1.05rem", marginBottom:20, fontWeight:300 }}>
                  {p.dob ? `${new Date().getFullYear() - new Date(p.dob).getFullYear()} ${t("detail.yrs")}` : p.age ? `${p.age} ${t("detail.yrs")}` : ""}
                  {p.dob && p.placeBirth ? " · " : ""}{p.placeBirth || p.location || ""}
                </p>
                <div className="detail-header-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                  {[
                    { label: t("detail.caste"),        value: p.caste && p.caste !== "-Select-" ? p.caste : "—" },
                    { label: t("detail.jobOccupation"), value: p.job || p.occupation || "—" },
                    { label: t("detail.starNakshatra"), value: p.star && p.star !== "-Select-" ? p.star : p.nakshtram || "—" },
                    { label: t("detail.raasi"),         value: p.raasi && p.raasi !== "-Select Rasi-" ? p.raasi : "—" },
                    { label: t("detail.height"),        value: p.height && p.height !== "-Select-" ? p.height : "—" },
                    { label: t("detail.dietPreference"),value: p.diet || "—" },
                  ].map(item => (
                    <div key={item.label} style={{ background:"rgba(255,255,255,0.13)", padding:"10px 12px", borderRadius:8, backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.1)" }}>
                      <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,200,180,0.8)", marginBottom:3, fontWeight:600 }}>{item.label}</div>
                      <div style={{ fontSize:"0.88rem", color:"white", fontWeight:600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth:860, margin:"-20px auto 0", padding:"0 16px", position:"relative", zIndex:10 }}>

          {/* ── Personal Details ── */}
          <div style={sectionCard}>
            <SectionTitle icon="👤" title={t("detail.personalDetails")}/>
            <div className="info-rows-col">
              <InfoRow label={t("detail.fullName")}      value={p.name}/>
              <InfoRow label={t("detail.gender")}        value={p.gender && p.gender !== "-Select-" ? p.gender : null}/>
              <InfoRow label={t("detail.dateOfBirth")}   value={p.dob ? new Date(p.dob).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) : null}/>
              <InfoRow label={t("detail.timeOfBirth")}   value={p.birthHour && p.birthMin ? `${p.birthHour}:${p.birthMin} ${p.birthAmPm}` : null}/>
              <InfoRow label={t("detail.placeOfBirth")}  value={p.placeBirth}/>
              <InfoRow label={t("detail.nativity")}      value={p.nativity}/>
              <InfoRow label={t("detail.motherTongue")}  value={p.motherTongue !== "Select" ? p.motherTongue : null}/>
              <InfoRow label={t("detail.maritalStatus")} value={p.maritalStatus}/>
              <InfoRow label={t("detail.complexion")}    value={p.complexion}/>
            </div>
            {p.others && (
              <div style={{ marginTop:18, background:"linear-gradient(135deg,rgba(139,0,0,0.03),rgba(196,30,58,0.05))", borderRadius:10, padding:"16px 18px", border:"1px solid rgba(139,0,0,0.08)", borderLeft:"3px solid #C41E3A" }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>{t("detail.additionalDetails")}</div>
                <p style={{ fontSize:"0.9rem", color:"#3D1020", lineHeight:1.8 }}>{p.others}</p>
              </div>
            )}
          </div>

          {/* ── Family Details ── */}
          <div style={sectionCard}>
            <SectionTitle icon="👨‍👩‍👧‍👦" title={t("detail.familyDetails")}/>
            <div className="info-rows-col" style={{ marginBottom:4 }}>
              <InfoRow label={t("detail.fathersName")}       value={p.fatherName}/>
              <InfoRow label={t("detail.fathersOccupation")} value={p.fatherJob}/>
              <InfoRow label={t("detail.mothersName")}       value={p.motherName}/>
              <InfoRow label={t("detail.mothersOccupation")} value={p.motherJob}/>
              <InfoRow label={t("detail.fatherStatus")}      value={p.fatherAlive === "yes" ? t("detail.alive") : p.fatherAlive === "no" ? t("detail.deceased") : null}/>
              <InfoRow label={t("detail.motherStatus")}      value={p.motherAlive === "yes" ? t("detail.alive") : p.motherAlive === "no" ? t("detail.deceased") : null}/>
            </div>
            <div style={{ marginTop:18 }}>
              <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>{t("detail.siblings")}</div>
              <div style={{ overflowX:"auto", borderRadius:10, border:"1px solid rgba(196,30,58,0.12)" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.84rem" }}>
                  <thead>
                    <tr style={{ background:"linear-gradient(135deg,#8B0000,#C41E3A)" }}>
                      <th style={{ padding:"11px 16px", color:"white", fontWeight:700, textAlign:"left", fontSize:"0.78rem" }}>Status</th>
                      {[t("detail.elderBrother"), t("detail.youngerBrother"), t("detail.elderSister"), t("detail.youngerSister")].map(h => (
                        <th key={h} style={{ padding:"11px 14px", color:"white", fontWeight:600, textAlign:"center", fontSize:"0.75rem" }}>{h}</th>
                      ))}
                    </tr>
                    <tr style={{ background:"#FFF5F7" }}>
                      <td style={{ padding:"10px 16px", fontWeight:700, color:"#5A0010", fontSize:"0.82rem" }}>{t("detail.married")}</td>
                      {["sibMarriedEB","sibMarriedYB","sibMarriedES","sibMarriedYS"].map(k => (
                        <td key={k} style={{ padding:"10px", textAlign:"center", color:"#2A0A0E", fontWeight:600 }}>{p[k] && p[k] !== "-" ? p[k] : "—"}</td>
                      ))}
                    </tr>
                    <tr style={{ background:"white" }}>
                      <td style={{ padding:"10px 16px", fontWeight:700, color:"#5A0010", fontSize:"0.82rem" }}>{t("detail.unmarried")}</td>
                      {["sibUnmarriedEB","sibUnmarriedYB","sibUnmarriedES","sibUnmarriedYS"].map(k => (
                        <td key={k} style={{ padding:"10px", textAlign:"center", color:"#2A0A0E", fontWeight:600 }}>{p[k] && p[k] !== "-" ? p[k] : "—"}</td>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          {/* ── Physical Attributes ── */}
          <div style={sectionCard}>
            <SectionTitle icon="⚖️" title={t("detail.physicalAttributes")}/>
            <div className="info-rows-col">
              <InfoRow label={t("detail.height")}       value={p.height && p.height !== "-Select-" ? p.height : null}/>
              <InfoRow label={t("detail.weight")}       value={p.weight && p.weight !== "-Select-" ? p.weight : null}/>
              <InfoRow label={t("detail.bloodGroup")}   value={p.bloodGroup && p.bloodGroup !== "-Select-" ? p.bloodGroup : null}/>
              <InfoRow label={t("detail.complexion")}   value={p.complexion}/>
              <InfoRow label={t("detail.dietPreference")} value={p.diet}/>
              <InfoRow label={t("detail.disability")}   value={p.disability}/>
            </div>
          </div>

          {/* ── Education & Career ── */}
          <div style={sectionCard}>
            <SectionTitle icon="🎓" title={t("detail.educationCareer")}/>
            <div className="info-rows-col">
              <InfoRow label={t("detail.qualification")}  value={p.qualification}/>
              <InfoRow label={t("detail.jobOccupation")}  value={p.job || p.occupation}/>
              <InfoRow label={t("detail.placeOfJob")}     value={p.placeJob || p.location}/>
              <InfoRow label={t("detail.monthlyIncome")}  value={p.incomeMonth}/>
            </div>
          </div>

          {/* ── Astrology & Religion ── */}
          <div style={sectionCard}>
            <SectionTitle icon="🪐" title={t("detail.astrologyReligion")}/>
            <div className="info-rows-col">
              <InfoRow label={t("detail.caste")}         value={p.caste && p.caste !== "-Select-" ? p.caste : null}/>
              <InfoRow label={t("detail.subCaste")}      value={p.subCaste && p.subCaste !== "-select-" ? p.subCaste : null}/>
              <InfoRow label={t("detail.gothram")}       value={p.gothram}/>
              <InfoRow label={t("detail.starNakshatra")} value={p.star && p.star !== "-Select-" ? p.star : p.nakshtram}/>
              <InfoRow label={t("detail.raasi")}         value={p.raasi && p.raasi !== "-Select Rasi-" ? p.raasi : null}/>
              <InfoRow label={t("detail.padam")}         value={p.padam && p.padam !== "-Select Padam-" ? p.padam : null}/>
              <InfoRow label={t("detail.laknam")}        value={p.laknam && p.laknam !== "-Select Laknam-" ? p.laknam : null}/>
            </div>
            {(p.horoscopePreview?.rasi || p.horoscopePreview?.amsam) && (
              <div style={{ marginTop:20 }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>{t("detail.horoscopeCharts")}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {p.horoscopePreview?.rasi && (
                    <div style={{ borderRadius:12, overflow:"hidden", border:"2px solid rgba(196,30,58,0.2)" }}>
                      <img src={p.horoscopePreview.rasi} alt={t("detail.rasiChart")} style={{ width:"100%", display:"block" }}/>
                      <div style={{ padding:"8px 12px", background:"linear-gradient(135deg,#8B0000,#C41E3A)", color:"white", fontSize:"0.78rem", fontWeight:600, textAlign:"center" }}>{t("detail.rasiChart")}</div>
                    </div>
                  )}
                  {p.horoscopePreview?.amsam && (
                    <div style={{ borderRadius:12, overflow:"hidden", border:"2px solid rgba(196,30,58,0.2)" }}>
                      <img src={p.horoscopePreview.amsam} alt={t("detail.amsamChart")} style={{ width:"100%", display:"block" }}/>
                      <div style={{ padding:"8px 12px", background:"linear-gradient(135deg,#8B0000,#C41E3A)", color:"white", fontSize:"0.78rem", fontWeight:600, textAlign:"center" }}>{t("detail.amsamChart")}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Partner Expectations ── */}
          <div style={sectionCard}>
            <SectionTitle icon="💑" title={t("detail.partnerExpectations")}/>
            <div className="info-rows-col">
              <InfoRow label={t("detail.partnerQualification")} value={p.partnerQualification}/>
              <InfoRow label={t("detail.partnerJob")}           value={p.partnerJob ? `${p.partnerJob} (${p.partnerJobRequirement || "Optional"})` : null}/>
              <InfoRow label={t("detail.partnerIncome")}        value={p.partnerIncomeMonth}/>
              <InfoRow label={t("detail.preferredAge")}         value={p.partnerAgeFrom && p.partnerAgeTo ? `${p.partnerAgeFrom} – ${p.partnerAgeTo} ${t("detail.yrs")}` : p.partnerAgeFrom ? `From ${p.partnerAgeFrom} ${t("detail.yrs")}` : null}/>
              <InfoRow label={t("detail.partnerDiet")}          value={p.partnerDiet}/>
              <InfoRow label={t("detail.horoscopeRequired")}    value={p.partnerHoroscopeRequired}/>
              <InfoRow label={t("detail.castePref")}            value={p.partnerCaste}/>
              <InfoRow label={t("detail.subCastePref")}         value={p.partnerSubCaste}/>
              <InfoRow label={t("detail.partnerMarital")}       value={p.partnerMaritalStatus}/>
            </div>
            {p.partnerOtherRequirement && (
              <div style={{ marginTop:14, background:"rgba(139,0,0,0.03)", borderRadius:10, padding:"16px 18px", border:"1px solid rgba(139,0,0,0.08)", borderLeft:"3px solid #C41E3A" }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>{t("detail.additionalRequirements")}</div>
                <p style={{ fontSize:"0.9rem", color:"#3D1020", lineHeight:1.8 }}>{p.partnerOtherRequirement}</p>
              </div>
            )}
          </div>

          {/* ── Contact Information (Attractive Reveal) ── */}
          <div style={{
            ...sectionCard,
            background: showContact
              ? "linear-gradient(135deg,#fff 0%,#FFF5F5 100%)"
              : "white",
            transition: "background 0.4s ease",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Decorative top bar */}
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:4,
              background:"linear-gradient(90deg,#5A0010,#8B0000,#C41E3A,#E05070,#C41E3A,#8B0000,#5A0010)",
              backgroundSize:"200% 100%",
              animation: showContact ? "shimmer 2.5s linear infinite" : "none",
            }}/>
            <style>{`
              @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
              @keyframes fadeSlideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
              @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
            `}</style>

            {/* Header row */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: showContact ? 24 : 0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{
                  width:44, height:44, borderRadius:"50%",
                  background:"linear-gradient(135deg,#8B0000,#C41E3A)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:20, flexShrink:0,
                  boxShadow:"0 4px 14px rgba(139,0,0,0.25)",
                }}>📞</div>
                <div>
                  <h3 style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", fontWeight:700, color:"#5A0010", letterSpacing:"0.02em" }}>
                    {t("detail.contactInformation")}
                  </h3>
                  <p style={{ margin:0, fontSize:"0.75rem", color:"#C4A0A8", marginTop:2 }}>
                    {showContact ? "Contact details are visible" : "Click to reveal contact details"}
                  </p>
                </div>
              </div>

              {/* Pill toggle button */}
              <button
                onClick={() => setShowContact(!showContact)}
                className={`contact-btn ${showContact ? "hide" : "show"}`}
              >
                {showContact ? (
                  <>
                    <span style={{ fontSize:14 }}>🔒</span>
                    {t('common.hide')}
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 14 }}>👁️</span>
                    {t('common.viewContact')}
                  </>
                )}
              </button>
            
            </div>

            {/* Animated reveal area */}
            <div className={`contact-reveal ${showContact ? "open" : ""}`}>
              {/* Divider with label */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(196,30,58,0.25))" }}/>
                <span style={{ fontSize:"0.7rem", fontWeight:700, color:"#C41E3A", textTransform:"uppercase", letterSpacing:"0.12em" }}>Contact Details</span>
                <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(196,30,58,0.25),transparent)" }}/>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {/* Permanent Address */}
                <div className="contact-info-row" style={{ animation: showContact ? "fadeSlideIn 0.4s ease 0.05s both" : "none" }}>
                  <div className="contact-icon-wrap">🏠</div>
                  <div>
                    <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>{t("detail.permanentAddress")}</div>
                    <div style={{ fontSize:"0.9rem", color: p.permanentAddress ? "#1A0008" : "#C4A0A8", fontWeight: p.permanentAddress ? 600 : 400, fontStyle: p.permanentAddress ? "normal" : "italic", lineHeight:1.5 }}>
                      {p.permanentAddress || t("detail.notSpecified")}
                    </div>
                  </div>
                </div>

                {/* Present Address */}
                <div className="contact-info-row" style={{ animation: showContact ? "fadeSlideIn 0.4s ease 0.1s both" : "none" }}>
                  <div className="contact-icon-wrap">📍</div>
                  <div>
                    <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>{t("detail.presentAddress")}</div>
                    <div style={{ fontSize:"0.9rem", color: p.presentAddress ? "#1A0008" : "#C4A0A8", fontWeight: p.presentAddress ? 600 : 400, fontStyle: p.presentAddress ? "normal" : "italic", lineHeight:1.5 }}>
                      {p.presentAddress || t("detail.notSpecified")}
                    </div>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="contact-info-row" style={{ animation: showContact ? "fadeSlideIn 0.4s ease 0.15s both" : "none" }}>
                  <div className="contact-icon-wrap">👤</div>
                  <div>
                    <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>{t("detail.contactPerson")}</div>
                    <div style={{ fontSize:"0.9rem", color: p.contactPerson ? "#1A0008" : "#C4A0A8", fontWeight: p.contactPerson ? 600 : 400, fontStyle: p.contactPerson ? "normal" : "italic" }}>
                      {p.contactPerson || t("detail.notSpecified")}
                    </div>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="contact-info-row" style={{ animation: showContact ? "fadeSlideIn 0.4s ease 0.2s both" : "none" }}>
                  <div className="contact-icon-wrap">📱</div>
                  <div>
                    <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>{t("detail.contactNumber")}</div>
                    {p.contactNumber ? (
                      <a href={`tel:${p.contactNumber}`} style={{ fontSize:"1rem", color:"#8B0000", fontWeight:700, textDecoration:"none", letterSpacing:"0.05em" }}>
                        {p.contactNumber.substring(0, 5) + '*'.repeat(5)}
                      </a>
                    ) : (
                      <div style={{ fontSize:"0.9rem", color:"#C4A0A8", fontStyle:"italic", fontWeight:400 }}>{t("detail.notSpecified")}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div style={{ marginTop:18, textAlign:"center", padding:"12px 20px", borderRadius:10, background:"rgba(139,0,0,0.04)", border:"1px dashed rgba(196,30,58,0.2)" }}>
                <span style={{ fontSize:"0.75rem", color:"#A06070" }}>🔐 {t("detail.profileConfidential")}</span>
              </div>
            </div>
          </div>

          {/* Report Profile Button Section */}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setShowReportModal(true)}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 32px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                border: "1.5px solid rgba(196,30,58,0.5)",
                background: "white",
                color: "#8B0000",
                boxShadow: "0 4px 16px rgba(139,0,0,0.15)",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 8px 28px rgba(139,0,0,0.3)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 4px 16px rgba(139,0,0,0.15)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              {t('common.reportProfile')}
            </button>
          </div>
        </div>

        {/* Report Modal */}
        {showReportModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(42, 24, 16, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            backdropFilter: "blur(4px)",
          }} onClick={() => setShowReportModal(false)}>
            <div style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(139, 0, 0, 0.3)",
              animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }} onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div style={{
                background: "linear-gradient(135deg, #8B0000, #C41E3A)",
                padding: "28px 24px",
                textAlign: "center",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "36px",
                  height: "36px",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }} onClick={() => setShowReportModal(false)}>
                  ✕
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                  letterSpacing: "0.02em",
                }}>
                  {t('common.reportProfile')}
                </h2>
              </div>

              {/* Modal Body */}
              <div style={{ padding: "32px 24px" }}>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#3D1020",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                }}>
                  {t('detail.reportReason')}
                </p>

                {/* Report Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  {[
                    { value: "already_married", label: `👰 ${t('detail.reportAlreadyMarried')}`, icon: "👰" },
                    { value: "misinformation", label: `⚠️ ${t('detail.reportMisinformation')}`, icon: "⚠️" },
                    { value: "fraud", label: `🚨 ${t('detail.reportFraud')}`, icon: "🚨" },
                  ].map((option) => (
                    <label key={option.value} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      border: reportReason === option.value ? "2px solid #8B0000" : "2px solid rgba(196, 30, 58, 0.2)",
                      borderRadius: "10px",
                      background: reportReason === option.value ? "rgba(139, 0, 0, 0.05)" : "white",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}>
                      <input
                        type="radio"
                        name="report_reason"
                        value={option.value}
                        checked={reportReason === option.value}
                        onChange={(e) => setReportReason(e.target.value)}
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          accentColor: "#8B0000",
                        }}
                      />
                      <span style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: reportReason === option.value ? "#8B0000" : "#1A0008",
                      }}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <button
                    onClick={() => setShowReportModal(false)}
                    style={{
                      padding: "12px 20px",
                      background: "transparent",
                      border: "2px solid rgba(196, 30, 58, 0.3)",
                      borderRadius: "10px",
                      color: "#8B0000",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(196, 30, 58, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={() => {
                      if (reportReason) {
                        alert(`Profile reported for: ${reportReason.replace(/_/g, " ")}`);
                        setShowReportModal(false);
                        setReportReason("");
                      }
                    }}
                    disabled={!reportReason}
                    style={{
                      padding: "12px 20px",
                      background: reportReason ? "linear-gradient(135deg, #8B0000, #C41E3A)" : "rgba(139, 0, 0, 0.3)",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: 600,
                      cursor: reportReason ? "pointer" : "not-allowed",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                      boxShadow: reportReason ? "0 4px 16px rgba(139, 0, 0, 0.3)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (reportReason) {
                        e.target.style.boxShadow = "0 8px 24px rgba(139, 0, 0, 0.4)";
                        e.target.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (reportReason) {
                        e.target.style.boxShadow = "0 4px 16px rgba(139, 0, 0, 0.3)";
                        e.target.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {t('common.submitReport')}
                  </button>
                </div>

                {/* Disclaimer */}
                <p style={{
                  fontSize: "0.75rem",
                  color: "#A06070",
                  marginTop: "16px",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}>
                  🔒 {t('detail.reportDisclaimer')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

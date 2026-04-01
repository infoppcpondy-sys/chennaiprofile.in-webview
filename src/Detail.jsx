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

  const InfoCard = ({ label, value }) => (
    <div style={{ background:"#FFFAF9", borderRadius:10, padding:"14px 16px", border:"1px solid rgba(196,30,58,0.1)", borderLeft:"3px solid #C41E3A" }}>
      <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:"0.92rem", color:"#2A0A0E", fontWeight:600, lineHeight:1.5 }}>
        {value || <span style={{ color:"#C4A0A8", fontStyle:"italic", fontWeight:400 }}>{t("detail.notSpecified")}</span>}
      </div>
    </div>
  );

  const SectionTitle = ({ icon, title }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, paddingBottom:12, borderBottom:"1px solid rgba(139,0,0,0.1)" }}>
      <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#8B0000,#C41E3A)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, boxShadow:"0 3px 10px rgba(139,0,0,0.2)" }}>{icon}</div>
      <h3 style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", fontWeight:700, color:"#5A0010", letterSpacing:"0.02em" }}>{title}</h3>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(139,0,0,0.15),transparent)" }}/>
    </div>
  );

  const sectionCard = { background:"white", borderRadius:16, padding:"28px 28px", marginBottom:20, boxShadow:"0 2px 20px rgba(139,0,0,0.06)", border:"1px solid rgba(196,30,58,0.1)" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#F9EEF0; font-family:'Lato',sans-serif; }
        .g2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .g3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .g4 { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:14px; }
        @media(max-width:768px) { .g2,.g3,.g4 { grid-template-columns:1fr 1fr; } .detail-header-grid { grid-template-columns:1fr 1fr !important; } }
        @media(max-width:600px) { .g2,.g3,.g4 { grid-template-columns:1fr; } .detail-header-grid { grid-template-columns:1fr !important; } }
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
                  {p.dob ? `${new Date().getFullYear() - new Date(p.dob).getFullYear()} ${t("detail.yrs")}` : p.age ? `${p.age} ${t("detail.yrs")}` : ""}{" "}
                  {p.dob && p.placeBirth ? "·" : ""}{" "}{p.placeBirth || p.location || ""}
                </p>
                <div className="detail-header-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                  {[
                    { label: t("detail.caste"),      value: p.caste && p.caste !== "-Select-" ? p.caste : "—" },
                    { label: t("detail.jobOccupation"), value: p.job || p.occupation || "—" },
                    { label: t("detail.starNakshatra"),  value: p.star && p.star !== "-Select-" ? p.star : p.nakshtram || "—" },
                    { label: t("detail.raasi"),       value: p.raasi && p.raasi !== "-Select Rasi-" ? p.raasi : "—" },
                    { label: t("detail.height"),      value: p.height && p.height !== "-Select-" ? p.height : "—" },
                    { label: t("detail.dietPreference"), value: p.diet || "—" },
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

          {/* Personal Details */}
          <div style={sectionCard}>
            <SectionTitle icon="👤" title={t("detail.personalDetails")}/>
            <div className="g3">
              <InfoCard label={t("detail.fullName")} value={p.name}/>
              <InfoCard label={t("detail.gender")} value={p.gender && p.gender !== "-Select-" ? p.gender : null}/>
              <InfoCard label={t("detail.dateOfBirth")} value={p.dob ? new Date(p.dob).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) : null}/>
              <InfoCard label={t("detail.timeOfBirth")} value={p.birthHour && p.birthMin ? `${p.birthHour}:${p.birthMin} ${p.birthAmPm}` : null}/>
              <InfoCard label={t("detail.placeOfBirth")} value={p.placeBirth}/>
              <InfoCard label={t("detail.nativity")} value={p.nativity}/>
              <InfoCard label={t("detail.motherTongue")} value={p.motherTongue !== "Select" ? p.motherTongue : null}/>
              <InfoCard label={t("detail.maritalStatus")} value={p.maritalStatus}/>
              <InfoCard label={t("detail.complexion")} value={p.complexion}/>
            </div>
            {p.others && (
              <div style={{ marginTop:16, background:"linear-gradient(135deg,rgba(139,0,0,0.03),rgba(196,30,58,0.05))", borderRadius:10, padding:"16px 18px", border:"1px solid rgba(139,0,0,0.08)", borderLeft:"3px solid #C41E3A" }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>{t("detail.additionalDetails")}</div>
                <p style={{ fontSize:"0.9rem", color:"#3D1020", lineHeight:1.8 }}>{p.others}</p>
              </div>
            )}
          </div>

          {/* Family Details */}
          <div style={sectionCard}>
            <SectionTitle icon="👨‍👩‍👧‍👦" title={t("detail.familyDetails")}/>
            <div className="g2" style={{ marginBottom:14 }}>
              <InfoCard label={t("detail.fathersName")} value={p.fatherName}/>
              <InfoCard label={t("detail.fathersOccupation")} value={p.fatherJob}/>
              <InfoCard label={t("detail.mothersName")} value={p.motherName}/>
              <InfoCard label={t("detail.mothersOccupation")} value={p.motherJob}/>
            </div>
            <div className="g2">
              <InfoCard label={t("detail.fatherStatus")} value={p.fatherAlive === "yes" ? t("detail.alive") : p.fatherAlive === "no" ? t("detail.deceased") : null}/>
              <InfoCard label={t("detail.motherStatus")} value={p.motherAlive === "yes" ? t("detail.alive") : p.motherAlive === "no" ? t("detail.deceased") : null}/>
            </div>
            <div style={{ marginTop:16 }}>
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

          {/* Physical Attributes */}
          <div style={sectionCard}>
            <SectionTitle icon="⚖️" title={t("detail.physicalAttributes")}/>
            <div className="g4">
              <InfoCard label={t("detail.height")} value={p.height && p.height !== "-Select-" ? p.height : null}/>
              <InfoCard label={t("detail.weight")} value={p.weight && p.weight !== "-Select-" ? p.weight : null}/>
              <InfoCard label={t("detail.bloodGroup")} value={p.bloodGroup && p.bloodGroup !== "-Select-" ? p.bloodGroup : null}/>
              <InfoCard label={t("detail.complexion")} value={p.complexion}/>
            </div>
            <div className="g2" style={{ marginTop:14 }}>
              <InfoCard label={t("detail.dietPreference")} value={p.diet}/>
              <InfoCard label={t("detail.disability")} value={p.disability}/>
            </div>
          </div>

          {/* Education & Career */}
          <div style={sectionCard}>
            <SectionTitle icon="🎓" title={t("detail.educationCareer")}/>
            <div className="g2">
              <InfoCard label={t("detail.qualification")} value={p.qualification}/>
              <InfoCard label={t("detail.jobOccupation")} value={p.job || p.occupation}/>
              <InfoCard label={t("detail.placeOfJob")} value={p.placeJob || p.location}/>
              <InfoCard label={t("detail.monthlyIncome")} value={p.incomeMonth}/>
            </div>
          </div>

          {/* Astrology */}
          <div style={sectionCard}>
            <SectionTitle icon="🪐" title={t("detail.astrologyReligion")}/>
            <div className="g3">
              <InfoCard label={t("detail.caste")} value={p.caste && p.caste !== "-Select-" ? p.caste : null}/>
              <InfoCard label={t("detail.subCaste")} value={p.subCaste && p.subCaste !== "-select-" ? p.subCaste : null}/>
              <InfoCard label={t("detail.gothram")} value={p.gothram}/>
              <InfoCard label={t("detail.starNakshatra")} value={p.star && p.star !== "-Select-" ? p.star : p.nakshtram}/>
              <InfoCard label={t("detail.raasi")} value={p.raasi && p.raasi !== "-Select Rasi-" ? p.raasi : null}/>
              <InfoCard label={t("detail.padam")} value={p.padam && p.padam !== "-Select Padam-" ? p.padam : null}/>
            </div>
            <div style={{ marginTop:14, maxWidth:300 }}>
              <InfoCard label={t("detail.laknam")} value={p.laknam && p.laknam !== "-Select Laknam-" ? p.laknam : null}/>
            </div>
            {(p.horoscopePreview?.rasi || p.horoscopePreview?.amsam) && (
              <div style={{ marginTop:20 }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>{t("detail.horoscopeCharts")}</div>
                <div className="g2">
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

          {/* Partner Expectations */}
          <div style={sectionCard}>
            <SectionTitle icon="💑" title={t("detail.partnerExpectations")}/>
            <div className="g3">
              <InfoCard label={t("detail.partnerQualification")} value={p.partnerQualification}/>
              <InfoCard label={t("detail.partnerJob")} value={p.partnerJob ? `${p.partnerJob} (${p.partnerJobRequirement || "Optional"})` : null}/>
              <InfoCard label={t("detail.partnerIncome")} value={p.partnerIncomeMonth}/>
              <InfoCard label={t("detail.preferredAge")} value={p.partnerAgeFrom && p.partnerAgeTo ? `${p.partnerAgeFrom} – ${p.partnerAgeTo} ${t("detail.yrs")}` : p.partnerAgeFrom ? `From ${p.partnerAgeFrom} ${t("detail.yrs")}` : null}/>
              <InfoCard label={t("detail.partnerDiet")} value={p.partnerDiet}/>
              <InfoCard label={t("detail.horoscopeRequired")} value={p.partnerHoroscopeRequired}/>
              <InfoCard label={t("detail.castePref")} value={p.partnerCaste}/>
              <InfoCard label={t("detail.subCastePref")} value={p.partnerSubCaste}/>
              <InfoCard label={t("detail.partnerMarital")} value={p.partnerMaritalStatus}/>
            </div>
            {p.partnerOtherRequirement && (
              <div style={{ marginTop:14, background:"rgba(139,0,0,0.03)", borderRadius:10, padding:"16px 18px", border:"1px solid rgba(139,0,0,0.08)", borderLeft:"3px solid #C41E3A" }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#8B0000", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>{t("detail.additionalRequirements")}</div>
                <p style={{ fontSize:"0.9rem", color:"#3D1020", lineHeight:1.8 }}>{p.partnerOtherRequirement}</p>
              </div>
            )}
          </div>

          {/* Communication Details */}
          <div style={sectionCard}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#8B0000,#C41E3A)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, boxShadow:"0 3px 10px rgba(139,0,0,0.2)" }}>📞</div>
                <h3 style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", fontWeight:700, color:"#5A0010", letterSpacing:"0.02em" }}>{t("detail.contactInformation")}</h3>
              </div>
              <button 
                onClick={() => setShowContact(!showContact)}
                style={{
                  background: showContact ? "linear-gradient(135deg,#8B0000,#C41E3A)" : "white",
                  color: showContact ? "white" : "#8B0000",
                  border: "1.5px solid #C41E3A",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  transition: "all 0.3s ease",
                  boxShadow: showContact ? "0 4px 12px rgba(139,0,0,0.3)" : "none"
                }}
              >
                {showContact ? "Hide Contact" : "View Contact"}
              </button>
            </div>
            {showContact && (
              <>
                <div style={{ marginBottom:16 }} />
                <div className="g2">
                  <InfoCard label={t("detail.permanentAddress")} value={p.permanentAddress}/>
                  <InfoCard label={t("detail.presentAddress")} value={p.presentAddress}/>
                  <InfoCard label={t("detail.contactPerson")} value={p.contactPerson}/>
                  <InfoCard label={t("detail.contactNumber")} value={p.contactNumber ? `📱 ${p.contactNumber}` : null}/>
                </div>
              </>
            )}
          </div>

          <p style={{ textAlign:"center", color:"#C4A0A8", fontSize:"0.75rem", marginTop:16 }}>{t("detail.profileConfidential")}</p>
        </div>
      </div>
    </>
  );
}
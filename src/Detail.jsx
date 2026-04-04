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
  const [activePhoto, setActivePhoto] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  if (!profile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        `}</style>
        <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#ede7f3,#f5f0fa,#ede7f3)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
          <div style={{ textAlign:"center", padding:48, background:"white", borderRadius:24, boxShadow:"0 8px 40px rgba(80,40,120,0.08)", maxWidth:460, border:"1px solid rgba(120,80,160,0.08)" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#e8dff0,#d4c8e8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px" }}>🔍</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", color:"#3a2060", fontSize:"1.8rem", marginBottom:10 }}>{t("detail.profileNotFound")}</h2>
            <p style={{ color:"#7a6890", marginBottom:28, lineHeight:1.6, fontSize:"0.95rem" }}>{t("detail.profileNotFoundDesc")}</p>
            <button onClick={() => navigate("/")} style={{ background:"linear-gradient(135deg,#5a3a8a,#7a50b0)", color:"white", border:"none", padding:"13px 34px", borderRadius:12, fontWeight:600, cursor:"pointer", fontSize:"0.95rem", boxShadow:"0 6px 24px rgba(90,58,138,0.25)" }}>
              {t("detail.backToProfiles")}
            </button>
          </div>
        </div>
      </>
    );
  }

  const p = profile;

  /* ── Reusable row: icon + label + value ── */
  const InfoRow = ({ icon, label, value }) => (
    <div style={{
      display:"flex", alignItems:"flex-start", gap:14,
      padding:"13px 0",
      borderBottom:"1px solid rgba(120,80,160,0.06)",
    }}>
      <div style={{
        width:32, height:32, borderRadius:10,
        background:"linear-gradient(135deg,#e8dff0,#d8cce8)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:14, flexShrink:0, color:"#5a3a8a",
        marginTop:1,
      }}>{icon || "👤"}</div>
      <div style={{ flex:1 }}>
        <div style={{
          fontSize:"0.72rem", fontWeight:700, color:"#7a6090",
          textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3,
        }}>{label}</div>
        <div style={{
          fontSize:"0.93rem",
          color: value ? "#2a1848" : "#b8a8c8",
          fontWeight: value ? 600 : 400,
          fontStyle: value ? "normal" : "italic",
          lineHeight:1.5,
        }}>
          {value || t("detail.notSpecified")}
        </div>
      </div>
    </div>
  );

  /* ── Section card wrapper ── */
  const SectionCard = ({ title, children, style: extraStyle }) => (
    <div style={{
      background:"white",
      borderRadius:20,
      border:"1px solid rgba(120,80,160,0.08)",
      boxShadow:"0 2px 16px rgba(80,40,120,0.04)",
      marginBottom:20,
      overflow:"hidden",
      ...extraStyle,
    }}>
      {title && (
        <div style={{
          padding:"20px 28px 16px",
          borderBottom:"1px solid rgba(120,80,160,0.06)",
        }}>
          <h3 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"1.25rem", fontWeight:700,
            color:"#3a2060", margin:0,
          }}>{title}</h3>
        </div>
      )}
      <div style={{ padding:"8px 28px 20px" }}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#ede7f3; }

        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .detail-page {
          min-height:100vh;
          background:linear-gradient(160deg,#ede7f3 0%,#f5f0fa 40%,#ede7f3 100%);
          font-family:'Inter',system-ui,-apple-system,sans-serif;
          padding:24px 16px 60px;
        }
        .detail-container {
          max-width:640px;
          margin:0 auto;
        }

        /* Contact reveal */
        .contact-reveal {
          max-height:0; overflow:hidden;
          transition:max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
          opacity:0;
        }
        .contact-reveal.open {
          max-height:600px; opacity:1;
        }

        /* Siblings table */
        .sib-table {
          width:100%; border-collapse:collapse;
          border-radius:12px; overflow:hidden;
          border:1px solid rgba(120,80,160,0.1);
          margin-top:8px;
        }
        .sib-table th {
          padding:10px 12px; font-size:0.68rem; font-weight:700;
          text-transform:uppercase; letter-spacing:0.08em;
          text-align:center;
          background:linear-gradient(135deg,#5a3a8a,#7a50b0);
          color:white;
        }
        .sib-table th:first-child { text-align:left; padding-left:16px; }
        .sib-table td {
          padding:10px 12px; text-align:center;
          font-size:0.88rem; color:#2a1848; font-weight:600;
        }
        .sib-table td:first-child {
          text-align:left; font-weight:700;
          color:#5a3a8a; font-size:0.8rem; padding-left:16px;
        }
        .sib-table tbody tr:nth-child(odd) { background:#f8f5fc; }
        .sib-table tbody tr:nth-child(even) { background:white; }

        /* Info rows 2-col grid */
        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:0 28px; }
        @media(max-width:600px) {
          .info-grid { grid-template-columns:1fr; }
          .profile-top { flex-direction:column !important; align-items:center !important; text-align:center !important; }
          .profile-top-photo { margin:0 auto !important; }
          .profile-summary { width:100% !important; }
        }
      `}</style>

      <div className="detail-page">
        <div className="detail-container">

          {/* ── Back Button ── */}
          <button onClick={() => navigate(-1)} style={{
            background:"white", color:"#5a3a8a",
            border:"1px solid rgba(120,80,160,0.12)",
            padding:"9px 22px", borderRadius:50,
            fontWeight:600, cursor:"pointer", fontSize:"0.82rem",
            boxShadow:"0 2px 10px rgba(80,40,120,0.06)",
            marginBottom:20, transition:"all 0.25s ease",
          }}
            onMouseEnter={e => { e.target.style.background="#5a3a8a"; e.target.style.color="white"; }}
            onMouseLeave={e => { e.target.style.background="white"; e.target.style.color="#5a3a8a"; }}>
            ← {t("detail.backToProfiles")}
          </button>

          {/* ══════════════════════════════════════════════
              Profile Summary Card — Photo + Quick Info
              ══════════════════════════════════════════════ */}
          <div style={{
            background:"white", borderRadius:20,
            border:"1px solid rgba(120,80,160,0.08)",
            boxShadow:"0 2px 16px rgba(80,40,120,0.04)",
            marginBottom:20, overflow:"hidden",
          }}>
            <div className="profile-top" style={{
              display:"flex", gap:24, padding:28,
              alignItems:"flex-start",
            }}>
              {/* Photo + Thumbnails */}
              <div className="profile-top-photo" style={{ flexShrink:0 }}>
                {/* Main Image (clickable) */}
                {p.photoPreviews && p.photoPreviews.length > 0 ? (
                  <img
                    src={p.photoPreviews[activePhoto] || p.photoPreviews[0]}
                    alt={p.name}
                    onClick={() => setShowLightbox(true)}
                    style={{
                      width:180, height:220, objectFit:"cover",
                      borderRadius:16,
                      border:"3px solid rgba(120,80,160,0.1)",
                      boxShadow:"0 8px 30px rgba(80,40,120,0.1)",
                      cursor:"pointer",
                      transition:"transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={e => { e.target.style.transform="scale(1.02)"; e.target.style.boxShadow="0 12px 40px rgba(80,40,120,0.16)"; }}
                    onMouseLeave={e => { e.target.style.transform="scale(1)"; e.target.style.boxShadow="0 8px 30px rgba(80,40,120,0.1)"; }}
                  />
                ) : (
                  <div style={{
                    width:180, height:220, borderRadius:16,
                    background:"linear-gradient(135deg,#e8dff0,#d4c8e8)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:64, color:"#9880b0",
                    border:"3px solid rgba(120,80,160,0.08)",
                  }}>
                    {p.gender === "Female" ? "👩" : "👨"}
                  </div>
                )}

                {/* Thumbnails row */}
                {p.photoPreviews && p.photoPreviews.length > 0 && (
                  <div style={{
                    display:"flex", flexDirection:"column", gap:8, marginTop:10,
                    alignItems:"center",
                  }}>
                    {/* First row - 2 thumbnails */}
                    <div style={{
                      display:"flex", gap:8, justifyContent:"center",
                    }}>
                      {p.photoPreviews.slice(0, 2).map((thumb, i) => (
                        <img
                          key={i}
                          src={thumb}
                          alt={`${p.name} ${i + 1}`}
                          onClick={() => setActivePhoto(i)}
                          style={{
                            width:52, height:52, objectFit:"cover",
                            borderRadius:10,
                            border: activePhoto === i
                              ? "2.5px solid #5a3a8a"
                              : "2px solid rgba(120,80,160,0.12)",
                            cursor:"pointer",
                            opacity: activePhoto === i ? 1 : 0.6,
                            transition:"all 0.25s ease",
                            boxShadow: activePhoto === i
                              ? "0 3px 12px rgba(90,58,138,0.2)"
                              : "0 1px 4px rgba(80,40,120,0.06)",
                          }}
                          onMouseEnter={e => { if(activePhoto !== i){ e.target.style.opacity="0.85"; e.target.style.transform="scale(1.05)"; } }}
                          onMouseLeave={e => { if(activePhoto !== i){ e.target.style.opacity="0.6"; e.target.style.transform="scale(1)"; } }}
                        />
                      ))}
                    </div>

                    {/* Second row - 2 additional images */}
                    {p.photoPreviews.length > 2 && (
                      <div style={{
                        display:"flex", gap:8, justifyContent:"center",
                      }}>
                        {p.photoPreviews.slice(2, 4).map((thumb, i) => (
                          <img
                            key={i + 2}
                            src={thumb}
                            alt={`${p.name} ${i + 3}`}
                            onClick={() => setActivePhoto(i + 2)}
                            style={{
                              width:40, height:40, objectFit:"cover",
                              borderRadius:8,
                              border: activePhoto === i + 2
                                ? "2.5px solid #5a3a8a"
                                : "2px solid rgba(120,80,160,0.12)",
                              cursor:"pointer",
                              opacity: activePhoto === i + 2 ? 1 : 0.6,
                              transition:"all 0.25s ease",
                              boxShadow: activePhoto === i + 2
                                ? "0 3px 12px rgba(90,58,138,0.2)"
                                : "0 1px 4px rgba(80,40,120,0.06)",
                            }}
                            onMouseEnter={e => { if(activePhoto !== i + 2){ e.target.style.opacity="0.85"; e.target.style.transform="scale(1.05)"; } }}
                            onMouseLeave={e => { if(activePhoto !== i + 2){ e.target.style.opacity="0.6"; e.target.style.transform="scale(1)"; } }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Summary */}
              <div className="profile-summary" style={{
                flex:1, border:"1px solid rgba(120,80,160,0.1)",
                borderRadius:16, padding:"22px 24px",
                background:"linear-gradient(135deg,#faf8fd,#f5f0fa)",
              }}>
                <h2 style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:"1.3rem", fontWeight:700,
                  color:"#3a2060", marginBottom:4,
                  borderBottom:"1px solid rgba(120,80,160,0.1)",
                  paddingBottom:12,
                }}>
                  {t("detail.personalDetails")} – {p.gender === "Female" ? "Bride" : "Groom"}
                </h2>

                {[
                  { icon:"👤", label:t("detail.fullName"), value:p.name },
                  { icon:"🏷️", label:t("detail.caste"), value:p.caste && p.caste !== "-Select-" ? p.caste : null },
                  { icon:"📅", label:t("detail.dateOfBirth"),
                    value: p.dob
                      ? `${new Date().getFullYear() - new Date(p.dob).getFullYear()} ${t("detail.yrs")}`
                      : p.age ? `${p.age} ${t("detail.yrs")}` : null
                  },
                  { icon:"📏", label:t("detail.height"), value:p.height && p.height !== "-Select-" ? p.height : null },
                  { icon:"🎓", label:t("detail.qualification"), value:p.qualification },
                ].map((item, i) => (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"10px 0",
                    borderBottom: i < 4 ? "1px solid rgba(120,80,160,0.05)" : "none",
                  }}>
                    <div style={{
                      width:30, height:30, borderRadius:8,
                      background:"linear-gradient(135deg,#e8dff0,#d8cce8)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:13, flexShrink:0,
                    }}>{item.icon}</div>
                    <span style={{ fontSize:"0.82rem", fontWeight:700, color:"#5a3a8a", minWidth:100 }}>{item.label}</span>
                    <span style={{ fontSize:"0.92rem", fontWeight:600, color:"#2a1848" }}>{item.value || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              Personal Details (Full)
              ══════════════════════════════════════════════ */}
          <SectionCard title={t("detail.personalDetails")}>
            <div className="info-grid">
              <InfoRow icon="👤" label={t("detail.fullName")} value={p.name}/>
              <InfoRow icon="⚧️" label={t("detail.gender")} value={p.gender && p.gender !== "-Select-" ? p.gender : null}/>
              <InfoRow icon="📅" label={t("detail.dateOfBirth")} value={p.dob ? new Date(p.dob).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) : null}/>
              <InfoRow icon="🕐" label={t("detail.timeOfBirth")} value={p.birthHour && p.birthMin ? `${p.birthHour}:${p.birthMin} ${p.birthAmPm}` : null}/>
              <InfoRow icon="📍" label={t("detail.placeOfBirth")} value={p.placeBirth}/>
              <InfoRow icon="🏠" label={t("detail.nativity")} value={p.nativity}/>
              <InfoRow icon="🗣️" label={t("detail.motherTongue")} value={p.motherTongue !== "Select" ? p.motherTongue : null}/>
              <InfoRow icon="💍" label={t("detail.maritalStatus")} value={p.maritalStatus}/>
              <InfoRow icon="🎨" label={t("detail.complexion")} value={p.complexion}/>
            </div>
            {p.others && (
              <div style={{
                marginTop:14, padding:"14px 18px", borderRadius:12,
                background:"linear-gradient(135deg,rgba(90,58,138,0.03),rgba(120,80,160,0.05))",
                border:"1px solid rgba(120,80,160,0.08)",
                borderLeft:"3px solid #7a50b0",
              }}>
                <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#5a3a8a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>{t("detail.additionalDetails")}</div>
                <p style={{ fontSize:"0.9rem", color:"#2a1848", lineHeight:1.7 }}>{p.others}</p>
              </div>
            )}
          </SectionCard>

          {/* ══════════════════════════════════════════════
              Family Details
              ══════════════════════════════════════════════ */}
          <SectionCard title={t("detail.familyDetails")}>
            <div className="info-grid">
              <InfoRow icon="👨" label={t("detail.fathersName")} value={p.fatherName}/>
              <InfoRow icon="💼" label={t("detail.fathersOccupation")} value={p.fatherJob}/>
              <InfoRow icon="👩" label={t("detail.mothersName")} value={p.motherName}/>
              <InfoRow icon="💼" label={t("detail.mothersOccupation")} value={p.motherJob}/>
              <InfoRow icon="❤️" label={t("detail.fatherStatus")} value={p.fatherAlive === "yes" ? t("detail.alive") : p.fatherAlive === "no" ? t("detail.deceased") : null}/>
              <InfoRow icon="❤️" label={t("detail.motherStatus")} value={p.motherAlive === "yes" ? t("detail.alive") : p.motherAlive === "no" ? t("detail.deceased") : null}/>
            </div>

            {/* Siblings */}
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#5a3a8a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>{t("detail.siblings")}</div>
              <table className="sib-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>{t("detail.elderBrother")}</th>
                    <th>{t("detail.youngerBrother")}</th>
                    <th>{t("detail.elderSister")}</th>
                    <th>{t("detail.youngerSister")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t("detail.married")}</td>
                    {["sibMarriedEB","sibMarriedYB","sibMarriedES","sibMarriedYS"].map(k => (
                      <td key={k}>{p[k] && p[k] !== "-" ? p[k] : "—"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>{t("detail.unmarried")}</td>
                    {["sibUnmarriedEB","sibUnmarriedYB","sibUnmarriedES","sibUnmarriedYS"].map(k => (
                      <td key={k}>{p[k] && p[k] !== "-" ? p[k] : "—"}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* ══════════════════════════════════════════════
              Physical Attributes
              ══════════════════════════════════════════════ */}
          <SectionCard title={t("detail.physicalAttributes")}>
            <div className="info-grid">
              <InfoRow icon="📏" label={t("detail.height")} value={p.height && p.height !== "-Select-" ? p.height : null}/>
              <InfoRow icon="⚖️" label={t("detail.weight")} value={p.weight && p.weight !== "-Select-" ? p.weight : null}/>
              <InfoRow icon="🩸" label={t("detail.bloodGroup")} value={p.bloodGroup && p.bloodGroup !== "-Select-" ? p.bloodGroup : null}/>
              <InfoRow icon="🎨" label={t("detail.complexion")} value={p.complexion}/>
              <InfoRow icon="🥗" label={t("detail.dietPreference")} value={p.diet}/>
              <InfoRow icon="♿" label={t("detail.disability")} value={p.disability}/>
            </div>
          </SectionCard>

          {/* ══════════════════════════════════════════════
              Education & Career
              ══════════════════════════════════════════════ */}
          <SectionCard title={t("detail.educationCareer")}>
            <div className="info-grid">
              <InfoRow icon="🎓" label={t("detail.qualification")} value={p.qualification}/>
              <InfoRow icon="💼" label={t("detail.jobOccupation")} value={p.job || p.occupation}/>
              <InfoRow icon="📍" label={t("detail.placeOfJob")} value={p.placeJob || p.location}/>
              <InfoRow icon="💰" label={t("detail.monthlyIncome")} value={p.incomeMonth}/>
            </div>
          </SectionCard>

          {/* ══════════════════════════════════════════════
              Astrology & Religion
              ══════════════════════════════════════════════ */}
          <SectionCard title={t("detail.astrologyReligion")}>
            <div className="info-grid">
              <InfoRow icon="🏷️" label={t("detail.caste")} value={p.caste && p.caste !== "-Select-" ? p.caste : null}/>
              <InfoRow icon="🏷️" label={t("detail.subCaste")} value={p.subCaste && p.subCaste !== "-select-" ? p.subCaste : null}/>
              <InfoRow icon="🔱" label={t("detail.gothram")} value={p.gothram}/>
              <InfoRow icon="⭐" label={t("detail.starNakshatra")} value={p.star && p.star !== "-Select-" ? p.star : p.nakshtram}/>
              <InfoRow icon="🌙" label={t("detail.raasi")} value={p.raasi && p.raasi !== "-Select Rasi-" ? p.raasi : null}/>
              <InfoRow icon="🪐" label={t("detail.padam")} value={p.padam && p.padam !== "-Select Padam-" ? p.padam : null}/>
              <InfoRow icon="📐" label={t("detail.laknam")} value={p.laknam && p.laknam !== "-Select Laknam-" ? p.laknam : null}/>
            </div>
            {(p.horoscopePreview?.rasi || p.horoscopePreview?.amsam) && (
              <div style={{ marginTop:16 }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#5a3a8a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>{t("detail.horoscopeCharts")}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {p.horoscopePreview?.rasi && (
                    <div style={{ borderRadius:14, overflow:"hidden", border:"1px solid rgba(120,80,160,0.1)", boxShadow:"0 2px 10px rgba(80,40,120,0.04)" }}>
                      <img src={p.horoscopePreview.rasi} alt={t("detail.rasiChart")} style={{ width:"100%", display:"block" }}/>
                      <div style={{ padding:"10px", background:"linear-gradient(135deg,#5a3a8a,#7a50b0)", color:"white", fontSize:"0.78rem", fontWeight:700, textAlign:"center" }}>{t("detail.rasiChart")}</div>
                    </div>
                  )}
                  {p.horoscopePreview?.amsam && (
                    <div style={{ borderRadius:14, overflow:"hidden", border:"1px solid rgba(120,80,160,0.1)", boxShadow:"0 2px 10px rgba(80,40,120,0.04)" }}>
                      <img src={p.horoscopePreview.amsam} alt={t("detail.amsamChart")} style={{ width:"100%", display:"block" }}/>
                      <div style={{ padding:"10px", background:"linear-gradient(135deg,#5a3a8a,#7a50b0)", color:"white", fontSize:"0.78rem", fontWeight:700, textAlign:"center" }}>{t("detail.amsamChart")}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </SectionCard>

          {/* ══════════════════════════════════════════════
              Partner Expectations
              ══════════════════════════════════════════════ */}
          <SectionCard title={t("detail.partnerExpectations")}>
            <div className="info-grid">
              <InfoRow icon="🎓" label={t("detail.partnerQualification")} value={p.partnerQualification}/>
              <InfoRow icon="💼" label={t("detail.partnerJob")} value={p.partnerJob ? `${p.partnerJob} (${p.partnerJobRequirement || "Optional"})` : null}/>
              <InfoRow icon="💰" label={t("detail.partnerIncome")} value={p.partnerIncomeMonth}/>
              <InfoRow icon="📅" label={t("detail.preferredAge")} value={p.partnerAgeFrom && p.partnerAgeTo ? `${p.partnerAgeFrom} – ${p.partnerAgeTo} ${t("detail.yrs")}` : p.partnerAgeFrom ? `From ${p.partnerAgeFrom} ${t("detail.yrs")}` : null}/>
              <InfoRow icon="🥗" label={t("detail.partnerDiet")} value={p.partnerDiet}/>
              <InfoRow icon="📜" label={t("detail.horoscopeRequired")} value={p.partnerHoroscopeRequired}/>
              <InfoRow icon="🏷️" label={t("detail.castePref")} value={p.partnerCaste}/>
              <InfoRow icon="🏷️" label={t("detail.subCastePref")} value={p.partnerSubCaste}/>
              <InfoRow icon="💍" label={t("detail.partnerMarital")} value={p.partnerMaritalStatus}/>
            </div>
            {p.partnerOtherRequirement && (
              <div style={{
                marginTop:14, padding:"14px 18px", borderRadius:12,
                background:"linear-gradient(135deg,rgba(90,58,138,0.03),rgba(120,80,160,0.05))",
                border:"1px solid rgba(120,80,160,0.08)",
                borderLeft:"3px solid #7a50b0",
              }}>
                <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#5a3a8a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>{t("detail.additionalRequirements")}</div>
                <p style={{ fontSize:"0.9rem", color:"#2a1848", lineHeight:1.7 }}>{p.partnerOtherRequirement}</p>
              </div>
            )}
          </SectionCard>

          {/* ══════════════════════════════════════════════
              Contact Information
              ══════════════════════════════════════════════ */}
          <div style={{
            background:"white", borderRadius:20,
            border:"1px solid rgba(120,80,160,0.08)",
            boxShadow:"0 2px 16px rgba(80,40,120,0.04)",
            marginBottom:20, overflow:"hidden",
            position:"relative",
          }}>
            {showContact && (
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:3,
                background:"linear-gradient(90deg,#5a3a8a,#7a50b0,#9a70d0,#7a50b0,#5a3a8a)",
                backgroundSize:"200% 100%",
                animation:"shimmer 2s linear infinite",
              }}/>
            )}

            {/* Header */}
            <div style={{
              padding:"20px 28px",
              borderBottom:"1px solid rgba(120,80,160,0.06)",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:12,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{
                  width:40, height:40, borderRadius:12,
                  background:"linear-gradient(135deg,#5a3a8a,#7a50b0)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18, color:"white",
                  boxShadow:"0 4px 14px rgba(90,58,138,0.25)",
                }}>📞</div>
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.25rem", fontWeight:700, color:"#3a2060", margin:0 }}>
                    {t("detail.contactInformation")}
                  </h3>
                  <p style={{ margin:0, fontSize:"0.72rem", color:"#b8a8c8", marginTop:2 }}>
                    {showContact ? "Contact details are visible" : "Click to reveal contact details"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowContact(!showContact)}
                style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  padding:"10px 24px", borderRadius:50,
                  fontWeight:700, fontSize:"0.84rem", letterSpacing:"0.04em",
                  cursor:"pointer", transition:"all 0.3s ease",
                  border: showContact ? "1.5px solid rgba(120,80,160,0.2)" : "none",
                  background: showContact ? "white" : "linear-gradient(135deg,#5a3a8a,#7a50b0)",
                  color: showContact ? "#5a3a8a" : "white",
                  boxShadow: showContact ? "0 2px 10px rgba(80,40,120,0.08)" : "0 6px 24px rgba(90,58,138,0.3)",
                }}
              >
                {showContact ? (
                  <><span style={{ fontSize:14 }}>🔒</span> {t('common.hide')}</>
                ) : (
                  <><span style={{ fontSize:14 }}>👁️</span> {t('common.viewContact')}</>
                )}
              </button>
            </div>

            {/* Reveal area */}
            <div className={`contact-reveal ${showContact ? "open" : ""}`}>
              <div style={{ padding:"4px 28px 24px" }}>
                {/* Divider */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, paddingTop:8 }}>
                  <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(120,80,160,0.15))" }}/>
                  <span style={{ fontSize:"0.65rem", fontWeight:700, color:"#7a50b0", textTransform:"uppercase", letterSpacing:"0.12em" }}>Contact Details</span>
                  <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(120,80,160,0.15),transparent)" }}/>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[
                    { icon:"🏠", label:t("detail.permanentAddress"), value:p.permanentAddress, delay:"0.05s" },
                    { icon:"📍", label:t("detail.presentAddress"), value:p.presentAddress, delay:"0.1s" },
                    { icon:"👤", label:t("detail.contactPerson"), value:p.contactPerson, delay:"0.15s" },
                    { icon:"📱", label:t("detail.contactNumber"), value:p.contactNumber, isPhone:true, delay:"0.2s" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"flex-start", gap:14,
                      padding:"14px 16px", borderRadius:14,
                      background:"linear-gradient(135deg,#faf8fd,#f3eef8)",
                      border:"1px solid rgba(120,80,160,0.07)",
                      animation: showContact ? `fadeSlideIn 0.4s ease ${item.delay} both` : "none",
                      transition:"box-shadow 0.2s",
                    }}>
                      <div style={{
                        width:38, height:38, borderRadius:10,
                        background:"linear-gradient(135deg,#5a3a8a,#7a50b0)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:16, flexShrink:0, color:"white",
                        boxShadow:"0 3px 10px rgba(90,58,138,0.2)",
                      }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#5a3a8a", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>{item.label}</div>
                        {item.isPhone && item.value ? (
                          <a href={`tel:${item.value}`} style={{ fontSize:"1rem", color:"#5a3a8a", fontWeight:700, textDecoration:"none", letterSpacing:"0.04em" }}>
                            {item.value.substring(0, 5) + '*'.repeat(5)}
                          </a>
                        ) : (
                          <div style={{
                            fontSize:"0.88rem",
                            color: item.value ? "#2a1848" : "#b8a8c8",
                            fontWeight: item.value ? 600 : 400,
                            fontStyle: item.value ? "normal" : "italic",
                            lineHeight:1.5,
                          }}>
                            {item.value || t("detail.notSpecified")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop:16, textAlign:"center", padding:"12px 20px",
                  borderRadius:12,
                  background:"rgba(90,58,138,0.03)",
                  border:"1px dashed rgba(120,80,160,0.15)",
                }}>
                  <span style={{ fontSize:"0.75rem", color:"#9880b0" }}>🔐 {t("detail.profileConfidential")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Report Profile ── */}
          <div style={{ marginTop:8, display:"flex", justifyContent:"center" }}>
            <button
              onClick={() => setShowReportModal(true)}
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"12px 32px", borderRadius:50,
                fontWeight:700, fontSize:"0.88rem",
                cursor:"pointer", border:"1.5px solid rgba(120,80,160,0.15)",
                background:"white", color:"#5a3a8a",
                boxShadow:"0 2px 10px rgba(80,40,120,0.04)",
                transition:"all 0.3s ease", letterSpacing:"0.03em",
              }}
              onMouseEnter={e => { e.target.style.background="linear-gradient(135deg,#5a3a8a,#7a50b0)"; e.target.style.color="white"; e.target.style.borderColor="transparent"; e.target.style.boxShadow="0 8px 28px rgba(90,58,138,0.25)"; e.target.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background="white"; e.target.style.color="#5a3a8a"; e.target.style.borderColor="rgba(120,80,160,0.15)"; e.target.style.boxShadow="0 2px 10px rgba(80,40,120,0.04)"; e.target.style.transform="translateY(0)"; }}
            >
              <span style={{ fontSize:16 }}>⚠️</span>
              {t('common.reportProfile')}
            </button>
          </div>

        </div>

        {/* ═══════════════════════════════════════
            Report Modal
            ═══════════════════════════════════════ */}
        {showReportModal && (
          <div style={{
            position:"fixed", inset:0,
            background:"rgba(30,18,48,0.6)",
            backdropFilter:"blur(6px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            zIndex:2000,
          }} onClick={() => setShowReportModal(false)}>
            <div style={{
              background:"white", borderRadius:24, overflow:"hidden",
              maxWidth:480, width:"92%",
              boxShadow:"0 24px 72px rgba(60,30,90,0.2)",
              animation:"slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }} onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div style={{
                background:"linear-gradient(135deg,#4a2870,#6a40a0)",
                padding:"28px 24px", textAlign:"center", position:"relative",
              }}>
                <div style={{
                  position:"absolute", top:16, right:16,
                  width:34, height:34, borderRadius:"50%",
                  background:"rgba(255,255,255,0.15)",
                  border:"none", color:"white", fontSize:"1.1rem",
                  cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all 0.2s ease",
                }} onClick={() => setShowReportModal(false)}>✕</div>
                <h2 style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:"1.7rem", fontWeight:700,
                  color:"white", margin:0, letterSpacing:"0.02em",
                }}>
                  {t('common.reportProfile')}
                </h2>
              </div>

              {/* Body */}
              <div style={{ padding:"28px 24px" }}>
                <p style={{ fontSize:"0.92rem", color:"#3a2060", marginBottom:22, lineHeight:1.6 }}>
                  {t('detail.reportReason')}
                </p>

                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
                  {[
                    { value: "already_married", label: `👰 ${t('detail.reportAlreadyMarried')}`, icon: "👰" },
                    { value: "misinformation", label: `⚠️ ${t('detail.reportMisinformation')}`, icon: "⚠️" },
                    { value: "fraud", label: `🚨 ${t('detail.reportFraud')}`, icon: "🚨" },
                  ].map((option) => (
                    <label key={option.value} style={{
                      display:"flex", alignItems:"center", gap:12,
                      padding:"14px 16px",
                      border: reportReason === option.value ? "2px solid #5a3a8a" : "2px solid rgba(120,80,160,0.1)",
                      borderRadius:12,
                      background: reportReason === option.value ? "rgba(90,58,138,0.04)" : "white",
                      cursor:"pointer", transition:"all 0.25s ease",
                    }}>
                      <input
                        type="radio"
                        name="report_reason"
                        value={option.value}
                        checked={reportReason === option.value}
                        onChange={(e) => setReportReason(e.target.value)}
                        style={{ width:18, height:18, cursor:"pointer", accentColor:"#5a3a8a" }}
                      />
                      <span style={{
                        fontSize:"0.92rem", fontWeight:600,
                        color: reportReason === option.value ? "#5a3a8a" : "#2a1848",
                      }}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <button
                    onClick={() => setShowReportModal(false)}
                    style={{
                      padding:"12px 20px", background:"transparent",
                      border:"2px solid rgba(120,80,160,0.15)", borderRadius:12,
                      color:"#5a3a8a", fontWeight:600, cursor:"pointer", fontSize:"0.88rem",
                      transition:"all 0.25s ease",
                    }}
                    onMouseEnter={e => { e.target.style.background="rgba(90,58,138,0.05)"; }}
                    onMouseLeave={e => { e.target.style.background="transparent"; }}
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
                      padding:"12px 20px",
                      background: reportReason ? "linear-gradient(135deg,#5a3a8a,#7a50b0)" : "rgba(120,80,160,0.2)",
                      border:"none", borderRadius:12, color:"white",
                      fontWeight:600, cursor: reportReason ? "pointer" : "not-allowed",
                      fontSize:"0.88rem", transition:"all 0.3s ease",
                      boxShadow: reportReason ? "0 6px 24px rgba(90,58,138,0.25)" : "none",
                    }}
                    onMouseEnter={e => { if(reportReason){e.target.style.boxShadow="0 10px 35px rgba(90,58,138,0.35)"; e.target.style.transform="translateY(-2px)";} }}
                    onMouseLeave={e => { if(reportReason){e.target.style.boxShadow="0 6px 24px rgba(90,58,138,0.25)"; e.target.style.transform="translateY(0)";} }}
                  >
                    {t('common.submitReport')}
                  </button>
                </div>

                <p style={{
                  fontSize:"0.75rem", color:"#9880b0",
                  marginTop:16, textAlign:"center", lineHeight:1.5,
                }}>
                  🔒 {t('detail.reportDisclaimer')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════
            Image Lightbox
            ═══════════════════════════════════════ */}
        {showLightbox && p.photoPreviews && p.photoPreviews.length > 0 && (
          <div style={{
            position:"fixed", inset:0,
            background:"rgba(20,10,30,0.85)",
            backdropFilter:"blur(10px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            zIndex:3000, flexDirection:"column", gap:20,
          }} onClick={() => setShowLightbox(false)}>
            {/* Close button */}
            <div style={{
              position:"absolute", top:20, right:20,
              width:40, height:40, borderRadius:"50%",
              background:"rgba(255,255,255,0.15)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"white", fontSize:"1.3rem", cursor:"pointer",
              transition:"all 0.2s ease",
            }}
              onMouseEnter={e => { e.target.style.background="rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.target.style.background="rgba(255,255,255,0.15)"; }}
              onClick={() => setShowLightbox(false)}>
              ✕
            </div>

            {/* Large image */}
            <img
              src={p.photoPreviews[activePhoto] || p.photoPreviews[0]}
              alt={p.name}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth:"90vw", maxHeight:"75vh",
                objectFit:"contain", borderRadius:16,
                boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
                animation:"slideUp 0.3s ease both",
              }}
            />

            {/* Thumbnail selector in lightbox */}
            {p.photoPreviews.length > 1 && (
              <div style={{
                display:"flex", gap:12, justifyContent:"center",
              }} onClick={e => e.stopPropagation()}>
                {p.photoPreviews.slice(0, 2).map((thumb, i) => (
                  <img
                    key={i}
                    src={thumb}
                    alt={`${p.name} ${i + 1}`}
                    onClick={() => setActivePhoto(i)}
                    style={{
                      width:60, height:60, objectFit:"cover",
                      borderRadius:12,
                      border: activePhoto === i
                        ? "3px solid white"
                        : "2px solid rgba(255,255,255,0.3)",
                      cursor:"pointer",
                      opacity: activePhoto === i ? 1 : 0.5,
                      transition:"all 0.25s ease",
                    }}
                    onMouseEnter={e => { if(activePhoto !== i) e.target.style.opacity="0.8"; }}
                    onMouseLeave={e => { if(activePhoto !== i) e.target.style.opacity="0.5"; }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

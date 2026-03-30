// RegisterForm.jsx
import { useState } from "react";

const GENDERS = ["-Select-", "Male", "Female"];
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];
const AMPM = ["AM", "PM"];
const MOTHER_TONGUES = ["Select", "Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "Marathi", "English"];
const MARITAL_STATUSES = ["Unmarried", "Married", "Divorced", "Widowed"];
const SIBLING_COUNTS = ["-", "0", "1", "2", "3", "4", "5"];
const HEIGHTS = ["4'8\"","4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\""];
const WEIGHTS = ["40kg","45kg","50kg","55kg","60kg","65kg","70kg","75kg","80kg","85kg","90kg"];
const BLOOD_GROUPS = ["-Select-","O+","O-","A+","A-","B+","B-","AB+","AB-"];
const CASTES = ["-Select-","Brahmin","Kshatriya","Vaishya","Shudra","Others"];
const STARS = ["-Select-","Ashwini","Bharani","Krithika","Rohini","Mrigasira","Aridra","Punarvasu"];
const LAKNAM = ["-Select Laknam-","Laknam 1","Laknam 2"];

const RASI_LIST = ["-Select Rasi-","Mesha","Vrishabha","Mithuna","Kataka","Simha","Kanya","Tula","Vrischika","Dhanu","Makara","Kumbha","Meena"];
const PADAM_LIST = ["-Select Padam-","Padam 1","Padam 2","Padam 3","Padam 4"];

export default function PersonalFamilyForm() {
  const [form, setForm] = useState({
    name: "", gender: "-Select-", dob: "", birthHour: "", birthMin: "", birthAmPm: "AM",
    placeBirth: "", nativity: "", motherTongue: "Select", maritalStatus: "Unmarried",
    fatherName: "", fatherAlive: "yes", fatherJob: "",
    motherName: "", motherAlive: "yes", motherJob: "",
    sibMarriedEB: "-", sibMarriedYB: "-", sibMarriedES: "-", sibMarriedYS: "-",
    sibUnmarriedEB: "-", sibUnmarriedYB: "-", sibUnmarriedES: "-", sibUnmarriedYS: "-",
    others: "",
    height: "-Select-", weight: "-Select-", bloodGroup: "-Select-",
    diet: "Vegetarian", disability: "No", complexion: "Very Fair",
    qualification: "", job: "", placeJob: "", incomeMonth: "",
    partnerQualification: "", partnerJob: "", partnerJobRequirement: "Optional",
    partnerIncomeMonth: "", partnerAgeFrom: "", partnerAgeTo: "",
    partnerDiet: "Vegetarian", partnerHoroscopeRequired: "No",
    partnerMaritalStatus: "Unmarried", partnerCaste: "Any", partnerSubCaste: "Any",
    partnerOtherRequirement: "",
    caste: "-Select-", subCaste: "-select-", gothram: "",
    star: "-Select-", raasi: "-Select Rasi-", padam: "-Select Padam-", laknam: "-Select Laknam-",
    permanentAddress: "", presentAddress: "", contactPerson: "", contactNumber: "",
    scheme: "Select", username: "", password: "", termsAccepted: false,
  });

  const [photos, setPhotos] = useState([null, null, null]);
  const [photoPreviews, setPhotoPreviews] = useState([null, null, null]);
  const [horoscopePhotos, setHoroscopePhotos] = useState({ rasi: null, amsam: null });
  const [horoscopePreview, setHoroscopePreview] = useState({ rasi: null, amsam: null });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };

  const handlePhotoUpload = (index, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image size must be less than 5MB"); return; }
    if (!file.type.startsWith("image/")) { alert("Please select a valid image file"); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const np = [...photos]; const nv = [...photoPreviews];
      np[index] = file; nv[index] = e.target.result;
      setPhotos(np); setPhotoPreviews(nv);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index) => {
    const np = [...photos]; const nv = [...photoPreviews];
    np[index] = null; nv[index] = null;
    setPhotos(np); setPhotoPreviews(nv);
  };

  const handleHoroscopePhotoUpload = (type, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image size must be less than 5MB"); return; }
    if (!file.type.startsWith("image/")) { alert("Please select a valid image file"); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      setHoroscopePhotos(p => ({ ...p, [type]: file }));
      setHoroscopePreview(p => ({ ...p, [type]: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const removeHoroscopePhoto = (type) => {
    setHoroscopePhotos(p => ({ ...p, [type]: null }));
    setHoroscopePreview(p => ({ ...p, [type]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (form.gender === "-Select-") e.gender = "Gender is required";
    if (!form.dob) e.dob = "Date of Birth is required";
    if (form.motherTongue === "Select") e.motherTongue = "Mother Tongue is required";
    if (!form.placeBirth.trim()) e.placeBirth = "Place of Birth is required";
    if (!form.nativity.trim()) e.nativity = "Nativity is required";
    if (!form.contactNumber.trim()) e.contactNumber = "Contact Number is required";
    if (form.contactNumber && !/^\d{10}$/.test(form.contactNumber)) e.contactNumber = "Enter valid 10-digit number";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(k => formData.append(k, form[k]));
      photos.forEach((p, i) => { if (p) formData.append(`photo${i+1}`, p); });
      if (horoscopePhotos.rasi) formData.append("rasiPhoto", horoscopePhotos.rasi);
      if (horoscopePhotos.amsam) formData.append("amsamPhoto", horoscopePhotos.amsam);
      const res = await fetch("/API/register.php", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) { setSubmitted(true); } else { alert(data.message || "Registration failed"); }
    } catch { alert("Network error. Please try again."); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setForm({ name:"",gender:"-Select-",dob:"",birthHour:"",birthMin:"",birthAmPm:"AM",placeBirth:"",nativity:"",motherTongue:"Select",maritalStatus:"Unmarried",fatherName:"",fatherAlive:"yes",fatherJob:"",motherName:"",motherAlive:"yes",motherJob:"",sibMarriedEB:"-",sibMarriedYB:"-",sibMarriedES:"-",sibMarriedYS:"-",sibUnmarriedEB:"-",sibUnmarriedYB:"-",sibUnmarriedES:"-",sibUnmarriedYS:"-",others:"",height:"-Select-",weight:"-Select-",bloodGroup:"-Select-",diet:"Vegetarian",disability:"No",complexion:"Very Fair",qualification:"",job:"",placeJob:"",incomeMonth:"",partnerQualification:"",partnerJob:"",partnerJobRequirement:"Optional",partnerIncomeMonth:"",partnerAgeFrom:"",partnerAgeTo:"",partnerDiet:"Vegetarian",partnerHoroscopeRequired:"No",partnerMaritalStatus:"Unmarried",partnerCaste:"Any",partnerSubCaste:"Any",partnerOtherRequirement:"",caste:"-Select-",subCaste:"-select-",gothram:"",star:"-Select-",raasi:"-Select Rasi-",padam:"-Select Padam-",laknam:"-Select Laknam-",permanentAddress:"",presentAddress:"",contactPerson:"",contactNumber:"",scheme:"Select",username:"",password:"",termsAccepted:false });
    setErrors({}); setSubmitted(false); setPhotos([null,null,null]); setPhotoPreviews([null,null,null]);
    setHoroscopePhotos({rasi:null,amsam:null}); setHoroscopePreview({rasi:null,amsam:null});
  };

  const SectionHeader = ({ icon, title }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, paddingBottom:14, borderBottom:"1px solid rgba(139,0,0,0.12)" }}>
      <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#8B0000,#C41E3A)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0, boxShadow:"0 4px 12px rgba(139,0,0,0.25)" }}>{icon}</div>
      <h2 style={{ margin:0, fontSize:"1.15rem", fontFamily:"'Playfair Display',serif", fontWeight:700, color:"#5A0010", letterSpacing:"0.03em" }}>{title}</h2>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(139,0,0,0.2),transparent)" }} />
    </div>
  );

  const FormField = ({ label, required, error, children, half }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6, width:"100%" }}>
      <label style={{ fontSize:"0.72rem", fontWeight:700, color:"#7A1020", textTransform:"uppercase", letterSpacing:"0.08em", display:"flex", alignItems:"center", gap:4 }}>
        {required && <span style={{ color:"#C41E3A" }}>✦</span>}{label}
      </label>
      {children}
      {error && <span style={{ fontSize:"0.72rem", color:"#C41E3A", fontStyle:"italic" }}>{error}</span>}
    </div>
  );

  const inputStyle = (hasErr) => ({
    padding:"10px 14px", border:`1.5px solid ${hasErr ? "#C41E3A" : "#D4A0A8"}`,
    borderRadius:8, fontSize:"0.88rem", fontFamily:"'Lato',sans-serif", background:"#FFFAF9",
    color:"#2A0A0E", outline:"none", width:"100%", boxSizing:"border-box",
    transition:"all 0.2s ease", boxShadow: hasErr ? "0 0 0 3px rgba(196,30,58,0.1)" : "none",
  });

  const selectStyle = (hasErr) => ({
    ...inputStyle(hasErr),
    cursor:"pointer",
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%238B0000' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:32,
    appearance:"none",
  });

  const radioStyle = { display:"flex", flexWrap:"wrap", gap:12 };

  const RadioOpt = ({ name, value, checked, onChange, label }) => (
    <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:"0.875rem", color:"#3D0010", fontFamily:"'Lato',sans-serif" }}>
      <div style={{ position:"relative", width:18, height:18 }}>
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} style={{ position:"absolute", opacity:0, width:"100%", height:"100%", cursor:"pointer", margin:0 }} />
        <div style={{ width:18, height:18, border:`2px solid ${checked ? "#8B0000" : "#C4A0A8"}`, borderRadius:"50%", background: checked ? "#8B0000" : "white", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {checked && <div style={{ width:6, height:6, background:"white", borderRadius:"50%" }} />}
        </div>
      </div>
      {label}
    </label>
  );

  const sectionBox = { background:"white", borderRadius:16, padding:"28px 30px", marginBottom:20, boxShadow:"0 2px 20px rgba(139,0,0,0.06)", border:"1px solid rgba(196,30,58,0.1)" };

  if (submitted) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');`}</style>
        <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#FFF5F5 0%,#FFF9F0 50%,#FFF5F5 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Lato',sans-serif" }}>
          <div style={{ textAlign:"center", padding:48, background:"white", borderRadius:24, boxShadow:"0 20px 60px rgba(139,0,0,0.15)", maxWidth:500, border:"1px solid rgba(196,30,58,0.1)" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>🎊</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", color:"#8B0000", fontSize:"1.8rem", marginBottom:8 }}>Profile Created!</h2>
            <p style={{ color:"#7A4050", marginBottom:28, lineHeight:1.6 }}>Your matrimony profile has been submitted successfully. We will review and activate it shortly.</p>
            <button onClick={handleReset} style={{ background:"linear-gradient(135deg,#8B0000,#C41E3A)", color:"white", border:"none", padding:"12px 32px", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:"0.95rem", letterSpacing:"0.05em" }}>
              Create Another Profile
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F9F0F2; font-family: 'Lato', sans-serif; }
        input:focus, select:focus, textarea:focus { border-color: #8B0000 !important; box-shadow: 0 0 0 3px rgba(139,0,0,0.12) !important; outline: none; }
        input::placeholder, textarea::placeholder { color: #C0A0A8; font-style: italic; }
        .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .row-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
        
        /* Tablet Responsiveness */
        @media (max-width: 768px) {
          .row-2, .row-3, .row-4 { grid-template-columns: 1fr; gap: 16px; }
          .form-outer { padding: 0 12px 40px; }
          .section-box { padding: 24px 18px !important; margin-bottom: 20px !important; }
          input, select, textarea { font-size: 16px !important; }
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 600px) {
          .row-2, .row-3, .row-4 { grid-template-columns: 1fr; }
          .form-outer { padding: 0 10px 32px; }
          .section-box { padding: 20px 14px !important; margin-bottom: 18px !important; }
          
          input, select, textarea {
            font-size: 16px !important;
            padding: 10px 12px !important;
          }
          
          table th, table td {
            padding: 8px 6px !important;
            font-size: 12px !important;
          }
          
          .row-3 > div { margin-bottom: 12px; }
          .row-2 > div { margin-bottom: 12px; }
          .row-4 > div { margin-bottom: 12px; }
        }
        
        /* Small Mobile Responsiveness */
        @media (max-width: 480px) {
          .form-outer { padding: 0 8px 24px; }
          .section-box { padding: 16px 12px !important; }
          
          input, select, textarea {
            font-size: 14px !important;
            padding: 9px 10px !important;
          }
          
          h1 { font-size: clamp(1.4rem, 4vw, 2rem) !important; }
          h2 { font-size: clamp(1rem, 3vw, 1.3rem) !important; }
          h3 { font-size: clamp(0.9rem, 2.5vw, 1.1rem) !important; }
          
          label { font-size: 0.7rem !important; }
          p { font-size: clamp(0.8rem, 2vw, 0.9rem) !important; }
          
          table th, table td {
            padding: 6px 4px !important;
            font-size: 11px !important;
          }
          
          button { padding: 8px 16px !important; font-size: 0.8rem !important; }
        }
        
        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .form-outer { padding: 0 6px 16px; }
          .section-box { padding: 12px 10px !important; }
          
          input, select, textarea {
            font-size: 14px !important;
            padding: 8px 8px !important;
          }
        }
        
        select option { background: white; color: #2A0A0E; }
      `}</style>

      <div className="form-outer" style={{ minHeight:"100vh", background:"linear-gradient(160deg,#F9EEF0 0%,#FFF8F0 50%,#F9EEF0 100%)", padding:"0 16px 48px" }}>

        {/* Hero Header */}
        <div style={{ background:"linear-gradient(135deg,#5A0010 0%,#8B0000 45%,#C41E3A 100%)", padding:"40px 24px 32px", marginBottom:32, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.08)" }} />
          <div style={{ position:"absolute", bottom:-60, left:-30, width:200, height:200, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)" }} />
          <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", position:"relative" }}>
            <div style={{ display:"inline-block", background:"rgba(255,255,255,0.1)", borderRadius:50, padding:"6px 20px", marginBottom:14, fontSize:"0.75rem", letterSpacing:"0.15em", color:"rgba(255,220,200,0.9)", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.15)" }}>
              Matrimony Profile Registration
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", color:"white", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:700, marginBottom:8, textShadow:"0 2px 20px rgba(0,0,0,0.3)" }}>
              Begin Your Sacred Journey
            </h1>
            <p style={{ color:"rgba(255,220,210,0.85)", fontSize:"1rem", fontWeight:300, letterSpacing:"0.03em" }}>
              Fill in your details carefully — every field helps us find your perfect match
            </p>
          </div>
        </div>

        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* Photo Upload Section */}
          <div style={{ ...sectionBox, marginBottom:20 }}>
            <SectionHeader icon="📸" title="Profile Photographs" />
            <p style={{ fontSize:"0.82rem", color:"#8A5060", marginBottom:20, fontStyle:"italic" }}>
              Upload 2–3 recent photographs. Clear face photos work best for matches.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:"clamp(12px, 3vw, 16px)" }}>
              {[0,1,2].map(index => (
                <div key={index} style={{ position:"relative" }}>
                  {photoPreviews[index] ? (
                    <div style={{ borderRadius:12, overflow:"hidden", border:"2px solid #C41E3A", boxShadow:"0 8px 24px rgba(139,0,0,0.15)" }}>
                      <img src={photoPreviews[index]} alt={`Photo ${index+1}`} style={{ width:"100%", height:"clamp(160px, 30vw, 200px)", objectFit:"cover", display:"block" }} />
                      <div style={{ padding:"clamp(8px, 2vw, 10px) clamp(10px, 2vw, 12px)", background:"linear-gradient(135deg,#8B0000,#C41E3A)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ color:"rgba(255,255,255,0.85)", fontSize:"clamp(0.7rem, 2vw, 0.78rem)" }}>Photo {index+1}</span>
                        <button type="button" onClick={() => removePhoto(index)} style={{ background:"rgba(255,255,255,0.2)", color:"white", border:"none", padding:"3px 10px", borderRadius:20, cursor:"pointer", fontSize:"0.75rem", fontWeight:600 }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"clamp(8px, 2vw, 12px)", cursor:"pointer", height:"clamp(160px, 30vw, 200px)", border:"2px dashed #D4A0A8", borderRadius:12, background:"linear-gradient(135deg,#FFF8F9,#FFF5F0)", transition:"all 0.2s ease", padding:"clamp(12px, 2vw, 16px)" }}>
                      <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,rgba(139,0,0,0.08),rgba(196,30,58,0.12))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                        {index === 0 ? "🖼️" : index === 1 ? "📷" : "🌸"}
                      </div>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ color:"#8B0000", fontSize:"clamp(0.75rem, 2vw, 0.85rem)", fontWeight:700 }}>Photo {index+1}</div>
                        <div style={{ color:"#B08090", fontSize:"clamp(0.65rem, 1.5vw, 0.72rem)", marginTop:4 }}>Click to upload · Max 5MB</div>
                      </div>
                      <div style={{ background:"linear-gradient(135deg,#8B0000,#C41E3A)", color:"white", padding:"6px 16px", borderRadius:20, fontSize:"clamp(0.7rem, 1.5vw, 0.78rem)", fontWeight:700, letterSpacing:"0.05em" }}>
                        Browse
                      </div>
                      <input type="file" accept="image/*" onChange={e => handlePhotoUpload(index, e.target.files[0])} style={{ display:"none" }} />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Personal Details */}
          <div style={sectionBox}>
            <SectionHeader icon="👤" title="Personal Details" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-3">
                <FormField label="Full Name" required error={errors.name}>
                  <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Enter your full name" style={inputStyle(errors.name)} />
                </FormField>
                <FormField label="Gender" required error={errors.gender}>
                  <select value={form.gender} onChange={e => set("gender", e.target.value)} style={selectStyle(errors.gender)}>
                    {GENDERS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </FormField>
                <FormField label="Date of Birth" required error={errors.dob}>
                  <input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} style={inputStyle(errors.dob)} />
                </FormField>
              </div>

              <div className="row-3">
                <FormField label="Time of Birth">
                  <div style={{ display:"flex", gap:8 }}>
                    <select value={form.birthHour} onChange={e => set("birthHour", e.target.value)} style={{ ...selectStyle(false), flex:1 }}>
                      <option value="">HH</option>
                      {HOURS.map(h => <option key={h}>{h}</option>)}
                    </select>
                    <select value={form.birthMin} onChange={e => set("birthMin", e.target.value)} style={{ ...selectStyle(false), flex:1 }}>
                      <option value="">MM</option>
                      {MINUTES.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <select value={form.birthAmPm} onChange={e => set("birthAmPm", e.target.value)} style={{ ...selectStyle(false), flex:1 }}>
                      {AMPM.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </FormField>
                <FormField label="Place of Birth (Town/District)" required error={errors.placeBirth}>
                  <input value={form.placeBirth} onChange={e => set("placeBirth", e.target.value)} placeholder="Town / District" style={inputStyle(errors.placeBirth)} />
                </FormField>
                <FormField label="Nativity (Town & District)" required error={errors.nativity}>
                  <input value={form.nativity} onChange={e => set("nativity", e.target.value)} placeholder="Town & District" style={inputStyle(errors.nativity)} />
                </FormField>
              </div>

              <div className="row-2">
                <FormField label="Mother Tongue" required error={errors.motherTongue}>
                  <select value={form.motherTongue} onChange={e => set("motherTongue", e.target.value)} style={selectStyle(errors.motherTongue)}>
                    {MOTHER_TONGUES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={e => set("maritalStatus", e.target.value)} style={selectStyle(false)}>
                    {MARITAL_STATUSES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </FormField>
              </div>

              <FormField label="Additional Details">
                <textarea value={form.others} onChange={e => set("others", e.target.value)} rows={4} placeholder="Talents, achievements, visa status, family deity, any other important information..." style={{ ...inputStyle(false), resize:"vertical", minHeight:100, lineHeight:1.7 }} />
              </FormField>
            </div>
          </div>

          {/* Family Details */}
          <div style={sectionBox}>
            <SectionHeader icon="👨‍👩‍👧‍👦" title="Family Details" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-3">
                <FormField label="Father's Name">
                  <input value={form.fatherName} onChange={e => set("fatherName", e.target.value)} placeholder="Father's full name" style={inputStyle(false)} />
                </FormField>
                <FormField label="Father's Occupation">
                  <input value={form.fatherJob} onChange={e => set("fatherJob", e.target.value)} placeholder="Occupation" style={inputStyle(false)} />
                </FormField>
                <FormField label="Father Alive">
                  <div style={radioStyle}>
                    <RadioOpt name="fatherAlive" value="yes" checked={form.fatherAlive==="yes"} onChange={() => set("fatherAlive","yes")} label="Yes" />
                    <RadioOpt name="fatherAlive" value="no" checked={form.fatherAlive==="no"} onChange={() => set("fatherAlive","no")} label="No" />
                  </div>
                </FormField>
              </div>
              <div className="row-3">
                <FormField label="Mother's Name">
                  <input value={form.motherName} onChange={e => set("motherName", e.target.value)} placeholder="Mother's full name" style={inputStyle(false)} />
                </FormField>
                <FormField label="Mother's Occupation">
                  <input value={form.motherJob} onChange={e => set("motherJob", e.target.value)} placeholder="Occupation" style={inputStyle(false)} />
                </FormField>
                <FormField label="Mother Alive">
                  <div style={radioStyle}>
                    <RadioOpt name="motherAlive" value="yes" checked={form.motherAlive==="yes"} onChange={() => set("motherAlive","yes")} label="Yes" />
                    <RadioOpt name="motherAlive" value="no" checked={form.motherAlive==="no"} onChange={() => set("motherAlive","no")} label="No" />
                  </div>
                </FormField>
              </div>

              {/* Siblings Table */}
              <div>
                <label style={{ fontSize:"0.72rem", fontWeight:700, color:"#7A1020", textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:10 }}>Siblings</label>
                <div style={{ overflowX:"auto", borderRadius:10, border:"1px solid rgba(196,30,58,0.15)" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.84rem" }}>
                    <thead>
                      <tr style={{ background:"linear-gradient(135deg,#8B0000,#C41E3A)" }}>
                        <th style={{ padding:"12px 16px", color:"white", fontWeight:700, textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.05em" }}>Status</th>
                        {["Elder Brother","Younger Brother","Elder Sister","Younger Sister"].map(h => (
                          <th key={h} style={{ padding:"12px 16px", color:"white", fontWeight:600, textAlign:"center", fontSize:"0.78rem" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label:"Married", keys:["sibMarriedEB","sibMarriedYB","sibMarriedES","sibMarriedYS"] },
                        { label:"Unmarried", keys:["sibUnmarriedEB","sibUnmarriedYB","sibUnmarriedES","sibUnmarriedYS"] },
                      ].map((row, ri) => (
                        <tr key={ri} style={{ background: ri%2===0 ? "#FFF8F9" : "white" }}>
                          <td style={{ padding:"10px 16px", fontWeight:700, color:"#5A0010", fontSize:"0.82rem" }}>{row.label}</td>
                          {row.keys.map(k => (
                            <td key={k} style={{ padding:"8px 12px", textAlign:"center" }}>
                              <select value={form[k]} onChange={e => set(k, e.target.value)} style={{ ...selectStyle(false), textAlign:"center", width:70 }}>
                                {SIBLING_COUNTS.map(s => <option key={s}>{s}</option>)}
                              </select>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div style={sectionBox}>
            <SectionHeader icon="⚖️" title="Physical Attributes" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-3">
                <FormField label="Height">
                  <select value={form.height} onChange={e => set("height", e.target.value)} style={selectStyle(false)}>
                    {["-Select-",...HEIGHTS].map(h => <option key={h}>{h}</option>)}
                  </select>
                </FormField>
                <FormField label="Weight">
                  <select value={form.weight} onChange={e => set("weight", e.target.value)} style={selectStyle(false)}>
                    {["-Select-",...WEIGHTS].map(w => <option key={w}>{w}</option>)}
                  </select>
                </FormField>
                <FormField label="Blood Group">
                  <select value={form.bloodGroup} onChange={e => set("bloodGroup", e.target.value)} style={selectStyle(false)}>
                    {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </FormField>
              </div>
              <div className="row-2">
                <FormField label="Diet Preference">
                  <div style={radioStyle}>
                    {["Vegetarian","Non-Vegetarian","Eggetarian"].map(d => (
                      <RadioOpt key={d} name="diet" value={d} checked={form.diet===d} onChange={() => set("diet",d)} label={d} />
                    ))}
                  </div>
                </FormField>
                <FormField label="Any Disability">
                  <div style={radioStyle}>
                    {["No","Yes"].map(d => (
                      <RadioOpt key={d} name="disability" value={d} checked={form.disability===d} onChange={() => set("disability",d)} label={d} />
                    ))}
                  </div>
                </FormField>
              </div>
              <FormField label="Complexion">
                <div style={{ ...radioStyle, flexWrap:"wrap" }}>
                  {["Very Fair","Fair","Wheatish","Wheatish Brown","Dark"].map(c => (
                    <RadioOpt key={c} name="complexion" value={c} checked={form.complexion===c} onChange={() => set("complexion",c)} label={c} />
                  ))}
                </div>
              </FormField>
            </div>
          </div>

          {/* Education & Occupation */}
          <div style={sectionBox}>
            <SectionHeader icon="🎓" title="Education & Occupation" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-3">
                <FormField label="Qualification">
                  <input value={form.qualification} onChange={e => set("qualification", e.target.value)} placeholder="Highest qualification" style={inputStyle(false)} />
                </FormField>
                <FormField label="Job / Occupation">
                  <input value={form.job} onChange={e => set("job", e.target.value)} placeholder="Job title or role" style={inputStyle(false)} />
                </FormField>
                <FormField label="Place of Job">
                  <input value={form.placeJob} onChange={e => set("placeJob", e.target.value)} placeholder="City / Location" style={inputStyle(false)} />
                </FormField>
              </div>
              <div style={{ maxWidth:300 }}>
                <FormField label="Monthly Income">
                  <input value={form.incomeMonth} onChange={e => set("incomeMonth", e.target.value)} placeholder="e.g. ₹50,000" style={inputStyle(false)} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Astrology Details */}
          <div style={sectionBox}>
            <SectionHeader icon="🪐" title="Astrology Details" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-3">
                <FormField label="Caste" required>
                  <select value={form.caste} onChange={e => set("caste", e.target.value)} style={selectStyle(false)}>
                    {CASTES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Sub Caste" required>
                  <select value={form.subCaste} onChange={e => set("subCaste", e.target.value)} style={selectStyle(false)}>
                    <option>-select-</option>
                    {["Subgroup 1","Subgroup 2","Subgroup 3"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Gothram">
                  <input value={form.gothram} onChange={e => set("gothram", e.target.value)} placeholder="Gothram" style={inputStyle(false)} />
                </FormField>
              </div>
              <div className="row-4">
                <FormField label="Star (Nakshatra)">
                  <select value={form.star} onChange={e => set("star", e.target.value)} style={selectStyle(false)}>
                    {STARS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Raasi / Moon Sign">
                  <select value={form.raasi} onChange={e => set("raasi", e.target.value)} style={selectStyle(false)}>
                    {RASI_LIST.map(r => <option key={r}>{r}</option>)}
                  </select>
                </FormField>
                <FormField label="Padam">
                  <select value={form.padam} onChange={e => set("padam", e.target.value)} style={selectStyle(false)}>
                    {PADAM_LIST.map(p => <option key={p}>{p}</option>)}
                  </select>
                </FormField>
                <FormField label="Laknam">
                  <select value={form.laknam} onChange={e => set("laknam", e.target.value)} style={selectStyle(false)}>
                    {LAKNAM.map(l => <option key={l}>{l}</option>)}
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* Horoscope Photos */}
          <div style={sectionBox}>
            <SectionHeader icon="🔮" title="Horoscope Details" />
            <p style={{ fontSize:"0.82rem", color:"#8A5060", marginBottom:20, fontStyle:"italic" }}>
              Upload your Rasi chart and Amsam chart for horoscope matching.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"clamp(12px, 3vw, 20px)" }}>
              {[
                { key:"rasi", label:"Rasi Chart", icon:"♈", desc:"Janma Kundali" },
                { key:"amsam", label:"Amsam Chart", icon:"⭐", desc:"Navamsa Chart" },
              ].map(({ key, label, icon, desc }) => (
                <div key={key}>
                  {horoscopePreview[key] ? (
                    <div style={{ borderRadius:12, overflow:"hidden", border:"2px solid #C41E3A", boxShadow:"0 8px 24px rgba(139,0,0,0.12)" }}>
                      <img src={horoscopePreview[key]} alt={label} style={{ width:"100%", height:"clamp(150px, 25vw, 180px)", objectFit:"cover", display:"block" }} />
                      <div style={{ padding:"clamp(8px, 2vw, 10px) clamp(10px, 2vw, 12px)", background:"linear-gradient(135deg,#8B0000,#C41E3A)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ color:"white", fontSize:"clamp(0.75rem, 2vw, 0.82rem)", fontWeight:600 }}>{label}</span>
                        <button type="button" onClick={() => removeHoroscopePhoto(key)} style={{ background:"rgba(255,255,255,0.2)", color:"white", border:"none", padding:"3px 12px", borderRadius:20, cursor:"pointer", fontSize:"0.75rem", fontWeight:600 }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"clamp(10px, 2vw, 12px)", cursor:"pointer", height:"clamp(150px, 25vw, 180px)", border:"2px dashed #D4A0A8", borderRadius:12, background:"linear-gradient(135deg,#FFF8F9,#FFF5F0)", padding:"clamp(12px, 2vw, 16px)" }}>
                      <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(139,0,0,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{icon}</div>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ color:"#8B0000", fontWeight:700, fontSize:"clamp(0.8rem, 2vw, 0.9rem)" }}>{label}</div>
                        <div style={{ color:"#B08090", fontSize:"clamp(0.65rem, 1.5vw, 0.72rem)", marginTop:2 }}>{desc} · Click to upload</div>
                      </div>
                      <div style={{ background:"linear-gradient(135deg,#8B0000,#C41E3A)", color:"white", padding:"6px 16px", borderRadius:20, fontSize:"clamp(0.7rem, 1.5vw, 0.78rem)", fontWeight:700 }}>
                        Upload Chart
                      </div>
                      <input type="file" accept="image/*" onChange={e => handleHoroscopePhotoUpload(key, e.target.files[0])} style={{ display:"none" }} />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Partner Expectations */}
          <div style={sectionBox}>
            <SectionHeader icon="💑" title="Partner Expectations" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-2">
                <FormField label="Partner Qualification">
                  <input value={form.partnerQualification} onChange={e => set("partnerQualification", e.target.value)} placeholder="Expected qualification" style={inputStyle(false)} />
                </FormField>
                <FormField label="Partner Job Preference">
                  <div style={{ display:"flex", gap:8 }}>
                    <input value={form.partnerJob} onChange={e => set("partnerJob", e.target.value)} placeholder="Job preference" style={{ ...inputStyle(false), flex:1 }} />
                    <select value={form.partnerJobRequirement} onChange={e => set("partnerJobRequirement", e.target.value)} style={{ ...selectStyle(false), width:130, flexShrink:0 }}>
                      <option>Must</option><option>Optional</option><option>Not Required</option>
                    </select>
                  </div>
                </FormField>
              </div>
              <div className="row-3">
                <FormField label="Monthly Income Expectation">
                  <input value={form.partnerIncomeMonth} onChange={e => set("partnerIncomeMonth", e.target.value)} placeholder="e.g. ₹40,000+" style={inputStyle(false)} />
                </FormField>
                <FormField label="Preferred Age (From)">
                  <input value={form.partnerAgeFrom} onChange={e => set("partnerAgeFrom", e.target.value)} placeholder="From age" style={inputStyle(false)} />
                </FormField>
                <FormField label="Preferred Age (To)">
                  <input value={form.partnerAgeTo} onChange={e => set("partnerAgeTo", e.target.value)} placeholder="To age" style={inputStyle(false)} />
                </FormField>
              </div>
              <div className="row-3">
                <FormField label="Preferred Diet">
                  <select value={form.partnerDiet} onChange={e => set("partnerDiet", e.target.value)} style={selectStyle(false)}>
                    <option>Vegetarian</option><option>Non-Vegetarian</option><option>Eggetarian</option><option>No Preference</option>
                  </select>
                </FormField>
                <FormField label="Preferred Caste">
                  <select value={form.partnerCaste} onChange={e => set("partnerCaste", e.target.value)} style={selectStyle(false)}>
                    <option>Any</option><option>Same Caste</option><option>Others</option>
                  </select>
                </FormField>
                <FormField label="Partner Marital Status">
                  <select value={form.partnerMaritalStatus} onChange={e => set("partnerMaritalStatus", e.target.value)} style={selectStyle(false)}>
                    <option>Unmarried</option><option>Divorced</option><option>Widowed</option><option>Separated</option><option>Any</option>
                  </select>
                </FormField>
              </div>
              <div className="row-2">
                <FormField label="Horoscope Required">
                  <div style={radioStyle}>
                    {["Yes","No"].map(v => (
                      <RadioOpt key={v} name="partnerHoroscope" value={v} checked={form.partnerHoroscopeRequired===v} onChange={() => set("partnerHoroscopeRequired",v)} label={v} />
                    ))}
                  </div>
                </FormField>
                <FormField label="Sub Caste Preference">
                  <select value={form.partnerSubCaste} onChange={e => set("partnerSubCaste", e.target.value)} style={selectStyle(false)}>
                    <option>Any</option><option>Same Sub-Caste</option><option>Others</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Any Other Requirements">
                <textarea value={form.partnerOtherRequirement} onChange={e => set("partnerOtherRequirement", e.target.value)} rows={3} placeholder="Describe any other specific preferences or requirements..." style={{ ...inputStyle(false), resize:"vertical", minHeight:80, lineHeight:1.7 }} />
              </FormField>
            </div>
          </div>

          {/* Communication Details */}
          <div style={sectionBox}>
            <SectionHeader icon="📞" title="Communication Details" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-2">
                <FormField label="Permanent Address">
                  <textarea value={form.permanentAddress} onChange={e => set("permanentAddress", e.target.value)} placeholder="Enter permanent address" rows={3} style={{ ...inputStyle(false), resize:"vertical", minHeight:88, lineHeight:1.6 }} />
                </FormField>
                <FormField label="Present Address">
                  <textarea value={form.presentAddress} onChange={e => set("presentAddress", e.target.value)} placeholder="Enter present address" rows={3} style={{ ...inputStyle(false), resize:"vertical", minHeight:88, lineHeight:1.6 }} />
                </FormField>
              </div>
              <div className="row-2">
                <FormField label="Contact Person">
                  <input value={form.contactPerson} onChange={e => set("contactPerson", e.target.value)} placeholder="Person to contact" style={inputStyle(false)} />
                </FormField>
                <FormField label="Contact Number" required error={errors.contactNumber}>
                  <input value={form.contactNumber} onChange={e => set("contactNumber", e.target.value)} placeholder="10-digit mobile number" maxLength={10} style={inputStyle(errors.contactNumber)} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Scheme / Account */}
          <div style={{ ...sectionBox, background:"linear-gradient(135deg,#FFF8F0,white)", border:"1px solid rgba(139,0,0,0.15)" }}>
            <SectionHeader icon="💎" title="Scheme & Account Details" />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="row-3">
                <FormField label="Membership Scheme">
                  <select value={form.scheme} onChange={e => set("scheme", e.target.value)} style={selectStyle(false)}>
                    <option>Select</option><option>Basic</option><option>Standard</option><option>Premium</option>
                  </select>
                </FormField>
                <FormField label="Login Username">
                  <input type="text" value={form.username} onChange={e => set("username", e.target.value)} placeholder="Choose a username" style={inputStyle(false)} />
                </FormField>
                <FormField label="Password">
                  <input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="Create password" style={inputStyle(false)} />
                </FormField>
              </div>

              <div style={{ background:"rgba(139,0,0,0.04)", borderRadius:10, padding:18, border:"1px solid rgba(139,0,0,0.1)" }}>
                <p style={{ fontSize:"0.88rem", color:"#5A0010", fontWeight:700, marginBottom:6 }}>
                  💰 Registration Fee: ₹999 for 1 Year
                </p>
                <p style={{ fontSize:"0.8rem", color:"#6A3040", lineHeight:1.7, marginBottom:12 }}>
                  After registering, your profile will be activated once the fee is paid within 1 day. Send your payment copy along with your registration number, name, and mobile number to{" "}
                  <span style={{ color:"#C41E3A", fontWeight:600 }}>dumdumdummarriage@gmail.com</span>.
                  For enquiries, call <span style={{ color:"#C41E3A", fontWeight:600 }}>+91-9489331973</span>.
                </p>
                <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                  <div style={{ position:"relative", width:18, height:18, flexShrink:0 }}>
                    <input type="checkbox" checked={form.termsAccepted} onChange={e => set("termsAccepted", e.target.checked)} style={{ position:"absolute", opacity:0, width:"100%", height:"100%", cursor:"pointer", margin:0 }} />
                    <div style={{ width:18, height:18, border:`2px solid ${form.termsAccepted ? "#8B0000" : "#C4A0A8"}`, borderRadius:4, background: form.termsAccepted ? "#8B0000" : "white", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
                      {form.termsAccepted && <span style={{ color:"white", fontSize:11, fontWeight:900 }}>✓</span>}
                    </div>
                  </div>
                  <span style={{ fontSize:"0.85rem", color:"#3D0010" }}>
                    I accept the <span style={{ color:"#8B0000", fontWeight:700, textDecoration:"underline", cursor:"pointer" }}>Terms & Conditions</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div style={{ display:"flex", gap:14, justifyContent:"center", padding:"10px 0 8px", flexWrap:"wrap" }}>
            <button type="button" onClick={handleReset} style={{ background:"white", color:"#8B0000", border:"2px solid #8B0000", padding:"13px 36px", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:"0.95rem", letterSpacing:"0.06em", transition:"all 0.2s", minWidth:160 }}>
              ↺ Reset Form
            </button>
            <button onClick={handleSubmit} disabled={submitting} style={{ background: submitting ? "#aaa" : "linear-gradient(135deg,#5A0010,#8B0000 40%,#C41E3A)", color:"white", border:"none", padding:"13px 44px", borderRadius:10, fontWeight:700, cursor: submitting ? "not-allowed" : "pointer", fontSize:"0.95rem", letterSpacing:"0.06em", boxShadow:"0 6px 20px rgba(139,0,0,0.35)", transition:"all 0.2s", minWidth:200 }}>
              {submitting ? "Submitting..." : "✦ Save Profile"}
            </button>
          </div>
          <p style={{ textAlign:"center", color:"#C4A0A8", fontSize:"0.75rem", marginTop:12 }}>
            <span style={{ color:"#C41E3A" }}>✦</span> Fields marked with ✦ are mandatory
          </p>
        </div>
      </div>
    </>
  );
}
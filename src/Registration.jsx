import { useState } from "react";
import { useTranslation } from "react-i18next";

const MOTHER_TONGUES = [
  "Select",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Hindi",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Odia",
  "Urdu",
  "Other",
];
const MARITAL_STATUSES = [
  "Unmarried",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
];
const GENDERS = ["-Select-", "Male", "Female", "Other"];
const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const AMPM = ["AM", "PM"];
const SIBLING_COUNTS = ["-", "0", "1", "2", "3", "4", "5"];
const HEIGHTS = Array.from(
  { length: 30 },
  (_, i) => `${4 + Math.floor(i / 12)}'${i % 12}"`,
);
const WEIGHTS = Array.from({ length: 50 }, (_, i) => `${50 + i * 2} kg`);
const BLOOD_GROUPS = [
  "-Select-",
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];
const STARS = [
  "-Select-",
  "Ashwini",
  "Bharani",
  "Kritika",
  "Rohini",
  "Mrigashirsha",
];
const CASTES = [
  "-Select-",
  "Brahmin",
  "Kshatriya",
  "Vaishya",
  "Shudra",
  "OBC",
  "SC/ST",
];
const LAKNAM = [
  "-Select Laknam-",
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Kataka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrischika",
  "Dhanus",
  "Makara",
  "Kumbha",
  "Meena",
];

const MANDATORY_FIELDS = [
  "name",
  "gender",
  "dob",
  "motherTongue",
  "placeBirth",
  "nativity",
];

export default function PersonalFamilyForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    gender: "-Select-",
    dob: "",
    birthHour: "",
    birthMin: "",
    birthAmPm: "AM",
    placeBirth: "",
    nativity: "",
    motherTongue: "Select",
    maritalStatus: "Unmarried",
    fatherName: "",
    fatherAlive: "yes",
    fatherJob: "",
    motherName: "",
    motherAlive: "yes",
    motherJob: "",
    sibMarriedEB: "-",
    sibMarriedYB: "-",
    sibMarriedES: "-",
    sibMarriedYS: "-",
    sibUnmarriedEB: "-",
    sibUnmarriedYB: "-",
    sibUnmarriedES: "-",
    sibUnmarriedYS: "-",
    others: "",
    // Physical Attributes
    height: "-Select-",
    weight: "-Select-",
    bloodGroup: "-Select-",
    diet: "Vegetarian",
    disability: "No",
    complexion: "Very Fair",
    // Education & Occupation
    qualification: "",
    job: "",
    placeJob: "",
    incomeMonth: "",
    // Astrology
    caste: "-Select-",
    subCaste: "-select-",
    gothram: "",
    star: "-Select-",
    raasi: "-Select Rasi -",
    padam: "-Select Padam-",
    laknam: "-Select Laknam-",
    // Communication Details
    permanentAddress: "",
    presentAddress: "",
    contactPerson: "",
    contactNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (form.gender === "-Select-") e.gender = "Gender is required";
    if (!form.dob) e.dob = "Date of Birth is required";
    if (form.motherTongue === "Select")
      e.motherTongue = "Mother Tongue is required";
    if (!form.placeBirth.trim()) e.placeBirth = "Place of Birth is required";
    if (!form.nativity.trim()) e.nativity = "Nativity is required";
    if (!form.contactNumber.trim()) e.contactNumber = "Contact Number is required";
    if (form.contactNumber && !/^\d{10}$/.test(form.contactNumber)) e.contactNumber = "Enter valid 10-digit phone number";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: "",
      gender: "-Select-",
      dob: "",
      birthHour: "",
      birthMin: "",
      birthAmPm: "AM",
      placeBirth: "",
      nativity: "",
      motherTongue: "Select",
      maritalStatus: "Unmarried",
      fatherName: "",
      fatherAlive: "yes",
      fatherJob: "",
      motherName: "",
      motherAlive: "yes",
      motherJob: "",
      sibMarriedEB: "-",
      sibMarriedYB: "-",
      sibMarriedES: "-",
      sibMarriedYS: "-",
      sibUnmarriedEB: "-",
      sibUnmarriedYB: "-",
      sibUnmarriedES: "-",
      sibUnmarriedYS: "-",
      others: "",
      height: "-Select-",
      weight: "-Select-",
      bloodGroup: "-Select-",
      diet: "Vegetarian",
      disability: "No",
      complexion: "Very Fair",
      qualification: "",
      job: "",
      placeJob: "",
      incomeMonth: "",
      caste: "-Select-",
      subCaste: "-select-",
      gothram: "",
      star: "-Select-",
      raasi: "-Select Rasi -",
      padam: "-Select Padam-",
      laknam: "-Select Laknam-",
      permanentAddress: "",
      presentAddress: "",
      contactPerson: "",
      contactNumber: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const inp = (hasErr) => ({
    padding: "6px 10px",
    border: `1.5px solid ${hasErr ? "#c0392b" : "#c8c8c8"}`,
    borderRadius: 4,
    fontSize: 13,
    fontFamily: "'Georgia',serif",
    background: "#fff",
    color: "#222",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const sel = (hasErr) => ({
    ...inp(hasErr),
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23666' d='M5 7L1 3h8z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 9px center",
    paddingRight: 28,
  });

  const lbl = {
    fontSize: 13,
    color: "#222",
    fontFamily: "'Georgia',serif",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };
  const req = { color: "#c0392b", marginRight: 3, fontWeight: 700 };
  const errMsg = {
    fontSize: 11,
    color: "#c0392b",
    marginTop: 2,
    fontFamily: "Georgia,serif",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+3:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff5f5; }
        input:focus, select:focus, textarea:focus {
          border-color: #dc1f26 !important;
          box-shadow: 0 0 0 2px rgba(220,31,38,0.15) !important;
          outline: none;
        }
        select option { background: #fff; color: #222; }
        .form-table { width: 100%; border-collapse: collapse; }
        .form-table td { padding: 7px 10px; vertical-align: middle; }
        .row-alt { background: #fff; }
        .row-main { background: #f5f5f5; }
        .section-sub { background: #ffefef; }
        .radio-group { display: flex; align-items: center; gap: 14px; }
        .radio-group label { display: flex; align-items: center; gap: 5px; cursor: pointer; font-family: Georgia, serif; font-size: 13px; color: #222; }
        .radio-group input[type=radio] { accent-color: #dc1f26; width: 15px; height: 15px; cursor: pointer; }
        .sib-table { width: 100%; border-collapse: collapse; font-family: Georgia, serif; font-size: 13px; }
        .sib-table th { background: #ffdfdf; border: 1px solid #ffb3b3; padding: 8px 6px; font-weight: 700; text-align: center; color: #8B0000; }
        .sib-table td { border: 1px solid #ffc8c8; padding: 5px 6px; text-align: center; background: #fff; }
        .btn-submit { background: linear-gradient(135deg, #dc1f26, #a93226); color: #fff; border: none; padding: 10px 32px; border-radius: 5px; font-size:14px; font-family: Georgia,serif; font-weight:700; cursor:pointer; letter-spacing:0.5px; box-shadow: 0 3px 10px rgba(220,31,38,0.3); transition: all 0.2s; }
        .btn-submit:hover { background: linear-gradient(135deg,#a93226,#8B0000); transform:translateY(-1px); box-shadow: 0 5px 14px rgba(220,31,38,0.4); }
        .btn-reset { background: #fff; color: #dc1f26; border: 1.5px solid #dc1f26; padding: 10px 28px; border-radius: 5px; font-size:14px; font-family: Georgia,serif; font-weight:600; cursor:pointer; transition: all 0.2s; }
        .btn-reset:hover { background: #fdf0f0; }
        .success-banner { background: linear-gradient(135deg,#dc1f26,#a93226); color: #fff; padding: 14px 20px; border-radius: 8px; font-family: Georgia,serif; font-size:15px; text-align:center; margin-bottom:16px; box-shadow:0 3px 12px rgba(220,31,38,0.3); }
        @media (max-width: 700px) {
          .form-table td { display: block; width: 100%; padding: 5px 8px; }
          .form-table tr { display: block; margin-bottom: 2px; }
          .sib-table th, .sib-table td { padding: 5px 3px; font-size: 11px; }
          .sib-table select { font-size: 11px; padding: 3px 4px; }
          .time-row { flex-wrap: wrap; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg,#fff5f5 0%,#ffffff 50%,#fff0f0 100%)",
          padding: "24px 12px",
          fontFamily: "Georgia,serif",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          {submitted && (
            <div className="success-banner">
              ✅ {t('registration.title')} submitted successfully!
              <button
                onClick={handleReset}
                style={{
                  marginLeft: 16,
                  background: "rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "#fff",
                  padding: "4px 14px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "Georgia,serif",
                }}
              >
                {t('common.next')}
              </button>
            </div>
          )}

          {/* Card wrapper */}
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow:
                "0 4px 30px rgba(0,0,0,0.12), 0 1px 4px rgba(192,57,43,0.08)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg,#dc1f26,#a93226)",
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                👨‍👩‍👧
              </div>
              <h1
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: "clamp(16px,3vw,22px)",
                  fontFamily: "'Merriweather',serif",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                {t('registration.title')}
              </h1>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <table className="form-table">
                {/* Row 1: Name, Gender, DOB */}
                <tbody>
                  <tr className="row-alt">
                    <td style={{ width: "18%" }}>
                      <label style={lbl}>
                        <span style={req}>*</span>{t('registration.name')} :
                      </label>
                    </td>
                    <td style={{ width: "22%" }}>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder={t('registration.namePlaceholder')}
                        style={inp(errors.name)}
                      />
                      {errors.name && <div style={errMsg}>{errors.name}</div>}
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <label style={lbl}>
                        <span style={req}>*</span>{t('registration.gender')} :
                      </label>
                    </td>
                    <td style={{ width: "22%" }}>
                      <select
                        value={form.gender}
                        onChange={(e) => set("gender", e.target.value)}
                        style={sel(errors.gender)}
                      >
                        {GENDERS.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                      {errors.gender && (
                        <div style={errMsg}>{errors.gender}</div>
                      )}
                    </td>
                    <td style={{ width: "10%", textAlign: "right" }}>
                      <label style={lbl}>
                        <span style={req}>*</span>{t('registration.dob')} :
                      </label>
                    </td>
                    <td>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => set("dob", e.target.value)}
                        style={inp(errors.dob)}
                      />
                      {errors.dob && <div style={errMsg}>{errors.dob}</div>}
                    </td>
                  </tr>

                  {/* Row 2: Time of Birth, Place, Nativity */}
                  <tr className="row-main">
                    <td>
                      <label style={lbl}>{t('registration.birthTime')} :</label>
                    </td>
                    <td>
                      <div
                        className="time-row"
                        style={{
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <select
                          value={form.birthHour}
                          onChange={(e) => set("birthHour", e.target.value)}
                          style={{ ...sel(false), width: 60 }}
                        >
                          <option value="">{t('registration.hour')}</option>
                          {HOURS.map((h) => (
                            <option key={h}>{h}</option>
                          ))}
                        </select>
                        <select
                          value={form.birthMin}
                          onChange={(e) => set("birthMin", e.target.value)}
                          style={{ ...sel(false), width: 60 }}
                        >
                          <option value="">{t('registration.minute')}</option>
                          {MINUTES.map((m) => (
                            <option key={m}>{m}</option>
                          ))}
                        </select>
                        <select
                          value={form.birthAmPm}
                          onChange={(e) => set("birthAmPm", e.target.value)}
                          style={{ ...sel(false), width: 62 }}
                        >
                          {AMPM.map((a) => (
                            <option key={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={{ ...lbl, fontSize: 12 }}>
                        {t('registration.placeBirth')}
                        <br />
                        <span style={{ color: "#555", fontSize: 11 }}>
                          ({t('registration.pleaseSpecify')})
                        </span>{" "}
                        <span style={req}>*</span>:
                      </label>
                    </td>
                    <td>
                      <input
                        value={form.placeBirth}
                        onChange={(e) => set("placeBirth", e.target.value)}
                        placeholder={t('registration.pleaseSpecify')}
                        style={inp(errors.placeBirth)}
                      />
                      {errors.placeBirth && (
                        <div style={errMsg}>{errors.placeBirth}</div>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={{ ...lbl, fontSize: 12 }}>
                        {t('registration.nativity')}
                        <br />
                        <span style={{ color: "#555", fontSize: 11 }}>
                          ({t('registration.pleaseSpecify')})
                        </span>{" "}
                        <span style={req}>*</span>:
                      </label>
                    </td>
                    <td>
                      <input
                        value={form.nativity}
                        onChange={(e) => set("nativity", e.target.value)}
                        placeholder={t('registration.pleaseSpecify')}
                        style={inp(errors.nativity)}
                      />
                      {errors.nativity && (
                        <div style={errMsg}>{errors.nativity}</div>
                      )}
                    </td>
                  </tr>

                  {/* Row 3: Mother Tongue, Marital Status */}
                  <tr className="section-sub">
                    <td>
                      <label style={lbl}>
                        <span style={req}>*</span>{t('registration.motherTongue')} :
                      </label>
                    </td>
                    <td>
                      <select
                        value={form.motherTongue}
                        onChange={(e) => set("motherTongue", e.target.value)}
                        style={sel(errors.motherTongue)}
                      >
                        {MOTHER_TONGUES.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                      {errors.motherTongue && (
                        <div style={errMsg}>{errors.motherTongue}</div>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>{t('registration.maritalStatus')} :</label>
                    </td>
                    <td colSpan={3}>
                      <select
                        value={form.maritalStatus}
                        onChange={(e) => set("maritalStatus", e.target.value)}
                        style={{ ...sel(false), maxWidth: 220 }}
                      >
                        {MARITAL_STATUSES.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  {/* Row 4: Father's details */}
                  <tr className="row-alt">
                    <td>
                      <label style={lbl}>{t('registration.fatherName')} :</label>
                    </td>
                    <td>
                      <input
                        value={form.fatherName}
                        onChange={(e) => set("fatherName", e.target.value)}
                        placeholder={t('registration.fatherName')}
                        style={inp(false)}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>{t('registration.fatherAlive')} :</label>
                    </td>
                    <td>
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="fatherAlive"
                            value="yes"
                            checked={form.fatherAlive === "yes"}
                            onChange={(e) => set("fatherAlive", "yes")}
                          />{" "}
                          {t('registration.fatherAliveYes')}
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="fatherAlive"
                            value="no"
                            checked={form.fatherAlive === "no"}
                            onChange={(e) => set("fatherAlive", "no")}
                          />{" "}
                          {t('registration.fatherAliveNo')}
                        </label>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>{t('registration.fatherOccupation')} :</label>
                    </td>
                    <td>
                      <input
                        value={form.fatherJob}
                        onChange={(e) => set("fatherJob", e.target.value)}
                        placeholder={t('registration.occupation')}
                        style={inp(false)}
                      />
                    </td>
                  </tr>

                  {/* Row 5: Mother's details */}
                  <tr className="row-main">
                    <td>
                      <label style={lbl}>{t('registration.motherName')} :</label>
                    </td>
                    <td>
                      <input
                        value={form.motherName}
                        onChange={(e) => set("motherName", e.target.value)}
                        placeholder={t('registration.motherName')}
                        style={inp(false)}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>{t('registration.motherAlive')} :</label>
                    </td>
                    <td>
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="motherAlive"
                            value="yes"
                            checked={form.motherAlive === "yes"}
                            onChange={(e) => set("motherAlive", "yes")}
                          />{" "}
                          {t('registration.motherAliveYes')}
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="motherAlive"
                            value="no"
                            checked={form.motherAlive === "no"}
                            onChange={(e) => set("motherAlive", "no")}
                          />{" "}
                          {t('registration.motherAliveNo')}
                        </label>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>{t('registration.motherOccupation')} :</label>
                    </td>
                    <td>
                      <input
                        value={form.motherJob}
                        onChange={(e) => set("motherJob", e.target.value)}
                        placeholder={t('registration.occupation')}
                        style={inp(false)}
                      />
                    </td>
                  </tr>

                  {/* Row 6: Siblings table */}
                  <tr className="row-alt">
                    <td colSpan={6} style={{ padding: "10px 14px" }}>
                      <table className="sib-table">
                        <thead>
                          <tr>
                            <th style={{ width: "22%" }}>{t('registration.siblings')}</th>
                            <th>{t('registration.elderBrother')}</th>
                            <th>{t('registration.youngerBrother')}</th>
                            <th>{t('registration.elderSister')}</th>
                            <th>{t('registration.youngerSister')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                fontWeight: 700,
                                background: "#e8eef8",
                                color: "#1a2a4a",
                              }}
                            >
                              {t('registration.married')}
                            </td>
                            {[
                              "sibMarriedEB",
                              "sibMarriedYB",
                              "sibMarriedES",
                              "sibMarriedYS",
                            ].map((k) => (
                              <td key={k}>
                                <select
                                  value={form[k]}
                                  onChange={(e) => set(k, e.target.value)}
                                  style={{
                                    padding: "4px 6px",
                                    border: "1px solid #c0c8d8",
                                    borderRadius: 3,
                                    fontSize: 12,
                                    fontFamily: "Georgia,serif",
                                    background: "#fff",
                                    width: "100%",
                                    cursor: "pointer",
                                  }}
                                >
                                  {SIBLING_COUNTS.map((s) => (
                                    <option key={s}>{s}</option>
                                  ))}
                                </select>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontWeight: 700,
                                background: "#e8eef8",
                                color: "#1a2a4a",
                              }}
                            >
                              {t('registration.unmarried')}
                            </td>
                            {[
                              "sibUnmarriedEB",
                              "sibUnmarriedYB",
                              "sibUnmarriedES",
                              "sibUnmarriedYS",
                            ].map((k) => (
                              <td key={k}>
                                <select
                                  value={form[k]}
                                  onChange={(e) => set(k, e.target.value)}
                                  style={{
                                    padding: "4px 6px",
                                    border: "1px solid #c0c8d8",
                                    borderRadius: 3,
                                    fontSize: 12,
                                    fontFamily: "Georgia,serif",
                                    background: "#fff",
                                    width: "100%",
                                    cursor: "pointer",
                                  }}
                                >
                                  {SIBLING_COUNTS.map((s) => (
                                    <option key={s}>{s}</option>
                                  ))}
                                </select>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Row 7: Others */}
                  <tr className="row-main">
                    <td style={{ verticalAlign: "top", paddingTop: 10 }}>
                      <label style={{ ...lbl, lineHeight: 1.6 }}>
                        {t('registration.siblings')}
                        <br />
                        <span style={{ fontSize: 11, color: "#666" }}>
                          {t('registration.siblings')}
                        </span>
                        <span style={req}> *</span>:
                      </label>
                    </td>
                    <td colSpan={5}>
                      <textarea
                        value={form.others}
                        onChange={(e) => set("others", e.target.value)}
                        rows={4}
                        placeholder={t('registration.siblings')}
                        style={{
                          ...inp(false),
                          resize: "vertical",
                          minHeight: 90,
                          padding: "8px 10px",
                          lineHeight: 1.6,
                        }}
                      />
                    </td>
                  </tr>

                  {/* PHYSICAL ATTRIBUTES SECTION */}
                  <tr className="row-alt">
                    <td
                      colSpan={6}
                      style={{
                        padding: "12px 14px",
                        borderTop: "2px solid #dc1f26",
                      }}
                    >
                      <div
                        style={{
                          background: "linear-gradient(135deg,#dc1f26,#a93226)",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 12,
                          fontFamily: "Georgia,serif",
                        }}
                      >
                        {t('registration.physicalAttributes')}
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="row-main">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>{t('registration.height')} :</label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <select
                                value={form.height}
                                onChange={(e) => set("height", e.target.value)}
                                style={sel(false)}
                              >
                                {["-Select-", ...HEIGHTS].map((h) => (
                                  <option key={h}>{h}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>{t('registration.weight')} :</label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <select
                                value={form.weight}
                                onChange={(e) => set("weight", e.target.value)}
                                style={sel(false)}
                              >
                                {["-Select-", ...WEIGHTS].map((w) => (
                                  <option key={w}>{w}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ width: "18%", textAlign: "right" }}>
                              <label style={lbl}>{t('registration.bloodGroup')} :</label>
                            </td>
                            <td>
                              <select
                                value={form.bloodGroup}
                                onChange={(e) =>
                                  set("bloodGroup", e.target.value)
                                }
                                style={sel(false)}
                              >
                                {BLOOD_GROUPS.map((b) => (
                                  <option key={b}>{b}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          <tr className="section-sub">
                            <td colSpan={3}>
                              <div className="radio-group">
                                <label style={lbl}>{t('registration.diet')} :</label>
                                {[
                                  t('registration.vegetarian'),
                                  t('registration.nonVegetarian'),
                                  "Eggetarian",
                                ].map((d) => (
                                  <label key={d}>
                                    <input
                                      type="radio"
                                      value={d}
                                      checked={form.diet === d}
                                      onChange={(e) => set("diet", d)}
                                    />{" "}
                                    {d}
                                  </label>
                                ))}
                              </div>
                            </td>
                            <td colSpan={3} style={{ textAlign: "right" }}>
                              <div className="radio-group">
                                <label style={lbl}>{t('registration.disability')} :</label>
                                {[t('common.cancel'), t('common.next')].map((d) => (
                                  <label key={d}>
                                    <input
                                      type="radio"
                                      value={d}
                                      checked={form.disability === d}
                                      onChange={(e) => set("disability", d)}
                                    />{" "}
                                    {d}
                                  </label>
                                ))}
                              </div>
                            </td>
                          </tr>
                          <tr className="row-alt">
                            <td colSpan={6}>
                              <div
                                className="radio-group"
                                style={{ justifyContent: "center" }}
                              >
                                <label style={{ ...lbl, marginRight: 16 }}>
                                  {t('registration.complexion')} :
                                </label>
                                {[
                                  "Very Fair",
                                  "Fair",
                                  "Wheatish",
                                  "Wheatish brown",
                                  "Dark",
                                ].map((c) => (
                                  <label key={c}>
                                    <input
                                      type="radio"
                                      value={c}
                                      checked={form.complexion === c}
                                      onChange={(e) => set("complexion", c)}
                                    />{" "}
                                    {c}
                                  </label>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* EDUCATION & OCCUPATION SECTION */}
                  <tr className="row-alt">
                    <td colSpan={6} style={{ padding: "12px 14px" }}>
                      <div
                        style={{
                          background: "linear-gradient(135deg,#dc1f26,#a93226)",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 12,
                          fontFamily: "Georgia,serif",
                        }}
                      >
                        {t('registration.educationOccupation')}
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="section-sub">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>{t('registration.qualification')} :</label>
                            </td>
                            <td style={{ width: "30%" }}>
                              <input
                                value={form.qualification}
                                onChange={(e) =>
                                  set("qualification", e.target.value)
                                }
                                placeholder={t('registration.qualification')}
                                style={inp(false)}
                              />
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>{t('registration.occupation')} :</label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <input
                                value={form.job}
                                onChange={(e) => set("job", e.target.value)}
                                placeholder={t('registration.occupation')}
                                style={inp(false)}
                              />
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>{t('registration.placeOfWork')} :</label>
                            </td>
                            <td>
                              <input
                                value={form.placeJob}
                                onChange={(e) =>
                                  set("placeJob", e.target.value)
                                }
                                placeholder={t('registration.placeOfWork')}
                                style={inp(false)}
                              />
                            </td>
                          </tr>
                          <tr className="row-main">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>{t('registration.monthlyIncome')} :</label>
                            </td>
                            <td colSpan={5}>
                              <input
                                value={form.incomeMonth}
                                onChange={(e) =>
                                  set("incomeMonth", e.target.value)
                                }
                                placeholder={t('registration.monthlyIncome')}
                                style={inp(false)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* ASTROLOGY SECTION */}
                  <tr className="row-alt">
                    <td colSpan={6} style={{ padding: "12px 14px" }}>
                      <div
                        style={{
                          background: "linear-gradient(135deg,#dc1f26,#a93226)",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 12,
                          fontFamily: "Georgia,serif",
                        }}
                      >
                        {t('registration.astrology')}
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="section-sub">
                            <td style={{ width: "18%" }}>
                              <label style={{ ...lbl }}>
                                <span style={req}>*</span>{t('registration.caste')} :
                              </label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <select
                                value={form.caste}
                                onChange={(e) => set("caste", e.target.value)}
                                style={sel(false)}
                              >
                                {CASTES.map((c) => (
                                  <option key={c}>{c}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={{ ...lbl }}>
                                <span style={req}>*</span>{t('registration.subcaste')} :
                              </label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <select
                                value={form.subCaste}
                                onChange={(e) =>
                                  set("subCaste", e.target.value)
                                }
                                style={sel(false)}
                              >
                                <option>-select-</option>
                                {["Subgroup 1", "Subgroup 2", "Subgroup 3"].map(
                                  (s) => (
                                    <option key={s}>{s}</option>
                                  ),
                                )}
                              </select>
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>{t('registration.gothram')} :</label>
                            </td>
                            <td>
                              <input
                                value={form.gothram}
                                onChange={(e) => set("gothram", e.target.value)}
                                placeholder={t('registration.gothram')}
                                style={inp(false)}
                              />
                            </td>
                          </tr>
                          <tr className="row-main">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>Star :</label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <select
                                value={form.star}
                                onChange={(e) => set("star", e.target.value)}
                                style={sel(false)}
                              >
                                {STARS.map((s) => (
                                  <option key={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>Raasi/Moon Sign :</label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <select
                                value={form.raasi}
                                onChange={(e) => set("raasi", e.target.value)}
                                style={sel(false)}
                              >
                                <option>-Select Rasi -</option>
                                {[
                                  "Mesha",
                                  "Vrishabha",
                                  "Mithuna",
                                  "Kataka",
                                  "Simha",
                                  "Kanya",
                                ].map((r) => (
                                  <option key={r}>{r}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>Padam :</label>
                            </td>
                            <td>
                              <select
                                value={form.padam}
                                onChange={(e) => set("padam", e.target.value)}
                                style={sel(false)}
                              >
                                <option>-Select Padam-</option>
                                {["Padam 1", "Padam 2", "Padam 3"].map((p) => (
                                  <option key={p}>{p}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          <tr className="section-sub">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>Laknam :</label>
                            </td>
                            <td colSpan={5}>
                              <select
                                value={form.laknam}
                                onChange={(e) => set("laknam", e.target.value)}
                                style={sel(false)}
                              >
                                {LAKNAM.map((l) => (
                                  <option key={l}>{l}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* COMMUNICATION DETAILS SECTION */}
                  <tr className="row-alt">
                    <td colSpan={6} style={{ padding: "12px 14px" }}>
                      <div style={{ background: "linear-gradient(135deg,#dc1f26,#a93226)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: "Georgia,serif" }}>
                        {t('registration.communicationDetails')}
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="row-main">
                            <td style={{ width: "20%" }}>
                              <label style={lbl}>{t('registration.permanentAddress')} :</label>
                            </td>
                            <td style={{ width: "40%" }}>
                              <textarea value={form.permanentAddress} onChange={(e) => set("permanentAddress", e.target.value)} placeholder={t('registration.permanentAddress')} rows={3} style={{...inp(false), resize: "vertical", minHeight: 70, padding: "8px 10px", lineHeight: 1.4 }} />
                            </td>
                            <td style={{ width: "20%" }}>
                              <label style={lbl}>{t('registration.presentAddress')} :</label>
                            </td>
                            <td>
                              <textarea value={form.presentAddress} onChange={(e) => set("presentAddress", e.target.value)} placeholder={t('registration.presentAddress')} rows={3} style={{...inp(false), resize: "vertical", minHeight: 70, padding: "8px 10px", lineHeight: 1.4 }} />
                            </td>
                          </tr>
                          <tr className="section-sub">
                            <td style={{ width: "20%" }}>
                              <label style={lbl}>{t('registration.contactPerson')} :</label>
                            </td>
                            <td style={{ width: "40%" }}>
                              <input value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} placeholder={t('registration.contactPerson')} style={inp(false)} />
                            </td>
                            <td style={{ width: "20%", textAlign: "right" }}>
                              <label style={{...lbl}}>
                                <span style={req}>*</span>{t('registration.contactNumber')} :
                              </label>
                            </td>
                            <td>
                              <input value={form.contactNumber} onChange={(e) => set("contactNumber", e.target.value)} placeholder={t('registration.contactNumberPlaceholder')} maxLength={10} style={inp(errors.contactNumber)} />
                              {errors.contactNumber && <div style={errMsg}>{errors.contactNumber}</div>}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer */}
              <div
                style={{
                  background: "linear-gradient(135deg,#fff5f5,#fff)",
                  borderTop: "2px solid #ffcccc",
                  padding: "16px 24px",
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button type="submit" className="btn-submit">
                  ✔ {t('registration.submit')}
                </button>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={handleReset}
                >
                  ↺ {t('registration.reset')}
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <p
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: 12,
              marginTop: 14,
              fontFamily: "Georgia,serif",
            }}
          >
            <span style={{ color: "#c0392b" }}>*</span> {t('registration.required')}
          </p>
        </div>
      </div>
    </>
  );
}

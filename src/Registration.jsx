// RegisterForm.jsx

import { useState } from "react";

// Constants
const GENDERS = ["-Select-", "Male", "Female"];
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];
const AMPM = ["AM", "PM"];
const MOTHER_TONGUES = ["Select", "Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "Marathi", "English"];
const MARITAL_STATUSES = ["Unmarried", "Married", "Divorced", "Widowed"];
const SIBLING_COUNTS = ["-", "0", "1", "2", "3", "4", "5"];
const HEIGHTS = ["4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\""];
const WEIGHTS = ["40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg"];
const BLOOD_GROUPS = ["-Select-", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const CASTES = ["-Select-", "Brahmin", "Kshatriya", "Vaishya", "Shudra", "Others"];
const STARS = ["-Select-", "Ashwini", "Bharani", "Krithika", "Rohini", "Mrigasira", "Aridra", "Punarvasu"];
const LAKNAM = ["-Select Laknam-", "Laknam 1", "Laknam 2"];

export default function PersonalFamilyForm() {
  const [form, setForm] = useState({
    name: "Rajesh Kumar",
    gender: "Male",
    dob: "1995-06-15",
    birthHour: "14",
    birthMin: "30",
    birthAmPm: "PM",
    placeBirth: "Chennai",
    nativity: "Tamil Nadu",
    motherTongue: "Tamil",
    maritalStatus: "Unmarried",
    fatherName: "Suresh Kumar",
    fatherAlive: "yes",
    fatherJob: "Engineer",
    motherName: "Lakshmi",
    motherAlive: "yes",
    motherJob: "Teacher",
    sibMarriedEB: "1",
    sibMarriedYB: "0",
    sibMarriedES: "0",
    sibMarriedYS: "0",
    sibUnmarriedEB: "0",
    sibUnmarriedYB: "1",
    sibUnmarriedES: "0",
    sibUnmarriedYS: "0",
    others: "",
    // Physical Attributes
    height: "5'10\"",
    weight: "75kg",
    bloodGroup: "O+",
    diet: "Vegetarian",
    disability: "No",
    complexion: "Fair",
    // Education & Occupation
    qualification: "B.Tech",
    job: "Software Engineer",
    placeJob: "Bangalore",
    incomeMonth: "60000",
    // Partner Expectation (new UI section)
    partnerQualification: "B.Tech/B.Com",
    partnerJob: "Any",
    partnerJobRequirement: "Must",
    partnerIncomeMonth: "30000",
    partnerAgeFrom: "25",
    partnerAgeTo: "30",
    partnerDiet: "Vegetarian",
    partnerHoroscopeRequired: "No",
    partnerMaritalStatus: "Unmarried",
    partnerCaste: "Brahmin",
    partnerSubCaste: "Any",
    partnerOtherRequirement: "Should speak English",
    // Astrology
    caste: "Brahmin",
    subCaste: "Iyer",
    gothram: "Bharadwaja",
    star: "Rohini",
    raasi: "Taurus",
    padam: "Krithika 3",
    laknam: "Laknam 1",
    // Communication Details
    permanentAddress: "123 Main Street, Chennai, TN 600001",
    presentAddress: "456 Tech Park, Bangalore, KA 560001",
    contactPerson: "Suresh Kumar",
    contactNumber: "9876543210",
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

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/API/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form).toString(),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
      partnerQualification: "",
      partnerJob: "",
      partnerJobRequirement: "Optional",
      partnerIncomeMonth: "",
      partnerAgeFrom: "",
      partnerAgeTo: "",
      partnerDiet: "Vegetarian",
      partnerHoroscopeRequired: "No",
      partnerMaritalStatus: "Unmarried",
      partnerCaste: "Any",
      partnerSubCaste: "Any",
      partnerOtherRequirement: "",
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
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; color: #333; font-family: 'Source Sans 3', sans-serif; }

        .page-wrapper { min-height: 100vh; background: #fff; padding: 20px 12px 30px; }
        .card { max-width: 940px; margin: 0 auto; background: #fff; border-radius: 16px; border: 1px solid #f3b7bb; box-shadow: 0 8px 24px rgba(0,0,0,0.08); overflow: hidden; }

        .heading-bar { background: #fff; padding: 16px 20px; border-bottom: 2px solid #dc1f26; text-align: center; }
        .heading-bar h1 { margin: 0; color: #dc1f26; font-size: clamp(18px, 2.2vw, 26px); font-weight: 700; letter-spacing: 0.4px; }

        .form-table { width: 100%; border-collapse: collapse; }
        .form-table td { padding: 10px 12px; vertical-align: top; }
        .form-table tr { border-bottom: 1px solid #f2d7d9; }
        .row-alt { background: #fff; }
        .row-main { background: #fff; }
        .section-sub { background: #fff; }

        .label { font-size: 13px; color: #1d1d1d; font-weight: 600; margin-bottom: 5px; display: inline-block; }
        input, select, textarea { width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 8px; background: #fff; color: #333; font-size: 13px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.06); transition: all 0.2s ease; }
        input:focus, select:focus, textarea:focus { border-color: #dc1f26; box-shadow: 0 0 0 3px rgba(220,31,38,0.14); outline: none; }

        .section-title { margin: 10px 15px 10px; padding: 10px 14px; border: 2px solid #dc1f26; border-radius: 8px; background: #fff; color: #dc1f26; font-weight: 700; font-size: 15px; text-align: center; }

        .radio-group { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-block: 8px; }
        .radio-group label { display: flex; align-items: center; gap: 6px; cursor: pointer; color: #333; font-size: 13px; font-weight: 500; }
        .radio-group input[type=radio] { accent-color: #dc1f26; width: 16px; height: 16px; }

        .sib-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .sib-table th, .sib-table td { border: 1px solid #f2d7d9; padding: 8px 6px; background: #fff; }
        .sib-table th { background: #fee7ea; color: #c62828; font-weight: 700; }

        .btn-submit, .btn-reset { border-radius: 8px; font-size: 14px; font-weight: 700; padding: 11px 22px; min-width: 130px; transition: all 0.2s ease; }
        .btn-submit { background: #dc1f26; color: #fff; border: 1px solid #bd1e24; box-shadow: 0 4px 12px rgba(220,31,38,0.3); }
        .btn-submit:hover { background: #b51b20; transform: translateY(-1px); }
        .btn-reset { background: #fff; color: #dc1f26; border: 1px solid #dc1f26; }
        .btn-reset:hover { background: #fff5f5; }

        .success-banner { background: #dc1f26; color: #fff; padding: 14px 20px; border-radius: 8px; font-weight: 700; text-align: center; margin-bottom: 16px; box-shadow: 0 4px 16px rgba(220,31,38,0.25); }

        .communication-image-wrapper { width: 100%; display: flex; justify-content: center; margin: 16px 0; }
        .communication-image { width: 100%; max-width: 760px; border-radius: 10px; border: 1px solid #f0b5ba; }

        @media (max-width: 990px) {
          .form-table td { padding: 8px 8px; }
          .btn-submit, .btn-reset { width: 100%; min-width: 0; }
          .form-table tr { display: grid; grid-template-columns: 1fr; gap: 10px; }
          .form-table td { width: 100%; display: block; }
          .sib-table th, .sib-table td { font-size: 12px; }
        }
        @media (max-width: 700px) {
          .form-table td { padding: 6px 6px; }
          .section-title { font-size: 14px; padding: 10px; }
          .heading-bar h1 { font-size: 18px; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="card">
          {submitted && (
            <div className="success-banner">
              ✅ Personal & Family Details submitted successfully!
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
                Submit Another
              </button>
            </div>
          )}

          {/* Card wrapper */}
          <div>
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
                Personal and Family Details
              </h1>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <table className="form-table">
                {/* Row 1: Name, Gender, DOB */}
                <tbody>
                  <tr className="row-alt">
                    <td style={{ width: "18%" }}>
                      <label style={lbl}>
                        <span style={req}>*</span>Name :
                      </label>
                    </td>
                    <td style={{ width: "22%" }}>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Full Name"
                        style={inp(errors.name)}
                      />
                      {errors.name && <div style={errMsg}>{errors.name}</div>}
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <label style={lbl}>
                        <span style={req}>*</span>Gender :
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
                        <span style={req}>*</span>Date Of Birth :
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
                      <label style={lbl}>Time of Birth :</label>
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
                          <option value="">HH</option>
                          {HOURS.map((h) => (
                            <option key={h}>{h}</option>
                          ))}
                        </select>
                        <select
                          value={form.birthMin}
                          onChange={(e) => set("birthMin", e.target.value)}
                          style={{ ...sel(false), width: 60 }}
                        >
                          <option value="">MM</option>
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
                        Place Of Birth
                        <br />
                        <span style={{ color: "#555", fontSize: 11 }}>
                          (Town/District)
                        </span>{" "}
                        <span style={req}>*</span>:
                      </label>
                    </td>
                    <td>
                      <input
                        value={form.placeBirth}
                        onChange={(e) => set("placeBirth", e.target.value)}
                        placeholder="Town / District"
                        style={inp(errors.placeBirth)}
                      />
                      {errors.placeBirth && (
                        <div style={errMsg}>{errors.placeBirth}</div>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={{ ...lbl, fontSize: 12 }}>
                        Nativity
                        <br />
                        <span style={{ color: "#555", fontSize: 11 }}>
                          (Town & District)
                        </span>{" "}
                        <span style={req}>*</span>:
                      </label>
                    </td>
                    <td>
                      <input
                        value={form.nativity}
                        onChange={(e) => set("nativity", e.target.value)}
                        placeholder="Town & District"
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
                        <span style={req}>*</span>MotherTongue :
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
                      <label style={lbl}>Marital status :</label>
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
                      <label style={lbl}>Father's Name :</label>
                    </td>
                    <td>
                      <input
                        value={form.fatherName}
                        onChange={(e) => set("fatherName", e.target.value)}
                        placeholder="Father's full name"
                        style={inp(false)}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>Father's Alive :</label>
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
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="fatherAlive"
                            value="no"
                            checked={form.fatherAlive === "no"}
                            onChange={(e) => set("fatherAlive", "no")}
                          />{" "}
                          No
                        </label>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>Father's Job :</label>
                    </td>
                    <td>
                      <input
                        value={form.fatherJob}
                        onChange={(e) => set("fatherJob", e.target.value)}
                        placeholder="Occupation"
                        style={inp(false)}
                      />
                    </td>
                  </tr>

                  {/* Row 5: Mother's details */}
                  <tr className="row-main">
                    <td>
                      <label style={lbl}>Mother's Name :</label>
                    </td>
                    <td>
                      <input
                        value={form.motherName}
                        onChange={(e) => set("motherName", e.target.value)}
                        placeholder="Mother's full name"
                        style={inp(false)}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>Mother's Alive :</label>
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
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="motherAlive"
                            value="no"
                            checked={form.motherAlive === "no"}
                            onChange={(e) => set("motherAlive", "no")}
                          />{" "}
                          No
                        </label>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <label style={lbl}>Mother's Job :</label>
                    </td>
                    <td>
                      <input
                        value={form.motherJob}
                        onChange={(e) => set("motherJob", e.target.value)}
                        placeholder="Occupation"
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
                            <th style={{ width: "22%" }}>Relationship</th>
                            <th>Elder Brother</th>
                            <th>Younger brother</th>
                            <th>Elder Sister</th>
                            <th>Younger Sister</th>
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
                              Married
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
                              UnMarried
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
                        Any Others Details
                        <br />
                        <span style={{ fontSize: 11, color: "#666" }}>
                          (Talents, Achievements, Likes,
                          <br />
                          Visa Status, Family details, God etc)
                        </span>
                        <span style={req}> *</span>:
                      </label>
                    </td>
                    <td colSpan={5}>
                      <textarea
                        value={form.others}
                        onChange={(e) => set("others", e.target.value)}
                        rows={4}
                        placeholder="Enter any additional details about talents, achievements, visa status, family details, deity/god preferences, etc."
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
                        Physical Attributes
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="row-main">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>Height :</label>
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
                              <label style={lbl}>Weight :</label>
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
                              <label style={lbl}>Blood Group :</label>
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
                                <label style={lbl}>Diet :</label>
                                {[
                                  "Vegetarian",
                                  "Non-Vegetarian",
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
                                <label style={lbl}>Disability (If any) :</label>
                                {["No", "Yes"].map((d) => (
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
                                  Complexion :
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
                        Education & Occupation Details
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="section-sub">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>Qualification :</label>
                            </td>
                            <td style={{ width: "30%" }}>
                              <input
                                value={form.qualification}
                                onChange={(e) =>
                                  set("qualification", e.target.value)
                                }
                                placeholder="Enter qualification"
                                style={inp(false)}
                              />
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>Job :</label>
                            </td>
                            <td style={{ width: "22%" }}>
                              <input
                                value={form.job}
                                onChange={(e) => set("job", e.target.value)}
                                placeholder="Job title"
                                style={inp(false)}
                              />
                            </td>
                            <td style={{ width: "15%", textAlign: "right" }}>
                              <label style={lbl}>Place Of Job :</label>
                            </td>
                            <td>
                              <input
                                value={form.placeJob}
                                onChange={(e) =>
                                  set("placeJob", e.target.value)
                                }
                                placeholder="City/Location"
                                style={inp(false)}
                              />
                            </td>
                          </tr>
                          <tr className="row-main">
                            <td style={{ width: "18%" }}>
                              <label style={lbl}>Income Per Month :</label>
                            </td>
                            <td colSpan={5}>
                              <input
                                value={form.incomeMonth}
                                onChange={(e) =>
                                  set("incomeMonth", e.target.value)
                                }
                                placeholder="Enter monthly income"
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
                        Astrology Details
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="section-sub">
                            <td style={{ width: "18%" }}>
                              <label style={{ ...lbl }}>
                                <span style={req}>*</span>Caste :
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
                                <span style={req}>*</span>Sub Caste :
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
                              <label style={lbl}>Gothram :</label>
                            </td>
                            <td>
                              <input
                                value={form.gothram}
                                onChange={(e) => set("gothram", e.target.value)}
                                placeholder="Gothram"
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
                        Communication Details
                      </div>
                      <table className="form-table">
                        <tbody>
                          <tr className="row-main">
                            <td style={{ width: "20%" }}>
                              <label style={lbl}>Permanent Address :</label>
                            </td>
                            <td style={{ width: "40%" }}>
                              <textarea value={form.permanentAddress} onChange={(e) => set("permanentAddress", e.target.value)} placeholder="Enter permanent address" rows={3} style={{...inp(false), resize: "vertical", minHeight: 70, padding: "8px 10px", lineHeight: 1.4 }} />
                            </td>
                            <td style={{ width: "20%" }}>
                              <label style={lbl}>Present Address :</label>
                            </td>
                            <td>
                              <textarea value={form.presentAddress} onChange={(e) => set("presentAddress", e.target.value)} placeholder="Enter present address" rows={3} style={{...inp(false), resize: "vertical", minHeight: 70, padding: "8px 10px", lineHeight: 1.4 }} />
                            </td>
                          </tr>
                          <tr className="section-sub">
                            <td style={{ width: "20%" }}>
                              <label style={lbl}>Contact Person :</label>
                            </td>
                            <td style={{ width: "40%" }}>
                              <input value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} placeholder="Contact person name" style={inp(false)} />
                            </td>
                            <td style={{ width: "20%", textAlign: "right" }}>
                              <label style={{...lbl}}>
                                <span style={req}>*</span>Contact Number :
                              </label>
                            </td>
                            <td>
                              <input value={form.contactNumber} onChange={(e) => set("contactNumber", e.target.value)} placeholder="10-digit mobile number" maxLength={10} style={inp(errors.contactNumber)} />
                              {errors.contactNumber && <div style={errMsg}>{errors.contactNumber}</div>}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Horoscope Details Section */}
              <div
                style={{
                  marginBottom: 20,
                  marginLeft: 14,
                  marginRight: 14,
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
                  Horoscope Details
                </div>
              </div>

              {/* Partner Expectation Details Section */}
              <div
                style={{
                  marginBottom: 20,
                  marginLeft: 14,
                  marginRight: 14,
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
                  Partner Expectation Details
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #f0b5ba",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <table className="form-table" style={{ marginTop: 10 }}>
                    <tbody>
                      <tr className="section-sub">
                        <td style={{ width: "20%" }}>
                          <label style={lbl}>Qualification :</label>
                        </td>
                        <td style={{ width: "30%" }}>
                          <input
                            value={form.partnerQualification}
                            onChange={(e) =>
                              set("partnerQualification", e.target.value)
                            }
                            placeholder="Expected qualification"
                            style={inp(false)}
                          />
                        </td>
                        <td style={{ width: "15%", textAlign: "right" }}>
                          <label style={lbl}>Job :</label>
                        </td>
                        <td style={{ width: "35%" }}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 128px",
                              gap: 8,
                            }}
                          >
                            <input
                              value={form.partnerJob}
                              onChange={(e) =>
                                set("partnerJob", e.target.value)
                              }
                              placeholder="Job preference"
                              style={inp(false)}
                            />
                            <select
                              value={form.partnerJobRequirement}
                              onChange={(e) =>
                                set("partnerJobRequirement", e.target.value)
                              }
                              style={sel(false)}
                            >
                              <option>Must</option>
                              <option>Optional</option>
                              <option>Not Required</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr className="row-main">
                        <td style={{ width: "20%" }}>
                          <label style={lbl}>Income Per Month :</label>
                        </td>
                        <td style={{ width: "30%" }}>
                          <input
                            value={form.partnerIncomeMonth}
                            onChange={(e) =>
                              set("partnerIncomeMonth", e.target.value)
                            }
                            placeholder="Preferred income"
                            style={inp(false)}
                          />
                        </td>
                        <td style={{ width: "15%", textAlign: "right" }}>
                          <label style={lbl}>Preferred Age :</label>
                        </td>
                        <td
                          style={{
                            width: "35%",
                            display: "flex",
                            gap: 8,
                          }}
                        >
                          <input
                            value={form.partnerAgeFrom}
                            onChange={(e) =>
                              set("partnerAgeFrom", e.target.value)
                            }
                            placeholder="From"
                            style={inp(false)}
                          />
                          <input
                            value={form.partnerAgeTo}
                            onChange={(e) =>
                              set("partnerAgeTo", e.target.value)
                            }
                            placeholder="To"
                            style={inp(false)}
                          />
                        </td>
                      </tr>
                      <tr className="section-sub">
                        <td style={{ width: "20%" }}>
                          <label style={lbl}>Diet :</label>
                        </td>
                        <td style={{ width: "30%" }}>
                          <select
                            value={form.partnerDiet}
                            onChange={(e) => set("partnerDiet", e.target.value)}
                            style={sel(false)}
                          >
                            <option>Vegetarian</option>
                            <option>Non-Vegetarian</option>
                            <option>Eggetarian</option>
                          </select>
                        </td>
                        <td style={{ width: "15%", textAlign: "right" }}>
                          <label style={lbl}>Horoscope Required :</label>
                        </td>
                        <td style={{ width: "35%" }}>
                          <div className="radio-group">
                            {["Yes", "No"].map((v) => (
                              <label key={v}>
                                <input
                                  type="radio"
                                  name="partnerHoroscope"
                                  value={v}
                                  checked={form.partnerHoroscopeRequired === v}
                                  onChange={() =>
                                    set("partnerHoroscopeRequired", v)
                                  }
                                />
                                {v}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr className="row-main">
                        <td style={{ width: "20%" }}>
                          <label style={lbl}>Caste :</label>
                        </td>
                        <td style={{ width: "30%" }}>
                          <select
                            value={form.partnerCaste}
                            onChange={(e) =>
                              set("partnerCaste", e.target.value)
                            }
                            style={sel(false)}
                          >
                            <option>Any</option>
                            <option>Others</option>
                          </select>
                        </td>
                        <td style={{ width: "15%", textAlign: "right" }}>
                          <label style={lbl}>Sub Caste :</label>
                        </td>
                        <td style={{ width: "35%" }}>
                          <select
                            value={form.partnerSubCaste}
                            onChange={(e) =>
                              set("partnerSubCaste", e.target.value)
                            }
                            style={sel(false)}
                          >
                            <option>Any</option>
                            <option>Others</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="row-main">
                        <td style={{ width: "20%" }}>
                          <label style={lbl}>Marital Status :</label>
                        </td>
                        <td colSpan={5}>
                          <select
                            value={form.partnerMaritalStatus}
                            onChange={(e) =>
                              set("partnerMaritalStatus", e.target.value)
                            }
                            style={sel(false)}
                          >
                            <option>Unmarried</option>
                            <option>Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                            <option>Separated</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="row-alt">
                        <td style={{ verticalAlign: "top", paddingTop: 10 }}>
                          <label style={lbl}>Any other requirement :</label>
                        </td>
                        <td colSpan={5}>
                          <textarea
                            value={form.partnerOtherRequirement}
                            onChange={(e) =>
                              set("partnerOtherRequirement", e.target.value)
                            }
                            rows={3}
                            placeholder="Enter any specific additional preferences"
                            style={{
                              ...inp(false),
                              resize: "vertical",
                              minHeight: 72,
                              padding: "8px 10px",
                              lineHeight: 1.5,
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div
                style={{
                  marginBottom: 20,
                  marginLeft: 14,
                  marginRight: 14,
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
                  Scheme Details
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #dc1f26",
                    borderRadius: 8,
                    padding: "14px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ color: "#c0392b", fontWeight: 700 }}>
                      Scheme :
                    </label>
                    <select
                      style={{
                        ...inp(false),
                        border: "1px solid #dc1f26",
                        minHeight: 38,
                      }}
                    >
                      <option>Select</option>
                      <option>Basic</option>
                      <option>Standard</option>
                      <option>Premium</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ color: "#c0392b", fontWeight: 700 }}>
                      User Name (Login) :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter login username"
                      style={{
                        ...inp(false),
                        border: "1px solid #dc1f26",
                        minHeight: 38,
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ color: "#c0392b", fontWeight: 700 }}>
                      Password :
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      style={{
                        ...inp(false),
                        border: "1px solid #dc1f26",
                        minHeight: 38,
                      }}
                    />
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          width: "16px",
                          height: "16px",
                          flexShrink: 0,
                        }}
                      />
                      I accept the{" "}
                      <span style={{ color: "#dc1f26", fontWeight: 700 }}>
                        Terms & Conditions
                      </span>
                    </label>
                  </div>

                  <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
                    <p style={{ color: "#c0392b", fontWeight: 700, margin: 0 }}>
                      For 3 Years, Registration Fees Rs.1000 to advertise your
                      profile in our website & Mobile App.
                    </p>
                    <p
                      style={{ color: "#333", margin: "6px 0 0", fontSize: 13 }}
                    >
                      Note : After registered your profile in our website, Your
                      Profile will be maintain only if you pay the registration
                      amount within 1 day or else we will delete your profile.
                      Please send me your payment copy with Website registration
                      number, name and mobile number by Email:{" "}
                      <span style={{ color: "#007bff" }}>
                        dumdumdummarriage@gmail.com
                      </span>
                      , For Enquiry Contact this Mobile :{" "}
                      <span style={{ color: "#007bff" }}>+91-9489331973</span>
                    </p>
                  </div>
                </div>
              </div>

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
                  ✔ Save Details
                </button>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={handleReset}
                >
                  ↺ Reset Form
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
            <span style={{ color: "#c0392b" }}>*</span> Fields marked with
            asterisk are mandatory
          </p>
        </div>
      </div>
    </>
  );
}

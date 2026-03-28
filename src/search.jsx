import { useState, useMemo } from "react";

const CASTES = ["Any","Brahmin","Kshatriya","Vellalar","Nadar","Mudaliar","Pillai","Gounder","Naicker","Chettiar","Vishwakarma","Yadav","Vanniyar","Thevar","Agamudayar","Others"];
const SUB_CASTES = ["Any","Iyer","Iyengar","Saiva Vellalar","Karkatta Vellalar","Kongu Vellalar","Senguntha Mudaliar","Arcot Mudaliar","Kondaikatti Vellalar","Sozhia Vellalar","Others"];
const LANGUAGES = ["Any","Tamil","Telugu","Malayalam","Kannada","Hindi","Bengali","Marathi"];
const MARITAL_OPTIONS = ["Any","Unmarried","Widow/Widower","Divorce","Awaiting Divorce"];
const GENDERS = ["Any","Male","Female"];

const DUMMY = [
  { id:1,  regId:"MAT1001", name:"Aravind Kumar",    caste:"Brahmin",     subCaste:"Iyer",                gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:27, photo:"https://i.pravatar.cc/80?img=11" },
  { id:2,  regId:"MAT1002", name:"Priya Devi",        caste:"Vellalar",    subCaste:"Saiva Vellalar",      gender:"Female", language:"Tamil",     marital:"Unmarried",      age:24, photo:"https://i.pravatar.cc/80?img=47" },
  { id:3,  regId:"MAT1003", name:"Karthik Raja",      caste:"Gounder",     subCaste:"Kongu Vellalar",      gender:"Male",   language:"Tamil",     marital:"Divorce",        age:31, photo:"https://i.pravatar.cc/80?img=15" },
  { id:4,  regId:"MAT1004", name:"Meena Lakshmi",     caste:"Nadar",       subCaste:"Others",              gender:"Female", language:"Tamil",     marital:"Widow/Widower",  age:29, photo:"https://i.pravatar.cc/80?img=49" },
  { id:5,  regId:"MAT1005", name:"Venkatesh Raman",   caste:"Pillai",      subCaste:"Kondaikatti Vellalar",gender:"Male",   language:"Telugu",    marital:"Unmarried",      age:26, photo:"https://i.pravatar.cc/80?img=13" },
  { id:6,  regId:"MAT1006", name:"Anitha Selvam",     caste:"Mudaliar",    subCaste:"Senguntha Mudaliar",  gender:"Female", language:"Tamil",     marital:"Awaiting Divorce",age:33,photo:"https://i.pravatar.cc/80?img=44" },
  { id:7,  regId:"MAT1007", name:"Suresh Balaji",     caste:"Vishwakarma", subCaste:"Others",              gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:28, photo:"https://i.pravatar.cc/80?img=17" },
  { id:8,  regId:"MAT1008", name:"Kavitha Nair",      caste:"Others",      subCaste:"Others",              gender:"Female", language:"Malayalam", marital:"Unmarried",      age:25, photo:"https://i.pravatar.cc/80?img=48" },
  { id:9,  regId:"MAT1009", name:"Dinesh Kannan",     caste:"Chettiar",    subCaste:"Others",              gender:"Male",   language:"Tamil",     marital:"Divorce",        age:35, photo:"https://i.pravatar.cc/80?img=19" },
  { id:10, regId:"MAT1010", name:"Saranya Priya",     caste:"Brahmin",     subCaste:"Iyengar",             gender:"Female", language:"Tamil",     marital:"Unmarried",      age:23, photo:"https://i.pravatar.cc/80?img=46" },
  { id:11, regId:"MAT1011", name:"Manikandan S",      caste:"Thevar",      subCaste:"Others",              gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:30, photo:"https://i.pravatar.cc/80?img=12" },
  { id:12, regId:"MAT1012", name:"Deepa Sundaram",    caste:"Naicker",     subCaste:"Others",              gender:"Female", language:"Telugu",    marital:"Widow/Widower",  age:32, photo:"https://i.pravatar.cc/80?img=45" },
  { id:13, regId:"MAT1013", name:"Rajesh Pandian",    caste:"Agamudayar",  subCaste:"Others",              gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:29, photo:"https://i.pravatar.cc/80?img=14" },
  { id:14, regId:"MAT1014", name:"Lakshmi Priya",     caste:"Vellalar",    subCaste:"Sozhia Vellalar",     gender:"Female", language:"Tamil",     marital:"Unmarried",      age:26, photo:"https://i.pravatar.cc/80?img=43" },
  { id:15, regId:"MAT1015", name:"Balamurugan K",     caste:"Yadav",       subCaste:"Others",              gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:27, photo:"https://i.pravatar.cc/80?img=16" },
];

const INIT = { gender:"Any", language:"Any", caste:"Any", subCaste:"Any", sortId:"asc", ageFrom:"", ageTo:"", marital:"Any" };

export default function MatrimonySearch() {
  const [filters, setFilters] = useState(INIT);
  const [applied, setApplied] = useState(INIT);
  const [preview, setPreview] = useState(null);

  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const results = useMemo(() => {
    let d = [...DUMMY];
    if (applied.gender   !== "Any") d = d.filter(r => r.gender   === applied.gender);
    if (applied.language !== "Any") d = d.filter(r => r.language === applied.language);
    if (applied.caste    !== "Any") d = d.filter(r => r.caste    === applied.caste);
    if (applied.subCaste !== "Any") d = d.filter(r => r.subCaste === applied.subCaste);
    if (applied.marital  !== "Any") d = d.filter(r => r.marital  === applied.marital);
    if (applied.ageFrom)            d = d.filter(r => r.age >= Number(applied.ageFrom));
    if (applied.ageTo)              d = d.filter(r => r.age <= Number(applied.ageTo));
    d.sort((a, b) => applied.sortId === "asc" ? a.id - b.id : b.id - a.id);
    return d;
  }, [applied]);

  const S = {
    sel: { padding:"8px 32px 8px 12px", border:"1.5px solid #e0c8c8", borderRadius:6, fontSize:13, fontFamily:"Georgia,serif", background:"#fff", color:"#222", outline:"none", width:"100%", cursor:"pointer", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23c0392b' d='M5 7L1 3h8z'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center", transition:"border-color 0.2s,box-shadow 0.2s" },
    num: { padding:"8px 12px", border:"1.5px solid #e0c8c8", borderRadius:6, fontSize:13, fontFamily:"Georgia,serif", background:"#fff", color:"#222", outline:"none", width:"100%", transition:"border-color 0.2s,box-shadow 0.2s" },
    lbl: { fontSize:11, fontWeight:700, color:"#c0392b", letterSpacing:1.1, textTransform:"uppercase", fontFamily:"Georgia,serif", marginBottom:6, display:"block" },
  };

  const maritalColor = (m) => ({ "Unmarried":"#e8fdf0:#1a7a40", "Divorce":"#fff3e0:#d35400", "Widow/Widower":"#f3e8fd:#7d3c98", "Awaiting Divorce":"#fef9e7:#b7950b" }[m] || "#f0f0f0:#666").split(":");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#fdf5f5;}
        select:focus,input:focus{border-color:#c0392b!important;box-shadow:0 0 0 3px rgba(192,57,43,0.13)!important;outline:none;}
        select option{background:#fff;color:#222;}
        .fg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
        .fg2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
        .age-pair{display:flex;gap:8px;align-items:center;}
        .age-pair span{color:#c0392b;font-size:16px;flex-shrink:0;font-weight:700;}
        .marital-pills{display:flex;flex-wrap:wrap;gap:8px;}
        .m-pill{display:flex;align-items:center;gap:6px;cursor:pointer;padding:7px 14px;border-radius:20px;font-size:13px;font-family:Georgia,serif;transition:all 0.18s;user-select:none;border:1.5px solid transparent;}
        .btn-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px;}
        .btn-s{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border:none;padding:11px 32px;border-radius:7px;font-size:14px;font-family:Georgia,serif;font-weight:700;cursor:pointer;letter-spacing:0.5px;box-shadow:0 3px 14px rgba(192,57,43,0.3);transition:all 0.2s;}
        .btn-s:hover{background:linear-gradient(135deg,#a93226,#c0392b);transform:translateY(-1px);box-shadow:0 6px 20px rgba(192,57,43,0.4);}
        .btn-r{background:#fff;color:#c0392b;border:1.5px solid #c0392b;padding:11px 28px;border-radius:7px;font-size:14px;font-family:Georgia,serif;font-weight:600;cursor:pointer;transition:all 0.2s;}
        .btn-r:hover{background:#fdf0ef;}
        .rtable{width:100%;border-collapse:collapse;font-family:Georgia,serif;font-size:13px;}
        .rtable thead tr{background:linear-gradient(135deg,#b03020,#c0392b,#e74c3c);}
        .rtable th{color:#fff;padding:12px 14px;text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase;border:none;white-space:nowrap;}
        .rtable th:first-child{border-radius:8px 0 0 0;}
        .rtable th:last-child{border-radius:0 8px 0 0;}
        .rtable td{padding:11px 14px;border-bottom:1px solid #f5e8e8;vertical-align:middle;color:#333;}
        .rtable tr:nth-child(even) td{background:#fffafa;}
        .rtable tr:nth-child(odd)  td{background:#fff;}
        .rtable tbody tr:hover td{background:#fdecea;transition:background 0.15s;}
        .thumb{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2.5px solid #e74c3c;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;display:block;}
        .thumb:hover{transform:scale(1.14);box-shadow:0 4px 16px rgba(192,57,43,0.4);}
        .regbadge{background:#fdecea;color:#c0392b;padding:3px 9px;border-radius:4px;font-size:12px;font-weight:700;}
        .gbadge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(7px);z-index:999;display:flex;align-items:center;justify-content:center;padding:16px;}
        .modal{background:#fff;border-radius:18px;padding:30px 26px;text-align:center;max-width:300px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.28);animation:popIn 0.22s ease;}
        @keyframes popIn{from{transform:scale(0.88);opacity:0}to{transform:scale(1);opacity:1}}
        .modal img{width:130px;height:130px;border-radius:50%;object-fit:cover;border:3px solid #c0392b;margin-bottom:14px;box-shadow:0 6px 20px rgba(192,57,43,0.25);}
        .modal-name{font-family:'Merriweather',serif;font-size:18px;color:#1a1a1a;margin-bottom:4px;font-weight:700;}
        .modal-sub{font-size:13px;color:#999;font-family:Georgia,serif;margin-bottom:14px;}
        .btn-close{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border:none;padding:9px 28px;border-radius:7px;cursor:pointer;font-size:13px;font-family:Georgia,serif;font-weight:700;}
        .no-res{text-align:center;padding:52px 20px;color:#ccc;}
        .twrap{overflow-x:auto;border-radius:8px;box-shadow:0 2px 18px rgba(192,57,43,0.1);}
        .divider{width:4px;height:22px;background:linear-gradient(#c0392b,#e74c3c);border-radius:2px;flex-shrink:0;}
        @media(max-width:880px){.fg{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:540px){.fg{grid-template-columns:1fr;}.fg2{grid-template-columns:1fr;}.btn-row button{width:100%;}.rtable th,.rtable td{padding:8px 9px;font-size:11.5px;}.thumb{width:38px;height:38px;}}
      `}</style>

      <div style={{ minHeight:"100vh", background:"linear-gradient(150deg,#fff8f8 0%,#fff 55%,#fdf0f0 100%)", padding:"28px 14px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign:"center", marginBottom:34 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(192,57,43,0.06)", border:"1.5px solid rgba(192,57,43,0.18)", borderRadius:50, padding:"6px 22px", marginBottom:18 }}>
              <span>💍</span>
              <span style={{ fontSize:11, color:"#c0392b", letterSpacing:2, fontWeight:700, textTransform:"uppercase", fontFamily:"Georgia,serif" }}>Matrimony Portal</span>
            </div>
            <h1 style={{ fontFamily:"'Merriweather',serif", fontSize:"clamp(24px,5vw,38px)", fontWeight:900, color:"#1a1a1a", margin:"0 0 10px", lineHeight:1.15 }}>
              Find Your <span style={{ color:"#c0392b" }}>Perfect Match</span>
            </h1>
            <p style={{ color:"#aaa", fontSize:14, fontFamily:"'Lora',serif", fontStyle:"italic" }}>Search from thousands of verified profiles across India</p>
          </div>

          {/* ── FILTER CARD ── */}
          <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 4px 32px rgba(192,57,43,0.1)", border:"1px solid rgba(192,57,43,0.12)", padding:"26px 24px", marginBottom:26 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22, paddingBottom:14, borderBottom:"2px solid #fdecea" }}>
              <div className="divider"/>
              <h2 style={{ margin:0, fontSize:15, color:"#c0392b", fontFamily:"'Merriweather',serif", fontWeight:700 }}>🔍 Search Filters</h2>
            </div>

            <div className="fg">
              <div>
                <label style={S.lbl}>Gender</label>
                <select value={filters.gender} onChange={e=>set("gender",e.target.value)} style={S.sel}>
                  {GENDERS.map(g=><option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>Language</label>
                <select value={filters.language} onChange={e=>set("language",e.target.value)} style={S.sel}>
                  {LANGUAGES.map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>Caste</label>
                <select value={filters.caste} onChange={e=>set("caste",e.target.value)} style={S.sel}>
                  {CASTES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>Sub Caste</label>
                <select value={filters.subCaste} onChange={e=>set("subCaste",e.target.value)} style={S.sel}>
                  {SUB_CASTES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>Sort by ID</label>
                <select value={filters.sortId} onChange={e=>set("sortId",e.target.value)} style={S.sel}>
                  <option value="asc">Ascending ↑</option>
                  <option value="desc">Descending ↓</option>
                </select>
              </div>
              <div>
                <label style={S.lbl}>Age Range</label>
                <div className="age-pair">
                  <input type="number" min={18} max={80} value={filters.ageFrom} onChange={e=>set("ageFrom",e.target.value)} placeholder="From" style={S.num}/>
                  <span>–</span>
                  <input type="number" min={18} max={80} value={filters.ageTo}   onChange={e=>set("ageTo",  e.target.value)} placeholder="To"   style={S.num}/>
                </div>
              </div>
              <div style={{ gridColumn:"span 2" }}>
                <label style={S.lbl}>Marital Status</label>
                <div className="marital-pills">
                  {MARITAL_OPTIONS.map(m => {
                    const active = filters.marital === m;
                    return (
                      <div key={m} className="m-pill"
                        onClick={()=>set("marital",m)}
                        style={{ background:active?"#c0392b":"#fff", color:active?"#fff":"#555", border:`1.5px solid ${active?"#c0392b":"#ddd"}`, boxShadow:active?"0 2px 10px rgba(192,57,43,0.25)":"none" }}>
                        <span style={{ width:13, height:13, borderRadius:"50%", border:`2px solid ${active?"#fff":"#c0392b"}`, background:active?"#fff":"transparent", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          {active && <span style={{ width:6, height:6, borderRadius:"50%", background:"#c0392b", display:"block" }}/>}
                        </span>
                        {m}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-s" onClick={()=>setApplied({...filters})}>🔍 Search Profiles</button>
              <button className="btn-r" onClick={()=>{ setFilters(INIT); setApplied(INIT); }}>↺ Reset Filters</button>
            </div>
          </div>

          {/* ── RESULTS ── */}
          <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 4px 32px rgba(192,57,43,0.1)", border:"1px solid rgba(192,57,43,0.12)", padding:"22px 22px 26px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:18, paddingBottom:14, borderBottom:"2px solid #fdecea" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div className="divider"/>
                <h2 style={{ margin:0, fontSize:15, color:"#c0392b", fontFamily:"'Merriweather',serif", fontWeight:700 }}>📋 Results</h2>
              </div>
              <div style={{ fontSize:13, color:"#999", fontFamily:"Georgia,serif" }}>
                Showing&nbsp;<strong style={{ color:"#c0392b" }}>{results.length}</strong>&nbsp;of&nbsp;<strong style={{ color:"#c0392b" }}>{DUMMY.length}</strong>&nbsp;profiles
              </div>
            </div>

            {results.length === 0
              ? <div className="no-res">
                  <div style={{ fontSize:50, marginBottom:14 }}>🔎</div>
                  <div style={{ fontSize:16, color:"#bbb", marginBottom:6, fontFamily:"Georgia,serif" }}>No profiles match your criteria</div>
                  <div style={{ fontSize:13, color:"#ddd", fontFamily:"Georgia,serif" }}>Adjust the filters above and try again</div>
                </div>
              : <div className="twrap">
                  <table className="rtable">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Reg ID</th>
                        <th>Name</th>
                        <th>Caste</th>
                        <th>Sub Caste</th>
                        <th>Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => {
                        const [bg, fg] = maritalColor(r.marital);
                        return (
                          <tr key={r.id}>
                            <td style={{ color:"#bbb", fontWeight:600, fontSize:12 }}>{i+1}</td>
                            <td><span className="regbadge">{r.regId}</span></td>
                            <td>
                              <div style={{ fontWeight:700, color:"#1a1a1a", marginBottom:3 }}>{r.name}</div>
                              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                                <span className="gbadge" style={{ background:r.gender==="Male"?"#e8f4fd":"#fde8f0", color:r.gender==="Male"?"#1a6ea8":"#c0392b" }}>{r.gender}</span>
                                <span className="gbadge" style={{ background:"#f5f5f5", color:"#666" }}>{r.age} yrs</span>
                                <span className="gbadge" style={{ background:bg, color:fg }}>{r.marital}</span>
                              </div>
                            </td>
                            <td style={{ color:"#444", fontWeight:500 }}>{r.caste}</td>
                            <td style={{ color:"#888", fontSize:12 }}>{r.subCaste}</td>
                            <td>
                              <img src={r.photo} alt={r.name} className="thumb" onClick={()=>setPreview(r)}
                                onError={e=>{ e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=e74c3c&color=fff&size=80`; }}/>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
            }
          </div>

          <p style={{ textAlign:"center", color:"#ddd", fontSize:12, marginTop:18, fontFamily:"Georgia,serif" }}>Dummy data shown for demonstration purposes only</p>
        </div>
      </div>

      {/* ── PHOTO MODAL ── */}
      {preview && (
        <div className="overlay" onClick={()=>setPreview(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <img src={preview.photo} alt={preview.name}
              onError={e=>{ e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(preview.name)}&background=e74c3c&color=fff&size=130`; }}/>
            <div className="modal-name">{preview.name}</div>
            <div className="modal-sub">{preview.regId} · {preview.age} yrs · {preview.gender} · {preview.language}</div>
            <div style={{ marginBottom:8 }}>
              <span style={{ background:"#fdecea", color:"#c0392b", padding:"3px 12px", borderRadius:20, fontSize:12, fontWeight:700, fontFamily:"Georgia,serif" }}>{preview.caste}</span>
            </div>
            <div style={{ marginBottom:16 }}>
              {(() => { const [bg,fg] = maritalColor(preview.marital); return <span style={{ background:bg, color:fg, padding:"3px 12px", borderRadius:20, fontSize:12, fontWeight:700, fontFamily:"Georgia,serif" }}>{preview.marital}</span>; })()}
            </div>
            <button className="btn-close" onClick={()=>setPreview(null)}>✕ Close</button>
          </div>
        </div>
      )}
    </>
  );
}
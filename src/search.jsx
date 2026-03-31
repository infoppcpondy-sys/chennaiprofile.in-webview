import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CASTES    = ["Any","Brahmin","Kshatriya","Vellalar","Nadar","Mudaliar","Pillai","Gounder","Naicker","Chettiar","Vishwakarma","Yadav","Vanniyar","Thevar","Agamudayar","Others"];
const LANGUAGES = ["Any","Tamil","Telugu","Malayalam","Kannada","Hindi","Bengali","Marathi"];
const MARITAL_OPTIONS = ["Any","Single","Widow","Divorce","Awaiting Divorce"];
const GENDERS = ["Male","Female"];

const DUMMY = [
  { id:1,  regId:"MAT1001", name:"Aravind Kumar",    caste:"Brahmin",     gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:27, photo:"https://i.pravatar.cc/80?img=11" },
  { id:2,  regId:"MAT1002", name:"Priya Devi",        caste:"Vellalar",    gender:"Female", language:"Tamil",     marital:"Unmarried",      age:24, photo:"https://i.pravatar.cc/80?img=47" },
  { id:3,  regId:"MAT1003", name:"Karthik Raja",      caste:"Gounder",     gender:"Male",   language:"Tamil",     marital:"Divorce",        age:31, photo:"https://i.pravatar.cc/80?img=15" },
  { id:4,  regId:"MAT1004", name:"Meena Lakshmi",     caste:"Nadar",       gender:"Female", language:"Tamil",     marital:"Widow/Widower",  age:29, photo:"https://i.pravatar.cc/80?img=49" },
  { id:5,  regId:"MAT1005", name:"Venkatesh Raman",   caste:"Pillai",      gender:"Male",   language:"Telugu",    marital:"Unmarried",      age:26, photo:"https://i.pravatar.cc/80?img=13" },
  { id:6,  regId:"MAT1006", name:"Anitha Selvam",     caste:"Mudaliar",    gender:"Female", language:"Tamil",     marital:"Awaiting Divorce",age:33,photo:"https://i.pravatar.cc/80?img=44" },
  { id:7,  regId:"MAT1007", name:"Suresh Balaji",     caste:"Vishwakarma", gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:28, photo:"https://i.pravatar.cc/80?img=17" },
  { id:8,  regId:"MAT1008", name:"Kavitha Nair",      caste:"Others",      gender:"Female", language:"Malayalam", marital:"Unmarried",      age:25, photo:"https://i.pravatar.cc/80?img=48" },
  { id:9,  regId:"MAT1009", name:"Dinesh Kannan",     caste:"Chettiar",    gender:"Male",   language:"Tamil",     marital:"Divorce",        age:35, photo:"https://i.pravatar.cc/80?img=19" },
  { id:10, regId:"MAT1010", name:"Saranya Priya",     caste:"Brahmin",     gender:"Female", language:"Tamil",     marital:"Unmarried",      age:23, photo:"https://i.pravatar.cc/80?img=46" },
  { id:11, regId:"MAT1011", name:"Manikandan S",      caste:"Thevar",      gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:30, photo:"https://i.pravatar.cc/80?img=12" },
  { id:12, regId:"MAT1012", name:"Deepa Sundaram",    caste:"Naicker",     gender:"Female", language:"Telugu",    marital:"Widow/Widower",  age:32, photo:"https://i.pravatar.cc/80?img=45" },
  { id:13, regId:"MAT1013", name:"Rajesh Pandian",    caste:"Agamudayar",  gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:29, photo:"https://i.pravatar.cc/80?img=14" },
  { id:14, regId:"MAT1014", name:"Lakshmi Priya",     caste:"Vellalar",    gender:"Female", language:"Tamil",     marital:"Unmarried",      age:26, photo:"https://i.pravatar.cc/80?img=43" },
  { id:15, regId:"MAT1015", name:"Balamurugan K",     caste:"Yadav",       gender:"Male",   language:"Tamil",     marital:"Unmarried",      age:27, photo:"https://i.pravatar.cc/80?img=16" },
];

const INIT = { gender:"Female", language:"Any", caste:"Any", sortId:"asc", ageFrom:"", ageTo:"", marital:"Any" };

export default function MatrimonySearch() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filters, setFilters] = useState(INIT);
  const [applied, setApplied] = useState(INIT);
  const [preview, setPreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("card");
  const itemsPerPage = 10;

  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const results = useMemo(() => {
    let d = [...DUMMY];
    if (applied.gender   !== "Any") d = d.filter(r => r.gender   === applied.gender);
    if (applied.language !== "Any") d = d.filter(r => r.language === applied.language);
    if (applied.caste    !== "Any") d = d.filter(r => r.caste    === applied.caste);
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
        .fg{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
        .age-pair{display:flex;gap:8px;align-items:center;}
        .age-pair span{color:#c0392b;font-size:16px;flex-shrink:0;font-weight:700;}
        .btn-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px;}
        .btn-s{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border:none;padding:11px 32px;border-radius:7px;font-size:14px;font-family:Georgia,serif;font-weight:700;cursor:pointer;letter-spacing:0.5px;box-shadow:0 3px 14px rgba(192,57,43,0.3);transition:all 0.2s;}
        .btn-s:hover{background:linear-gradient(135deg,#a93226,#c0392b);transform:translateY(-1px);}
        .btn-r{background:#fff;color:#c0392b;border:1.5px solid #c0392b;padding:11px 28px;border-radius:7px;font-size:14px;font-family:Georgia,serif;font-weight:600;cursor:pointer;transition:all 0.2s;}
        .btn-r:hover{background:#fdf0ef;}
        .rtable{width:100%;border-collapse:collapse;font-family:Georgia,serif;font-size:13px;}
        .rtable thead tr{background:linear-gradient(135deg,#b03020,#c0392b,#e74c3c);}
        .rtable th{color:#fff;padding:12px 14px;text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase;border:none;white-space:nowrap;}
        .rtable th:first-child{border-radius:8px 0 0 0;} .rtable th:last-child{border-radius:0 8px 0 0;}
        .rtable td{padding:11px 14px;border-bottom:1px solid #f5e8e8;vertical-align:middle;color:#333;}
        .rtable tr:nth-child(even) td{background:#fffafa;} .rtable tr:nth-child(odd) td{background:#fff;}
        .rtable tbody tr{cursor:pointer;transition:background-color 0.15s ease;}
        .rtable tbody tr:hover td{background:#fdecea;}
        .thumb{width:120px;height:120px;border-radius:8px;object-fit:cover;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;display:block;}
        .thumb:hover{transform:scale(1.14);box-shadow:0 4px 16px rgba(192,57,43,0.4);}
        .regbadge{background:#fdecea;color:#c0392b;padding:3px 9px;border-radius:4px;font-size:12px;font-weight:700;}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(7px);z-index:999;display:flex;align-items:center;justify-content:center;padding:16px;}
        .modal{background:#fff;border-radius:18px;padding:30px 26px;text-align:center;max-width:300px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.28);animation:popIn 0.22s ease;}
        @keyframes popIn{from{transform:scale(0.88);opacity:0}to{transform:scale(1);opacity:1}}
        .modal img{width:130px;height:130px;border-radius:50%;object-fit:cover;border:3px solid #c0392b;margin-bottom:14px;}
        .modal-name{font-family:'Merriweather',serif;font-size:18px;color:#1a1a1a;margin-bottom:4px;font-weight:700;}
        .modal-sub{font-size:13px;color:#999;font-family:Georgia,serif;margin-bottom:14px;}
        .btn-close{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border:none;padding:9px 28px;border-radius:7px;cursor:pointer;font-size:13px;font-family:Georgia,serif;font-weight:700;}
        .no-res{text-align:center;padding:52px 20px;color:#ccc;}
        .twrap{overflow-x:auto;border-radius:8px;box-shadow:0 2px 18px rgba(192,57,43,0.1);}
        .divider{width:4px;height:22px;background:linear-gradient(#c0392b,#e74c3c);border-radius:2px;flex-shrink:0;}
        .card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-bottom:30px;}
        .profile-card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(192,57,43,0.1);border:1px solid rgba(192,57,43,0.12);transition:all 0.3s ease;cursor:pointer;display:flex;flex-direction:column;}
        .profile-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(192,57,43,0.2);}
        .card-photo{width:100%;height:240px;object-fit:cover;background:linear-gradient(135deg,#fdecea,#fff);}
        .card-content{padding:16px 14px;flex:1;display:flex;flex-direction:column;}
        .card-name{font-family:'Merriweather',serif;font-size:16px;font-weight:700;color:#1a1a1a;margin-bottom:4px;}
        .card-regid{font-size:11px;color:#999;font-family:Georgia,serif;margin-bottom:10px;}
        .card-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
        .card-badge{display:inline-block;padding:4px 10px;border-radius:16px;font-size:11px;font-weight:600;font-family:Georgia,serif;}
        .card-info{display:flex;flex-direction:column;gap:6px;margin-bottom:12px;flex:1;}
        .card-info-row{font-size:12px;color:#666;font-family:Georgia,serif;}
        .card-info-label{font-weight:700;color:#c0392b;display:inline;}
        .card-actions{display:flex;gap:8px;padding-top:10px;border-top:1px solid #f0f0f0;}
        .card-btn{flex:1;padding:8px 12px;border-radius:6px;border:none;font-size:12px;font-family:Georgia,serif;font-weight:600;cursor:pointer;transition:all 0.2s;}
        .card-btn-primary{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;}
        .card-btn-primary:hover{background:linear-gradient(135deg,#a93226,#c0392b);}
        .pagination{display:flex;justify-content:center;align-items:center;gap:12px;margin-top:20px;}
        .pagination-btn{padding:8px 16px;border-radius:6px;border:1.5px solid #e0c8c8;background:#fff;color:#c0392b;font-family:Georgia,serif;font-weight:600;cursor:pointer;transition:all 0.2s;}
        .pagination-btn:hover:not(:disabled){background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;}
        .pagination-btn:disabled{opacity:0.5;cursor:not-allowed;}
        .pagination-info{font-size:13px;color:#999;font-family:Georgia,serif;}
        @media(max-width:880px){.fg{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:768px){.fg{grid-template-columns:1fr;}.card-grid{grid-template-columns:repeat(2,1fr);gap:14px;}.card-photo{height:180px;}}
        @media(max-width:480px){.card-grid{grid-template-columns:1fr;}.rtable th,.rtable td{padding:6px 4px;font-size:10px;}.thumb{width:70px;height:70px;}}
      `}</style>

      <div style={{ minHeight:"100vh", background:"linear-gradient(150deg,#fff8f8 0%,#fff 55%,#fdf0f0 100%)", padding:"28px 14px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>

          {/* ── FILTER CARD ── */}
          <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 4px 32px rgba(192,57,43,0.1)", border:"1px solid rgba(192,57,43,0.12)", padding:"26px 24px", marginBottom:26 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22, paddingBottom:14, borderBottom:"2px solid #fdecea" }}>
              <div className="divider"/>
              <h2 style={{ margin:0, fontSize:15, color:"#c0392b", fontFamily:"'Merriweather',serif", fontWeight:700 }}>{t("search.filterTitle")}</h2>
            </div>

            <div className="fg">
              <div>
                <label style={S.lbl}>{t("search.gender")}</label>
                <select value={filters.gender} onChange={e => set("gender", e.target.value)} style={S.sel}>
                  {GENDERS.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>{t("search.language")}</label>
                <select value={filters.language} onChange={e => set("language", e.target.value)} style={S.sel}>
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>{t("search.caste")}</label>
                <select value={filters.caste} onChange={e => set("caste", e.target.value)} style={S.sel}>
                  {CASTES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={S.lbl}>{t("search.ageRange")}</label>
                <div className="age-pair">
                  <input type="number" min={18} max={80} value={filters.ageFrom} onChange={e => set("ageFrom", e.target.value)} placeholder={t("search.ageFrom")} style={S.num}/>
                  <span>–</span>
                  <input type="number" min={18} max={80} value={filters.ageTo}   onChange={e => set("ageTo",   e.target.value)} placeholder={t("search.ageTo")}   style={S.num}/>
                </div>
              </div>
              <div>
                <label style={S.lbl}>{t("search.maritalStatus")}</label>
                <select value={filters.marital} onChange={e => set("marital", e.target.value)} style={S.sel}>
                  {MARITAL_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-s" onClick={() => { setApplied({ ...filters }); setCurrentPage(1); }}>{t("search.searchBtn")}</button>
              <button className="btn-r" onClick={() => { setFilters(INIT); setApplied(INIT); setCurrentPage(1); }}>{t("search.resetBtn")}</button>
            </div>
          </div>

          {/* ── RESULTS ── */}
          <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 4px 32px rgba(192,57,43,0.1)", border:"1px solid rgba(192,57,43,0.12)", padding:"22px 22px 26px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:18, paddingBottom:14, borderBottom:"2px solid #fdecea" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div className="divider"/>
                <h2 style={{ margin:0, fontSize:15, color:"#c0392b", fontFamily:"'Merriweather',serif", fontWeight:700 }}>{t("search.resultsTitle")}</h2>
              </div>
              <div style={{ minWidth:120 }}>
                <select value={filters.sortId} onChange={e => set("sortId", e.target.value)} style={{ ...S.sel, fontSize:12, padding:"7px 28px 7px 10px" }}>
                  <option value="asc">{t("search.sortAsc")}</option>
                  <option value="desc">{t("search.sortDesc")}</option>
                </select>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {["card","table"].map(mode => (
                  <button key={mode} className="btn-r" onClick={() => setViewMode(mode)}
                    style={{ background:viewMode===mode?"#c0392b":"#fff", color:viewMode===mode?"#fff":"#c0392b", border:"1.5px solid #c0392b", padding:"8px 14px", fontSize:"12px" }}>
                    {t(`search.${mode}View`)}
                  </button>
                ))}
              </div>
              <div style={{ fontSize:13, color:"#999", fontFamily:"Georgia,serif" }}>
                {t("search.showing")}&nbsp;<strong style={{ color:"#c0392b" }}>{Math.min(itemsPerPage, results.length - (currentPage-1)*itemsPerPage)}</strong>&nbsp;{t("search.of")}&nbsp;<strong style={{ color:"#c0392b" }}>{results.length}</strong>&nbsp;{t("search.profiles")}
              </div>
            </div>

            {results.length === 0 ? (
              <div className="no-res">
                <div style={{ fontSize:50, marginBottom:14 }}>🔎</div>
                <div style={{ fontSize:16, color:"#bbb", marginBottom:6, fontFamily:"Georgia,serif" }}>{t("search.noResults")}</div>
                <div style={{ fontSize:13, color:"#ddd", fontFamily:"Georgia,serif" }}>{t("search.noResultsSub")}</div>
              </div>
            ) : (() => {
              const totalPages = Math.ceil(results.length / itemsPerPage);
              const startIdx = (currentPage-1)*itemsPerPage;
              const paginatedResults = results.slice(startIdx, startIdx+itemsPerPage);

              return (
                <>
                  {viewMode === "card" ? (
                    <div className="card-grid">
                      {paginatedResults.map(r => {
                        const [bg, fg] = maritalColor(r.marital);
                        return (
                          <div key={r.id} className="profile-card" onClick={() => navigate(`/detail/${r.id}`, { state:{ profile:r } })}>
                            <img src={r.photo} alt={r.name} className="card-photo"
                              onError={e => { e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=c0392b&color=fff&size=280`; }}/>
                            <div className="card-content">
                              <div className="card-name">{r.name}</div>
                              <div className="card-regid">{r.regId}</div>
                              <div className="card-badges">
                                <span className="card-badge" style={{ background:r.gender==="Male"?"#e8f4fd":"#fde8f0", color:r.gender==="Male"?"#1a6ea8":"#c0392b" }}>{r.gender}</span>
                                <span className="card-badge" style={{ background:"#f5f5f5", color:"#666" }}>{r.age} {t("detail.yrs")}</span>
                                <span className="card-badge" style={{ background:bg, color:fg }}>{r.marital}</span>
                              </div>
                              <div className="card-info">
                                <div className="card-info-row"><span className="card-info-label">{t("search.casteLabel")}:</span> {r.caste}</div>
                                <div className="card-info-row"><span className="card-info-label">{t("search.languageLabel")}:</span> {r.language}</div>
                              </div>
                              <div className="card-actions">
                                <button className="card-btn card-btn-primary">{t("search.moreDetails")}</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="twrap">
                      <table className="rtable">
                        <thead>
                          <tr>
                            <th>{t("search.photoAlt")}</th>
                            <th>{t("search.name")}</th>
                            <th>{t("search.details")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedResults.map(r => {
                            const [bg, fg] = maritalColor(r.marital);
                            return (
                              <tr key={r.id} onClick={() => navigate(`/detail/${r.id}`, { state:{ profile:r } })}>
                                <td style={{ textAlign:"center" }}>
                                  <img src={r.photo} alt={r.name} className="thumb" onClick={e => { e.stopPropagation(); setPreview(r); }}
                                    onError={e => { e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=e74c3c&color=fff&size=80`; }}/>
                                </td>
                                <td>
                                  <div><span className="regbadge">{r.regId}</span></div>
                                  <div style={{ fontWeight:700, color:"#1a1a1a", marginTop:"4px" }}>{r.name}</div>
                                </td>
                                <td style={{ fontSize:"12px", color:"#666" }}>
                                  <div style={{ marginBottom:"6px" }}><strong style={{ color:"#c0392b" }}>{t("search.age")}:</strong> {r.age}</div>
                                  <div style={{ marginBottom:"6px" }}><strong style={{ color:"#c0392b" }}>{t("search.genderLabel")}:</strong> {r.gender}</div>
                                  <div style={{ marginBottom:"6px" }}><strong style={{ color:"#c0392b" }}>{t("search.casteLabel")}:</strong> {r.caste}</div>
                                  <div style={{ marginBottom:"6px" }}><strong style={{ color:"#c0392b" }}>{t("search.languageLabel")}:</strong> {r.language}</div>
                                  <div style={{ marginBottom:"6px" }}><strong style={{ color:"#c0392b" }}>{t("search.maritalLabel")}:</strong> {r.marital}</div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage===1}>{t("search.prevPage")}</button>
                      <span className="pagination-info">{t("search.page")} <strong>{currentPage}</strong> / <strong>{totalPages}</strong></span>
                      <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} disabled={currentPage===totalPages}>{t("search.nextPage")}</button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          <p style={{ textAlign:"center", color:"#ddd", fontSize:12, marginTop:18, fontFamily:"Georgia,serif" }}>{t("search.dummyNote")}</p>
        </div>
      </div>

      {/* ── PHOTO MODAL ── */}
      {preview && (
        <div className="overlay" onClick={() => setPreview(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <img src={preview.photo} alt={preview.name}
              onError={e => { e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(preview.name)}&background=e74c3c&color=fff&size=130`; }}/>
            <div className="modal-name">{preview.name}</div>
            <div className="modal-sub">{preview.regId} · {preview.age} {t("detail.yrs")} · {preview.gender} · {preview.language}</div>
            <div style={{ marginBottom:8 }}>
              <span style={{ background:"#fdecea", color:"#c0392b", padding:"3px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>{preview.caste}</span>
            </div>
            <div style={{ marginBottom:16 }}>
              {(() => { const [bg,fg]=maritalColor(preview.marital); return <span style={{ background:bg, color:fg, padding:"3px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>{preview.marital}</span>; })()}
            </div>
            <button className="btn-close" onClick={() => setPreview(null)}>✕ Close</button>
          </div>
        </div>
      )}
    </>
  );
}
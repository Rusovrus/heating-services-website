import { useState, useEffect, useRef } from "react";
import Head from "next/head";

var C = {
  navy: "#0a1628", blue: "#1a3a5c", blueL: "#2a5a8c", acc: "#e8913a",
  accL: "#f0a855", w: "#ffffff", g: "#f4f6f8",
  txt: "#1a2332", txtL: "#5a6a7a", grn: "#25D366",
};
var Dk = {
  navy: "#060d18", blue: "#0f2440", blueL: "#1a3a5c", acc: "#e8913a",
  accL: "#f0a855", w: "#0d1520", g: "#111c2a",
  txt: "#e0e8f0", txtL: "#8a9bb0", grn: "#25D366",
};

function useReveal() {
  var ref = useRef(null);
  var _s = useState(false), v = _s[0], sv = _s[1];
  useEffect(function () {
    var el = ref.current; if (!el) return;
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { sv(true); o.unobserve(e.target); } }); }, { threshold: 0.1 });
    o.observe(el);
    return function () { o.disconnect(); };
  }, []);
  return { ref: ref, style: { opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" } };
}
function Reveal(p) { var r = useReveal(); return <div ref={r.ref} style={Object.assign({}, r.style, p.style || {})}>{p.children}</div>; }

function useCounter(end, dur) {
  var _s = useState(0), val = _s[0], setVal = _s[1];
  var ref = useRef(null); var started = useRef(false);
  useEffect(function () {
    var el = ref.current; if (!el) return;
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !started.current) { started.current = true; var s = Date.now(); var num = parseInt(end) || 0; function tick() { var p = Math.min((Date.now() - s) / (dur || 1500), 1); setVal(Math.floor(p * num)); if (p < 1) requestAnimationFrame(tick); } tick(); o.unobserve(e.target); } }); }, { threshold: 0.3 });
    o.observe(el); return function () { o.disconnect(); };
  }, []);
  return { ref: ref, val: val };
}

function Logo(p) {
  var s = p.size || 48;
  return (<svg width={s * 3.2} height={s} viewBox="0 0 320 100" fill="none"><rect x="2" y="10" width="80" height="80" rx="12" fill={p.light ? "rgba(255,255,255,0.1)" : "#0a1628"} stroke="#e8913a" strokeWidth="2.5" /><path d="M42 28c0 0-16 14-16 30c0 12 8 20 16 22c-4-6-4-14 2-22c-2 8 2 16 8 20c2-4 4-10 4-16c4 6 4 14 0 18c8-2 16-10 16-22c0-16-16-30-16-30c0 0-4 8-8 8s-6-8-6-8z" fill="#e8913a" /><path d="M42 40c0 0-8 8-8 18c0 6 4 12 8 14c-2-4-1-10 2-14c0 6 2 10 4 12c1-2 2-6 2-10c2 4 3 8 1 12c4-2 8-6 8-14c0-10-8-18-8-18c0 0-2 4-4 4s-5-4-5-4z" fill="#f7c97e" /><circle cx="26" cy="74" r="5" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.5" /><line x1="30" y1="78" x2="36" y2="84" stroke="#fff" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" /><text x="96" y="52" fontFamily="'Segoe UI',Arial" fontSize="36" fontWeight="800" letterSpacing="2" fill="#fff">HEATING</text><text x="96" y="78" fontFamily="'Segoe UI',Arial" fontSize="18" fontWeight="600" letterSpacing="6" fill="#e8913a">SERVICES</text><rect x="96" y="84" width="190" height="2.5" rx="1" fill="#e8913a" opacity="0.4" /></svg>);
}

function IllSanitar(){return(<svg viewBox="0 0 400 220" style={{width:"100%",height:"100%"}}><defs><linearGradient id="gs1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1a3a5c"/><stop offset="100%" stopColor="#2a5a8c"/></linearGradient></defs><rect width="400" height="220" fill="url(#gs1)"/><rect x="40" y="80" width="120" height="16" rx="8" fill="#4a90c4" opacity="0.7"/><rect x="40" y="120" width="180" height="16" rx="8" fill="#4a90c4" opacity="0.5"/><rect x="140" y="60" width="16" height="80" rx="8" fill="#4a90c4" opacity="0.6"/><circle cx="148" cy="88" r="14" fill="#e8913a" opacity="0.9"/><rect x="142" y="74" width="12" height="8" rx="2" fill="#fff" opacity="0.6"/><path d="M320 140c0 0-12 16-12 24c0 7 5.4 12 12 12s12-5 12-12c0-8-12-24-12-24z" fill="#60a5fa" opacity="0.5"/><path d="M340 100c0 0-6 8-6 12c0 3.5 2.7 6 6 6s6-2.5 6-6c0-4-6-12-6-12z" fill="#60a5fa" opacity="0.3"/><rect x="50" y="150" width="60" height="8" rx="4" fill="#fff" opacity="0.2"/><rect x="70" y="140" width="20" height="20" rx="4" fill="#fff" opacity="0.15"/></svg>);}
function IllTermic(){return(<svg viewBox="0 0 400 220" style={{width:"100%",height:"100%"}}><defs><linearGradient id="gt1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1a3a5c"/><stop offset="100%" stopColor="#3a1a0c"/></linearGradient></defs><rect width="400" height="220" fill="url(#gt1)"/><rect x="40" y="60" width="140" height="120" rx="8" fill="#fff" opacity="0.1"/>{[0,1,2,3,4,5].map(function(i){return <rect key={i} x={52+i*22} y="70" width="12" height="100" rx="3" fill="#fff" opacity={0.15+i*0.03}/>;})}<path d="M60 50Q65 40 70 50Q75 60 80 50" stroke="#e8913a" strokeWidth="2" opacity="0.6" fill="none"/><path d="M90 45Q95 35 100 45Q105 55 110 45" stroke="#e8913a" strokeWidth="2" opacity="0.5" fill="none"/><path d="M120 50Q125 40 130 50Q135 60 140 50" stroke="#e8913a" strokeWidth="2" opacity="0.4" fill="none"/><rect x="260" y="50" width="16" height="100" rx="8" fill="#fff" opacity="0.15"/><circle cx="268" cy="155" r="20" fill="#e8913a" opacity="0.6"/><path d="M340 80c0 0-20 18-20 36c0 12 9 18 20 18s20-6 20-18c0-18-20-36-20-36z" fill="#e8913a" opacity="0.4"/></svg>);}
function IllApa(){return(<svg viewBox="0 0 400 220" style={{width:"100%",height:"100%"}}><defs><linearGradient id="ga1" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#0c2d48"/><stop offset="100%" stopColor="#1a5276"/></linearGradient></defs><rect width="400" height="220" fill="url(#ga1)"/><rect x="40" y="40" width="80" height="140" rx="12" fill="#fff" opacity="0.08" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.3"/><rect x="48" y="100" width="64" height="72" rx="4" fill="#60a5fa" opacity="0.2"/><rect x="120" y="70" width="160" height="12" rx="6" fill="#4a90c4" opacity="0.4"/><rect x="120" y="140" width="160" height="12" rx="6" fill="#4a90c4" opacity="0.3"/><circle cx="200" cy="110" r="16" fill="#e8913a" opacity="0.5"/><circle cx="200" cy="110" r="8" fill="#fff" opacity="0.3"/>{[0,1,2,3].map(function(i){return <path key={i} d={"M"+(300+i*20)+" "+(60+i*30)+"c0 0-6 8-6 12c0 3.5 2.7 6 6 6s6-2.5 6-6c0-4-6-12-6-12z"} fill="#60a5fa" opacity={0.2+i*0.1}/>;})}</svg>);}
function IllAC(){return(<svg viewBox="0 0 400 220" style={{width:"100%",height:"100%"}}><defs><linearGradient id="gac" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1a3a5c"/><stop offset="100%" stopColor="#1a4a6c"/></linearGradient></defs><rect width="400" height="220" fill="url(#gac)"/><rect x="80" y="40" width="240" height="70" rx="12" fill="#fff" opacity="0.12" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.15"/>{[0,1,2,3,4,5,6].map(function(i){return <rect key={i} x={110+i*28} y="60" width="16" height="3" rx="1.5" fill="#fff" opacity="0.1"/>;})}<path d="M120 115Q160 135 200 115Q240 95 280 115" stroke="#60a5fa" strokeWidth="2" opacity="0.4" fill="none"/><path d="M130 130Q170 150 210 130Q250 110 290 130" stroke="#60a5fa" strokeWidth="2" opacity="0.3" fill="none"/><path d="M140 145Q180 165 220 145Q260 125 300 145" stroke="#60a5fa" strokeWidth="2" opacity="0.2" fill="none"/><text x="60" y="170" fontSize="28" fill="#60a5fa" opacity="0.3">❄</text><text x="320" y="190" fontSize="22" fill="#60a5fa" opacity="0.2">❄</text><rect x="310" y="160" width="40" height="50" rx="8" fill="#fff" opacity="0.1"/><circle cx="330" cy="175" r="6" fill="#e8913a" opacity="0.5"/><text x="322" y="200" fontSize="10" fill="#fff" opacity="0.3">22°C</text></svg>);}
function IllCentrale(){return(<svg viewBox="0 0 400 220" style={{width:"100%",height:"100%"}}><defs><linearGradient id="gce" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#1a2a3c"/><stop offset="100%" stopColor="#2a3a1c"/></linearGradient></defs><rect width="400" height="220" fill="url(#gce)"/><rect x="120" y="20" width="160" height="180" rx="14" fill="#fff" opacity="0.08" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.12"/><rect x="155" y="45" width="90" height="40" rx="6" fill="#0a1628" opacity="0.6"/><text x="175" y="72" fontSize="18" fontWeight="700" fill="#4ade80" opacity="0.8">60°C</text><circle cx="175" cy="105" r="8" fill="#e8913a" opacity="0.5"/><circle cx="200" cy="105" r="8" fill="#fff" opacity="0.15"/><circle cx="225" cy="105" r="8" fill="#fff" opacity="0.15"/><path d="M200 140c0 0-14 12-14 24c0 8 6.3 12 14 12s14-4 14-12c0-12-14-24-14-24z" fill="#e8913a" opacity="0.35"/><rect x="145" y="200" width="14" height="20" rx="4" fill="#4a90c4" opacity="0.5"/><rect x="175" y="200" width="14" height="20" rx="4" fill="#e8913a" opacity="0.5"/><rect x="210" y="200" width="14" height="20" rx="4" fill="#4a90c4" opacity="0.4"/><rect x="240" y="200" width="14" height="20" rx="4" fill="#e8913a" opacity="0.4"/><rect x="40" y="80" width="80" height="10" rx="5" fill="#4a90c4" opacity="0.3"/><rect x="280" y="120" width="80" height="10" rx="5" fill="#e8913a" opacity="0.3"/></svg>);}
function IllPompe(){return(<svg viewBox="0 0 400 220" style={{width:"100%",height:"100%"}}><defs><linearGradient id="gp1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0c2840"/><stop offset="100%" stopColor="#1a4a2c"/></linearGradient></defs><rect width="400" height="220" fill="url(#gp1)"/><rect x="40" y="50" width="130" height="130" rx="12" fill="#fff" opacity="0.08" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.1"/><circle cx="105" cy="105" r="40" fill="none" stroke="#fff" strokeWidth="2" opacity="0.15"/><circle cx="105" cy="105" r="6" fill="#fff" opacity="0.2"/><path d="M180 105L240 105" stroke="#4ade80" strokeWidth="3" opacity="0.5" strokeDasharray="8 4"/><polygon points="240,98 255,105 240,112" fill="#4ade80" opacity="0.5"/><polygon points="320,80 280,110 360,110" fill="#fff" opacity="0.1"/><rect x="290" y="110" width="60" height="60" rx="4" fill="#fff" opacity="0.08"/><rect x="308" y="130" width="24" height="30" rx="2" fill="#e8913a" opacity="0.2"/><path d="M340 55c0 0-20 5-25 20c5-2 15-3 25-1c0 0 5-15 0-19z" fill="#4ade80" opacity="0.4"/><rect x="260" y="45" width="50" height="22" rx="6" fill="#4ade80" opacity="0.2"/><text x="270" y="60" fontSize="10" fontWeight="700" fill="#4ade80" opacity="0.7">A+++</text></svg>);}
function IllGal(p){var idx=p.i%6;var ills=[IllSanitar,IllTermic,IllApa,IllAC,IllCentrale,IllPompe];var I=ills[idx];return <I/>;}

var SVC=[{t:"Instalații Sanitare",d:"Montaj, reparații țevi, robineți, obiecte sanitare.",I:IllSanitar},{t:"Instalații Termice",d:"Sisteme încălzire, calorifere, distribuție agent termic.",I:IllTermic},{t:"Alimentare cu Apă",d:"Branșamente, conducte, stații pompare, hidrofoare.",I:IllApa},{t:"Aer Condiționat",d:"Montaj, igienizare, service climatizare.",I:IllAC},{t:"Centrale Termice",d:"Instalare, revizie, reparații centrale.",I:IllCentrale},{t:"Pompe de Căldură",d:"Încălzire eficientă cu energie regenerabilă.",I:IllPompe}];
var GAL=["Montaj boiler SunSystem + filtrare","Pompă căldură Ecodan interior","Unitate exterioară Zubadan","Sistem calorifere","Conducte PPR","Revizie + igienizare"];
var STATS=[{n:"500+",l:"Lucrări executate"},{n:"10+",l:"Ani experiență"},{n:"24/7",l:"Disponibilitate"},{n:"100%",l:"Clienți mulțumiți"}];
var STP=[{t:"Ne contactezi",d:"Suni sau trimiți mesaj.",i:"📞"},{t:"Vizită gratuită",d:"Evaluare fără costuri.",i:"🏠"},{t:"Primești oferta",d:"Transparentă, fără surprize.",i:"📋"},{t:"Execuție rapidă",d:"Standarde profesionale.",i:"⚡"},{t:"Garanție",d:"Suport post-execuție.",i:"✅"}];
var TST=[{n:"Andrei M.",l:"Copou",s:5,t:"Au venit în 2 ore și au rezolvat totul impecabil!",sv:"Sanitare"},{n:"Elena P.",l:"Păcurari",s:5,t:"Centrală montată într-o zi. Profesioniști, punctuali.",sv:"Centrale"},{n:"Cosmin D.",l:"CUG",s:5,t:"3 aparate AC montate perfect. Lucrare curată.",sv:"AC"},{n:"Maria L.",l:"Miroslava",s:5,t:"Pompă de căldură excelentă. Economisesc enorm!",sv:"Pompe"},{n:"Radu T.",l:"Nicolina",s:4,t:"Revizie + igienizare AC. Foarte mulțumit.",sv:"Revizie"}];
var BRD=["Viessmann","Bosch","Ariston","Vaillant","Daikin","Buderus","Grundfos","Mitsubishi Electric","SunSystem","Immergas"];
var CRT=["Certificare Viessmann Partner","Certificare Daikin Installer","Certificare Ariston Partner","Certificare Immergas Installer","Garanție extinsă producător"];
var PRJ=[{t:"Pompă căldură — Vila Miroslava",p:"Centrală gaz veche",s:"Pompă aer-apă 12kW",r:"-60% costuri",tg:"Pompe"},{t:"Renovare instalații — Copou",p:"Țevi vechi, pierderi presiune",s:"PPR complet",r:"Garanție 5 ani",tg:"Sanitare"},{t:"Centrală + calorifere — Bucium",p:"Casă nouă, fără încălzire",s:"Viessmann 24kW + smart",r:"Control telefon",tg:"Centrale"},{t:"Climatizare 120mp — Centru",p:"Temperaturi extreme vara",s:"3x Daikin inverter",r:"-40% consum",tg:"AC"}];
var FQ=[{q:"În cât timp ajungeți la urgențe?",a:"1-2 ore în Iași. Disponibili 24/7."},{q:"Oferiți garanție?",a:"Da, 1-5 ani în funcție de lucrare."},{q:"Ce zone acoperiți?",a:"Iași + tot județul."},{q:"Ce branduri montați?",a:"Viessmann, Bosch, Ariston, Vaillant, Buderus etc."},{q:"Cât costă evaluarea?",a:"Complet gratuită."},{q:"Lucrați în weekend?",a:"Da, cu programare. Urgențe non-stop."}];
var BLG=[{t:"Cum știi că centrala are probleme?",e:"Zgomote, consum crescut, apă caldă insuficientă.",i:"🔥",tg:"Centrale"},{t:"Când să schimbi țevăria",e:"Semnele și opțiunile moderne.",i:"💧",tg:"Sanitare"},{t:"Pompă căldură vs. Centrală gaz",e:"Comparație costuri, consum 2026.",i:"♨️",tg:"Încălzire"},{t:"5 greșeli montaj AC",e:"Eficiență redusă cu 30%.",i:"❄️",tg:"AC"}];
var CLC=[{n:"Montaj centrală",mn:1500,mx:3500},{n:"Montaj AC",mn:800,mx:1500},{n:"Sanitare (per mp)",mn:80,mx:150},{n:"Pompă căldură",mn:8000,mx:18000},{n:"Calorifere (per buc)",mn:250,mx:500},{n:"Revizie centrală",mn:200,mx:400}];
var CMP=[{f:"Centrală pe gaz",cost:"200-400 lei/lună",inv:"3.000-6.000 lei",dur:"15 ani",eco:"Medie"},{f:"Pompă de căldură",cost:"80-160 lei/lună",inv:"12.000-22.000 lei",dur:"20+ ani",eco:"Excelentă"},{f:"Centrală electrică",cost:"400-800 lei/lună",inv:"2.000-4.000 lei",dur:"10 ani",eco:"Scăzută"}];
var ZON=["Iași Centru","Copou","Păcurari","CUG","Nicolina","Tătărași","Galata","Bucium","Miroslava","Ciurea","Tomești","Rediu","Bârnova","Holboca","Popricani","Aroneanu","Valea Lupului","Lunca Cetățuii"];
var SPR=["Andrei din Copou a cerut ofertă acum 3 min","Elena din Păcurari a programat o vizită","Cosmin din CUG a solicitat montaj AC","Maria din Miroslava a cerut evaluare gratuită","Radu din Nicolina a programat revizia"];

function ST(p){return(<div style={{textAlign:"center",marginBottom:48}}><p style={{color:"#e8913a",fontWeight:700,fontSize:13,letterSpacing:3,textTransform:"uppercase",margin:"0 0 8px"}}>{p.sub}</p><h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,margin:0,color:p.light?"#fff":undefined}}>{p.title}</h2>{p.desc&&<p style={{color:p.light?"rgba(255,255,255,0.6)":undefined,fontSize:16,marginTop:12,maxWidth:600,marginLeft:"auto",marginRight:"auto"}}>{p.desc}</p>}</div>);}
function Stars(p){return <span style={{color:"#fbbf24",fontSize:15,letterSpacing:2}}>{"★".repeat(p.n)}{"☆".repeat(5-p.n)}</span>;}

export default function Page(){
  var _dk=useState(false),dark=_dk[0],setDark=_dk[1];
  var T=dark?Dk:C;
  var _f=useState(null),fO=_f[0],sfO=_f[1];
  var _c=useState(false),cO=_c[0],scO=_c[1];
  var _m=useState([{r:"b",t:"Bună! Cu ce te pot ajuta?"}]),ms=_m[0],sMs=_m[1];
  var _ci=useState(""),ci=_ci[0],sCi=_ci[1];
  var _fd=useState({name:"",phone:"",service:"",message:""}),fd=_fd[0],sFd=_fd[1];
  var _fs=useState(false),fS=_fs[0],sfS=_fs[1];
  var _cs=useState(0),cS=_cs[0],sCS=_cs[1];
  var _cq=useState(1),cQ=_cq[0],sCQ=_cq[1];
  var _sy=useState(0),sY=_sy[0],sSY=_sy[1];
  var _ex=useState(false),exP=_ex[0],sExP=_ex[1];
  var _exD=useState(false),exDone=_exD[0],sExDone=_exD[1];
  var _sp=useState(null),spN=_sp[0],sSpN=_sp[1];
  var _sched=useState({date:"",time:"",name:"",phone:""}),sched=_sched[0],setSched=_sched[1];
  var _schedS=useState(false),schedSent=_schedS[0],setSchedSent=_schedS[1];

  var c1=useCounter("500",1500);
  var c2=useCounter("10",1200);
  var c3=useCounter("24",800);
  var c4=useCounter("100",1400);

  useEffect(function(){function h(){sSY(window.scrollY);}window.addEventListener("scroll",h);return function(){window.removeEventListener("scroll",h);};},[]);
  useEffect(function(){var iv=setInterval(function(){var idx=Math.floor(Math.random()*SPR.length);sSpN(idx);setTimeout(function(){sSpN(null);},4000);},8000);return function(){clearInterval(iv);};},[]);
  useEffect(function(){function h(e){if(e.clientY<5&&!exDone){sExP(true);}}document.addEventListener("mouseleave",h);return function(){document.removeEventListener("mouseleave",h);};},[exDone]);

  function hChat(){if(!ci.trim())return;var u=ci.trim();var m2=ms.concat([{r:"u",t:u}]);sCi("");var lo=u.toLowerCase();var rp="Mulțumim! Sunați 0774 632 931.";if(lo.includes("pret")||lo.includes("preț"))rp="Evaluare gratuită! Sunați 0774 632 931.";else if(lo.includes("urgent"))rp="24/7! Sunați acum 0774 632 931.";else if(lo.includes("central"))rp="Centrale orice brand. Ofertă gratuită!";else if(lo.includes("ac")||lo.includes("aer"))rp="Montaj + service AC. Tel: 0774 632 931.";sMs(m2);setTimeout(function(){sMs(m2.concat([{r:"b",t:rp}]));},700);}

  var sc=CLC[cS];var cMn=sc.mn*cQ;var cMx=sc.mx*cQ;
  var bg=dark?"#080e18":"#fff";var cardBg=dark?"#111c2a":"#fff";var grayBg=dark?"#0d1520":"#f4f6f8";var brd=dark?"rgba(255,255,255,0.08)":"#e0e5ea";var txtC=dark?"#e0e8f0":"#1a2332";var txtLC=dark?"#8a9bb0":"#5a6a7a";
  var inputBg=dark?"rgba(255,255,255,0.06)":"#fff";var inputBrd=dark?"rgba(255,255,255,0.12)":"#dde1e6";

  return(
    <>
    <Head>
      <title>Heating Services — Instalații profesionale Iași</title>
      <meta name="description" content="Servicii complete de instalații sanitare, termice, climatizare și pompe de căldură în Iași și județ. Disponibili 24/7." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Heating Services — Instalații profesionale Iași" />
      <meta property="og:description" content="Instalații sanitare, termice, AC, centrale termice, pompe de căldură. Iași și județ. 0774 632 931" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://heatingservices.ro" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{fontFamily:"'Segoe UI',-apple-system,Arial,sans-serif",color:txtC,background:bg,overflowX:"hidden",transition:"background 0.4s, color 0.4s"}}>

      <nav style={{position:"sticky",top:0,zIndex:100,background:sY>50?"#0a1628":"rgba(10,22,40,0.95)",padding:"10px 0",boxShadow:"0 2px 24px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)"}}>
        <div style={{maxWidth:1140,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Logo size={32} light/>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={function(){setDark(!dark);}} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",fontSize:16,color:"#fff"}} title="Schimbă tema">{dark?"☀️":"🌙"}</button>
            <a href="https://wa.me/40774632931" style={{background:"#25D366",color:"#fff",padding:"9px 16px",borderRadius:8,textDecoration:"none",fontWeight:700,fontSize:13}}>💬 WhatsApp</a>
            <a href="tel:0774632931" style={{background:"#e8913a",color:"#fff",padding:"9px 18px",borderRadius:8,textDecoration:"none",fontWeight:700,fontSize:13}}>📞 Sună</a>
          </div>
        </div>
      </nav>

      <section style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0}}><svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%"}}><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0a1628"/><stop offset="40%" stopColor="#1a3a5c"/><stop offset="100%" stopColor="#2a5a8c"/></linearGradient></defs><rect width="1200" height="500" fill="url(#hg)"/><rect x="50" y="350" width="300" height="14" rx="7" fill="#4a90c4" opacity="0.1"/><rect x="800" y="100" width="250" height="14" rx="7" fill="#4a90c4" opacity="0.08"/><rect x="200" y="200" width="14" height="200" rx="7" fill="#4a90c4" opacity="0.07"/><circle cx="207" cy="350" r="18" fill="#e8913a" opacity="0.08"/><path d="M1050 300c0 0-30 25-30 50c0 18 13.5 25 30 25s30-7 30-25c0-25-30-50-30-50z" fill="#e8913a" opacity="0.06"/>{[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(function(i){return [0,1,2,3,4,5,6,7,8].map(function(j){return <circle key={i+"-"+j} cx={60+i*60} cy={30+j*55} r="1.2" fill="#fff" opacity="0.04"/>;});})}</svg></div>
        <div style={{position:"relative",zIndex:2,padding:"76px 20px 50px",textAlign:"center"}}>
          <div style={{maxWidth:820,margin:"0 auto"}}>
            <div style={{marginBottom:24,display:"flex",justifyContent:"center"}}><Logo size={50} light/></div>
            <h1 style={{fontSize:"clamp(28px,5vw,50px)",color:"#fff",fontWeight:800,margin:"0 0 14px",lineHeight:1.15}}>Instalații profesionale<br/><span style={{color:"#e8913a"}}>pentru casa ta</span></h1>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:17,margin:"0 0 32px",lineHeight:1.6,maxWidth:540,marginLeft:"auto",marginRight:"auto"}}>Servicii complete de instalații sanitare, termice, climatizare și pompe de căldură în Iași și județ</p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href="tel:0774632931" style={{background:"#e8913a",color:"#fff",padding:"15px 36px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:16,boxShadow:"0 4px 24px rgba(232,145,58,0.4)"}}>📞 Sună acum</a>
              <a href="https://wa.me/40774632931" style={{background:"#25D366",color:"#fff",padding:"15px 36px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:16,boxShadow:"0 4px 20px rgba(37,211,102,0.3)"}}>💬 WhatsApp</a>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:44,flexWrap:"wrap",marginTop:50,padding:"22px 0",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            {[{r:c1,s:"+",l:"Lucrări executate"},{r:c2,s:"+",l:"Ani experiență"},{r:c3,s:"/7",l:"Disponibilitate"},{r:c4,s:"%",l:"Clienți mulțumiți"}].map(function(x,i){return <div key={i} ref={x.r.ref} style={{textAlign:"center"}}><div style={{fontSize:32,fontWeight:800,color:"#e8913a"}}>{x.r.val}{x.s}</div><div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:4}}>{x.l}</div></div>;})}
          </div>
        </div>
      </section>

      <section style={{padding:"68px 20px",background:grayBg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="CE OFERIM" title="Serviciile noastre"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(330px, 1fr))",gap:22}}>
          {SVC.map(function(s,i){var Il=s.I;return(<Reveal key={i}><div style={{background:cardBg,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1px solid "+brd,transition:"background 0.4s"}}><div style={{height:190}}><Il/></div><div style={{padding:"20px 24px 24px"}}><h3 style={{fontSize:19,fontWeight:700,margin:"0 0 6px"}}>{s.t}</h3><p style={{color:txtLC,fontSize:14,margin:0,lineHeight:1.6}}>{s.d}</p></div></div></Reveal>);})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:bg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="GALERIE" title="Lucrările noastre"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:14}}>
          {GAL.map(function(cap,i){return(<Reveal key={i}><div style={{borderRadius:14,overflow:"hidden",position:"relative",aspectRatio:"4/3"}}><IllGal i={i}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 16px",background:"linear-gradient(to top,rgba(10,22,40,0.8),transparent)"}}><span style={{color:"#fff",fontSize:13,fontWeight:600}}>{cap}</span></div></div></Reveal>);})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:grayBg,transition:"background 0.4s"}}><div style={{maxWidth:900,margin:"0 auto"}}><ST sub="COMPARAȚIE" title="Ce sistem de încălzire alegi?" desc="Compară opțiunile și alege ce ți se potrivește"/>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:14}}>
          <thead><tr>{["","Centrală Gaz","Pompă Căldură","Centrală Electrică"].map(function(h,i){return <th key={i} style={{padding:"14px 16px",background:i===0?"transparent":"#e8913a",color:i===0?txtC:"#fff",fontWeight:700,borderRadius:i===1?"12px 0 0 0":i===3?"0 12px 0 0":"0",textAlign:"center"}}>{h}</th>;})}</tr></thead>
          <tbody>{[{l:"💰 Cost lunar",k:"cost"},{l:"🏗️ Investiție",k:"inv"},{l:"⏳ Durabilitate",k:"dur"},{l:"🌱 Eficiență",k:"eco"}].map(function(row,ri){return(<tr key={ri}>{[row.l].concat(CMP.map(function(c){return c[row.k];})).map(function(cell,ci){return <td key={ci} style={{padding:"14px 16px",background:ci===0?(dark?"rgba(255,255,255,0.03)":"#fff"):ci===2?(dark?"rgba(232,145,58,0.08)":"rgba(232,145,58,0.06)"):(dark?"rgba(255,255,255,0.02)":"#f8f9fa"),textAlign:ci===0?"left":"center",fontWeight:ci===0?600:400,borderBottom:"1px solid "+brd,color:ci===2?"#e8913a":txtC}}>{cell}</td>;})}</tr>);})}</tbody>
        </table></div>
        <div style={{textAlign:"center",marginTop:20}}><a href="tel:0774632931" style={{background:"#e8913a",color:"#fff",padding:"12px 28px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14,display:"inline-block"}}>📞 Consultanță gratuită</a></div>
      </div></section>

      <Reveal><section style={{padding:"56px 20px",background:bg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="PARTENERI & CERTIFICĂRI" title="Branduri și autorizații"/>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:14,marginBottom:28}}>
          {BRD.map(function(b,i){return <div key={i} style={{background:grayBg,borderRadius:10,padding:"14px 24px",fontWeight:700,fontSize:14,color:dark?"#60a5fa":"#1a3a5c",border:"1px solid "+brd,transition:"background 0.4s"}}>{b}</div>;})}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
          {CRT.map(function(c,i){return <div key={i} style={{background:dark?"rgba(74,222,128,0.08)":"rgba(74,222,128,0.1)",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:600,color:"#4ade80",border:"1px solid rgba(74,222,128,0.15)"}}>✅ {c}</div>;})}
        </div>
      </div></section></Reveal>

      <section style={{background:"#0a1628",padding:"68px 20px"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="CUM LUCRĂM" title="Procesul nostru" light/>
        <div style={{display:"flex",flexWrap:"wrap",gap:18,justifyContent:"center"}}>
          {STP.map(function(s,i){return(<Reveal key={i}><div style={{flex:"1 1 170px",maxWidth:195,textAlign:"center",padding:"22px 12px",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.06)"}}><div style={{width:52,height:52,borderRadius:"50%",background:"#e8913a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,margin:"0 auto 12px"}}>{s.i}</div><h4 style={{color:"#fff",fontSize:15,fontWeight:700,margin:"0 0 4px"}}>{s.t}</h4><p style={{color:"rgba(255,255,255,0.45)",fontSize:13,margin:0,lineHeight:1.5}}>{s.d}</p></div></Reveal>);})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:grayBg,transition:"background 0.4s"}}><div style={{maxWidth:600,margin:"0 auto"}}><ST sub="PROGRAMĂRI" title="Programează o vizită online"/>
        <Reveal><div style={{background:cardBg,borderRadius:20,padding:32,boxShadow:"0 2px 20px rgba(0,0,0,0.06)",border:"1px solid "+brd,transition:"background 0.4s"}}>
          {schedSent?(<div style={{textAlign:"center",padding:"32px 0"}}><div style={{fontSize:48,marginBottom:12}}>📅</div><h3 style={{fontWeight:700,margin:"0 0 8px"}}>Programare confirmată!</h3><p style={{color:txtLC}}>Vă vom contacta pentru confirmare finală.</p></div>):(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>Data preferată</label><input type="date" value={sched.date} onChange={function(e){setSched(Object.assign({},sched,{date:e.target.value}));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",boxSizing:"border-box",background:inputBg,color:txtC}}/></div>
              <div><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>Ora preferată</label><select value={sched.time} onChange={function(e){setSched(Object.assign({},sched,{time:e.target.value}));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",boxSizing:"border-box",background:inputBg,color:txtC}}><option value="">Alege...</option><option>08:00 - 10:00</option><option>10:00 - 12:00</option><option>12:00 - 14:00</option><option>14:00 - 16:00</option><option>16:00 - 18:00</option></select></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
              <div><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>Nume</label><input value={sched.name} onChange={function(e){setSched(Object.assign({},sched,{name:e.target.value}));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",boxSizing:"border-box",background:inputBg,color:txtC}}/></div>
              <div><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>Telefon</label><input value={sched.phone} onChange={function(e){setSched(Object.assign({},sched,{phone:e.target.value}));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",boxSizing:"border-box",background:inputBg,color:txtC}}/></div>
            </div>
            <button onClick={function(){if(sched.date&&sched.name&&sched.phone)setSchedSent(true);}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"#e8913a",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>📅 Programează vizita →</button>
          </div>)}
        </div></Reveal>
      </div></section>

      <section style={{padding:"68px 20px",background:bg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="PORTOFOLIU" title="Proiecte realizate"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))",gap:22}}>
          {PRJ.map(function(p,i){return(<Reveal key={i}><div style={{background:cardBg,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,0.05)",border:"1px solid "+brd,transition:"background 0.4s"}}><div style={{height:150}}><IllGal i={i}/></div><div style={{padding:"18px 22px 22px"}}><span style={{display:"inline-block",background:"rgba(232,145,58,0.15)",color:"#e8913a",fontWeight:700,fontSize:11,padding:"3px 10px",borderRadius:20,marginBottom:8}}>{p.tg}</span><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 10px",lineHeight:1.3}}>{p.t}</h3><div style={{fontSize:13,lineHeight:1.8}}><div><b style={{color:dark?"#60a5fa":"#1a3a5c"}}>Problemă:</b> <span style={{color:txtLC}}>{p.p}</span></div><div><b style={{color:dark?"#60a5fa":"#1a3a5c"}}>Soluție:</b> <span style={{color:txtLC}}>{p.s}</span></div><div><b style={{color:"#e8913a"}}>Rezultat:</b> <span style={{fontWeight:600}}>{p.r}</span></div></div></div></div></Reveal>);})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:grayBg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="RECENZII" title="Ce spun clienții"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:20}}>
          {TST.map(function(t,i){return(<Reveal key={i}><div style={{background:cardBg,borderRadius:16,padding:24,position:"relative",border:"1px solid "+brd,transition:"background 0.4s"}}><div style={{fontSize:44,color:"#e8913a",opacity:0.12,position:"absolute",top:10,right:18,fontFamily:"Georgia"}}>&quot;</div><Stars n={t.s}/><p style={{fontSize:14,lineHeight:1.7,margin:"10px 0 14px"}}>{t.t}</p><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:14}}>{t.n}</div><div style={{fontSize:12,color:txtLC}}>{t.l}</div></div><span style={{fontSize:11,background:"rgba(232,145,58,0.12)",color:"#e8913a",padding:"3px 9px",borderRadius:20,fontWeight:600}}>{t.sv}</span></div></div></Reveal>);})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:"#0a1628"}}><div style={{maxWidth:1000,margin:"0 auto"}}><ST sub="ACOPERIRE" title="Zone deservite" desc="Ajungem rapid oriunde în Iași și județ" light/>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10}}>
          {ZON.map(function(z,i){return <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.08)"}}>📍 {z}</div>;})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:grayBg,transition:"background 0.4s"}}><div style={{maxWidth:650,margin:"0 auto"}}><ST sub="ESTIMARE" title="Calculator de preț"/>
        <Reveal><div style={{background:cardBg,borderRadius:20,padding:32,border:"1px solid "+brd,transition:"background 0.4s"}}>
          <label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:6}}>Serviciu</label>
          <select value={cS} onChange={function(e){sCS(Number(e.target.value));}} style={{width:"100%",padding:"13px",borderRadius:10,border:"1px solid "+inputBrd,fontSize:14,background:inputBg,color:txtC,marginBottom:16,outline:"none",boxSizing:"border-box"}}>{CLC.map(function(c,i){return <option key={i} value={i}>{c.n}</option>;})}</select>
          <label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:6}}>Cantitate</label>
          <input type="number" min={1} max={50} value={cQ} onChange={function(e){sCQ(Math.max(1,Number(e.target.value)));}} style={{width:"100%",padding:"13px",borderRadius:10,border:"1px solid "+inputBrd,fontSize:14,background:inputBg,color:txtC,marginBottom:24,outline:"none",boxSizing:"border-box"}}/>
          <div style={{background:"rgba(232,145,58,0.1)",borderRadius:14,padding:"22px 24px",textAlign:"center"}}>
            <div style={{color:txtLC,fontSize:12,marginBottom:6}}>Estimare orientativă</div>
            <div style={{fontSize:34,fontWeight:800,color:"#e8913a"}}>{cMn.toLocaleString()} — {cMx.toLocaleString()} lei</div>
            <div style={{color:txtLC,fontSize:11,marginTop:6}}>* Prețul final la evaluare</div>
          </div>
          <a href="tel:0774632931" style={{display:"block",textAlign:"center",marginTop:16,background:"#e8913a",color:"#fff",padding:"13px",borderRadius:10,textDecoration:"none",fontWeight:700}}>📞 Ofertă exactă</a>
        </div></Reveal>
      </div></section>

      <section style={{padding:"68px 20px",background:bg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="BLOG" title="Articole utile"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:20}}>
          {BLG.map(function(b,i){return(<Reveal key={i}><div style={{background:grayBg,borderRadius:16,padding:24,height:"100%",border:"1px solid "+brd,transition:"background 0.4s"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:28}}>{b.i}</span><span style={{fontSize:11,background:"rgba(232,145,58,0.12)",color:"#e8913a",padding:"3px 9px",borderRadius:20,fontWeight:600}}>{b.tg}</span></div><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 6px",lineHeight:1.3}}>{b.t}</h3><p style={{color:txtLC,fontSize:13,margin:0,lineHeight:1.5}}>{b.e}</p><div style={{marginTop:14,color:"#e8913a",fontWeight:700,fontSize:13}}>Citește →</div></div></Reveal>);})}
        </div>
      </div></section>

      <section style={{padding:"68px 20px",background:grayBg,transition:"background 0.4s"}}><div style={{maxWidth:750,margin:"0 auto"}}><ST sub="FAQ" title="Întrebări frecvente"/>
        {FQ.map(function(f,i){var io=fO===i;return(<Reveal key={i}><div style={{border:"1px solid "+brd,borderRadius:12,marginBottom:10,overflow:"hidden",background:io?cardBg:"transparent",transition:"background 0.4s"}}><button onClick={function(){sfO(io?null:i);}} style={{width:"100%",padding:"16px 20px",border:"none",background:"transparent",textAlign:"left",cursor:"pointer",fontSize:15,fontWeight:600,display:"flex",justifyContent:"space-between",alignItems:"center",color:txtC}}>{f.q}<span style={{fontSize:20,color:"#e8913a",transform:io?"rotate(45deg)":"rotate(0)",transition:"0.3s",flexShrink:0,marginLeft:10}}>+</span></button>{io&&<div style={{padding:"0 20px 16px",color:txtLC,fontSize:14,lineHeight:1.7}}>{f.a}</div>}</div></Reveal>);})}
      </div></section>

      <section style={{padding:"68px 20px",background:bg,transition:"background 0.4s"}}><div style={{maxWidth:1140,margin:"0 auto"}}><ST sub="CONTACT" title="Contactează-ne"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:32}}>
          <div>
            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:24}}>
              {[{i:"📞",l:"Telefon",v:"0774 632 931",h:"tel:0774632931"},{i:"📧",l:"Email",v:"hetingservices@gmail.com",h:"mailto:hetingservices@gmail.com"},{i:"📍",l:"Adresă",v:"Al. Cimitir Evreiesc nr. 2, Iași"},{i:"🌍",l:"Zonă",v:"Iași și județul"}].map(function(c,i){return(<div key={i} style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:22,width:36,textAlign:"center"}}>{c.i}</span><div><div style={{fontWeight:700,fontSize:13}}>{c.l}</div>{c.h?<a href={c.h} style={{color:"#e8913a",textDecoration:"none",fontSize:14}}>{c.v}</a>:<div style={{color:txtLC,fontSize:14}}>{c.v}</div>}</div></div>);})}
            </div>
            <div style={{borderRadius:14,overflow:"hidden"}}><iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.5!2d27.587!3d47.165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA5JzU0LjAiTiAyN8KwMzUnMTMuMiJF!5e0!3m2!1sro!2sro!4v1710000000000" width="100%" height="240" style={{border:0}} allowFullScreen loading="lazy"/></div>
          </div>
          <div style={{background:grayBg,borderRadius:16,padding:28,border:"1px solid "+brd,transition:"background 0.4s"}}>
            {fS?(<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:48,marginBottom:12}}>✅</div><h3 style={{fontWeight:700,margin:"0 0 8px"}}>Trimis!</h3><p style={{color:txtLC}}>Vă contactăm curând.</p></div>):(
            <div><h3 style={{fontSize:18,fontWeight:700,margin:"0 0 20px"}}>Cere ofertă gratuită</h3>
              {[{k:"name",l:"Nume",t:"text"},{k:"phone",l:"Telefon",t:"tel"}].map(function(f){return(<div key={f.k} style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>{f.l}</label><input type={f.t} value={fd[f.k]} onChange={function(e){var u={};u[f.k]=e.target.value;sFd(Object.assign({},fd,u));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",boxSizing:"border-box",background:inputBg,color:txtC}}/></div>);})}
              <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>Serviciu</label><select value={fd.service} onChange={function(e){sFd(Object.assign({},fd,{service:e.target.value}));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",boxSizing:"border-box",background:inputBg,color:txtC}}><option value="">Selectează...</option>{SVC.map(function(s,i){return <option key={i} value={s.t}>{s.t}</option>;})}</select></div>
              <div style={{marginBottom:18}}><label style={{fontSize:12,fontWeight:600,color:txtLC,display:"block",marginBottom:5}}>Detalii</label><textarea rows={3} value={fd.message} onChange={function(e){sFd(Object.assign({},fd,{message:e.target.value}));}} style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:14,outline:"none",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",background:inputBg,color:txtC}}/></div>
              <button onClick={function(){if(fd.name&&fd.phone)sfS(true);}} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:"#e8913a",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>Trimite →</button>
            </div>)}
          </div>
        </div>
      </div></section>

      <section style={{background:"linear-gradient(135deg,#e8913a,#f0a855)",padding:"48px 20px",textAlign:"center"}}>
        <h2 style={{fontSize:28,fontWeight:800,color:"#fff",margin:"0 0 6px"}}>Ai o urgență?</h2>
        <p style={{color:"rgba(255,255,255,0.85)",fontSize:15,margin:"0 0 24px"}}>Disponibili 24/7 în Iași</p>
        <a href="tel:0774632931" style={{display:"inline-block",background:"#fff",color:"#e8913a",padding:"14px 40px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:17,boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>📞 0774 632 931</a>
      </section>

      <footer style={{background:"#0a1628",padding:"40px 20px",textAlign:"center"}}><div style={{marginBottom:14}}><Logo size={26} light/></div><p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:0}}>© 2026 Heating Services — Instalații profesionale, Iași</p></footer>

      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:150,background:"#0a1628",padding:"10px 16px",display:"flex",gap:10,boxShadow:"0 -2px 20px rgba(0,0,0,0.3)"}}>
        <a href="tel:0774632931" style={{flex:1,background:"#e8913a",color:"#fff",padding:"12px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>📞 Sună acum</a>
        <a href="https://wa.me/40774632931" style={{flex:1,background:"#25D366",color:"#fff",padding:"12px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14,textAlign:"center"}}>💬 WhatsApp</a>
      </div>

      <a href="https://wa.me/40774632931" style={{position:"fixed",bottom:76,left:20,zIndex:200,width:52,height:52,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37,211,102,0.4)",textDecoration:"none",fontSize:26}}>💬</a>

      <div style={{position:"fixed",bottom:76,right:20,zIndex:200}}>
        {cO&&(<div style={{width:330,maxHeight:420,background:cardBg,borderRadius:16,boxShadow:"0 8px 40px rgba(0,0,0,0.25)",overflow:"hidden",marginBottom:10,display:"flex",flexDirection:"column"}}>
          <div style={{background:"#0a1628",padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{color:"#fff",fontWeight:700,fontSize:14}}>Heating Services</div><div style={{color:"#4ade80",fontSize:11}}>● Online</div></div><button onClick={function(){scO(false);}} style={{background:"none",border:"none",color:"#fff",fontSize:18,cursor:"pointer"}}>✕</button></div>
          <div style={{flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8,minHeight:180,maxHeight:260}}>
            {ms.map(function(m,i){var ib=m.r==="b";return <div key={i} style={{alignSelf:ib?"flex-start":"flex-end",background:ib?grayBg:"#e8913a",color:ib?txtC:"#fff",padding:"9px 13px",borderRadius:11,maxWidth:"82%",fontSize:13,lineHeight:1.5}}>{m.t}</div>;})}
          </div>
          <div style={{padding:10,borderTop:"1px solid "+brd,display:"flex",gap:6}}>
            <input value={ci} onChange={function(e){sCi(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")hChat();}} placeholder="Scrie..." style={{flex:1,padding:"9px 12px",borderRadius:8,border:"1px solid "+inputBrd,fontSize:13,outline:"none",background:inputBg,color:txtC}}/>
            <button onClick={hChat} style={{background:"#e8913a",color:"#fff",border:"none",borderRadius:8,padding:"9px 14px",fontWeight:700,cursor:"pointer"}}>→</button>
          </div>
        </div>)}
        <button onClick={function(){scO(!cO);}} style={{width:52,height:52,borderRadius:"50%",background:"#1a3a5c",border:"none",cursor:"pointer",fontSize:22,color:"#fff",boxShadow:"0 4px 16px rgba(26,58,92,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>{cO?"✕":"🤖"}</button>
      </div>

      {spN!==null&&(<div style={{position:"fixed",bottom:140,left:20,zIndex:180,background:cardBg,borderRadius:12,padding:"12px 18px",boxShadow:"0 4px 24px rgba(0,0,0,0.2)",display:"flex",alignItems:"center",gap:10,maxWidth:320,border:"1px solid "+brd}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(232,145,58,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🔔</div>
        <div style={{fontSize:13,lineHeight:1.4}}>{SPR[spN]}</div>
      </div>)}

      {exP&&(<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:cardBg,borderRadius:20,padding:36,maxWidth:420,width:"100%",textAlign:"center",position:"relative",boxShadow:"0 12px 48px rgba(0,0,0,0.3)"}}>
          <button onClick={function(){sExP(false);sExDone(true);}} style={{position:"absolute",top:14,right:14,background:"none",border:"none",fontSize:20,cursor:"pointer",color:txtLC}}>✕</button>
          <div style={{fontSize:48,marginBottom:12}}>🎁</div>
          <h3 style={{fontSize:22,fontWeight:800,margin:"0 0 8px"}}>Așteaptă!</h3>
          <p style={{color:"#e8913a",fontSize:18,fontWeight:700,margin:"0 0 8px"}}>10% REDUCERE la prima lucrare</p>
          <p style={{color:txtLC,fontSize:14,margin:"0 0 20px"}}>Lasă-ne telefonul și te contactăm cu oferta specială</p>
          <div style={{display:"flex",gap:10}}>
            <input placeholder="Număr telefon..." style={{flex:1,padding:"13px 16px",borderRadius:10,border:"1px solid "+inputBrd,fontSize:14,outline:"none",background:inputBg,color:txtC}}/>
            <button onClick={function(){sExP(false);sExDone(true);}} style={{background:"#e8913a",color:"#fff",border:"none",borderRadius:10,padding:"13px 20px",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Vreau oferta!</button>
          </div>
        </div>
      </div>)}

    </div>
    </>
  );
}

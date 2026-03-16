import { useState, useCallback } from "react";

const STORAGE_KEY = "aoa-guesses";

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveTo(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

const BASE = "https://www.thewrap.com/wp-content/uploads/2026/03/";

const CAST = [
  // Women
  {
    name: "Angel Marinez", role: "Contestant", occupation: "Medical Esthetician",
    location: "Denver, CO", actualAge: 32, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Angel_Marinez_0188_R_B.jpg?w=600"
  },
  {
    name: "Ashley Wottring", role: "Contestant", occupation: "Business Owner",
    location: "Fishers, IN", actualAge: 38, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Ashley_Wottring_0403_R_B.jpg?w=600"
  },
  {
    name: "Brenda Ferrell", role: "Contestant", occupation: "Salon Owner",
    location: "Los Angeles, CA", actualAge: 43, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Brenda_Ferrell_0619_R_B.jpg?w=600"
  },
  {
    name: "Chloé Boudames", role: "Contestant", occupation: "Sports Reporter & Marketing Manager",
    location: "Los Angeles, CA", actualAge: 26, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Chloe_Boudames_0643_R_B.jpg?w=600"
  },
  {
    name: "Elise Fernandez", role: "Contestant", occupation: "Model & Actor",
    location: "San Marcos, TX", actualAge: 23, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Elise_Fernandez_0912_R_B.jpg?w=600"
  },
  {
    name: "Erin Timm", role: "Contestant", occupation: "Massage Therapist",
    location: "Delavan, WI", actualAge: 40, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Erin_Timm_1095_R_B.jpg?w=600"
  },
  {
    name: "Joleen Diaz", role: "Contestant", occupation: "Teacher",
    location: "Fremont, CA", actualAge: 46, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Joleen_Diaz_1302_R_B.jpg?w=600"
  },
  {
    name: "Katharine Newman", role: "Contestant", occupation: "Entrepreneur",
    location: "New York, NY", actualAge: 48, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Katharine_Newman_1489_R_B.jpg?w=600"
  },
  {
    name: "Lauren Boggi", role: "Contestant", occupation: "Entrepreneur",
    location: "Los Angeles, CA", actualAge: 29, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Lauren_Boggi_1626_R_B.jpg?w=600"
  },
  {
    name: "Leah Woolfolk", role: "Contestant", occupation: "Flight Attendant",
    location: "Houston, TX", actualAge: 41, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Leah_Woolfolk_1810_R_B.jpg?w=600"
  },
  {
    name: "Libby Vodicka", role: "Contestant", occupation: "Social Media Manager",
    location: "San Diego, CA", actualAge: 22, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Libby_Vodicka_1861_R_B.jpg?w=600"
  },
  {
    name: "Lindsay Sage", role: "Contestant", occupation: "Social Media Manager",
    location: "Los Angeles, CA", actualAge: 24, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Lindey_Sage_2110_R_B.jpg?w=600"
  },
  {
    name: "Michelle Yoswa", role: "Contestant", occupation: "Business Owner",
    location: "Redondo Beach, CA", actualAge: 46, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Michelle_Yoswa_2179_R_B.jpg?w=600"
  },
  {
    name: "Pfeifer Hill", role: "Contestant", occupation: "Graphic Designer",
    location: "Seattle, WA", actualAge: 23, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Pfeifer_Hill_2481_R_B.jpg?w=600"
  },
  {
    name: "Sophie Schumacher", role: "Contestant", occupation: "Marketing Manager",
    location: "Cincinnati, OH", actualAge: 27, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Sophie_Schumacher_2653_R_B.jpg?w=600"
  },
  {
    name: "Theresa Demaria", role: "Contestant", occupation: "Stylist",
    location: "New York, NY", actualAge: 54, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Theresa_Demaria_2655_R_B.jpg?w=600"
  },
  {
    name: "Tiffany Butler", role: "Contestant", occupation: "Life Coach",
    location: "Charlotte, NC", actualAge: 44, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Tiffany_Butler_2932_R_B.jpg?w=600"
  },
  {
    name: "Vanelle Fenmou", role: "Contestant", occupation: "Project Manager",
    location: "Dallas, TX", actualAge: 27, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Vanelle_Fenmou_3041_R_B.jpg?w=600"
  },
  {
    name: "Vanessa Drozda", role: "Contestant", occupation: "Salon Owner",
    location: "Milwaukee, WI", actualAge: 49, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Vanessa_Drozda_3254_R2_B.jpg?w=600"
  },
  {
    name: "Vickie Downing", role: "Contestant", occupation: "Dermatology Pharmaceutical Rep",
    location: "Nashville, TN", actualAge: 55, gender: "female",
    photo: BASE + "AoA_LS_S01_051925_Vickie_Downing_3368_R_B.jpg?w=600"
  },
  // Men
  {
    name: "Andrew Wheeler", role: "Contestant", occupation: "Bar Owner",
    location: "Baltimore, MD", actualAge: 38, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Andrew_Wheeler_4639_R_B.jpg?w=600"
  },
  {
    name: "William Bosch", role: "Contestant", occupation: "Entrepreneur",
    location: "Miami, FL", actualAge: 33, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_William_Bosch_7304_R_B.jpg?w=600"
  },
  {
    name: "Brian Wizenried", role: "Contestant", occupation: "Bakery Owner",
    location: "Madison, WI", actualAge: 52, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Brian_Wizenried_4766_R_B.jpg?w=600"
  },
  {
    name: "Charles Sharif", role: "Contestant", occupation: "IT Specialist",
    location: "Dallas, TX", actualAge: 42, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Charles_Sharif_4938_R_B.jpg?w=600"
  },
  {
    name: "Chris Dahlan", role: "Contestant", occupation: "Public Speaker & Business Owner",
    location: "Miami, FL", actualAge: 26, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Chris_Dahlan_5091_R_B.jpg?w=600"
  },
  {
    name: "David Evans", role: "Contestant", occupation: "Broadcast Analyst & MMA Fighter",
    location: "Wentzville, MO", actualAge: 46, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_David_Evans_5220_R2_B.jpg?w=600"
  },
  {
    name: "David Gull", role: "Contestant", occupation: "Entrepreneur",
    location: "Los Angeles, CA", actualAge: 55, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_David_Gull_5465_R_B.jpg?w=600"
  },
  {
    name: "Derrick Fleming", role: "Contestant", occupation: "Medical Sales",
    location: "Dallas, TX", actualAge: 43, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Derrick_Fleming_5635_R_B.jpg?w=600"
  },
  {
    name: "Isaiah Salters", role: "Contestant", occupation: "Youth Life Coach",
    location: "Syracuse, NY", actualAge: 26, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Isaiah_Salters_7629_R_B.jpg?w=600"
  },
  {
    name: "Jacques Shelton", role: "Contestant", occupation: "Specialty Car Scout",
    location: "Amelia Island, FL", actualAge: 34, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Jacques_Shelton_5800_R_B.jpg?w=600"
  },
  {
    name: "John Merrill", role: "Contestant", occupation: "Software Sales",
    location: "Miami, FL", actualAge: 27, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_John_Merrill_7343_R_B.jpg?w=600"
  },
  {
    name: "Jorge Sanchez", role: "Contestant", occupation: "Attorney",
    location: "Los Angeles, CA", actualAge: 60, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Jorge_Sanchez_5928_R_B.jpg?w=600"
  },
  {
    name: "Josh Wolf", role: "Contestant", occupation: "Consultant",
    location: "Austin, TX", actualAge: 36, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Josh_Wolf_6090_R_B.jpg?w=600"
  },
  {
    name: "Justin Gettman", role: "Contestant", occupation: "Insurance Agent",
    location: "Tampa, FL", actualAge: 37, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Justin_Gettman_6256_R_B.jpg?w=600"
  },
  {
    name: "Justin Silberman", role: "Contestant", occupation: "Healthcare AI",
    location: "Charleston, SC", actualAge: 45, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Justin_Silberman_6481_R_B.jpg?w=600"
  },
  {
    name: "Len Gunn", role: "Contestant", occupation: "Retired / Adventurer",
    location: "San Diego, CA", actualAge: 58, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Len_Gunn_6615_R_B.jpg?w=600"
  },
  {
    name: "Logan Goodrid", role: "Contestant", occupation: "Corporate Purchasing",
    location: "Columbus, OH", actualAge: 29, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Logan_Goodrid_6825_R_B.jpg?w=600"
  },
  {
    name: "Sean Kelly", role: "Contestant", occupation: "Sports Performance Coach",
    location: "Indianapolis, IN", actualAge: 49, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Sean_Kelly_JR_7787_R_B.jpg?w=600"
  },
  {
    name: "Tristan Davis", role: "Contestant", occupation: "Real Estate Investor",
    location: "Atlanta, GA", actualAge: 31, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_Tristan_Davis_6999_R_B.jpg?w=600"
  },
  {
    name: "West Mandell", role: "Contestant", occupation: "Founder of Creative Agency",
    location: "San Diego, CA", actualAge: 25, gender: "male",
    photo: BASE + "AoA_LS_S01_051925_West_Mandell_7166_R_B.jpg?w=600"
  },
];

function AgeSlider({ value, onChange }) {
  return (
    <div style={{ width: "100%", padding: "6px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: "#555", fontFamily: "serif" }}>18</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#e8c97e", fontFamily: "'Georgia', serif" }}>{value}</span>
        <span style={{ fontSize: 10, color: "#555", fontFamily: "serif" }}>70</span>
      </div>
      <input
        type="range" min={18} max={70} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%", appearance: "none", WebkitAppearance: "none",
          height: 6, borderRadius: 3, outline: "none", cursor: "pointer",
          touchAction: "none",
          background: `linear-gradient(to right, #e8c97e ${((value - 18) / 52) * 100}%, #252525 ${((value - 18) / 52) * 100}%)`,
        }}
      />
    </div>
  );
}

function CastCard({ person, allRevealed, revealKey, savedGuess, savedRevealed, onGuessChange, onReveal }) {
  const [guess, setGuess] = useState(savedGuess ?? 30);
  const [revealed, setRevealed] = useState(savedRevealed ?? false);
  const [imgError, setImgError] = useState(false);

  const isRevealed = revealed || allRevealed;
  const diff = isRevealed ? Math.abs(guess - person.actualAge) : null;

  const accentColor = person.gender === "female" ? "#d4a0e8" : "#7eb8e8";

  let resultEmoji = "", resultText = "", resultColor = "#888";
  if (isRevealed) {
    if (diff === 0)       { resultEmoji = "\u{1F3AF}"; resultText = "Exact!";           resultColor = "#7ed87e"; }
    else if (diff <= 2)   { resultEmoji = "\u{1F525}"; resultText = `\u00B1${diff} yr \u2014 Hot!`;  resultColor = "#b0e87e"; }
    else if (diff <= 5)   { resultEmoji = "\u2600\uFE0F"; resultText = `\u00B1${diff} yrs \u2014 Warm`; resultColor = "#e8c97e"; }
    else                  { resultEmoji = "\u2744\uFE0F"; resultText = `\u00B1${diff} yrs off`;    resultColor = "#e88a7e"; }
  }

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=400&background=${person.gender === "female" ? "1a0d22&color=d4a0e8" : "081422&color=7eb8e8"}&bold=true&font-size=0.28`;

  return (
    <div
      style={{
        background: person.gender === "female"
          ? "linear-gradient(160deg, #160d1e 0%, #0d081a 100%)"
          : "linear-gradient(160deg, #081320 0%, #050e18 100%)",
        border: `1px solid ${accentColor}1a`,
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 20px #00000055",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 12px 36px ${accentColor}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 20px #00000055";
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", aspectRatio: "2/3", overflow: "hidden", background: "#0a0a14" }}>
        <img
          src={imgError ? fallbackSrc : person.photo}
          alt={person.name}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)"
        }} />
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: `${accentColor}18`, border: `1px solid ${accentColor}45`,
          borderRadius: 20, padding: "2px 8px",
          fontSize: 9, fontFamily: "serif", color: accentColor, letterSpacing: 2, textTransform: "uppercase",
        }}>
          {person.gender === "female" ? "Women" : "Men"}
        </div>
        <div style={{ position: "absolute", bottom: 10, left: 11, right: 11 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>
            {person.name}
          </div>
          <div style={{ fontSize: 10, color: "#aaa", fontFamily: "serif", marginTop: 2 }}>
            {person.occupation}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 11px 11px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 10, color: "#4a4a5a", fontFamily: "serif" }}>{"\u{1F4CD}"} {person.location}</div>

        <div>
          <div style={{ fontSize: 9, color: accentColor, fontFamily: "serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>
            Your Guess
          </div>
          <AgeSlider value={guess} onChange={v => { setGuess(v); onGuessChange(person.name, v); }} />
        </div>

        {!isRevealed ? (
          <button
            onClick={() => { setRevealed(true); onReveal(person.name); }}
            style={{
              background: `${accentColor}12`, border: `1px solid ${accentColor}40`,
              color: accentColor, borderRadius: 7, padding: "7px 0",
              fontSize: 10, fontFamily: "serif", letterSpacing: 1.5,
              cursor: "pointer", textTransform: "uppercase", transition: "background 0.15s", width: "100%",
            }}
            onMouseEnter={e => e.target.style.background = `${accentColor}28`}
            onMouseLeave={e => e.target.style.background = `${accentColor}12`}
          >
            Reveal Age
          </button>
        ) : (
          <div style={{
            background: "#ffffff06", border: `1px solid ${accentColor}22`,
            borderRadius: 7, padding: "9px 10px", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: accentColor, fontFamily: "'Georgia', serif", lineHeight: 1 }}>
              {person.actualAge}
            </div>
            <div style={{ fontSize: 9, color: "#444", fontFamily: "serif", marginTop: 2, letterSpacing: 1, textTransform: "uppercase" }}>
              Actual Age
            </div>
            <div style={{ fontSize: 12, color: resultColor, fontFamily: "serif", marginTop: 5, fontWeight: 600 }}>
              {resultEmoji} {resultText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [saved, setSaved] = useState(loadSaved);
  const [filter, setFilter] = useState("All");
  const [allRevealed, setAllRevealed] = useState(() => saved._allRevealed ?? false);
  const [revealKey, setRevealKey] = useState(0);

  const filters = ["All", "Women", "Men"];

  const updateSaved = useCallback((updater) => {
    setSaved(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveTo(next);
      return next;
    });
  }, []);

  const handleGuessChange = useCallback((name, value) => {
    updateSaved(prev => ({ ...prev, [name]: { ...prev[name], guess: value } }));
  }, [updateSaved]);

  const handleReveal = useCallback((name) => {
    updateSaved(prev => ({ ...prev, [name]: { ...prev[name], revealed: true } }));
  }, [updateSaved]);

  const filtered = CAST.filter(p => {
    if (filter === "All") return true;
    if (filter === "Women") return p.gender === "female";
    if (filter === "Men") return p.gender === "male";
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#07070f", color: "#fff", fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <div style={{
        textAlign: "center", padding: "50px 20px 34px",
        background: "linear-gradient(180deg, #100900 0%, #07070f 100%)",
        borderBottom: "1px solid #ffffff0c",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#e8c97e80", textTransform: "uppercase", marginBottom: 8 }}>
          Netflix {"\u00B7"} Season 1 {"\u00B7"} 2026
        </div>
        <h1 style={{
          fontSize: "clamp(26px, 5vw, 56px)", fontWeight: 400, margin: "0 0 8px", letterSpacing: 4,
          background: "linear-gradient(135deg, #c9a84c 0%, #f5e6a3 45%, #c9a84c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Age of Attraction
        </h1>
        <p style={{ color: "#3a3a4e", fontSize: 13, margin: "0 0 26px" }}>
          Slide to guess each cast member's age {"\u2014"} then reveal the truth.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#e8c97e18" : "transparent",
              border: `1px solid ${filter === f ? "#e8c97e" : "#1e1e1e"}`,
              color: filter === f ? "#e8c97e" : "#383838",
              borderRadius: 20, padding: "5px 17px",
              fontSize: 10, fontFamily: "serif", letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s",
            }}>
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={() => { setAllRevealed(true); setRevealKey(k => k + 1); updateSaved(prev => ({ ...prev, _allRevealed: true })); }}
          style={{
            background: "#e8c97e18", border: "1px solid #e8c97e38",
            color: "#e8c97e", borderRadius: 7, padding: "8px 24px",
            fontSize: 10, fontFamily: "serif", letterSpacing: 2,
            textTransform: "uppercase", cursor: "pointer",
          }}
        >
          {"\u2726"} Reveal All Ages
        </button>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: 1300, margin: "0 auto", padding: "32px 16px 56px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(198px, 1fr))",
        gap: 14,
      }}>
        {filtered.map(person => (
          <CastCard
            key={person.name}
            person={person}
            allRevealed={allRevealed}
            revealKey={revealKey}
            savedGuess={saved[person.name]?.guess}
            savedRevealed={saved[person.name]?.revealed}
            onGuessChange={handleGuessChange}
            onReveal={handleReveal}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "14px", color: "#252530", fontSize: 10, letterSpacing: 1 }}>
        Ages at time of filming {"\u00B7"} Photos: Lindsay Siu / Netflix via Deadline
      </div>
    </div>
  );
}

import { useState } from "react";
import AgeSlider from "./AgeSlider";
import ResultBadge from "./ResultBadge";

export default function CastCard({ person, allRevealed, revealKey, savedGuess, savedRevealed, onGuessChange, onReveal }) {
  const [guess, setGuess] = useState(savedGuess ?? 30);
  const [revealed, setRevealed] = useState(savedRevealed ?? false);
  const [imgError, setImgError] = useState(false);

  const isRevealed = revealed || allRevealed;
  const accentColor = person.gender === "female" ? "#d4a0e8" : "#7eb8e8";

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
          <ResultBadge actualAge={person.actualAge} guess={guess} accentColor={accentColor} />
        )}
      </div>
    </div>
  );
}

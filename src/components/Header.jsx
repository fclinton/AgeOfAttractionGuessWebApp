import FilterButtons from "./FilterButtons";

export default function Header({ filter, onFilterChange, onRevealAll }) {
  return (
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

      <FilterButtons active={filter} onChange={onFilterChange} />

      <button
        onClick={onRevealAll}
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
  );
}

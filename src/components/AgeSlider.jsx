export default function AgeSlider({ value, onChange }) {
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

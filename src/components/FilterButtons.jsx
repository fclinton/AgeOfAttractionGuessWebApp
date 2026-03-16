const FILTERS = ["All", "Women", "Men"];

export default function FilterButtons({ active, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
      {FILTERS.map(f => (
        <button key={f} onClick={() => onChange(f)} style={{
          background: active === f ? "#e8c97e18" : "transparent",
          border: `1px solid ${active === f ? "#e8c97e" : "#1e1e1e"}`,
          color: active === f ? "#e8c97e" : "#383838",
          borderRadius: 20, padding: "5px 17px",
          fontSize: 10, fontFamily: "serif", letterSpacing: 2,
          textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s",
        }}>
          {f}
        </button>
      ))}
    </div>
  );
}

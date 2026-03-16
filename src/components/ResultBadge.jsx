export default function ResultBadge({ actualAge, guess, accentColor }) {
  const diff = Math.abs(guess - actualAge);

  let resultEmoji = "", resultText = "", resultColor = "#888";
  if (diff === 0)       { resultEmoji = "\u{1F3AF}"; resultText = "Exact!";           resultColor = "#7ed87e"; }
  else if (diff <= 2)   { resultEmoji = "\u{1F525}"; resultText = `\u00B1${diff} yr \u2014 Hot!`;  resultColor = "#b0e87e"; }
  else if (diff <= 5)   { resultEmoji = "\u2600\uFE0F"; resultText = `\u00B1${diff} yrs \u2014 Warm`; resultColor = "#e8c97e"; }
  else                  { resultEmoji = "\u2744\uFE0F"; resultText = `\u00B1${diff} yrs off`;    resultColor = "#e88a7e"; }

  return (
    <div style={{
      background: "#ffffff06", border: `1px solid ${accentColor}22`,
      borderRadius: 7, padding: "9px 10px", textAlign: "center",
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: accentColor, fontFamily: "'Georgia', serif", lineHeight: 1 }}>
        {actualAge}
      </div>
      <div style={{ fontSize: 9, color: "#444", fontFamily: "serif", marginTop: 2, letterSpacing: 1, textTransform: "uppercase" }}>
        Actual Age
      </div>
      <div style={{ fontSize: 12, color: resultColor, fontFamily: "serif", marginTop: 5, fontWeight: 600 }}>
        {resultEmoji} {resultText}
      </div>
    </div>
  );
}

import { useState, useCallback } from "react";
import { loadSaved, saveTo } from "./utils/storage";
import { CAST } from "./data/cast";
import Header from "./components/Header";
import CastCard from "./components/CastCard";
import Footer from "./components/Footer";

export default function App() {
  const [saved, setSaved] = useState(loadSaved);
  const [filter, setFilter] = useState("All");
  const [allRevealed, setAllRevealed] = useState(() => saved._allRevealed ?? false);
  const [revealKey, setRevealKey] = useState(0);

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

  const handleRevealAll = () => {
    setAllRevealed(true);
    setRevealKey(k => k + 1);
    updateSaved(prev => ({ ...prev, _allRevealed: true }));
  };

  const filtered = CAST.filter(p => {
    if (filter === "All") return true;
    if (filter === "Women") return p.gender === "female";
    if (filter === "Men") return p.gender === "male";
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#07070f", color: "#fff", fontFamily: "'Georgia', serif" }}>
      <Header filter={filter} onFilterChange={setFilter} onRevealAll={handleRevealAll} />

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

      <Footer />
    </div>
  );
}

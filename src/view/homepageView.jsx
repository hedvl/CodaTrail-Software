// homepageView.jsx
import { defineComponent } from 'vue';

export const HomepageView = defineComponent({
  name: "HomepageView",

  props: {
    onChooseLevel: Function,
    onProfile: Function,
    onLeaderboard: Function,
  },

  setup(props) {
    return () => (
      <div style={styles.root}>
        <div style={styles.gridOverlay} />

        <header style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⬡</span>
            <span style={styles.logoText}>CodaTrail</span>
          </div>
          <button style={styles.profileBtn} onClick={props.onProfile}>
            Profile
          </button>
        </header>

        <main style={styles.main}>
          <div style={styles.hero}>
            <p style={styles.tagline}>Learn to code. Step by step.</p>
            <h1 style={styles.title}>
              Build your<br />
              <span style={styles.titleAccent}>sequence.</span>
            </h1>
            <p style={styles.subtitle}>
              Place tiles, solve puzzles, and guide your character to the goal.
            </p>
          </div>

          <div style={styles.cards}>
            <button style={{ ...styles.card, ...styles.cardPrimary }} onClick={props.onChooseLevel}>
              <span style={styles.cardIcon}>🗺️</span>
              <span style={styles.cardTitle}>Choose Level</span>
              <span style={styles.cardDesc}>Pick your next challenge</span>
            </button>

            <button style={{ ...styles.card, ...styles.cardSecondary }} onClick={props.onLeaderboard}>
              <span style={styles.cardIcon}>🏆</span>
              <span style={styles.cardTitle}>Leaderboard</span>
              <span style={styles.cardDesc}>See the top players</span>
            </button>

            <button style={{ ...styles.card, ...styles.cardSecondary }} onClick={props.onProfile}>
              <span style={styles.cardIcon}>👤</span>
              <span style={styles.cardTitle}>Profile</span>
              <span style={styles.cardDesc}>Track your progress</span>
            </button>
          </div>
        </main>

        <footer style={styles.footer}>
          <span style={styles.footerText}>CodaTrail © 2026 · Group 10</span>
        </footer>
      </div>
    );
  },
});

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#0f1117",
    color: "#f0ede8",
    fontFamily: "'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "relative",
    zIndex: 1,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: { fontSize: "22px", color: "#f5c842" },
  logoText: { fontSize: "20px", fontWeight: "bold", letterSpacing: "2px", color: "#f0ede8" },
  profileBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#f0ede8",
    padding: "8px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 40px",
    position: "relative",
    zIndex: 1,
    gap: "60px",
  },
  hero: { textAlign: "center", maxWidth: "600px" },
  tagline: { fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: "#f5c842", marginBottom: "16px" },
  title: { fontSize: "clamp(42px, 7vw, 80px)", fontWeight: "900", lineHeight: 1.1, margin: "0 0 20px 0", color: "#f0ede8" },
  titleAccent: { color: "#f5c842", fontStyle: "italic" },
  subtitle: { fontSize: "16px", color: "rgba(240,237,232,0.5)", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto" },
  cards: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "36px 32px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    width: "180px",
    fontFamily: "'Courier New', monospace",
  },
  cardPrimary: { background: "#f5c842", color: "#0f1117", border: "none" },
  cardSecondary: { background: "rgba(255,255,255,0.05)", color: "#f0ede8" },
  cardIcon: { fontSize: "32px" },
  cardTitle: { fontSize: "15px", fontWeight: "bold", letterSpacing: "1px" },
  cardDesc: { fontSize: "12px", opacity: 0.6, textAlign: "center" },
  footer: { textAlign: "center", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1 },
  footerText: { fontSize: "12px", color: "rgba(240,237,232,0.3)", letterSpacing: "1px" },
};
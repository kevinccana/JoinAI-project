import { useState } from "react";

// ── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <label style={styles.toggleWrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <div
        onClick={onChange}
        style={{
          ...styles.toggleTrack,
          background: checked ? "#4A90E2" : "rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            ...styles.toggleThumb,
            transform: checked ? "translateX(22px)" : "translateX(2px)",
          }}
        />
      </div>
    </label>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [sosModo, setSosModo] = useState(true);
  const [moodReminders, setMoodReminders] = useState(true);
  const [dataSecurity, setDataSecurity] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("Español");

  const dummy = (action) => () => console.log(`[Settings] ${action}`);

  return (
    <div style={styles.page}>
      {/* ── Page Title ── */}
      <h2 style={styles.pageTitle}>Interfaz: Ajustes de la Aplicación</h2>

      {/* ── Grid 2×2 ── */}
      <div style={styles.grid}>

        {/* ┌─ Perfil de Usuario ─────────────────────────────────┐ */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Perfil de Usuario</h3>
          <div style={styles.profileRow}>
            <div style={styles.avatar}>
              <span style={{ fontSize: 32 }}>
                <img src="https://placehold.co"/>
              </span>
            </div>
            <div style={styles.profileInfo}>
              <p style={styles.profileName}>JoinIA</p>
              <p style={styles.profileSub}>JoinIa.itorrene</p>
              <p style={styles.profileSub}>e-mail: noherie@gmail.com</p>
            </div>
          </div>
          <button style={styles.profileBtn} onClick={dummy("Profile clicked")}>
            Profile
          </button>
        </div>

        {/* ┌─ Configuración de Chat ──────────────────────────────┐ */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Configuración de Chat</h3>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>SOS Modo</span>
            <Toggle
              checked={sosModo}
              onChange={() => {
                setSosModo((v) => !v);
                dummy(`SOS Modo → ${!sosModo}`)();
              }}
            />
          </div>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Mood Reminders</span>
            <Toggle
              checked={moodReminders}
              onChange={() => {
                setMoodReminders((v) => !v);
                dummy(`Mood Reminders → ${!moodReminders}`)();
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button style={styles.saveBtn} onClick={dummy("Guardar chat config")}>
              Guardar
            </button>
          </div>
        </div>

        {/* ┌─ Privacidad ─────────────────────────────────────────┐ */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Privacidad</h3>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Seguridad de datos</span>
            <Toggle
              checked={dataSecurity}
              onChange={() => {
                setDataSecurity((v) => !v);
                dummy(`Seguridad de datos → ${!dataSecurity}`)();
              }}
            />
          </div>

          <div style={{ ...styles.settingRow, marginTop: 12 }}>
            <span style={styles.settingLabel}>Eliminar  cuenta</span>
            <button style={styles.deleteBtn} onClick={dummy("Eliminar cuenta")}>
              Eliminar
            </button>
          </div>
        </div>

        {/* ┌─ Apariencia ─────────────────────────────────────────┐ */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Apariencia</h3>

          <div style={styles.settingRow}>
            <span style={styles.settingLabel}>Modo Oscuro</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🌙</span>
              <Toggle
                checked={darkMode}
                onChange={() => {
                  setDarkMode((v) => !v);
                  dummy(`Dark Mode → ${!darkMode}`)();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Cerrar Sesión ── */}
      <div style={styles.footer}>
        <button style={styles.logoutBtn} onClick={dummy("Cerrar Sesión")}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "28px 32px",
    background: "#0f3460",
    overflowY: "auto",
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    color: "#e0e0e0",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 24,
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    flex: 1,
  },
  card: {
    background: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "20px 22px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
    color: "#ffffff",
  },

  // Profile
  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "rgba(74,144,226,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
    border: "2px solid rgba(74,144,226,0.5)",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
  },
  profileSub: {
    fontSize: 12,
    color: "#a0a0a0",
  },
  profileBtn: {
    width: "100%",
    padding: "9px 0",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 8,
    color: "#e0e0e0",
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.2s",
  },

  // Settings row
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 14,
    color: "#e0e0e0",
  },

  // Toggle
  toggleWrapper: {
    cursor: "pointer",
  },
  toggleTrack: {
    width: 46,
    height: 24,
    borderRadius: 12,
    position: "relative",
    cursor: "pointer",
    transition: "background 0.25s",
  },
  toggleThumb: {
    position: "absolute",
    top: 2,
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#fff",
    transition: "transform 0.25s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
  },

  // Buttons
  saveBtn: {
    background: "#4A90E2",
    border: "none",
    color: "#fff",
    padding: "8px 22px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#FF4444",
    border: "none",
    color: "#fff",
    padding: "7px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },

  // Select
  select: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 8,
    color: "#e0e0e0",
    padding: "6px 10px",
    fontSize: 13,
    cursor: "pointer",
    outline: "none",
  },

  // Footer
  footer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 28,
  },
  logoutBtn: {
    background: "transparent",
    border: "2px solid #4A90E2",
    color: "#e0e0e0",
    padding: "10px 36px",
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: 0.5,
  },
};

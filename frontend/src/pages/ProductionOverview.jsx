import React, { useEffect, useState } from "react";

function ProductionOverview() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://https://visioninspectai-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/factory-supervisor-analytics`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Analytics request failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          throw new Error("Analytics data could not be loaded.");
        }

        setAnalytics(data);
        setError("");
      })
      .catch((err) => {
        console.error("Production Overview error:", err);
        setError(
          "Unable to load production data. Please make sure the backend is running."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingIcon}>🏭</div>
          <h2>Loading Production Overview...</h2>
          <p>Fetching actual inspection data from the factory database.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠️</div>
          <h2>Production Data Unavailable</h2>
          <p>{error}</p>

          <button
            style={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const summary = analytics?.summary || {};
  const weekly = analytics?.weekly || [];

  const totalInspections = summary.total_inspections ?? 0;
  const passedProducts = summary.passed_products ?? 0;
  const defectiveProducts = summary.defective_products ?? 0;
  const failedProducts = summary.failed_products ?? 0;
  const qualityRate = summary.quality_rate ?? 0;
  const defectRate = summary.defect_rate ?? 0;

  const latestWeek =
    weekly.length > 0
      ? weekly[weekly.length - 1]
      : null;

  return (
    <div style={styles.page}>

      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <div style={styles.badge}>
            LIVE FACTORY DATA
          </div>

          <h1 style={styles.title}>
            🏭 Production Overview
          </h1>

          <p style={styles.subtitle}>
            Monitor production inspection performance using
            actual database records.
          </p>
        </div>

        <div style={styles.statusBox}>
          <div style={styles.statusDot}></div>

          <div>
            <strong style={styles.statusTitle}>
              System Connected
            </strong>

            <span style={styles.statusText}>
              Live inspection analytics
            </span>
          </div>
        </div>
      </div>


      {/* MAIN SUMMARY */}

      <div style={styles.cards}>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📦</div>

          <span style={styles.cardLabel}>
            TOTAL INSPECTIONS
          </span>

          <h2 style={styles.blueNumber}>
            {totalInspections}
          </h2>

          <p style={styles.cardText}>
            Actual inspection records
          </p>
        </div>


        <div style={styles.card}>
          <div style={styles.cardIcon}>🔍</div>

          <span style={styles.cardLabel}>
            PRODUCTS INSPECTED
          </span>

          <h2 style={styles.cyanNumber}>
            {totalInspections}
          </h2>

          <p style={styles.cardText}>
            Products processed by AI inspection
          </p>
        </div>


        <div style={styles.card}>
          <div style={styles.cardIcon}>✅</div>

          <span style={styles.cardLabel}>
            PASSED
          </span>

          <h2 style={styles.greenNumber}>
            {passedProducts}
          </h2>

          <p style={styles.cardText}>
            Good products detected
          </p>
        </div>


        <div style={styles.card}>
          <div style={styles.cardIcon}>🚨</div>

          <span style={styles.cardLabel}>
            DEFECTIVE
          </span>

          <h2 style={styles.redNumber}>
            {defectiveProducts}
          </h2>

          <p style={styles.cardText}>
            Defective products detected
          </p>
        </div>

      </div>


      {/* PRODUCTION PERFORMANCE */}

      <div style={styles.section}>

        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Production Performance
            </h2>

            <p style={styles.sectionText}>
              Current factory quality and inspection performance
              calculated from real inspection results.
            </p>
          </div>

          <div style={styles.liveBadge}>
            ● LIVE
          </div>
        </div>


        <div style={styles.performanceGrid}>

          {/* QUALITY */}

          <div style={styles.performanceCard}>

            <div style={styles.performanceTop}>
              <span>Quality Rate</span>
              <span>✓</span>
            </div>

            <div style={styles.progressBackground}>
              <div
                style={{
                  ...styles.qualityProgress,
                  width: `${Math.min(
                    Math.max(qualityRate, 0),
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div style={styles.performanceBottom}>
              <strong>
                {qualityRate}%
              </strong>

              <span>
                Passed products
              </span>
            </div>

          </div>


          {/* DEFECT */}

          <div style={styles.performanceCard}>

            <div style={styles.performanceTop}>
              <span>Defect Rate</span>
              <span>⚠</span>
            </div>

            <div style={styles.progressBackground}>
              <div
                style={{
                  ...styles.defectProgress,
                  width: `${Math.min(
                    Math.max(defectRate, 0),
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div style={styles.performanceBottom}>
              <strong>
                {defectRate}%
              </strong>

              <span>
                Defective products
              </span>
            </div>

          </div>


          {/* FAILED */}

          <div style={styles.performanceCard}>

            <div style={styles.performanceTop}>
              <span>Failed Quality Decisions</span>
              <span>⛔</span>
            </div>

            <div style={styles.failedNumber}>
              {failedProducts}
            </div>

            <span style={styles.smallText}>
              Actual FAIL decisions
            </span>

          </div>

        </div>

      </div>


      {/* LATEST PRODUCTION ACTIVITY */}

      <div style={styles.activitySection}>

        <div style={styles.activityHeader}>

          <div>
            <h2 style={styles.sectionTitle}>
              📊 Latest Production Activity
            </h2>

            <p style={styles.sectionText}>
              Most recent weekly inspection activity available
              in the database.
            </p>
          </div>

        </div>


        {latestWeek ? (

          <div style={styles.latestCard}>

            <div style={styles.latestItem}>
              <span>Week Starting</span>

              <strong>
                {new Date(
                  latestWeek.week_start
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </strong>
            </div>


            <div style={styles.latestItem}>
              <span>Inspections</span>

              <strong>
                {latestWeek.inspections ?? 0}
              </strong>
            </div>


            <div style={styles.latestItem}>
              <span>Defects</span>

              <strong style={styles.redText}>
                {latestWeek.defects ?? 0}
              </strong>
            </div>


            <div style={styles.latestItem}>
              <span>Passed</span>

              <strong style={styles.greenText}>
                {latestWeek.passed ?? 0}
              </strong>
            </div>

          </div>

        ) : (

          <div style={styles.emptyCard}>
            No weekly production records are available yet.
          </div>

        )}

      </div>


      {/* FACTORY STATUS */}

      <div style={styles.statusSection}>

        <div style={styles.factoryIcon}>
          🏭
        </div>

        <div style={styles.factoryInfo}>

          <h2>
            Factory Inspection Status
          </h2>

          <p>
            AI inspection system is connected to the
            PostgreSQL inspection database.
          </p>

        </div>

        <div style={styles.connected}>
          <span style={styles.connectedDot}></span>
          Connected
        </div>

      </div>

    </div>
  );
}


const styles = {

  page: {
    minHeight: "100vh",
    padding: "35px",
    background:
      "linear-gradient(135deg, #07111f 0%, #0f172a 50%, #111827 100%)",
    color: "#f8fafc",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },


  header: {
    padding: "35px",
    borderRadius: "24px",
    marginBottom: "30px",
    background:
      "linear-gradient(135deg, #1d4ed8, #0891b2, #0e7490)",
    boxShadow:
      "0 20px 45px rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
  },


  badge: {
    display: "inline-block",
    padding: "7px 12px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.15)",
    color: "#e0f2fe",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginBottom: "12px",
  },


  title: {
    margin: "0 0 10px",
    fontSize: "40px",
  },


  subtitle: {
    margin: 0,
    color: "#dbeafe",
    fontSize: "16px",
    lineHeight: 1.6,
  },


  statusBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    borderRadius: "16px",
    background: "rgba(0,0,0,0.18)",
    minWidth: "190px",
  },


  statusDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow:
      "0 0 15px rgba(34,197,94,0.8)",
  },


  statusTitle: {
    display: "block",
    fontSize: "13px",
  },


  statusText: {
    display: "block",
    marginTop: "3px",
    fontSize: "11px",
    color: "#bae6fd",
  },


  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },


  card: {
    position: "relative",
    overflow: "hidden",
    padding: "25px",
    borderRadius: "20px",
    background:
      "linear-gradient(145deg, #172554, #1e293b)",
    border:
      "1px solid rgba(96,165,250,0.15)",
    boxShadow:
      "0 12px 30px rgba(0,0,0,0.22)",
  },


  cardIcon: {
    fontSize: "28px",
    marginBottom: "18px",
  },


  cardLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },


  blueNumber: {
    color: "#60a5fa",
    fontSize: "38px",
    margin: "8px 0",
  },


  cyanNumber: {
    color: "#22d3ee",
    fontSize: "38px",
    margin: "8px 0",
  },


  greenNumber: {
    color: "#4ade80",
    fontSize: "38px",
    margin: "8px 0",
  },


  redNumber: {
    color: "#fb7185",
    fontSize: "38px",
    margin: "8px 0",
  },


  cardText: {
    color: "#94a3b8",
    fontSize: "12px",
    margin: 0,
  },


  section: {
    padding: "28px",
    borderRadius: "22px",
    background: "#111c2e",
    border:
      "1px solid rgba(148,163,184,0.12)",
    boxShadow:
      "0 15px 35px rgba(0,0,0,0.2)",
    marginBottom: "30px",
  },


  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },


  sectionTitle: {
    margin: 0,
    color: "#e0f2fe",
    fontSize: "22px",
  },


  sectionText: {
    margin: "8px 0 0",
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: 1.6,
  },


  liveBadge: {
    color: "#4ade80",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "8px 13px",
    borderRadius: "20px",
    background: "rgba(34,197,94,0.1)",
  },


  performanceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
  },


  performanceCard: {
    padding: "22px",
    borderRadius: "17px",
    background: "#0b1324",
    border:
      "1px solid rgba(255,255,255,0.06)",
  },


  performanceTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#cbd5e1",
    fontSize: "13px",
    marginBottom: "18px",
  },


  progressBackground: {
    height: "10px",
    borderRadius: "20px",
    background: "#1e293b",
    overflow: "hidden",
  },


  qualityProgress: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg, #16a34a, #4ade80)",
    transition: "width 0.8s ease",
  },


  defectProgress: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg, #dc2626, #fb923c)",
    transition: "width 0.8s ease",
  },


  performanceBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "13px",
  },


  failedNumber: {
    fontSize: "35px",
    fontWeight: "bold",
    color: "#f87171",
    marginBottom: "7px",
  },


  smallText: {
    color: "#94a3b8",
    fontSize: "12px",
  },


  activitySection: {
    padding: "28px",
    borderRadius: "22px",
    background:
      "linear-gradient(145deg, #172033, #101827)",
    border:
      "1px solid rgba(56,189,248,0.12)",
    marginBottom: "30px",
  },


  activityHeader: {
    marginBottom: "22px",
  },


  latestCard: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
  },


  latestItem: {
    padding: "20px",
    borderRadius: "15px",
    background: "#0b1324",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },


  latestItemSpan: {
    color: "#94a3b8",
  },


  latestItemStrong: {
    color: "#f8fafc",
  },


  redText: {
    color: "#fb7185",
  },


  greenText: {
    color: "#4ade80",
  },


  emptyCard: {
    padding: "25px",
    borderRadius: "15px",
    background: "#0b1324",
    color: "#94a3b8",
    textAlign: "center",
  },


  statusSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "24px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #0f766e, #164e63)",
    boxShadow:
      "0 15px 35px rgba(0,0,0,0.2)",
  },


  factoryIcon: {
    fontSize: "38px",
  },


  factoryInfo: {
    flex: 1,
  },


  factoryInfoH2: {
    margin: 0,
  },


  factoryInfoP: {
    margin: "6px 0 0",
    color: "#bae6fd",
    fontSize: "13px",
  },


  connected: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#bbf7d0",
    fontWeight: "bold",
    fontSize: "13px",
  },


  connectedDot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#4ade80",
  },


  loadingCard: {
    maxWidth: "600px",
    margin: "100px auto",
    padding: "45px",
    textAlign: "center",
    borderRadius: "22px",
    background: "#111c2e",
  },


  loadingIcon: {
    fontSize: "50px",
  },


  errorCard: {
    maxWidth: "600px",
    margin: "100px auto",
    padding: "45px",
    textAlign: "center",
    borderRadius: "22px",
    background: "#111c2e",
    border:
      "1px solid rgba(248,113,113,0.3)",
  },


  errorIcon: {
    fontSize: "45px",
  },


  retryButton: {
    marginTop: "15px",
    padding: "11px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ProductionOverview;
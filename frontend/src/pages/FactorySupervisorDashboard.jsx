import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FactorySupervisorDashboard.css";

function FactorySupervisorDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://visioninspectai-backend.onrender.com";

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
        console.error("Factory analytics error:", err);
        setError(
          "Unable to load factory analytics. Please make sure the backend is running."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="hero">
          <h1>Factory Supervisor Dashboard</h1>
          <p>Loading factory analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="hero">
          <h1>Factory Supervisor Dashboard</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const summary = analytics?.summary || {};
  const weekly = analytics?.weekly || [];
  const monthly = analytics?.monthly || [];
  const defectTypes = analytics?.defect_types || [];
  const severity = analytics?.severity || [];

  const maxWeeklyValue = Math.max(
    ...weekly.map((item) => item.inspections || 0),
    1
  );

  const maxMonthlyValue = Math.max(
    ...monthly.map((item) => item.inspections || 0),
    1
  );

  const maxDefectValue = Math.max(
    ...defectTypes.map((item) => item.count || 0),
    1
  );

  const maxSeverityValue = Math.max(
    ...severity.map((item) => item.count || 0),
    1
  );

  return (
    <div className="dashboard">

      {/* =====================================================
          HERO
      ====================================================== */}

      <div className="hero">
        <h1>Factory Supervisor Dashboard</h1>

        <p>
          Production Monitoring & Quality Analytics
        </p>

        <div className="hero-btns">
          <a href="#production-overview">
            <button>
              Production Overview
            </button>
          </a>

          <a href="#factory-reports">
            <button className="outline">
              Factory Reports
            </button>
          </a>
        </div>
      </div>


      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="cards">

        <div className="card">
          <h2>{summary.total_inspections ?? 0}</h2>
          <p>Total Inspections</p>
          <span>Actual database records</span>
        </div>

        <div className="card">
          <h2>{summary.defective_products ?? 0}</h2>
          <p>Defective Products</p>
          <span>
            {summary.defect_rate ?? 0}% defect rate
          </span>
        </div>

        <div className="card">
          <h2>{summary.passed_products ?? 0}</h2>
          <p>Passed Products</p>
          <span>
            {summary.quality_rate ?? 0}% quality rate
          </span>
        </div>

        <div className="card">
          <h2>{summary.failed_products ?? 0}</h2>
          <p>Failed Products</p>
          <span>Critical quality decisions</span>
        </div>

      </div>


      {/* =====================================================
          PRODUCTION OVERVIEW
      ====================================================== */}

      <div
        className="graph-section"
        id="production-overview"
      >

        <div className="graph-card">

          <h2>Weekly Inspection Overview</h2>

          <p className="chart-description">
            Actual inspections, defects and passed products
            recorded each week.
          </p>

          <div className="bar-chart">

            {weekly.map((item) => {

              const inspectionHeight =
                ((item.inspections || 0) / maxWeeklyValue) * 100;

              return (
                <div
                  className="bar-column"
                  key={item.week_start}
                >

                  <div className="bar-value">
                    {item.inspections}
                  </div>

                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{
                        height: `${Math.max(
                          inspectionHeight,
                          4
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <div className="bar-label">
                    {new Date(
                      item.week_start
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </div>

                  <div className="bar-details">
                    <span>
                      Defects: {item.defects}
                    </span>

                    <span>
                      Passed: {item.passed}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ===================================================
            QUALITY SUMMARY
        ==================================================== */}

        <div className="graph-card">

          <h2>Quality Performance</h2>

          <p className="chart-description">
            Overall quality performance based on inspection
            results.
          </p>

          <div className="quality-circle">

            <div className="quality-circle-inner">
              <strong>
                {summary.quality_rate ?? 0}%
              </strong>

              <span>Quality Rate</span>
            </div>

          </div>

          <div className="quality-stats">

            <div>
              <strong>
                {summary.passed_products ?? 0}
              </strong>
              <span>Passed</span>
            </div>

            <div>
              <strong>
                {summary.defective_products ?? 0}
              </strong>
              <span>Defective</span>
            </div>

            <div>
              <strong>
                {summary.failed_products ?? 0}
              </strong>
              <span>Failed</span>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MONTHLY DEFECT ANALYTICS
      ====================================================== */}

      <div className="analytics-section">

        <div className="graph-card">

          <h2>Monthly Defect Analysis</h2>

          <p className="chart-description">
            Monthly inspection and defect monitoring using
            actual inspection records.
          </p>

          <div className="monthly-chart">

            {monthly.map((item) => {

              const inspectionHeight =
                ((item.inspections || 0) /
                  maxMonthlyValue) *
                100;

              const defectHeight =
                ((item.defects || 0) /
                  maxMonthlyValue) *
                100;

              return (
                <div
                  className="monthly-column"
                  key={item.month}
                >

                  <div className="monthly-bars">

                    <div className="monthly-bar-group">

                      <div className="bar-number">
                        {item.inspections}
                      </div>

                      <div
                        className="monthly-bar inspection-bar"
                        style={{
                          height: `${Math.max(
                            inspectionHeight,
                            4
                          )}%`,
                        }}
                      ></div>

                    </div>


                    <div className="monthly-bar-group">

                      <div className="bar-number">
                        {item.defects}
                      </div>

                      <div
                        className="monthly-bar defect-bar"
                        style={{
                          height: `${Math.max(
                            defectHeight,
                            4
                          )}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  <strong>
                    {item.month}
                  </strong>

                  <div className="monthly-info">
                    <span>
                      Inspections: {item.inspections}
                    </span>

                    <span>
                      Defects: {item.defects}
                    </span>

                    <span>
                      Passed: {item.passed}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

          <div className="chart-legend">

            <span>
              <i className="legend inspection"></i>
              Inspections
            </span>

            <span>
              <i className="legend defect"></i>
              Defects
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          DEFECT TYPE ANALYTICS
      ====================================================== */}

      <div className="analytics-section">

        <div className="graph-card">

          <h2>Defect Type Analysis</h2>

          <p className="chart-description">
            Actual defect categories detected during product
            inspections.
          </p>

          <div className="horizontal-chart">

            {defectTypes.map((item) => {

              const width =
                ((item.count || 0) /
                  maxDefectValue) *
                100;

              return (
                <div
                  className="horizontal-row"
                  key={item.defect_type}
                >

                  <div className="horizontal-label">
                    {item.defect_type}
                  </div>

                  <div className="horizontal-track">

                    <div
                      className="horizontal-fill"
                      style={{
                        width: `${Math.max(
                          width,
                          2
                        )}%`,
                      }}
                    ></div>

                  </div>

                  <strong>
                    {item.count}
                  </strong>

                </div>
              );
            })}

          </div>

        </div>

      </div>


      {/* =====================================================
          SEVERITY ANALYTICS
      ====================================================== */}

      <div className="analytics-section">

        <div className="graph-card">

          <h2>Defect Severity</h2>

          <p className="chart-description">
            Distribution of detected defects by severity
            level.
          </p>

          <div className="severity-grid">

            {severity.map((item) => {

              const width =
                ((item.count || 0) /
                  maxSeverityValue) *
                100;

              return (
                <div
                  className="severity-item"
                  key={item.severity_level}
                >

                  <div className="severity-header">
                    <strong>
                      {item.severity_level}
                    </strong>

                    <span>
                      {item.count}
                    </span>
                  </div>

                  <div className="severity-track">

                    <div
                      className="severity-fill"
                      style={{
                        width: `${Math.max(
                          width,
                          3
                        )}%`,
                      }}
                    ></div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>


      {/* =====================================================
          FACTORY FEATURES
      ====================================================== */}

      <div
        className="section"
        id="factory-reports"
      >

        <h2>Factory Operations</h2>

        <p className="section-description">
          Monitor production, inspections and factory quality
          performance from one place.
        </p>

        <div className="feature-grid">

          <Link to="/production-overview">
            <div>
              🏭
              <strong>Production Overview</strong>
              <span>
                View production inspection performance
              </span>
            </div>
          </Link>

          <Link to="/inspection-reports">
            <div>
              📄
              <strong>Inspection Reports</strong>
              <span>
                Review product inspection results
              </span>
            </div>
          </Link>

          <Link to="/quality-analytics">
            <div>
              📊
              <strong>Quality Analytics</strong>
              <span>
                Analyze quality and defect performance
              </span>
            </div>
          </Link>

          <Link to="/production-monitoring">
            <div>
              ⚙️
              <strong>Production Monitoring</strong>
              <span>
                Monitor current factory inspection activity
              </span>
            </div>
          </Link>

          <Link to="/factory-performance">
            <div>
              🏆
              <strong>Factory Performance</strong>
              <span>
                Review overall factory performance
              </span>
            </div>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default FactorySupervisorDashboard;
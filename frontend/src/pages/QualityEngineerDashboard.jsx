import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function QualityEngineerDashboard() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  const loadInspections = async () => {
    try {
     const response = await fetch(
  "https://visioninspectai-backend.onrender.com/inspections"
);
      const data = await response.json();

      if (data.success) {
        setInspections(data.inspections);
      }
    } catch (error) {
      console.error("Failed to load inspections:", error);
    } finally {
      setLoading(false);
    }
  };
const loadAnalytics = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/defect-analytics"
    )
    const data = await response.json();

    if (data.success) {
  console.log("QUALITY ANALYTICS DATA:", data);
  setAnalytics(data);
}

  } catch (error) {

    console.error(
      "Failed to load analytics:",
      error
    );

  }
};
  useEffect(() => {
  loadInspections();
  loadAnalytics();
}, []);
  const totalInspections = inspections.length;

  const passedProducts = inspections.filter(
    (item) => item.result === "GOOD"
  ).length;

  const defectiveProducts = inspections.filter(
    (item) => item.result === "DEFECT"
  ).length;
  const defectRate =
  totalInspections > 0
    ? ((defectiveProducts / totalInspections) * 100).toFixed(2)
    : 0;

    const weekly = analytics?.weekly || [];
  const monthly = analytics?.monthly || [];

  const maxWeeklyValue = Math.max(
    ...weekly.map((item) => item.inspections || 0),
    1
  );

  const maxMonthlyValue = Math.max(
    ...monthly.map((item) => item.inspections || 0),
    1
  );

  return (
    <div className="dashboard">

      {/* Hero Section */}
      <div className="hero">
        <h1>QualityEngineerDashboard</h1>
        <p>
          AI Manufacturing Defect Detection & Quality Inspection System
        </p>

        <div className="hero-btns">

  <Link to="/start-ai-inspection">
    <button>Start Inspection</button>
  </Link>

  <Link to="/quality-reports">
    <button className="outline">
      Quality Report
    </button>
  </Link>

</div>
      </div>

      {/* Summary Cards */}
      <div className="cards">

        <div className="card">
          <h2>{totalInspections}</h2>
          <p>Total Inspections</p>
        </div>

        <div className="card">
          <h2>{passedProducts}</h2>
          <p>Passed Products</p>
        </div>

        <div className="card">
          <h2>{defectiveProducts}</h2>
          <p>Defective Products</p>
        </div>

        <div className="card">
  <h2>{defectRate}%</h2>
  <p>Defect Rate</p>
</div>

      </div>

        {/* Weekly and Monthly Analytics */}

<div className="analytics-section">

  {/* Weekly Analytics */}
  <div className="graph-card">

    <h2>Weekly Inspection Analytics</h2>

    <p className="chart-description">
      Weekly inspection performance based on actual database records.
    </p>

    {weekly.length === 0 ? (
      <p>No weekly analytics available.</p>
    ) : (
      <div className="bar-chart">

        {weekly.map((item) => (

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
                  height: `${(item.inspections / maxWeeklyValue) * 100}%`
                }}
              ></div>

            </div>

            <div className="bar-label">

              {new Date(item.week_start).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric"
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

        ))}

      </div>
    )}

  </div>


  {/* Monthly Analytics */}
  <div className="graph-card">

    <h2>Monthly Inspection Analytics</h2>

    <p className="chart-description">
      Monthly inspections and defects based on actual database records.
    </p>

    {monthly.length === 0 ? (
      <p>No monthly analytics available.</p>
    ) : (
      <div className="monthly-chart">

        {monthly.map((item) => (

          <div
            className="monthly-column"
            key={item.month}
          >

            <div className="monthly-bars">

              {/* Inspections */}
              <div className="monthly-bar-group">

                <span className="bar-number">
                  {item.inspections}
                </span>

                <div
                  className="monthly-bar inspection-bar"
                  style={{
                    height: `${(item.inspections / maxMonthlyValue) * 100}%`
                  }}
                ></div>

              </div>


              {/* Defects */}
              <div className="monthly-bar-group">

                <span className="bar-number">
                  {item.defects}
                </span>

                <div
                  className="monthly-bar defect-bar"
                  style={{
                    height: `${(item.defects / maxMonthlyValue) * 100}%`
                  }}
                ></div>

              </div>

            </div>

            <strong>
              {item.month}
            </strong>

            <div className="monthly-info">

              <span>
                Passed: {item.passed}
              </span>

            </div>

          </div>

        ))}

      </div>
    )}

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
      {/* Features */}
      <div className="section">

        <h2>Features</h2>

        <div className="feature-grid">

          <Link to="/upload">
            <div>📤 Upload Product Image</div>
          </Link>

          <Link to="/start-ai-inspection">
            <div>🤖 Start AI Inspection</div>
          </Link>

          <Link to="/inspection-result">
            <div>📄 Inspection Results</div>
          </Link>

          <Link to="/quality-reports">
            <div>📊 Quality Reports</div>
          </Link>

          <Link to="/inspection-history">
            <div>🕒 Inspection History</div>
          </Link>

          <Link to="/profile">
            <div>👤 Profile</div>
          </Link>
          <Link to="/defect-analytics">
  <div>📈 Defect Analytics Dashboard</div>
</Link>

        </div>

      </div>

      {/* Recent Inspection Results */}
      <div className="section">

        <h2>Recent Inspection Results</h2>

        {loading ? (
          <p>Loading inspection results...</p>
        ) : inspections.length === 0 ? (
          <p>No inspections available yet.</p>
        ) : (
          <div>

            {inspections.map((inspection, index) => (

              <div
                key={index}
                style={{
                  padding: "15px",
                  marginBottom: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >

                <p>
                  <strong>Image:</strong>{" "}
                  {inspection.filename}
                </p>

                <p>
                  <strong>Result:</strong>{" "}
                  {inspection.result}
                </p>

                <p>
                  <strong>Prediction:</strong>{" "}
                  {inspection.prediction}
                </p>
                <p>
  <strong>Defect Type:</strong>{" "}
  {inspection.defect_type}
</p>

                <p>
                  <strong>Confidence:</strong>{" "}
                  {inspection.confidence}%
                </p>
                <p>
  <strong>Severity Score:</strong>{" "}
  {inspection.severity_score ?? "Not available"}
</p>

<p>
  <strong>Severity Level:</strong>{" "}
  {inspection.severity_level ?? "Not available"}
</p>
<p>
  <strong>Quality Decision:</strong>{" "}
  {inspection.quality_decision}
</p>

<p>
  <strong>Quality Recommendation:</strong>{" "}
  {inspection.quality_recommendation}
</p>

                <p>
                  <strong>Inspection:</strong>{" "}
                  {inspection.inspection_result}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Responsibilities */}
      <div className="section">

        <h2>Responsibilities</h2>

        <ul>
          <li>✔ Upload Product Images</li>
          <li>✔ Perform AI Inspection</li>
          <li>✔ Review Defect Details</li>
          <li>✔ Verify Pass/Fail Status</li>
          <li>✔ Generate Inspection Reports</li>
        </ul>

      </div>

    </div>
  );
}

export default QualityEngineerDashboard;
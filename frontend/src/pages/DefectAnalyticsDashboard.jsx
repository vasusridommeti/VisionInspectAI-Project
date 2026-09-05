import { useEffect, useState } from "react";
import "./DefectAnalyticsDashboard.css";

function DefectAnalyticsDashboard() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  loadAnalytics();
}, []);

const totalDefects =
  analytics?.defect_types?.reduce(
    (total, item) => total + item.count,
    0
  ) || 0;

const loadAnalytics = async () => {
    try {

      const response = await fetch(
        "https://visioninspectai-backend.onrender.com/factory-supervisor-analytics"
      );

      const data = await response.json();

      console.log("DEFECT ANALYTICS:", data);

      if (data.success) {
        setAnalytics(data);
      }

    } catch (error) {

      console.error(
        "Failed to load analytics:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Analytics...</h2>;
  }

  if (!analytics) {
    return <h2>No Analytics Available</h2>;
  }

 return (
  <div className="defect-dashboard">

    <div className="defect-dashboard-header">
      <h1>Defect Analytics Dashboard</h1>
      <p>
        Real-time defect and severity analysis from inspection data.
      </p>
    </div>

    <div className="analytics-summary">

      <div className="analytics-card">
        <h3>Total Inspections</h3>
        <p>{analytics.summary?.total_inspections ?? 0}</p>
      </div>

      <div className="analytics-card">
        <h3>Passed Products</h3>
        <p>{analytics.summary?.passed_products ?? 0}</p>
      </div>

      <div className="analytics-card">
        <h3>Defective Products</h3>
        <p>{analytics.summary?.defective_products ?? 0}</p>
      </div>

      <div className="analytics-card">
        <h3>Defect Rate</h3>
        <p>
          {analytics.summary?.defect_rate ?? 0}%
        </p>
      </div>

      <div className="analytics-card">
        <h3>Failed Products</h3>
        <p>{analytics.summary?.failed_products ?? 0}</p>
      </div>

    </div>
    <div className="analytics-section">

  <h2>Defect Type Analysis</h2>

  <div className="defect-type-list">

    {[...(analytics.defect_types || [])]
  .sort((a, b) => {
    if (a.defect_type === "Unknown") return 1;
    if (b.defect_type === "Unknown") return -1;
    return b.count - a.count;
  })
  .map((item, index) => (
      <div className="defect-type-row" key={index}>

        <div className="defect-type-name">
          {item.defect_type}
        </div>

        <div className="defect-type-bar-container">

          <div
            className="defect-type-bar"
            style={{
  width: `${(item.count / 30) * 100}%`
}}
          >
            {item.count}
          </div>

        </div>

      </div>
    ))}

  </div>

</div>
<div className="analytics-section severity-section">

      <h2>Severity Level Analysis</h2>

      <div className="defect-type-list">

        {analytics.severity?.map((item, index) => (
          <div className="defect-type-row" key={index}>

            <div className="defect-type-name">
              {item.severity_level}
            </div>

            <div className="defect-type-bar-container">

              <div
                className="defect-type-bar"
                style={{
  width: `${(item.count / 30) * 100}%`
}}
              >
                {item.count}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>

  </div>
);
}

export default DefectAnalyticsDashboard;
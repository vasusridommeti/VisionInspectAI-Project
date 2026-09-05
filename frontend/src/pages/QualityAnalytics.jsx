import React, { useEffect, useState } from "react";

function QualityAnalytics() {

const API_URL = "https://visioninspectai-backend.onrender.com";

const [analytics, setAnalytics] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {

fetch(`${API_URL}/factory-supervisor-analytics`)
  .then((response) => {

    if (!response.ok) {
      throw new Error("Failed to fetch quality analytics");
    }

    return response.json();
  })
  .then((data) => {

    if (!data.success) {
      throw new Error("Analytics data could not be loaded");
    }

    setAnalytics(data);
    setLoading(false);
  })
  .catch((error) => {

    console.error("Quality analytics error:", error);

    setError(
      "Unable to load quality analytics. Please make sure the backend is running."
    );

    setLoading(false);
  });

}, []);

if (loading) {
return (
<div className="page-container">
<h1>📊 Quality Analytics</h1>
<p>Loading real quality analytics...</p>
</div>
);
}

if (error) {
return (
<div className="page-container">
<h1>📊 Quality Analytics</h1>

    <p style={{ color: "#ef4444" }}>
      {error}
    </p>
  </div>
);

}

const summary = analytics.summary;

return (
<div className="page-container">

  <h1>📊 Quality Analytics</h1>

  <p>
    AI-powered quality analysis based on actual factory inspection records.
  </p>


  <table
    style={{
      width: "100%",
      marginTop: "30px",
      borderCollapse: "collapse",
      textAlign: "center",
      color: "white",
    }}
  >

    <thead style={{ background: "#2563eb" }}>

      <tr>

        <th style={{ padding: "15px" }}>
          Metric
        </th>

        <th style={{ padding: "15px" }}>
          Actual Value
        </th>

      </tr>

    </thead>


    <tbody>

      <tr style={{ background: "#0f172a" }}>

        <td style={{ padding: "15px" }}>
          Total Inspections
        </td>

        <td
          style={{
            padding: "15px",
            color: "#38bdf8",
            fontWeight: "bold",
          }}
        >
          {summary.total_inspections}
        </td>

      </tr>


      <tr style={{ background: "#111827" }}>

        <td style={{ padding: "15px" }}>
          Passed Products
        </td>

        <td
          style={{
            padding: "15px",
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          {summary.passed_products}
        </td>

      </tr>


      <tr style={{ background: "#0f172a" }}>

        <td style={{ padding: "15px" }}>
          Defective Products
        </td>

        <td
          style={{
            padding: "15px",
            color: "#ef4444",
            fontWeight: "bold",
          }}
        >
          {summary.defective_products}
        </td>

      </tr>


      <tr style={{ background: "#111827" }}>

        <td style={{ padding: "15px" }}>
          Failed Products
        </td>

        <td
          style={{
            padding: "15px",
            color: "#ef4444",
            fontWeight: "bold",
          }}
        >
          {summary.failed_products}
        </td>

      </tr>


      <tr style={{ background: "#0f172a" }}>

        <td style={{ padding: "15px" }}>
          Quality Rate
        </td>

        <td
          style={{
            padding: "15px",
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          {summary.quality_rate}%
        </td>

      </tr>


      <tr style={{ background: "#111827" }}>

        <td style={{ padding: "15px" }}>
          Defect Rate
        </td>

        <td
          style={{
            padding: "15px",
            color: "#ef4444",
            fontWeight: "bold",
          }}
        >
          {summary.defect_rate}%
        </td>

      </tr>

    </tbody>

  </table>

</div>

);
}

export default QualityAnalytics;
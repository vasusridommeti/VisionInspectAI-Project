import React, { useEffect, useState } from "react";

function ProductionMonitoring() {
const API_URL = "https://visioninspectai-backend.onrender.com";

const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
fetch(`${API_URL}/factory-supervisor-analytics`)
.then((response) => {
if (!response.ok) {
throw new Error("Unable to load production monitoring data.");
}

    return response.json();
  })
  .then((result) => {
    if (!result.success) {
      throw new Error("Invalid analytics response.");
    }

    setData(result);
    setLoading(false);
  })
  .catch((err) => {
    console.error("Production Monitoring Error:", err);
    setError("Unable to load production monitoring data.");
    setLoading(false);
  });

}, []);

if (loading) {
return (
<div
className="page-container"
style={{
padding: "40px",
color: "white",
textAlign: "center",
}}
>
<h1>⚙️ Production Monitoring</h1>
<p style={{ color: "#94a3b8", marginTop: "20px" }}>
Loading real production data...
</p>
</div>
);
}

if (error) {
return (
<div
className="page-container"
style={{
padding: "40px",
color: "white",
textAlign: "center",
}}
>
<h1>⚙️ Production Monitoring</h1>

    <div
      style={{
        marginTop: "30px",
        padding: "25px",
        background: "#1e293b",
        borderRadius: "15px",
        border: "1px solid #ef4444",
      }}
    >
      <h3 style={{ color: "#ef4444" }}>⚠️ Unable to Load Data</h3>

      <p
        style={{
          color: "#cbd5e1",
          marginTop: "10px",
        }}
      >
        {error}
      </p>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "10px",
          fontSize: "14px",
        }}
      >
        Please make sure the FastAPI backend is running.
      </p>
    </div>
  </div>
);

}

const summary = data?.summary || {};

const totalInspections = Number(summary.total_inspections || 0);
const passedProducts = Number(summary.passed_products || 0);
const defectiveProducts = Number(summary.defective_products || 0);
const defectRate = Number(summary.defect_rate || 0);
const qualityRate = Number(summary.quality_rate || 0);

const currentStatus =
totalInspections > 0
? "Active"
: "No Inspection Activity";

return (
<div
className="page-container"
style={{
padding: "40px",
color: "white",
minHeight: "100vh",
background: "#0f172a",
}}
>
<h1
style={{
fontSize: "36px",
marginBottom: "10px",
}}
>
⚙️ Production Monitoring
</h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
      marginBottom: "30px",
    }}
  >
    Monitor real-time production inspection activity using
    data recorded by the VisionInspect AI system.
  </p>

  {/* STATUS CARD */}

  <div
    style={{
      background: "linear-gradient(135deg, #1e293b, #334155)",
      padding: "25px",
      borderRadius: "18px",
      marginBottom: "25px",
      border: "1px solid rgba(56,189,248,0.15)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <div>
        <h2
          style={{
            marginBottom: "8px",
            color: "#38bdf8",
          }}
        >
          Inspection Activity
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            margin: 0,
          }}
        >
          Current system inspection status
        </p>
      </div>

      <div
        style={{
          padding: "10px 20px",
          borderRadius: "25px",
          background:
            totalInspections > 0
              ? "rgba(34,197,94,0.15)"
              : "rgba(148,163,184,0.15)",
          color:
            totalInspections > 0
              ? "#22c55e"
              : "#94a3b8",
          fontWeight: "bold",
          border:
            totalInspections > 0
              ? "1px solid rgba(34,197,94,0.3)"
              : "1px solid rgba(148,163,184,0.2)",
        }}
      >
        ● {currentStatus}
      </div>
    </div>
  </div>

  {/* SUMMARY CARDS */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    }}
  >
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        border: "1px solid rgba(56,189,248,0.1)",
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          fontSize: "34px",
          marginBottom: "8px",
        }}
      >
        {totalInspections}
      </h2>

      <p
        style={{
          color: "#e2e8f0",
          fontWeight: "600",
        }}
      >
        Total Inspections
      </p>
    </div>

    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        border: "1px solid rgba(34,197,94,0.1)",
      }}
    >
      <h2
        style={{
          color: "#22c55e",
          fontSize: "34px",
          marginBottom: "8px",
        }}
      >
        {passedProducts}
      </h2>

      <p
        style={{
          color: "#e2e8f0",
          fontWeight: "600",
        }}
      >
        Passed Products
      </p>
    </div>

    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        border: "1px solid rgba(239,68,68,0.1)",
      }}
    >
      <h2
        style={{
          color: "#ef4444",
          fontSize: "34px",
          marginBottom: "8px",
        }}
      >
        {defectiveProducts}
      </h2>

      <p
        style={{
          color: "#e2e8f0",
          fontWeight: "600",
        }}
      >
        Defective Products
      </p>
    </div>

    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        border: "1px solid rgba(168,85,247,0.1)",
      }}
    >
      <h2
        style={{
          color: "#a855f7",
          fontSize: "34px",
          marginBottom: "8px",
        }}
      >
        {qualityRate}%
      </h2>

      <p
        style={{
          color: "#e2e8f0",
          fontWeight: "600",
        }}
      >
        Quality Rate
      </p>
    </div>
  </div>

  {/* PRODUCTION MONITORING TABLE */}

  <div
    style={{
      background: "#1e293b",
      padding: "25px",
      borderRadius: "18px",
      border: "1px solid rgba(56,189,248,0.1)",
      overflowX: "auto",
    }}
  >
    <h2
      style={{
        color: "#38bdf8",
        marginBottom: "10px",
      }}
    >
      📈 Production Quality Monitoring
    </h2>

    <p
      style={{
        color: "#94a3b8",
        marginBottom: "25px",
      }}
    >
      Current production quality indicators calculated from
      actual inspection records.
    </p>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "center",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#2563eb",
          }}
        >
          <th style={{ padding: "15px" }}>
            Metric
          </th>

          <th style={{ padding: "15px" }}>
            Actual Value
          </th>

          <th style={{ padding: "15px" }}>
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          style={{
            background: "#0f172a",
          }}
        >
          <td style={{ padding: "15px" }}>
            Total Inspections
          </td>

          <td
            style={{
              padding: "15px",
              fontWeight: "bold",
            }}
          >
            {totalInspections}
          </td>

          <td
            style={{
              padding: "15px",
              color:
                totalInspections > 0
                  ? "#22c55e"
                  : "#94a3b8",
              fontWeight: "bold",
            }}
          >
            {totalInspections > 0
              ? "Active"
              : "No Activity"}
          </td>
        </tr>

        <tr
          style={{
            background: "#111827",
          }}
        >
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
            {passedProducts}
          </td>

          <td
            style={{
              padding: "15px",
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            PASS
          </td>
        </tr>

        <tr
          style={{
            background: "#0f172a",
          }}
        >
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
            {defectiveProducts}
          </td>

          <td
            style={{
              padding: "15px",
              color: "#ef4444",
              fontWeight: "bold",
            }}
          >
            DEFECT
          </td>
        </tr>

        <tr
          style={{
            background: "#111827",
          }}
        >
          <td style={{ padding: "15px" }}>
            Quality Rate
          </td>

          <td
            style={{
              padding: "15px",
              color: "#38bdf8",
              fontWeight: "bold",
            }}
          >
            {qualityRate}%
          </td>

          <td
            style={{
              padding: "15px",
              color: "#38bdf8",
              fontWeight: "bold",
            }}
          >
            QUALITY
          </td>
        </tr>

        <tr
          style={{
            background: "#0f172a",
          }}
        >
          <td style={{ padding: "15px" }}>
            Defect Rate
          </td>

          <td
            style={{
              padding: "15px",
              color: "#f97316",
              fontWeight: "bold",
            }}
          >
            {defectRate}%
          </td>

          <td
            style={{
              padding: "15px",
              color:
                defectRate > 0
                  ? "#f97316"
                  : "#22c55e",
              fontWeight: "bold",
            }}
          >
            {defectRate > 0
              ? "REVIEW"
              : "NORMAL"}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

);
}

export default ProductionMonitoring;
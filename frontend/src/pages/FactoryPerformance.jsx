import React, { useEffect, useState } from "react";

function FactoryPerformance() {

  const API_URL = "http://https://visioninspectai-backend.onrender.com";

  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`${API_URL}/factory-supervisor-analytics`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch factory performance data");
        }

        return response.json();
      })
      .then((data) => {

        if (!data.success) {
          throw new Error("Factory performance data unavailable");
        }

        setPerformance(data);
        setLoading(false);
      })
      .catch((error) => {

        console.error("Factory Performance Error:", error);

        setError(
          "Unable to load factory performance. Please make sure the FastAPI backend is running."
        );

        setLoading(false);
      });

  }, []);


  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading factory performance...
      </div>
    );

  }


  /* =========================================
     ERROR
  ========================================= */

  if (error) {

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "40px",
        }}
      >

        <div
          style={{
            maxWidth: "700px",
            margin: "80px auto",
            padding: "30px",
            background: "#1e293b",
            borderRadius: "18px",
            textAlign: "center",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >

          <div
            style={{
              fontSize: "45px",
              marginBottom: "15px",
            }}
          >
            ⚠️
          </div>

          <h2
            style={{
              color: "#ef4444",
              marginBottom: "10px",
            }}
          >
            Unable to Load Factory Performance
          </h2>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.6",
            }}
          >
            {error}
          </p>

        </div>

      </div>
    );

  }


  /* =========================================
     REAL DATABASE VALUES
  ========================================= */

  const summary = performance.summary;

  const totalInspections =
    summary.total_inspections || 0;

  const passedProducts =
    summary.passed_products || 0;

  const defectiveProducts =
    summary.defective_products || 0;

  const qualityRate =
    summary.quality_rate || 0;

  const defectRate =
    summary.defect_rate || 0;


  /*
    Factory efficiency is based on the
    actual quality rate from inspections.
  */

  const overallEfficiency =
    qualityRate;


  /* =========================================
     FACTORY STATUS
  ========================================= */

  let factoryStatus = "Needs Attention";
  let statusColor = "#ef4444";
  let statusIcon = "🔴";

  if (qualityRate >= 90) {

    factoryStatus = "Excellent";
    statusColor = "#22c55e";
    statusIcon = "🟢";

  } else if (qualityRate >= 75) {

    factoryStatus = "Good";
    statusColor = "#f59e0b";
    statusIcon = "🟡";

  }


  /* =========================================
     UI
  ========================================= */

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "35px",
      }}
    >

      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >


        {/* =====================================
            HEADER
        ===================================== */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#06b6d4)",
            padding: "35px",
            borderRadius: "20px",
            marginBottom: "30px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,0.25)",
          }}
        >

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "38px",
            }}
          >
            🏆 Factory Performance
          </h1>

          <p
            style={{
              margin: 0,
              color: "#e2e8f0",
              fontSize: "17px",
            }}
          >
            Overall factory production and quality
            performance based on real inspection data.
          </p>

        </div>


        {/* =====================================
            PERFORMANCE CARDS
        ===================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >


          {/* TOTAL INSPECTIONS */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#1e293b,#334155)",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              border:
                "1px solid rgba(56,189,248,0.12)",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >

            <div style={{ fontSize: "30px" }}>
              🔍
            </div>

            <h2
              style={{
                fontSize: "32px",
                color: "#38bdf8",
                margin: "10px 0 5px",
              }}
            >
              {totalInspections}
            </h2>

            <p
              style={{
                margin: 0,
                fontWeight: "600",
              }}
            >
              Total Inspections
            </p>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Actual database records
            </span>

          </div>


          {/* PASSED */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#1e293b,#334155)",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              border:
                "1px solid rgba(34,197,94,0.15)",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >

            <div style={{ fontSize: "30px" }}>
              ✅
            </div>

            <h2
              style={{
                fontSize: "32px",
                color: "#22c55e",
                margin: "10px 0 5px",
              }}
            >
              {passedProducts}
            </h2>

            <p
              style={{
                margin: 0,
                fontWeight: "600",
              }}
            >
              Passed Products
            </p>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Good inspection results
            </span>

          </div>


          {/* DEFECTIVE */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#1e293b,#334155)",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              border:
                "1px solid rgba(239,68,68,0.15)",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >

            <div style={{ fontSize: "30px" }}>
              ⚠️
            </div>

            <h2
              style={{
                fontSize: "32px",
                color: "#ef4444",
                margin: "10px 0 5px",
              }}
            >
              {defectiveProducts}
            </h2>

            <p
              style={{
                margin: 0,
                fontWeight: "600",
              }}
            >
              Defective Products
            </p>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Detected defects
            </span>

          </div>


          {/* QUALITY RATE */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#1e293b,#334155)",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              border:
                "1px solid rgba(168,85,247,0.15)",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >

            <div style={{ fontSize: "30px" }}>
              📈
            </div>

            <h2
              style={{
                fontSize: "32px",
                color: "#a855f7",
                margin: "10px 0 5px",
              }}
            >
              {overallEfficiency}%
            </h2>

            <p
              style={{
                margin: 0,
                fontWeight: "600",
              }}
            >
              Overall Efficiency
            </p>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Based on quality rate
            </span>

          </div>

        </div>


        {/* =====================================
            PERFORMANCE DETAILS
        ===================================== */}

        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "18px",
            border:
              "1px solid rgba(56,189,248,0.12)",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >

          <h2
            style={{
              color: "#38bdf8",
              marginTop: 0,
              marginBottom: "25px",
            }}
          >
            📊 Performance Summary
          </h2>


          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >

            {/* QUALITY RATE */}

            <div
              style={{
                background: "#111827",
                padding: "18px",
                borderRadius: "12px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >

                <span>
                  Quality Rate
                </span>

                <strong
                  style={{
                    color: "#22c55e",
                  }}
                >
                  {qualityRate}%
                </strong>

              </div>

              <div
                style={{
                  height: "10px",
                  background: "#0f172a",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >

                <div
                  style={{
                    width: `${qualityRate}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#16a34a,#22c55e)",
                    borderRadius: "20px",
                  }}
                />

              </div>

            </div>


            {/* DEFECT RATE */}

            <div
              style={{
                background: "#111827",
                padding: "18px",
                borderRadius: "12px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >

                <span>
                  Defect Rate
                </span>

                <strong
                  style={{
                    color: "#ef4444",
                  }}
                >
                  {defectRate}%
                </strong>

              </div>

              <div
                style={{
                  height: "10px",
                  background: "#0f172a",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >

                <div
                  style={{
                    width: `${defectRate}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#dc2626,#f97316)",
                    borderRadius: "20px",
                  }}
                />

              </div>

            </div>


            {/* FACTORY STATUS */}

            <div
              style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >

              <div>

                <span
                  style={{
                    display: "block",
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: "5px",
                  }}
                >
                  Current Factory Status
                </span>

                <strong
                  style={{
                    fontSize: "22px",
                    color: statusColor,
                  }}
                >
                  {statusIcon} {factoryStatus}
                </strong>

              </div>

              <div
                style={{
                  textAlign: "right",
                  color: "#94a3b8",
                  fontSize: "13px",
                }}
              >
                Based on current inspection results
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FactoryPerformance;
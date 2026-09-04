import React, { useEffect, useState } from "react";

function InspectionHistory() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/inspections")
      .then((response) => response.json())
      .then((data) => {
        console.log("Inspection History:", data);

        if (data.success && Array.isArray(data.inspections)) {
          setInspections(data.inspections);
        } else {
          setInspections([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inspection history:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      {/* Heading Section */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: "0 0 12px 0",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          🕒 Inspection History
        </h1>

        <p
          style={{
            margin: "0",
            fontSize: "16px",
            color: "white",
            lineHeight: "1.6",
          }}
        >
          View all previous AI inspections performed on products.
        </p>
      </div>

      {loading ? (
        <p>Loading inspection history...</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "25px",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ background: "#2563eb", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Inspection ID
              </th>

              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Product
              </th>

              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Result
              </th>

              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Defect
              </th>

              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Confidence
              </th>

              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Severity
              </th>

              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Quality
              </th>
            </tr>
          </thead>

          <tbody>
            {inspections.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                  }}
                >
                  {index + 1}
                </td>

                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                  }}
                >
                  {item.filename || "-"}
                </td>

                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    color:
                      item.result === "GOOD" ? "green" : "red",
                  }}
                >
                  {item.result || "-"}
                </td>

                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                  }}
                >
                  {item.defect_type || "-"}
                </td>

                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                  }}
                >
                  {item.confidence !== null &&
                  item.confidence !== undefined
                    ? `${item.confidence}%`
                    : "-"}
                </td>

                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                  }}
                >
                  {item.severity_level || "-"}
                </td>

                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    color:
                      item.quality_decision === "PASS"
                        ? "green"
                        : "red",
                  }}
                >
                  {item.quality_decision || "-"}
                </td>
              </tr>
            ))}

            {inspections.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                  }}
                >
                  No inspection history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InspectionHistory;
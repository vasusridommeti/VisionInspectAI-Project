import { useState } from "react";

function StartAIInspection() {
const [selectedFile, setSelectedFile] = useState(null);
const [preview, setPreview] = useState(null);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleFileChange = (event) => {
const file = event.target.files[0];

if (!file) {
  return;
}

setSelectedFile(file);
setPreview(URL.createObjectURL(file));
setResult(null);
setError("");

};

const startInspection = async () => {
if (!selectedFile) {
setError("Please select a product image first.");
return;
}

setLoading(true);
setResult(null);
setError("");

try {
  const formData = new FormData();
  formData.append("file", selectedFile);

  const response = await fetch(
    "https://visioninspectai-backend.onrender.com/inspect",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Inspection failed."
    );
  }

  if (data.error) {
    throw new Error(data.error);
  }

  setResult(data);
} catch (error) {
  console.error("Inspection error:", error);

  setError(
    error.message ||
      "Unable to connect to the VisionInspect AI backend."
  );
} finally {
  setLoading(false);
}

};

return (
<div
style={{
minHeight: "100vh",
background: "#0f172a",
padding: "45px 20px 60px",
boxSizing: "border-box",
}}
>
<div
style={{
maxWidth: "1050px",
margin: "0 auto",
}}
>

    {/* HEADER */}

    <div
      style={{
        textAlign: "center",
        marginBottom: "35px",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          marginBottom: "8px",
        }}
      >
        🤖
      </div>

      <h1
        style={{
          margin: "0 0 10px",
          fontSize: "34px",
          fontWeight: "700",
          color: "#ffffff",
        }}
      >
        Start AI Inspection
      </h1>

      <p
        style={{
          margin: 0,
          color: "#cbd5e1",
          fontSize: "16px",
        }}
      >
        AI Manufacturing Defect Detection & Quality Inspection System
      </p>
    </div>

    {/* UPLOAD CARD */}

    <div
      style={{
        background: "#ffffff",
        border: "1px solid #d5dde8",
        borderRadius: "18px",
        padding: "35px",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          margin: "0 0 8px",
          color: "#172033",
          fontSize: "24px",
        }}
      >
        Select Product Image
      </h2>

      <p
        style={{
          margin: "0 0 25px",
          color: "#64748b",
        }}
      >
        Upload a JPG, JPEG or PNG image for AI inspection.
      </p>

      {/* FILE INPUT */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          style={{
            padding: "10px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            background: "#f8fafc",
            cursor: "pointer",
          }}
        />
      </div>

      {/* IMAGE PREVIEW */}

      {preview && (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
              color: "#334155",
            }}
          >
            Product Image Preview
          </h3>

          <div
            style={{
              width: "420px",
              height: "300px",
              maxWidth: "100%",
              margin: "0 auto",
              border: "2px dashed #94a3b8",
              borderRadius: "14px",
              background: "#f8fafc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={preview}
              alt="Selected product"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}

      {/* START INSPECTION BUTTON */}

      <button
        onClick={startInspection}
        disabled={loading}
        style={{
          marginTop: "30px",
          padding: "14px 38px",
          border: "none",
          borderRadius: "9px",
          background: loading
            ? "#94a3b8"
            : "#2563eb",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading
            ? "not-allowed"
            : "pointer",
          boxShadow: loading
            ? "none"
            : "0 5px 12px rgba(37, 99, 235, 0.3)",
        }}
      >
        {loading
          ? "🔍 AI Inspecting..."
          : "🚀 Start Inspection"}
      </button>
    </div>

    {/* ERROR */}

    {error && (
      <div
        style={{
          marginTop: "25px",
          padding: "16px 20px",
          borderRadius: "12px",
          background: "#fff1f2",
          border: "1px solid #fecdd3",
          color: "#be123c",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        ❌ {error}
      </div>
    )}

    {/* INSPECTION RESULT */}

    {result && (
      <div
        style={{
          marginTop: "30px",
          background: "#ffffff",
          border: "1px solid #cbd5e1",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "8px",
            }}
          >
            🔍
          </div>

          <h2
            style={{
              margin: 0,
              color: "#172033",
              fontSize: "26px",
            }}
          >
            AI Inspection Result
          </h2>
        </div>

        {/* STATUS */}

        <div
          style={{
            textAlign: "center",
            padding: "18px",
            marginBottom: "25px",
            borderRadius: "12px",
            background:
              result.result === "DEFECT"
                ? "#fff1f2"
                : "#f0fdf4",
            border:
              result.result === "DEFECT"
                ? "1px solid #fecdd3"
                : "1px solid #bbf7d0",
          }}
        >
          <h3
            style={{
              margin: 0,
              color:
                result.result === "DEFECT"
                  ? "#be123c"
                  : "#15803d",
            }}
          >
            {result.result === "DEFECT"
              ? "⚠️ DEFECT DETECTED"
              : "✅ NO DEFECT DETECTED"}
          </h3>
        </div>

        {/* RESULT GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          <ResultItem
            label="Prediction"
            value={result.prediction}
          />

          <ResultItem
            label="Defect Type"
            value={result.defect_type}
          />

          <ResultItem
            label="Confidence"
            value={`${result.confidence}%`}
          />

          <ResultItem
            label="Severity Score"
            value={result.severity_score}
          />

          <ResultItem
            label="Severity Level"
            value={result.severity_level}
          />

          <ResultItem
            label="Quality Decision"
            value={result.quality_decision}
          />
        </div>

        {/* INSPECTION RESULT */}

        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "12px",
            background: "#f1f5f9",
            border: "1px solid #dbe3ec",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px",
              color: "#334155",
              fontSize: "17px",
            }}
          >
            Inspection Result
          </h3>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: "1.6",
            }}
          >
            {result.inspection_result}
          </p>
        </div>

        {/* QUALITY RECOMMENDATION */}

        <div
          style={{
            marginTop: "18px",
            padding: "20px",
            borderRadius: "12px",
            background: "#f1f5f9",
            border: "1px solid #dbe3ec",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px",
              color: "#334155",
              fontSize: "17px",
            }}
          >
            Quality Recommendation
          </h3>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: "1.6",
            }}
          >
            {result.quality_recommendation}
          </p>
        </div>

        {/* FILE & DATABASE */}

        <div
          style={{
            marginTop: "18px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          <ResultItem
            label="File"
            value={result.filename}
          />

          <ResultItem
            label="Database"
            value={
              result.database_status === "Saved"
                ? "✅ Inspection saved successfully"
                : "⚠️ Database save failed"
            }
          />
        </div>
      </div>
    )}
  </div>
</div>

);
}

/* RESULT ITEM */

function ResultItem({ label, value }) {
return (
<div
style={{
padding: "18px",
background: "#f8fafc",
border: "1px solid #dbe3ec",
borderRadius: "12px",
}}
>
<div
style={{
fontSize: "14px",
fontWeight: "600",
color: "#64748b",
marginBottom: "7px",
}}
>
{label}
</div>

  <div
    style={{
      fontSize: "16px",
      fontWeight: "600",
      color: "#172033",
      wordBreak: "break-word",
    }}
  >
    {value ?? "Not available"}
  </div>
</div>

);
}

export default StartAIInspection;
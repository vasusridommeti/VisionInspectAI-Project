import { useEffect, useState } from "react";

function InspectionResult() {

  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // GET LATEST INSPECTION FROM DATABASE
  // --------------------------------------------------

  useEffect(() => {

    const fetchLatestInspection = async () => {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/inspections"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inspection result");
        }

        const data = await response.json();

        if (
          data.success &&
          data.inspections &&
          data.inspections.length > 0
        ) {

          // Backend sends newest inspection first
          setInspection(data.inspections[0]);

        } else {

          setError("No inspection result found.");

        }

      } catch (err) {

        console.error("Inspection result error:", err);

        setError(
          "Unable to load inspection result."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchLatestInspection();

  }, []);


  // --------------------------------------------------
  // DOWNLOAD PROPER WORD-STYLE PAPER REPORT
  // --------------------------------------------------

  const downloadReport = () => {

    if (!inspection) {
      return;
    }

    const passed =
      inspection.result === "GOOD";

    const status =
      passed
        ? "PASSED"
        : "DEFECT DETECTED";


    // Create Word-compatible HTML document

    const report = `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>VisionInspect AI Inspection Report</title>

<style>

@page {
  size: A4;
  margin: 25mm;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: white;
  color: #222222;
  margin: 0;
  padding: 0;
}

.report {
  width: 100%;
  max-width: 750px;
  margin: auto;
}

.header {
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #333333;
}

.header h1 {
  font-size: 25px;
  margin: 0 0 8px 0;
}

.header p {
  font-size: 13px;
  margin: 0;
}

.title {
  text-align: center;
  margin: 25px 0;
}

.title h2 {
  font-size: 20px;
  margin: 0;
  text-decoration: underline;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #777777;
}

.details {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.details td {
  border: 1px solid #999999;
  padding: 9px;
  font-size: 12px;
}

.label {
  width: 35%;
  font-weight: bold;
  background: #f2f2f2;
}

.status {
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  border: 2px solid #333333;
  padding: 12px;
  margin: 15px 0;
}

.text-box {
  border: 1px solid #999999;
  padding: 12px;
  font-size: 12px;
  line-height: 1.6;
  min-height: 35px;
}

.footer {
  margin-top: 35px;
  padding-top: 12px;
  border-top: 1px solid #777777;
  text-align: center;
  font-size: 10px;
}

</style>

</head>

<body>

<div class="report">

  <div class="header">

    <h1>
      VisionInspect AI
    </h1>

    <p>
      Manufacturing Defect Detection & Quality Inspection System
    </p>

  </div>


  <div class="title">

    <h2>
      INSPECTION REPORT
    </h2>

  </div>


  <!-- INSPECTION STATUS -->

  <div class="status">

    ${status}

  </div>


  <!-- INSPECTION DETAILS -->

  <div class="section-title">
    Inspection Details
  </div>


  <table class="details">

    <tr>
      <td class="label">Image</td>
      <td>${inspection.filename ?? "N/A"}</td>
    </tr>

    <tr>
      <td class="label">Result</td>
      <td>${inspection.result ?? "N/A"}</td>
    </tr>

    <tr>
      <td class="label">Prediction</td>
      <td>${inspection.prediction ?? "N/A"}</td>
    </tr>

    <tr>
      <td class="label">Defect Type</td>
      <td>${inspection.defect_type ?? "N/A"}</td>
    </tr>

    <tr>
      <td class="label">Confidence</td>
      <td>${inspection.confidence ?? "N/A"}%</td>
    </tr>

  </table>


  <!-- SEVERITY ASSESSMENT -->

  <div class="section-title">
    Severity Assessment
  </div>


  <table class="details">

    <tr>
      <td class="label">Severity Score</td>
      <td>${inspection.severity_score ?? "N/A"}</td>
    </tr>

    <tr>
      <td class="label">Severity Level</td>
      <td>${inspection.severity_level ?? "N/A"}</td>
    </tr>

  </table>


  <!-- QUALITY DECISION -->

  <div class="section-title">
    Quality Decision
  </div>


  <table class="details">

    <tr>
      <td class="label">Quality Decision</td>
      <td>${inspection.quality_decision ?? "N/A"}</td>
    </tr>

  </table>


  <!-- INSPECTION RESULT -->

  <div class="section-title">
    Inspection Result
  </div>


  <div class="text-box">

    ${inspection.inspection_result ??
      "No inspection result available."}

  </div>


  <!-- QUALITY RECOMMENDATION -->

  <div class="section-title">
    Quality Recommendation
  </div>


  <div class="text-box">

    ${inspection.quality_recommendation ??
      "No quality recommendation available."}

  </div>


  <!-- FOOTER -->

  <div class="footer">

    VisionInspect AI<br />

    Manufacturing Defect Detection & Quality Inspection System

  </div>

</div>

</body>

</html>
`;


    // --------------------------------------------------
    // CREATE WORD DOCUMENT
    // --------------------------------------------------

    const blob = new Blob(
      [
        "\ufeff",
        report
      ],
      {
        type:
          "application/msword"
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;


    link.download =
      "VisionInspect_Inspection_Report.doc";


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    URL.revokeObjectURL(url);

  };


  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {

    return (

      <div
        className="result-page"
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxSizing: "border-box"
        }}
      >

        <h1>
          🔍 Inspection Result
        </h1>


        <div
          className="result-card"
          style={{
            width: "100%",
            maxWidth: "850px",
            margin: "25px auto",
            textAlign: "center",
            boxSizing: "border-box"
          }}
        >

          <h2>
            Loading latest inspection...
          </h2>

        </div>

      </div>

    );

  }


  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {

    return (

      <div
        className="result-page"
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxSizing: "border-box"
        }}
      >

        <h1>
          🔍 Inspection Result
        </h1>


        <div
          className="result-card"
          style={{
            width: "100%",
            maxWidth: "850px",
            margin: "25px auto",
            textAlign: "center",
            boxSizing: "border-box"
          }}
        >

          <h2>
            {error}
          </h2>

        </div>

      </div>

    );

  }


  // --------------------------------------------------
  // ACTUAL RESULT
  // --------------------------------------------------

  const passed =
    inspection.result === "GOOD";


  return (

    <div
      className="result-page"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "35px 20px",
        boxSizing: "border-box"
      }}
    >

      {/* PAGE TITLE */}

      <h1
        style={{
          textAlign: "center",
          width: "100%",
          marginBottom: "25px"
        }}
      >
        🔍 Inspection Result
      </h1>


      {/* MAIN CARD */}

      <div
        className="result-card"
        style={{
          width: "100%",
          maxWidth: "850px",
          margin: "0 auto",
          boxSizing: "border-box",
          textAlign: "center"
        }}
      >

        {/* STATUS */}

        <div
          className="result-status"
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >

          {passed
            ? "✅ PASSED"
            : "❌ DEFECT DETECTED"}

        </div>


        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          AI Inspection Completed
        </h2>


        {/* DETAILS GRID */}

        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            textAlign: "left",
            marginBottom: "30px"
          }}
        >

          <div>

            <strong>
              Image
            </strong>

            <p>
              {inspection.filename}
            </p>

          </div>


          <div>

            <strong>
              Result
            </strong>

            <p>
              {inspection.result}
            </p>

          </div>


          <div>

            <strong>
              Prediction
            </strong>

            <p>
              {inspection.prediction}
            </p>

          </div>


          <div>

            <strong>
              Defect Type
            </strong>

            <p>
              {inspection.defect_type}
            </p>

          </div>


          <div>

            <strong>
              Confidence
            </strong>

            <p>
              {inspection.confidence}%
            </p>

          </div>


          <div>

            <strong>
              Severity Score
            </strong>

            <p>
              {inspection.severity_score ?? "N/A"}
            </p>

          </div>


          <div>

            <strong>
              Severity Level
            </strong>

            <p>
              {inspection.severity_level ?? "N/A"}
            </p>

          </div>


          <div>

            <strong>
              Quality Decision
            </strong>

            <p>
              {inspection.quality_decision ?? "N/A"}
            </p>

          </div>

        </div>


        {/* INSPECTION */}

        <div
          style={{
            textAlign: "left",
            marginBottom: "25px"
          }}
        >

          <strong>
            Inspection
          </strong>

          <p>
            {inspection.inspection_result ||
              "No inspection result available."}
          </p>

        </div>


        {/* RECOMMENDATION */}

        <div
          style={{
            textAlign: "left",
            marginBottom: "30px"
          }}
        >

          <strong>
            Quality Recommendation
          </strong>

          <p>
            {inspection.quality_recommendation ||
              "No quality recommendation available."}
          </p>

        </div>


        {/* DOWNLOAD */}

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >

          <button
            className="result-btn"
            onClick={downloadReport}
          >

            📄 Download Inspection Report

          </button>

        </div>

      </div>

    </div>

  );

}


export default InspectionResult;
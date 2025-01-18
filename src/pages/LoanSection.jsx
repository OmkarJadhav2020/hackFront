import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../api";
const LoanApplication = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanCategory: "personal",
    term: "",
    purpose: "",
    panNumber: "",
    guarantor: {
      name: "",
      relationship: "",
      contact: "",
    },
    bankDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
  });

  const [files, setFiles] = useState({
    idProof: null,
    bankStatement: null,
    itr: null,
    utilityBill: null,
    businessLicense: null,
    businessContinuationProof: null,
  });

  const [creditScore, setCreditScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles[0]) {
      if (uploadedFiles[0].size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB");
        return;
      }
      setFiles((prev) => ({
        ...prev,
        [name]: uploadedFiles[0],
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();

      // Loop through formData and append all fields, including nested ones
      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        if (typeof value === "object" && value !== null) {
          // Handle nested objects (e.g., guarantor, bankDetails)
          Object.keys(value).forEach((subKey) => {
            formDataToSend.append(`${key}.${subKey}`, value[subKey]);
          });
        } else {
          // Append normal fields
          formDataToSend.append(key, value);
        }
      });

      // Append files (ensure files are added if they exist)
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formDataToSend.append(key, files[key]);
        }
      });

      // Log the FormData content to debug
      
      console.log(formDataToSend);
      // Make the API request
      const response = await api.post(
        "http://localhost:3000/api/loan/apply",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setSuccess("Loan application submitted successfully!");
        setCreditScore(data.creditScore);
      } else {
        throw new Error(
          response.data.message || "Failed to submit loan application"
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const CreditScoreDisplay = ({ score }) => {
    const getScoreColor = () => {
      if (score >= 750) return "#4CAF50";
      if (score >= 650) return "#2196F3";
      if (score >= 550) return "#FFC107";
      return "#F44336";
    };

    return (
      <div
        style={{
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Your Credit Score</h3>
        <div
          style={{
            position: "relative",
            height: "20px",
            backgroundColor: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(score / 850) * 100}%`,
              height: "100%",
              backgroundColor: getScoreColor(),
              transition: "width 0.5s ease-in-out",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontSize: "24px",
            color: getScoreColor(),
          }}
        >
          {score}
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Loan Application</h2>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <h3>Loan Details</h3>
          <div style={{ display: "grid", gap: "15px" }}>
            <input
              type="number"
              name="loanAmount"
              placeholder="Loan Amount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            />

            <select
              name="loanCategory"
              value={formData.loanCategory}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            >
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="education">Education Loan</option>
            </select>

            <input
              type="number"
              name="term"
              placeholder="Loan Term (months)"
              value={formData.term}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            />

            <textarea
              name="purpose"
              placeholder="Loan Purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                minHeight: "100px",
              }}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Required Documents</h3>
          <div style={{ display: "grid", gap: "15px" }}>
            {Object.keys(files).map((key) => (
              <div key={key}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </label>
                <input
                  type="file"
                  name={key}
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Bank Details</h3>
          <div style={{ display: "grid", gap: "15px" }}>
            <input
              type="text"
              name="bankDetails.accountNumber"
              placeholder="Account Number"
              value={formData.bankDetails.accountNumber}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            />
            <input
              type="text"
              name="bankDetails.bankName"
              placeholder="Bank Name"
              value={formData.bankDetails.bankName}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            />
            <input
              type="text"
              name="bankDetails.ifscCode"
              placeholder="IFSC Code"
              value={formData.bankDetails.ifscCode}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {creditScore && <CreditScoreDisplay score={creditScore} />}
    </div>
  );
};

export default LoanApplication;

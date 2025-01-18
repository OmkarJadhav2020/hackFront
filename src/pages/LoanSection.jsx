import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"

// Utility function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const LoanManagement = () => {
  const [activeTab, setActiveTab] = useState("apply");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanCategory: "personal",
    term: "12",
    purpose: "education",
    panNumber: "",
    guarantor: {
      name: "",
      contactNumber: "",
      relationship: "",
    },
    disbursement: {
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

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/loans/my-loans", {
        withCredentials: true,
      });
      setLoans(response.data);
    } catch (err) {
      setError("Failed to fetch loans");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles[0]) {
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

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formDataToSend.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      const response = await axios.post("http://localhost:3000/api/loan/apply", formDataToSend, {
       
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization : `Bearer ${Cookies.get("token")}`
        },
      });

      setCreditScore(response.data.creditScore);
      await fetchLoans();
      setActiveTab("status");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit loan application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab("apply")}
            className={`px-4 py-2 ${
              activeTab === "apply" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Apply for Loan
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-4 py-2 ${
              activeTab === "status" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Loan Status
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {activeTab === "apply" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loan Category
                </label>
                <select
                  name="loanCategory"
                  value={formData.loanCategory}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Term (Months)
                </label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {[12, 24, 36, 48, 60].map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="education">Education</option>
                  <option value="medical">Medical</option>
                  <option value="business">Business</option>
                  <option value="home improvement">Home Improvement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(files).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    type="file"
                    name={key}
                    onChange={handleFileChange}
                    className="mt-1 block w-full"
                    accept=".jpg,.jpeg,.png,.pdf"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Guarantor Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="guarantor.name"
                  value={formData.guarantor.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="guarantor.contactNumber"
                  value={formData.guarantor.contactNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <input
                  type="text"
                  name="guarantor.relationship"
                  value={formData.guarantor.relationship}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  name="disbursement.accountNumber"
                  value={formData.disbursement.accountNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="disbursement.bankName"
                  value={formData.disbursement.bankName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="disbursement.ifscCode"
                  value={formData.disbursement.ifscCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit Application"}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {loans.map((loan) => (
            <div key={loan._id} className="bg-white shadow rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Amount</span>
                  <p className="font-medium">
                    {formatCurrency(loan.loanAmount)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <p className="font-medium capitalize">{loan.status}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Interest Rate</span>
                  <p className="font-medium">{loan.interestRate}%</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Term</span>
                  <p className="font-medium">{loan.term} months</p>
                </div>
              </div>

              {loan.repaymentSchedule && loan.repaymentSchedule.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Repayment Schedule
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Installment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loan.repaymentSchedule.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              #{payment.installmentNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(payment.dueDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(payment.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  payment.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {loan.notifications && loan.notifications.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Notifications
                  </h4>
                  <div className="space-y-2">
                    {loan.notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md ${
                          notification.read
                            ? "bg-gray-50"
                            : "bg-blue-50 border-l-4 border-blue-400"
                        }`}
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.sentAt).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {loan.auditTrail && loan.auditTrail.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Audit Trail
                  </h4>
                  <div className="space-y-2">
                    {loan.auditTrail.map((audit, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-500"
                      >
                        <span>{audit.action}</span>
                        <span>•</span>
                        <span>
                          {new Date(audit.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {creditScore && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm">
          <h4 className="text-lg font-medium mb-2">Your Credit Score</h4>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full ${
                creditScore >= 750
                  ? "bg-green-500"
                  : creditScore >= 650
                  ? "bg-blue-500"
                  : creditScore >= 550
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(creditScore / 850) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span>Score: {creditScore}</span>
            <span>Max: 850</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManagement;

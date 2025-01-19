import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const LoanStatus = () => {
  // Sample data based on the schema
  const loans = [
    {
      loanId: "L1001",
      totalAmountNeeded: 50000,
      totalAmountAllocated: 35000,
      interestRate: 12,
      fundingDeadline: "2025-02-15",
      status: "open",
      fundingProgress: 70,
    },
    {
      loanId: "L1002",
      totalAmountNeeded: 75000,
      totalAmountAllocated: 75000,
      interestRate: 14,
      fundingDeadline: "2025-02-10",
      status: "fully-funded",
      fundingProgress: 100,
    }
  ];

  const statusColors = {
    'open': 'bg-blue-100 text-blue-800',
    'fully-funded': 'bg-green-100 text-green-800',
    'closed': 'bg-gray-100 text-gray-800'
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'open':
        return <Clock className="w-4 h-4" />;
      case 'fully-funded':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Loan Status Dashboard</h1>
          <p className="text-gray-600 mt-2">Track and manage your loan applications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Active Loans</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹1,25,000</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Funded Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹3,50,000</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loan Status Table */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Active Loans</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Loan ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Required Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Allocated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Interest Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Deadline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loans.map((loan) => (
                  <tr key={loan.loanId}>
                    <td className="px-6 py-4">
                      <span className="font-medium">{loan.loanId}</span>
                    </td>
                    <td className="px-6 py-4">₹{loan.totalAmountNeeded.toLocaleString()}</td>
                    <td className="px-6 py-4">₹{loan.totalAmountAllocated.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${loan.fundingProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 mt-1">{loan.fundingProgress}%</span>
                    </td>
                    <td className="px-6 py-4">{loan.interestRate}%</td>
                    <td className="px-6 py-4">{new Date(loan.fundingDeadline).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statusColors[loan.status]}`}>
                        {getStatusIcon(loan.status)}
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Funding Progress Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { date: 'Jan', amount: 25000 },
                  { date: 'Feb', amount: 45000 },
                  { date: 'Mar', amount: 65000 },
                  { date: 'Apr', amount: 85000 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Loan Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Open', value: 4 },
                      { name: 'Fully Funded', value: 3 },
                      { name: 'Closed', value: 1 }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#6b7280" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanStatus;
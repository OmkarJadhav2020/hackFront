import React, { useState } from 'react';

const WalletDashboard = () => {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState('card');
  
  const handleAddMoney = (e) => {
    e.preventDefault();
    if (amount) {
      // Mock API call - replace with actual API integration
      setBalance(prev => prev + parseFloat(amount));
      setAmount('');
    }
  };

  const paymentMethods = [
    { id: 'card', label: 'Card', icon: '💳' },
    { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'netbanking', label: 'Net Banking', icon: '🔒' },
    { id: 'crypto', label: 'Crypto', icon: '₿' }
  ];

  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const recentTransactions = [
    { type: 'Investment', amount: -1000, date: '2024-01-18', status: 'Completed' },
    { type: 'Added Money', amount: 2000, date: '2024-01-17', status: 'Completed' },
    { type: 'Interest Earned', amount: 150, date: '2024-01-16', status: 'Completed' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👛</span>
            <p className="text-lg">Available Balance</p>
          </div>
          <h2 className="text-4xl font-bold">${balance.toLocaleString()}</h2>
        </div>
      </div>

      {/* Add Money Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>⬆️</span> Add Money to Wallet
        </h3>

        {/* Payment Method Tabs */}
        <div className="mb-6">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedTab(method.id)}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all
                  ${selectedTab === method.id 
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                    : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className="text-2xl mb-1">{method.icon}</span>
                <span className="text-sm">{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input Form */}
        <form onSubmit={handleAddMoney} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter amount to add"
              min="0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Money
          </button>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(quickAmount.toString())}
                className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium">{transaction.type}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className={`font-bold ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
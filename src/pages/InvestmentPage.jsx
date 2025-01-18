// import React, { useState, useEffect } from 'react';
// import { Filter, TrendingUp, ArrowUpRight, X, Info } from 'lucide-react';

// const InvestmentPage = () => {
//   // Mock data for testing
//   const mockLoans = [
//     {
//       _id: '1',
//       title: 'Small Business Expansion',
//       description: 'Looking to expand our local restaurant with new equipment and hiring staff.',
//       category: 'business',
//       amount: 500000,
//       interestRate: 12.5,
//       termLength: 24,
//       percentFunded: 45,
//     },
//     {
//       _id: '2',
//       title: 'Higher Education Loan',
//       description: 'Need funding for Masters degree in Computer Science.',
//       category: 'personal',
//       amount: 300000,
//       interestRate: 10.5,
//       termLength: 36,
//       percentFunded: 60,
//     },
//     {
//       _id: '3',
//       title: 'Tech Startup Funding',
//       description: 'Seed funding for AI-based healthcare startup.',
//       category: 'business',
//       amount: 1000000,
//       interestRate: 15.0,
//       termLength: 18,
//       percentFunded: 30,
//     },
//     {
//       _id: '4',
//       title: 'Home Renovation',
//       description: 'Renovating kitchen and bathroom of residential property.',
//       category: 'personal',
//       amount: 250000,
//       interestRate: 11.0,
//       termLength: 12,
//       percentFunded: 75,
//     },
//     {
//       _id: '5',
//       title: 'E-commerce Inventory',
//       description: 'Purchase inventory for upcoming festival season.',
//       category: 'business',
//       amount: 750000,
//       interestRate: 13.5,
//       termLength: 15,
//       percentFunded: 55,
//     },
//     {
//       _id: '6',
//       title: 'Wedding Expenses',
//       description: 'Personal loan for wedding and related expenses.',
//       category: 'personal',
//       amount: 400000,
//       interestRate: 11.5,
//       termLength: 24,
//       percentFunded: 40,
//     },
//   ];

//   const [loans, setLoans] = useState([]);
//   const [filteredLoans, setFilteredLoans] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('interest-desc');
//   const [selectedLoan, setSelectedLoan] = useState(null);
//   const [investmentAmount, setInvestmentAmount] = useState('');
//   const [showInvestModal, setShowInvestModal] = useState(false);

//   // Simulate API call with mock data
//   useEffect(() => {
//     const loadMockData = () => {
//       setTimeout(() => {
//         setLoans(mockLoans);
//         setFilteredLoans(mockLoans);
//         setIsLoading(false);
//       }, 1000); // Simulate network delay
//     };
//     loadMockData();
//   }, []);
//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   const fetchLoans = async () => {
//     setIsLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await axios.get('http://localhost:3000/api/loan/available', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setLoans(response.data.data);
//       setFilteredLoans(response.data.data);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch loans');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     let result = [...loans];
    
//     // Apply category filter
//     if (selectedCategory !== 'all') {
//       result = result.filter(loan => loan.category === selectedCategory);
//     }
    
//     // Apply sorting
//     result.sort((a, b) => {
//       switch (sortBy) {
//         case 'interest-desc':
//           return b.interestRate - a.interestRate;
//         case 'interest-asc':
//           return a.interestRate - b.interestRate;
//         case 'amount-desc':
//           return b.amount - a.amount;
//         case 'amount-asc':
//           return a.amount - b.amount;
//         default:
//           return 0;
//       }
//     });
    
//     setFilteredLoans(result);
//   }, [selectedCategory, sortBy, loans]);

//   // Mock investment function
//   const handleInvest = () => {
//     // Simulate investment processing
//     setTimeout(() => {
//       alert(`Investment of ₹${investmentAmount} successfully made in ${selectedLoan.title}`);
//       setShowInvestModal(false);
//       setSelectedLoan(null);
//       setInvestmentAmount('');
//     }, 1000);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold mb-2">Investment Opportunities</h1>
//         <p className="text-gray-600">Discover and invest in verified loan requests</p>
//       </div>

//       {/* Filters and Sorting */}
//       <div className="mb-6 flex flex-wrap gap-4 items-center">
//         <div className="flex items-center gap-2">
//           <Filter size={20} className="text-gray-500" />
//           <select
//             className="border rounded-lg px-3 py-2"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="all">All Categories</option>
//             <option value="personal">Personal Loans</option>
//             <option value="business">Business Loans</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <TrendingUp size={20} className="text-gray-500" />
//           <select
//             className="border rounded-lg px-3 py-2"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="interest-desc">Highest Interest Rate</option>
//             <option value="interest-asc">Lowest Interest Rate</option>
//             <option value="amount-desc">Highest Amount</option>
//             <option value="amount-asc">Lowest Amount</option>
//           </select>
//         </div>
//       </div>

//       {/* Loan Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLoans.map((loan) => (
//           <div
//             key={loan._id}
//             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     loan.category === 'business' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                   }`}>
//                     {loan.category === 'business' ? 'Business Loan' : 'Personal Loan'}
//                   </span>
//                 </div>
//                 <span className="text-lg font-bold text-blue-600">
//                   {loan.interestRate}% APR
//                 </span>
//               </div>

//               <h3 className="text-lg font-semibold mb-2">{loan.title}</h3>
//               <p className="text-gray-600 mb-4 line-clamp-2">{loan.description}</p>

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Loan Amount:</span>
//                   <span className="font-semibold">₹{loan.amount.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Term Length:</span>
//                   <span className="font-semibold">{loan.termLength} months</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Funded:</span>
//                   <span className="font-semibold">{loan.percentFunded}%</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedLoan(loan);
//                   setShowInvestModal(true);
//                 }}
//                 className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 Invest Now
//                 <ArrowUpRight size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Investment Modal */}
//       {showInvestModal && selectedLoan && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-xl font-bold">{selectedLoan.title}</h2>
//                 <button
//                   onClick={() => {
//                     setShowInvestModal(false);
//                     setSelectedLoan(null);
//                   }}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {/* Loan Details */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-semibold mb-2 flex items-center gap-2">
//                     <Info size={20} />
//                     Loan Details
//                   </h3>
//                   <div className="space-y-2">
//                     <p><strong>Category:</strong> {selectedLoan.category}</p>
//                     <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}% APR</p>
//                     <p><strong>Amount:</strong> ₹{selectedLoan.amount.toLocaleString()}</p>
//                     <p><strong>Term Length:</strong> {selectedLoan.termLength} months</p>
//                     <p><strong>Purpose:</strong> {selectedLoan.description}</p>
//                   </div>
//                 </div>

//                 {/* Investment Form */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Investment Amount (₹)
//                   </label>
//                   <input
//                     type="number"
//                     value={investmentAmount}
//                     onChange={(e) => setInvestmentAmount(e.target.value)}
//                     min={1000}
//                     max={selectedLoan.amount}
//                     className="w-full border rounded-lg px-4 py-2"
//                     placeholder="Enter amount"
//                   />
//                   <p className="mt-2 text-sm text-gray-500">
//                     Minimum investment: ₹1,000
//                   </p>
//                 </div>

//                 {/* Expected Returns Calculator */}
//                 {investmentAmount && (
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <h4 className="font-semibold mb-2">Expected Returns</h4>
//                     <p className="text-lg">
//                       ₹{(parseFloat(investmentAmount) * (selectedLoan.interestRate / 100)).toFixed(2)} per year
//                     </p>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleInvest}
//                   disabled={!investmentAmount || parseFloat(investmentAmount) < 1000}
//                   className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//                 >
//                   Confirm Investment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvestmentPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Cookies from 'js-cookie'; // Ensure Cookies is imported
import { Filter, TrendingUp, ArrowUpRight, X, Info } from 'lucide-react';

const InvestmentPage = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('interest-desc');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [error, setError] = useState('');

  // Fetch loans from API
  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:3000/api/loan/available', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoans(response.data.data);
        setFilteredLoans(response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch loans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Filter and sort loans based on category and sorting
  useEffect(() => {
    let result = [...loans];

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(loan => loan.category === selectedCategory);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'interest-desc':
          return b.interestRate - a.interestRate;
        case 'interest-asc':
          return a.interestRate - b.interestRate;
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    setFilteredLoans(result);
  }, [selectedCategory, sortBy, loans]);

  // Mock investment function
  const handleInvest = () => {
    if (investmentAmount < 1000) {
      alert('Minimum investment amount is ₹1000');
      return;
    }

    // Simulate investment processing
    setTimeout(() => {
      alert(`Investment of ₹${investmentAmount} successfully made in ${selectedLoan.title}`);
      setShowInvestModal(false);
      setSelectedLoan(null);
      setInvestmentAmount('');
    }, 1000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Investment Opportunities</h1>
        <p className="text-gray-600">Discover and invest in verified loan requests</p>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <select
            className="border rounded-lg px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal Loans</option>
            <option value="business">Business Loans</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-gray-500" />
          <select
            className="border rounded-lg px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="interest-desc">Highest Interest Rate</option>
            <option value="interest-asc">Lowest Interest Rate</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Loan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      loan.category === 'business' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {loan.category === 'business' ? 'Business Loan' : 'Personal Loan'}
                  </span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {loan.interestRate}% APR
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{loan.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{loan.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">₹{loan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Term Length:</span>
                  <span className="font-semibold">{loan.termLength} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funded:</span>
                  <span className="font-semibold">{loan.percentFunded}%</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedLoan(loan);
                  setShowInvestModal(true);
                }}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Invest Now
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Modal */}
      {showInvestModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">{selectedLoan.title}</h2>
                <button
                  onClick={() => {
                    setShowInvestModal(false);
                    setSelectedLoan(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Loan Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Info size={20} />
                    Loan Details
                  </h3>
                  <div className="space-y-2">
                    <p><strong>Category:</strong> {selectedLoan.category}</p>
                    <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}% APR</p>
                    <p><strong>Amount:</strong> ₹{selectedLoan.amount.toLocaleString()}</p>
                    <p><strong>Term Length:</strong> {selectedLoan.termLength} months</p>
                    <p><strong>Purpose:</strong> {selectedLoan.description}</p>
                  </div>
                </div>

                               {/* Investment Form */}
                               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min={1000}
                    max={selectedLoan.amount}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Enter amount"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum investment: ₹1,000
                  </p>
                </div>

                {/* Expected Returns Calculator */}
                {investmentAmount && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Expected Returns</h4>
                    <p className="text-lg">
                      ₹{(parseFloat(investmentAmount) * (selectedLoan.interestRate / 100)).toFixed(2)} per year
                    </p>
                  </div>
                )}

                <button
                  onClick={handleInvest}
                  disabled={!investmentAmount || parseFloat(investmentAmount) < 1000}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  Confirm Investment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentPage;


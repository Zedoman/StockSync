import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ stocks }) => {
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioValue = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/stocks/portfolio-value");
        setTotalValue(response.data);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch portfolio value at this time. Please try again later.");
        setLoading(false);
      }
    };

    fetchPortfolioValue();
  }, []);

  const topStock = stocks.reduce(
    (top, stock) =>
      !top || stock.currentPrice * stock.quantity > top.currentPrice * top.quantity
        ? stock
        : top,
    null
  );

  return (
    <div className="bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-600 text-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto transform hover:scale-105 transition-all duration-500">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        Portfolio Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
          <p className="text-gray-400 text-lg mb-4">Total Portfolio Value</p>
          {loading ? (
            <p className="text-4xl font-bold animate-pulse">Loading...</p>
          ) : error ? (
            <div className="text-center">
              <p className="text-4xl font-bold text-red-400">Error</p>
              <p className="text-lg text-gray-400 mt-2">{error}</p>
            </div>
          ) : (
            <p className="text-4xl font-bold text-green-400">${totalValue.toFixed(2)}</p>
          )}
        </div>
        {topStock && (
          <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
            <p className="text-gray-400 text-lg mb-4">Top Performing Stock</p>
            <p className="text-3xl font-bold text-blue-400">{topStock.ticker}</p>
            <p className="text-lg text-gray-300 mt-2">{topStock.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {topStock.quantity} shares at ${topStock.buyPrice.toFixed(2)} each
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";

const StockForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: null,
    ticker: "",
    quantity: "",
    buyPrice: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantity: parseFloat(formData.quantity),
      buyPrice: parseFloat(formData.buyPrice),
    });
    setFormData({ id: null, ticker: "", quantity: "", buyPrice: "", name: "" });
  };

  return (
    <form
      className="bg-gradient-to-r from-purple-600 to-pink-400 text-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto transform hover:scale-105 transition-all duration-500"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add Stock
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <input
          className="p-3 border-2 border-transparent bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg placeholder-gray-400 transition-all duration-200"
          type="text"
          name="ticker"
          placeholder="Ticker (e.g., AAPL)"
          value={formData.ticker}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border-2 border-transparent bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg placeholder-gray-400 transition-all duration-200"
          type="text"
          name="name"
          placeholder="Stock Name (e.g., Apple Inc)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border-2 border-transparent bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg placeholder-gray-400 transition-all duration-200"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border-2 border-transparent bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg placeholder-gray-400 transition-all duration-200"
          type="number"
          step="0.01"
          name="buyPrice"
          placeholder="Buy Price"
          value={formData.buyPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div className="text-center mt-8">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl hover:bg-gradient-to-l focus:ring-4 focus:ring-indigo-500 transform hover:scale-110 transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default StockForm;

import React, { useState } from "react";

const StockForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: null,
    ticker: "",
    quantity: "",
    buyPrice: "",
    name: "",
  });
  const [tickerSuggestions, setTickerSuggestions] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);

  const fetchTickerSuggestions = async (value) => {
    // Simulate fetching ticker suggestions
    const mockSuggestions = [
      { ticker: "AAPL", name: "Apple Inc" },
    { ticker: "GOOGL", name: "Alphabet Inc" },
    { ticker: "MSFT", name: "Microsoft Corporation" },
    { ticker: "AMZN", name: "Amazon.com Inc" },
    { ticker: "TSLA", name: "Tesla Inc" },
    { ticker: "NFLX", name: "Netflix Inc" },
    { ticker: "NVDA", name: "NVIDIA Corporation" },
    { ticker: "META", name: "Meta Platforms Inc" },
    { ticker: "BABA", name: "Alibaba Group" },
    { ticker: "INTC", name: "Intel Corporation" },
    { ticker: "CSCO", name: "Cisco Systems" },
    { ticker: "PEP", name: "PepsiCo Inc" },
    { ticker: "KO", name: "Coca-Cola Co" },
    { ticker: "XOM", name: "Exxon Mobil Corporation" },
    { ticker: "JNJ", name: "Johnson & Johnson" },
    { ticker: "V", name: "Visa Inc" },
    { ticker: "MA", name: "Mastercard Inc" },
    { ticker: "DIS", name: "Walt Disney Co" },
    { ticker: "PYPL", name: "PayPal Holdings Inc" },
    { ticker: "ADBE", name: "Adobe Inc" },
    ];
    setTickerSuggestions(
      mockSuggestions.filter((stock) =>
        stock.ticker.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const fetchNameSuggestions = async (value) => {
    // Simulate fetching name suggestions
    const mockSuggestions = [
      { ticker: "AAPL", name: "Apple Inc" },
    { ticker: "GOOGL", name: "Alphabet Inc" },
    { ticker: "MSFT", name: "Microsoft Corporation" },
    { ticker: "AMZN", name: "Amazon.com Inc" },
    { ticker: "TSLA", name: "Tesla Inc" },
    { ticker: "NFLX", name: "Netflix Inc" },
    { ticker: "NVDA", name: "NVIDIA Corporation" },
    { ticker: "META", name: "Meta Platforms Inc" },
    { ticker: "BABA", name: "Alibaba Group" },
    { ticker: "INTC", name: "Intel Corporation" },
    { ticker: "CSCO", name: "Cisco Systems" },
    { ticker: "PEP", name: "PepsiCo Inc" },
    { ticker: "KO", name: "Coca-Cola Co" },
    { ticker: "XOM", name: "Exxon Mobil Corporation" },
    { ticker: "JNJ", name: "Johnson & Johnson" },
    { ticker: "V", name: "Visa Inc" },
    { ticker: "MA", name: "Mastercard Inc" },
    { ticker: "DIS", name: "Walt Disney Co" },
    { ticker: "PYPL", name: "PayPal Holdings Inc" },
    { ticker: "ADBE", name: "Adobe Inc" },
    ];
    setNameSuggestions(
      mockSuggestions.filter((stock) =>
        stock.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "ticker") {
      fetchTickerSuggestions(value);
    } else if (name === "name") {
      fetchNameSuggestions(value);
    }
  };

  const handleTickerSuggestionClick = (stock) => {
    setFormData({ ...formData, ticker: stock.ticker });
    setTickerSuggestions([]);
  };

  const handleNameSuggestionClick = (stock) => {
    setFormData({ ...formData, name: stock.name });
    setNameSuggestions([]);
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
        
      <div style={{ position: "relative", width: "100%" }}>
          <input
            className="p-3 w-full border-2 border-transparent bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg placeholder-gray-400 transition-all duration-200"
            type="text"
            name="ticker"
            placeholder="Ticker (e.g., AAPL)"
            value={formData.ticker}
            onChange={handleChange}
            required
          />
          {tickerSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white text-black mt-1 max-h-40 overflow-y-auto rounded-lg shadow-lg z-10">
              {tickerSuggestions.map((stock, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleTickerSuggestionClick(stock)}
                >
                  {stock.ticker} - {stock.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stock Name Input with Suggestions */}
        <div style={{ position: "relative", width: "100%" }}>
          <input
            className="p-3 w-full border-2 border-transparent bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none text-lg placeholder-gray-400 transition-all duration-200"
            type="text"
            name="name"
            placeholder="Stock Name (e.g., Apple Inc)"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {nameSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white text-black mt-1 max-h-40 overflow-y-auto rounded-lg shadow-lg z-10">
              {nameSuggestions.map((stock, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleNameSuggestionClick(stock)}
                >
                  {stock.name} ({stock.ticker})
                </li>
              ))}
            </ul>
          )}
        </div>
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

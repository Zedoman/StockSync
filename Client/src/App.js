import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";
import StockTable from "./components/StockTable";

const App = () => {
  const [stocks, setStocks] = useState([]);
  const apiUrl = "http://localhost:8080/api/stocks";

  // Fetch all stocks on load
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const addStock = async (stock) => {
    try {
      await axios.post(apiUrl, stock);
      fetchStocks(); // Refresh the stock list
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const updateStock = async (stock) => {
    try {
      await axios.put(`${apiUrl}/${stock.id}`, stock);
      fetchStocks(); // Refresh the stock list
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const deleteStock = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchStocks(); // Refresh the stock list
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-blue-400 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-white tracking-tight">Stock Portfolio Tracker</h1>
          <p className="mt-2 text-lg text-white opacity-80">Track, manage, and optimize your investments with ease</p>
        </header>
        <Dashboard stocks={stocks} />
        <div className="mt-8">
          <StockForm onSubmit={addStock} />
        </div>
        <div className="mt-8">
          <StockTable stocks={stocks} onUpdate={updateStock} onDelete={deleteStock} />
        </div>
      </div>
    </div>
  );
};

export default App;

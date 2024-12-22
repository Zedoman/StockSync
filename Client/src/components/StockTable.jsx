import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const StockTable = ({ stocks, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editedStock, setEditedStock] = useState({});

  const handleEditClick = (stock) => {
    setEditId(stock.id); // Enable edit mode for the stock
    setEditedStock({ ...stock }); // Load stock data into the form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStock({ ...editedStock, [name]: value });
  };

  const handleSaveClick = () => {
    onUpdate({
      ...editedStock,
      quantity: parseFloat(editedStock.quantity),
      buyPrice: parseFloat(editedStock.buyPrice),
    });
    setEditId(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditId(null); // Exit edit mode without saving
    setEditedStock({});
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        💹 Stock Holdings Tracker
      </h2>
      {stocks.length === 0 ? (
        <p className="text-gray-400 text-center mt-4 text-lg">
          No stocks added yet. Start building your portfolio!
        </p>
      ) : (
        <div className="overflow-x-auto mt-6 rounded-lg">
          <table className="w-full text-sm text-left border-collapse bg-gradient-to-b from-gray-800 to-gray-900 shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white">
                <th className="p-4 uppercase font-semibold text-lg border-b border-gray-700">
                  Ticker
                </th>
                <th className="p-4 uppercase font-semibold text-lg border-b border-gray-700">
                  Quantity
                </th>
                <th className="p-4 uppercase font-semibold text-lg border-b border-gray-700">
                  Buy Price
                </th>
                <th className="p-4 uppercase font-semibold text-lg border-b border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) =>
                editId === stock.id ? (
                  <tr key={stock.id} className="bg-gray-700">
                    <td className="p-4">
                      <input
                        type="text"
                        name="ticker"
                        value={editedStock.ticker}
                        onChange={handleInputChange}
                        className="p-3 w-full rounded bg-gray-600 text-white focus:ring focus:ring-indigo-400"
                        disabled
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        name="quantity"
                        value={editedStock.quantity}
                        onChange={handleInputChange}
                        className="p-3 w-full rounded bg-gray-600 text-white focus:ring focus:ring-indigo-400"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        name="buyPrice"
                        value={editedStock.buyPrice}
                        onChange={handleInputChange}
                        className="p-3 w-full rounded bg-gray-600 text-white focus:ring focus:ring-indigo-400"
                      />
                    </td>
                    <td className="p-4 flex space-x-2">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none transition-transform transform hover:scale-105"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none transition-transform transform hover:scale-105"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={stock.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-800"
                        : "bg-gray-700"
                    } hover:bg-indigo-600 transition-all duration-200`}
                  >
                    <td className="p-4 font-semibold text-lg">{stock.ticker}</td>
                    <td className="p-4 font-semibold text-lg">{stock.quantity}</td>
                    <td className="p-4 font-semibold text-lg">
                      ${stock.buyPrice.toFixed(2)}
                    </td>
                    <td className="p-4 flex space-x-2">
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:outline-none transition-transform transform hover:scale-105"
                        onClick={() => handleEditClick(stock)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none transition-transform transform hover:scale-105"
                        onClick={() => onDelete(stock.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockTable;

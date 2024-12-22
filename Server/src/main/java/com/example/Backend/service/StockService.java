// package com.example.Backend.service;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.Backend.exception.ResourceNotFoundException;
// import com.example.Backend.model.Stock;
// import com.example.Backend.repository.StockRepository;

// @Service
// public class StockService {

//     @Autowired
//     private StockRepository stockRepository;

//     public Stock addStock(Stock stock) {
//         return stockRepository.save(stock);
//     }

//     public Stock updateStock(Long id, Stock stockDetails) {
//         Stock stock = stockRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));

//         stock.setName(stockDetails.getName());
//         stock.setTicker(stockDetails.getTicker());
//         stock.setQuantity(stockDetails.getQuantity());
//         stock.setBuyPrice(stockDetails.getBuyPrice());
//         return stockRepository.save(stock);
//     }

//     public void deleteStock(Long id) {
//         Stock stock = stockRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));
//         stockRepository.delete(stock);
//     }

//     public List<Stock> getAllStocks() {
//         return stockRepository.findAll();
//     }

//     public Double calculatePortfolioValue() {
//         return stockRepository.findAll().stream()
//                 .mapToDouble(stock -> stock.getQuantity() * stock.getBuyPrice())
//                 .sum();
//     }
// }



package com.example.Backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.exception.ResourceNotFoundException;
import com.example.Backend.model.Stock;
import com.example.Backend.repository.StockRepository;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private FinnhubService finnhubService;

    // Add stock to portfolio
    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    // Update stock in portfolio
    public Stock updateStock(Long id, Stock stockDetails) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));

        stock.setName(stockDetails.getName());
        stock.setTicker(stockDetails.getTicker());
        stock.setQuantity(stockDetails.getQuantity());
        stock.setBuyPrice(stockDetails.getBuyPrice());
        return stockRepository.save(stock);
    }

    // Delete stock from portfolio
    public void deleteStock(Long id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));
        stockRepository.delete(stock);
    }

    // Get all stocks in the portfolio
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    // Calculate total portfolio value dynamically using real-time prices
    public Double calculatePortfolioValue() {
        return stockRepository.findAll().stream()
                .mapToDouble(stock -> {
                    Double currentPrice = finnhubService.getStockPrice(stock.getTicker());
                    return stock.getQuantity() * currentPrice; // Use real-time price
                })
                .sum();
    }

    // Generate 5 random stocks for the user and fetch their real-time prices
    public List<Stock> generateRandomPortfolio() {
        // Predefined list of stock tickers to choose from
        String[] stockTickers = {"AAPL", "GOOG", "AMZN", "MSFT", "TSLA", "META", "NFLX", "FB"};

        Random random = new Random();
        List<Stock> portfolio = new ArrayList<>();

        // Generate 5 random stocks
        for (int i = 0; i < 5; i++) {
            String ticker = stockTickers[random.nextInt(stockTickers.length)];
            Stock stock = new Stock();
            stock.setTicker(ticker);
            stock.setName(ticker);  // For simplicity, use ticker as name
            stock.setQuantity(1); // Quantity is 1 for each stock
            stock.setBuyPrice(finnhubService.getStockPrice(ticker));  // Real-time price for stock
            portfolio.add(stock);
        }

        // Save the generated portfolio (optional)
        stockRepository.saveAll(portfolio);
        
        return portfolio;
    }
}

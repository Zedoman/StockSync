// package com.example.Backend.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.Backend.model.Stock;
// import com.example.Backend.service.StockService;

// @RestController
// @RequestMapping("/api/stocks")
// @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
// public class StockController {

//     @Autowired
//     private StockService stockService;
      
    
//     @PostMapping
//     public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
//         return ResponseEntity.ok(stockService.addStock(stock));
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock stockDetails) {
//         return ResponseEntity.ok(stockService.updateStock(id, stockDetails));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
//         stockService.deleteStock(id);
//         return ResponseEntity.noContent().build();
//     }

//     @GetMapping
//     public ResponseEntity<List<Stock>> getAllStocks() {
//         return ResponseEntity.ok(stockService.getAllStocks());
//     }

//     @GetMapping("/portfolio-value")
//     public ResponseEntity<Double> calculatePortfolioValue() {
//         return ResponseEntity.ok(stockService.calculatePortfolioValue());
//     }
// }


package com.example.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Stock;
import com.example.Backend.service.StockService;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = {"http://localhost:3000", "https://stock-sync-amber.vercel.app/"}, allowedHeaders = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    // Endpoint to add a stock
    @PostMapping
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.addStock(stock));
    }

    // Endpoint to update a stock
    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock stockDetails) {
        return ResponseEntity.ok(stockService.updateStock(id, stockDetails));
    }

    // Endpoint to delete a stock
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to get all stocks in portfolio
    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    // Endpoint to calculate portfolio value dynamically
    @GetMapping("/portfolio-value")
    public ResponseEntity<Double> calculatePortfolioValue() {
        return ResponseEntity.ok(stockService.calculatePortfolioValue());
    }

    // Endpoint to generate random portfolio
    @GetMapping("/random-portfolio")
    public ResponseEntity<List<Stock>> generateRandomPortfolio() {
        return ResponseEntity.ok(stockService.generateRandomPortfolio());
    }
}

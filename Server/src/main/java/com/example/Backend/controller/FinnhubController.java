package com.example.Backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.service.FinnhubService;

@RestController
public class FinnhubController {

    private final FinnhubService finnhubService;

    @Autowired
    public FinnhubController(FinnhubService finnhubService) {
        this.finnhubService = finnhubService;
    }

    // This will map to /api/stockPrice?ticker=YOUR_TICKER
    @GetMapping("/api/stockPrice")
    public Double getStockPrice(@RequestParam String ticker) {
        System.out.println("Fetching price for ticker: " + ticker);
        return finnhubService.getStockPrice(ticker);
    }
}


package com.example.Backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FinnhubService {

    // Hardcoding the API Key directly in the service
    private final String apiKey = "cti69chr01qm6mum7sg0cti69chr01qm6mum7sgg";  // Replace with your actual Finnhub API key

    private final RestTemplate restTemplate;

    public FinnhubService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Double getStockPrice(String ticker) {
        String url = String.format("https://finnhub.io/api/v1/quote?symbol=%s&token=%s", ticker, apiKey);
        try {
            var response = restTemplate.getForObject(url, FinnhubResponse.class);
            return response.getC(); // Current price from the API response
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch stock price for ticker: " + ticker, e);
        }
    }

    // DTO for parsing Finnhub response
    private static class FinnhubResponse {
        private Double c; // Current price

        public Double getC() {
            return c;
        }

        public void setC(Double c) {
            this.c = c;
        }
    }
}

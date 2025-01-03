package com.example.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Backend.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
}

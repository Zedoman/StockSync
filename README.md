# StockSync

## Overview

StockSync is a React-based web application designed to help users manage and track their stock investments effectively. Users can add, edit, and view details about their stocks, including ticker symbols, stock names, quantities, and buy prices. This sleek and intuitive tool is perfect for individuals looking to organize and monitor their portfolios effortlessly. This application is a Spring Boot-based backend for managing stock portfolios. It integrates with the Finnhub API for real-time stock prices and provides RESTful endpoints for managing stocks, calculating portfolio value, and more.

## Features

1. **Add new stocks with ticker symbol, stock name, quantity, and buy price.**

2. **Responsive and visually appealing interface.**

3. **Real-time portfolio value calculation using live stock prices.**

4. **Integration with the Finnhub API for fetching stock prices dynamically.**

5. **User-based portfolio generation with random stock selection.**

## Prerequisites
1. **Java: Ensure Java 17 or higher is installed.**
2. **Maven: Install Apache Maven for dependency management.**
3. **Database: PostgreSQL is required for database operations.**
4. **API Key: Obtain an API key from Finnhub.**
5. **Node.js: Ensure you have Node.js installed.**
6. **npm: Comes bundled with Node.js.**

## Steps to Run the Project Locally

### Installation and Setup
1. **Frontend:**

a. **Clone the Repository:**
```bash
git clone https://github.com/Zedoman/StockSync
cd Client
```

b. **Install Dependencies Run the following command to install all required dependencies:**
```bash
npm i
```

c. **Run the Application Start the development server:**
```bash
npm start
```
This will open the application in your default web browser at http://localhost:3000.


2. **Backend:**

a. **Clone the Repository:**
```bash
git clone https://github.com/Zedoman/StockSync
cd Server
```
b. **Configure the Application Properties:**
**Update src/main/resources/application.properties with your database and Finnhub API details:**
```bash
spring.application.name=Backend

spring.datasource.url=jdbc:postgresql://localhost:3306/stockdb
spring.datasource.username=<your_db_username>
spring.datasource.password=<your_db_password>
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

c. **Build the Project Use Maven to package the application:**

```bash
mvn clean install
```
d. **Run the Application Start the Spring Boot application:**

```bash
mvn spring-boot:run
The server will run on http://localhost:8080 by default.
```

e. **Test the Endpoints Use tools like Postman or cURL to test the API endpoints. Below are some examples:**

```bash
Add a Stock
POST /api/stocks
Content-Type: application/json

{
  "name": "Apple",
  "ticker": "AAPL",
  "quantity": 10,
  "buyPrice": 150.0
}

Fetch All Stocks
GET /api/stocks

Calculate Portfolio Value
GET /api/stocks/portfolio-value

Fetch Stock Price from Finnhub
GET /api/stockPrice?ticker=AAPL
```

f. **To build:**
```bash
./mvnw clean package
```

### Assumptions and Limitations
1. **Stock Quantity Assumption:**

a. **For assignment purposes, the quantity of each stock is assumed to be 1 when calculating portfolio value dynamically.**

2. **Finnhub API Key:**

a. **Ensure you have a valid API key from Finnhub; otherwise, stock price fetching will fail.**

3. **Random Portfolio:**

a. **The logic for selecting random stocks for each user can be extended as needed.**

4. **Database:**

a. **The application uses Hibernate's update strategy to manage schema changes, which is not ideal for production environments.**

### Links

**Deployed Application (Backend):** 
https://stocksync-t4dr.onrender.com

**Deployed Application (Frontend):** 
https://stock-sync-amber.vercel.app/



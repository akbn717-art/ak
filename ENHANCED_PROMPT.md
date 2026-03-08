# Enhanced Prompt: UK Supermarket Price Comparison App

Design a comprehensive technical specification and feature roadmap for a cross-platform mobile application (iOS and Android) that enables users in the United Kingdom to compare grocery prices across major supermarkets. The app’s primary goal is to help consumers find the cheapest available price for any specific product.

Please include the following components in your response:

## 1) Core Functionality & Features
- **Search Mechanism:** Describe text-based search, autocomplete, filters (brand, size, dietary tags), and barcode scanning.
- **Comparison Engine:** Explain the logic for comparing prices, including:
  - list price vs promotional price,
  - multi-buy offers,
  - unit pricing normalization (e.g., £/100g, £/L),
  - out-of-stock handling,
  - confidence score for stale data.
- **Retailer Coverage:** Provide a phased strategy for major UK chains (Tesco, Sainsbury’s, Asda, Morrisons, Aldi, Lidl, Waitrose, M&S Food, Co-op, Iceland, Ocado).
- **Location Intelligence:** Show how the app finds the **cheapest nearby store** for a selected product using postcode/GPS, store availability, and travel distance.
- **User Experience:** Define user journeys for:
  1. Search product → compare prices → open cheapest store details.
  2. Scan barcode in-store → see better nearby alternatives.
  3. Save favorites/watchlist and receive price-drop alerts.
- **UI Wireframes (descriptive):** Home, Search Results, Product Detail, Map/List of nearby stores, Watchlist/Alerts.

## 2) Technical Architecture
- **Frontend Recommendation:** Choose React Native or Flutter and justify trade-offs (performance, team velocity, ecosystem, long-term maintenance).
- **Backend Architecture:** Propose APIs/services for product catalog, price ingestion, comparison logic, user accounts, alerts, and analytics.
- **Database Design:** Suggest schema for products, normalized product identities, retailers, stores, regional prices, promotions, and historical price snapshots.
- **Scalability:** Describe how to support millions of SKUs and high read traffic (indexing, caching, queue-based ingestion, horizontal scaling).
- **Search Stack:** Recommend a search technology (e.g., PostgreSQL full-text or OpenSearch/Elasticsearch) and explain relevance tuning.

## 3) Data Acquisition & Freshness Strategy
- **Data Sources:** Discuss feasibility and trade-offs of official APIs, affiliate feeds, retailer partnerships, and compliant web extraction.
- **Legal & Compliance:** Outline ToS, robots.txt, copyright/database rights, and GDPR/privacy considerations.
- **Normalization Pipeline:** Define product matching across retailers (EAN/GTIN + fuzzy matching on title/size/brand).
- **Update Frequency:** Propose SLAs for price freshness and stale-data detection.
- **Quality Controls:** Add anomaly detection (sudden price spikes, pack-size mismatches, duplicate products).

## 4) Comparison Logic Details
- Explain the decision model for “cheapest”:
  - exact product match vs nearest equivalent,
  - unit price priority,
  - promotional weighting,
  - stock availability constraints,
  - optional travel-cost adjustment.
- Provide pseudocode for ranking results.

## 5) Product Roadmap
- **MVP (8–12 weeks):** Must-have features, limited retailer set, basic alerts.
- **Phase 2:** Better matching, store-level stock confidence, shopping list optimization.
- **Phase 3:** Basket-level optimization (minimum total cost across stores), loyalty-card personalization.
- Include milestones, team roles, and delivery risks.

## 6) Non-Functional Requirements
- Performance targets (search latency, app startup, API response).
- Reliability targets (uptime, graceful degradation when data is stale).
- Security requirements (auth, encryption, rate-limiting, secrets management).
- Observability (logs, metrics, tracing, alerting).

## 7) Monetization & Business Model
- Compare options: affiliate revenue, premium subscriptions, sponsored placements, B2B insights.
- Include pros/cons, potential conflicts of interest, and user trust safeguards.

## 8) Output Format Requirements
Return your answer in the following structure:
1. Executive Summary
2. Feature Specification
3. System Architecture Diagram (textual)
4. Data Strategy & Compliance
5. MVP Backlog (prioritized)
6. Risk Register with mitigations
7. 12-Month Roadmap

Use practical assumptions for UK grocery retail and explicitly call out unknowns/risks where data access is uncertain.

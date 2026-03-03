# Enhanced Prompt: UK Supermarket Price Comparison App

Design a comprehensive technical specification and feature roadmap for a cross-platform mobile application (iOS and Android) that enables users in the United Kingdom to compare grocery prices across major supermarkets. The app's primary goal is to help consumers find the cheapest available price for any specific product.

Please structure your response with the following sections and level of detail:

## 1) Product Objective and Success Criteria
- Define the app's core user value proposition in one paragraph.
- Propose measurable success metrics (e.g., search-to-result latency, price accuracy rate, monthly active users, retention, and savings per user).

## 2) Core Functionality and Features
### a) Search and Discovery
- Text-based search with typo tolerance, synonyms, and brand/generic matching.
- Barcode scanning flow (camera permission handling, scan success/failure states, fallback manual entry).
- Category browsing and filters (brand, size, dietary tags, promotions, in-stock only, distance).

### b) Comparison Engine
- Logic for comparing both **total price** and **unit price** (e.g., £/100g, £/L) to ensure fair comparisons.
- Rules for handling different pack sizes, multipacks, and substitutions.
- Distinguish between regular price, club-card/member price, and promotional discounts.
- Ranking algorithm for “best deal” including configurable priorities (lowest total price, lowest unit price, nearest store).

### c) Cheapest Location Finder
- Show the cheapest option by product and by nearby store location.
- Include geolocation-based results (postcode and current location modes).
- Surface store-level availability confidence (in stock / low stock / unknown).

### d) Retailer Coverage
- Initial target supermarket set: Tesco, Sainsbury’s, Asda, Morrisons, Aldi, Lidl, Waitrose, M&S Food, Co-op, Iceland, Ocado.
- Explain a phased rollout strategy for adding new retailers and regions.

### e) User Experience
- Describe wireframes/user flow for:
  1. Home screen
  2. Search results list
  3. Product detail page with cross-store comparison
  4. Store map/list view
  5. Saved items and price alerts
- Include accessibility expectations (WCAG considerations), onboarding, and empty/error states.

## 3) Technical Architecture
### a) Frontend
- Recommend either React Native or Flutter and justify the choice for performance, developer velocity, and maintainability.
- Provide app module structure and state-management approach.

### b) Backend
- Propose backend architecture (API gateway, product service, pricing service, search service, auth, notifications).
- Include caching strategy, queue/event pipeline, and background jobs for price refresh.
- Define non-functional requirements: scalability, reliability, latency targets, observability, and rate limiting.

### c) Database and Search
- Suggest a data model for products, SKUs, retailer offers, store locations, price history, and user watchlists.
- Recommend storage technologies (e.g., relational DB + search index + object storage) and why.
- Explain how to support millions of products and frequent updates efficiently.

## 4) Data Acquisition Strategy (Critical)
- Compare and contrast official APIs, affiliate feeds, data partnerships, and web scraping.
- Provide a compliance-first strategy addressing terms of service, robots.txt, copyright/database rights, and GDPR implications.
- Define data freshness SLAs by retailer and by product category.
- Outline canonical product matching across retailers (UPC/EAN, fuzzy title matching, size normalization, image matching optional).
- Include validation and anomaly detection (outlier prices, stale records, duplicate SKUs).

## 5) Implementation Roadmap
- Deliver a phased plan:
  - **Phase 0:** Discovery, legal/data feasibility, prototype
  - **Phase 1 (MVP):** Search + compare + cheapest store for core retailers
  - **Phase 2:** Alerts, personalization, expanded retailer coverage
  - **Phase 3:** Basket optimization (split shopping list across stores), advanced analytics
- For each phase, include estimated timeline, team roles, key deliverables, and risks.

## 6) Security, Privacy, and Compliance
- Authentication options and account model.
- Privacy-by-design approach for location and behavioral data.
- Abuse prevention (bot protection, scraping defense for your own APIs).

## 7) Output Format Requirements
Provide your answer in this order:
1. Executive summary
2. Feature specification
3. Architecture diagram (textual description is fine)
4. Data strategy and legal considerations
5. MVP scope and timeline
6. Risk register with mitigations
7. Recommended tech stack (with rationale)

Use practical, implementation-ready detail rather than generic advice.

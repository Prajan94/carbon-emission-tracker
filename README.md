# Carbon Emission Tracker - Angular 18

A high-performance, modern Angular 18 application built to calculate, visualize, and reduce your **carbon footprint** based on country-specific metrics (Germany, Netherlands, Ireland, Poland, Sweden). This project is designed as a **portfolio piece**.

- Signals & Reactive State
- Standalone Components
- Clean Code & Best Practices
- Unit Testing with >85% Coverage
- AI-Powered Suggestions for Optimization
- Carbon Emission Charts (Chart.js)
- PDF Export (html2canvas + jsPDF)
- Country-Based Footprint Calculation

---

## Key Features

| Feature                     | Description                                                                   |
|-----------------------------|-------------------------------------------------------------------------------|
| **Carbon Footprint Form**   | Enter data via sliders, dropdowns (Reactive Form) to estimate your emissions  |
| **Chart Visualization**     | Real-time emissions by category using Chart.js                                |
| **AI Tips & Suggestions**   | Personalized, AI-generated advice to reduce your footprint                    |
| **PDF Export**              | Download a detailed emission report with one click                            |
| **Country-Based Logic**     | Custom logic for different EU countries (metric standards, values)            |
| **Signals API**             | Efficient, reactive data flow without overusing RxJS                          |
| **Standalone Components**   | Modular, maintainable structure aligned with Angular’s modern standards       |
| **Testing**                 | Fully unit-tested with Jasmine + Karma                                        |

---

## Tech Stack

- **Framework**: Angular 18
- **UI**: Tailwind CSS + Angular Animations
- **Charting**: Chart.js
- **PDF Export**: html2canvas + jsPDF
- **AI Integration**: OpenAI (simulated for demo)
- **Testing**: Jasmine & Karma
- **Architecture**: Standalone Components + Signals + Clean Folder Structure + Best Coding Standards

---
# Key Folders
/app
 ┣ /features    → Form, Results, Report
 ┣ /shared      → Constants, Models, Services
 ┣ /config      → Form and Energy Emission Config
 ┗ /server      → Basic node server to communicate with openAI

# Why This Project?
- Built to reflect modern Angular practices
- Highlights AI + Visualization + Export integration
- Showcases clean, testable, scalable frontend code

## Screenshots
- **Landing**                           : src/assets/screenshots/landing.png
- **Carbon Foot Print Calculator**      : src/assets/screenshots/calculator.png
- **Results**                           : src/assets/screenshots/result.png
- **AI Insights**                       : src/assets/screenshots/insights.png
- **Download Report**                   : src/assets/screenshots/carbon-footprint-report.pdf 

 # What's Next?
    Add real-time country data from public APIs (EU sources)
    Implement language translation based on country selected
    PWA-ready version

## ⚙️ Installation

```bash
git clone https://github.com/Prajan94/carbon-emission-tracker.git
cd carbon-emission-tracker
npm install
npm start

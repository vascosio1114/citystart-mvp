# 🌍 CityStart — MVP

**CityStart** is a lightweight, city-based starter guide designed for **international students**.  
It curates essential local apps and services needed to live in a new city, presented in a clean and extensible data-driven format.

This repository contains the **MVP (v0.2)** implementation with a static web demo and structured JSON datasets, serving as the foundation for future multi-city and app-based expansion.

---

## 🎯 Problem

When international students move to a new city, they often face the same challenges:

- Which local apps are actually essential?
- Which services do people really use for daily life?
- Information is scattered across blogs, forums, and word-of-mouth
- Different cities require completely different app ecosystems

There is no single, structured place to quickly understand **“what to install first”** when arriving in a new city.

---

## 💡 Solution

CityStart centralizes **city-specific essential apps** into a structured dataset, categorized by daily life needs such as:

- Transportation  
- Housing  
- Banking  
- Food & groceries  
- Restaurants (by cuisine)  
- Communication & utilities  

The data is stored in **JSON format**, making it easy to reuse for:
- Web applications
- Mobile apps
- APIs
- Future data analysis

---

## 🚀 Current MVP (v0.2)

**Supported cities:**
- 🇨🇦 Toronto
- 🇬🇧 London
- 🇭🇰 Hong Kong

**Target user:** International students  
**Format:** Static HTML + JavaScript + JSON  
**Deployment:** GitHub Pages (static demo)

**Key features:**
- City selector (multi-city support)
- Category-based filtering
- Search by keyword
- Priority tagging (must-have / optional)
- JSON-driven data loading (no backend)

---

## 🔄 Data Pipeline

1. Raw app lists are collected and maintained in **Excel**
2. Data is converted into structured JSON using **Python (pandas)**
3. Frontend dynamically loads JSON based on selected city
4. UI renders categories, filters, and app cards automatically

This design allows **easy expansion** by simply adding a new city dataset.

---

## 🧠 Design Decisions

- **No backend**: Keeps the MVP simple and deployable via GitHub Pages
- **JSON-first**: Data can later be reused for APIs or mobile apps
- **City as a variable**: Enables scalable multi-city support
- **Separation of data & UI**: Improves maintainability and clarity

---

## 🛣️ Roadmap

### v0.3 (Planned)
- Add metadata (city, country, version, last updated)
- Normalize category naming across cities
- Improve UI/UX for mobile devices

### Future Directions
- REST API for city data
- User personalization (student type, preferences)
- Mobile app prototype
- Community-contributed city datasets

---

## 👤 Author

**Kei Chon Sio (Vasco)**  
Year 2 Student, University of Toronto  
Interested in Data Analytics, SQL, and Python  

📧 Email: keichonsio1114@gmail.com  
🌐 GitHub: https://github.com/vascosio1114

---

## 📜 License

This project is licensed under the **MIT License**.

---

*CityStart is an experimental MVP project created for learning, exploration, and future expansion.*

# 🌍 CityStart

> A city-based essential app guide for international students.

🔗 **[Live Site](https://vascosio1114.github.io/citystart-mvp/)**

Started this as a way to practice building a data pipeline and a simple frontend. The idea came from my own experience arriving in Toronto — figuring out which apps to install, which services to use, where to get things done. I turned that into a structured dataset and a small web app.

---

## 💡 What It Does

CityStart lists essential local apps and services for each supported city, organised by category (transport, food, housing, banking, etc.). You can filter by category, search by keyword, and switch between cities — all from a static page with no backend.

**Supported cities:** 🇨🇦 Toronto · 🇬🇧 London · 🇭🇰 Hong Kong

---

## 🔄 How It Works

Raw app data is collected and maintained in Excel, then converted to structured JSON using Python (pandas). The frontend loads the JSON dynamically and renders app cards — so adding a new city is as simple as adding a new dataset file.

```
Excel → Python (pandas) → JSON → Static HTML/JS frontend
```

---

## ✨ Features

- City selector with multi-city support
- Category-based filtering
- Keyword search
- Priority tagging (must-have / optional)
- JSON-driven — no backend needed

---

## 🛠️ Built With

Python · pandas · HTML · CSS · JavaScript · GitHub Pages

---

## 🚀 Run Locally

```bash
git clone https://github.com/vascosio1114/citystart-mvp.git
cd citystart-mvp
open index.html
```

---

## 👤 Author

**Vasco Sio (Kei Chon)** · Year 4 · GIS & Statistics · University of Toronto Mississauga
📫 keichonsio1114@gmail.com

📜 MIT License

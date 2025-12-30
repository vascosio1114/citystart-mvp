import pandas as pd
import json
from pathlib import Path

# ====== Paths ======
EXCEL_PATH = Path("data/Toronto_New_International_Student_Essential_Apps.xlsx")
OUTPUT_JSON = Path("data/toronto_international_student.json")
SHEET_NAME = 0  # 如果你想指定 sheet 名稱，可以改成 "Toronto Student Life Apps"

# ====== Read Excel ======
df = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME)

# ====== Clean column names ======
# 1) 轉 string
# 2) 去頭尾空格
# 3) 轉小寫
# 4) 將空格變 underscore
df.columns = [str(c).strip().lower().replace(" ", "_") for c in df.columns]

required_cols = ["category", "app_name", "why_need", "country_type", "priority", "website"]
missing = [c for c in required_cols if c not in df.columns]

if missing:
    print("❌ Missing columns:", missing)
    print("✅ Detected columns:", list(df.columns))
    raise SystemExit(1)

# ====== Clean values ======
df = df.fillna("")

# ====== Build JSON (group by category) ======
result = {}

for _, row in df.iterrows():
    category = str(row["category"]).strip()
    if not category:
        continue

    app = {
        "name": str(row["app_name"]).strip(),
        "why_need": str(row["why_need"]).strip(),
        "priority": str(row["priority"]).strip(),
        "website": str(row["website"]).strip(),
    }

    # country_type 可能空
    country_type = str(row["country_type"]).strip()
    if country_type:
        app["country_type"] = country_type

    result.setdefault(category, []).append(app)

# ====== Save JSON ======
OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"✅ JSON created: {OUTPUT_JSON}")
print(f"✅ Categories: {len(result)}")
print(f"✅ Total apps: {sum(len(v) for v in result.values())}")
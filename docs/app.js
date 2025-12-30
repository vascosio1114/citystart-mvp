let RAW = null;
let selectedCategory = "all";

const elCategoryList = document.getElementById("categoryList");
const elCards = document.getElementById("cards");
const elSearch = document.getElementById("search");
const elPriority = document.getElementById("priority");
const elMeta = document.getElementById("meta");
const elEmpty = document.getElementById("empty");

function titleCase(s) {
  return (s || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function flattenData(dataObj) {
  const rows = [];
  for (const [category, apps] of Object.entries(dataObj)) {
    if (!Array.isArray(apps)) continue;
    for (const app of apps) {
      rows.push({
        category,
        name: app.name || "",
        why_need: app.why_need || "",
        priority: app.priority || "",
        website: app.website || "",
        country_type: app.country_type || ""
      });
    }
  }
  return rows;
}

function uniqueCategories(dataObj) {
  return Object.keys(dataObj).filter((k) => Array.isArray(dataObj[k]));
}

function renderCategories(categories) {
  elCategoryList.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = selectedCategory === "all" ? "active" : "";
  allBtn.onclick = () => {
    selectedCategory = "all";
    renderCategories(categories);
    render();
  };
  const allLi = document.createElement("li");
  allLi.appendChild(allBtn);
  elCategoryList.appendChild(allLi);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = titleCase(cat);
    btn.className = selectedCategory === cat ? "active" : "";
    btn.onclick = () => {
      selectedCategory = cat;
      renderCategories(categories);
      render();
    };
    const li = document.createElement("li");
    li.appendChild(btn);
    elCategoryList.appendChild(li);
  });
}

function matchesFilters(row) {
  const q = (elSearch.value || "").trim().toLowerCase();
  const p = elPriority.value;

  if (selectedCategory !== "all" && row.category !== selectedCategory) return false;
  if (p !== "all" && (row.priority || "").toLowerCase() !== p) return false;

  if (!q) return true;

  const haystack = `${row.name} ${row.why_need} ${row.category}`.toLowerCase();
  return haystack.includes(q);
}

function renderMeta(total, shown) {
  const categoryLabel = selectedCategory === "all" ? "All categories" : titleCase(selectedCategory);
  const priorityLabel = elPriority.value === "all" ? "All priorities" : elPriority.value;

  elMeta.textContent = `Showing ${shown} / ${total} apps • ${categoryLabel} • ${priorityLabel}`;
}

function renderCards(rows) {
  elCards.innerHTML = "";
  rows.forEach((row) => {
    const card = document.createElement("div");
    card.className = "card";

    const h3 = document.createElement("h3");
    const name = document.createElement("span");
    name.textContent = row.name || "(Unnamed)";
    const badge = document.createElement("span");
    const pr = (row.priority || "").toLowerCase() || "optional";
    badge.className = `badge ${pr}`;
    badge.textContent = pr;

    h3.appendChild(name);
    h3.appendChild(badge);

    const p = document.createElement("p");
    p.textContent = row.why_need || "";

    const a = document.createElement("a");
    a.href = row.website || "#";
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = row.website ? "Open website" : "No website link";

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(a);

    elCards.appendChild(card);
  });
}

function render() {
  const rows = flattenData(RAW);
  const filtered = rows.filter(matchesFilters);

  renderMeta(rows.length, filtered.length);
  renderCards(filtered);

  elEmpty.classList.toggle("hidden", filtered.length !== 0);
}

async function init() {
  // IMPORTANT: open index.html with a local server (not double click), otherwise fetch may fail.
  const res = await fetch("./data/toronto_international_student.json");
  if (!res.ok) throw new Error("Failed to load JSON. Check path and run via local server.");
  RAW = await res.json();

  const categories = uniqueCategories(RAW).sort();
  renderCategories(categories);

  elSearch.addEventListener("input", render);
  elPriority.addEventListener("change", render);

  render();
}

init().catch((err) => {
  console.error(err);
  elMeta.textContent = "Error loading data. Check console + JSON path.";
  elEmpty.classList.remove("hidden");
  elEmpty.textContent = "Failed to load JSON. Make sure you run with a local server (see Step 5).";
});
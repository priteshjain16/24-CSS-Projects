/* -------------------------------------------------
   1. CONFIG — tweak these to experiment
-------------------------------------------------- */
const CONFIG = {
  weeks: 53,        // columns (like GitHub: ~1 year)
  days: 7,          // rows (Sun → Sat)
  maxLevel: 4,      // 0..4 = 5 shades
};

/* -------------------------------------------------
   2. WEIGHTED RANDOM LEVEL
   Most cells should be empty/light, like real life.
   Change the thresholds to make the graph busier.
-------------------------------------------------- */
function randomLevel() {
  const r = Math.random();
  if (r < 0.35) return 0;   // 35% → no contributions
  if (r < 0.60) return 1;   // 25%
  if (r < 0.80) return 2;   // 20%
  if (r < 0.93) return 3;   // 13%
  return 4;                 //  7% → darkest
}

/* -------------------------------------------------
   3. BUILD THE GRAPH
-------------------------------------------------- */
function buildGraph() {
  const graph = document.getElementById("graph");
  const fragment = document.createDocumentFragment();

  const totalCells = CONFIG.weeks * CONFIG.days;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    // This is the hook your CSS will use 🎨
    cell.dataset.level = randomLevel();

    // Small tooltip so it feels real
    const count = cell.dataset.level;
    cell.title = count === "0"
      ? "No contributions"
      : `${count} contribution${count === "1" ? "" : "s"}`;

    fragment.appendChild(cell);
  }

  graph.replaceChildren(fragment); // wipe + insert in one go
}

/* -------------------------------------------------
   4. RUN
-------------------------------------------------- */
buildGraph(); // runs on every page refresh automatically

document.getElementById("rerollBtn")
  .addEventListener("click", buildGraph);
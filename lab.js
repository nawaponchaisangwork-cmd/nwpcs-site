const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

const chartMarkup = {
  bachelier: () => {
    const paths = Array.from({ length: 4 }, (_, pathIndex) => {
      let y = 150;
      const points = [`40,${y}`];
      for (let x = 60; x <= 600; x += 20) {
        y = Math.max(35, Math.min(265, y + Math.sin(x * 0.071 + pathIndex * 1.7) * 9 + (pathIndex - 1.5) * 0.12));
        points.push(`${x},${y.toFixed(1)}`);
      }
      return `<polyline class="chart-line ${pathIndex ? "faint" : ""}" points="${points.join(" ")}" />`;
    }).join("");
    return `<line class="chart-axis" x1="40" y1="270" x2="610" y2="270"/><line class="chart-axis" x1="40" y1="30" x2="40" y2="270"/><line class="chart-dashed" x1="40" y1="150" x2="610" y2="150"/><text class="chart-label" x="42" y="292">TIME t</text><text class="chart-label" x="42" y="24">PRICE S</text>${paths}<text class="chart-label dark" x="500" y="142">E[S<tspan baseline-shift="sub">t</tspan>]</text>`;
  },
  option: () => `<line class="chart-axis" x1="55" y1="255" x2="610" y2="255"/><line class="chart-axis" x1="55" y1="35" x2="55" y2="255"/><line class="chart-dashed" x1="360" y1="35" x2="360" y2="255"/><polyline class="chart-line" points="55,255 360,255 600,55"/><text class="chart-label" x="565" y="275">S<tspan baseline-shift="sub">T</tspan></text><text class="chart-label" x="365" y="275">K = 100</text><text class="chart-label" x="64" y="30">PAYOFF</text><text class="chart-label dark" x="458" y="74">max(S<tspan baseline-shift="sub">T</tspan> − K, 0)</text>`,
  feedback: () => `<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#11110f"/></marker></defs><rect class="loop-box" x="52" y="105" width="135" height="55"/><rect class="loop-box" x="250" y="105" width="135" height="55"/><rect class="loop-box" x="448" y="105" width="135" height="55"/><text class="chart-label dark" x="77" y="137">PRICE SHOCK</text><text class="chart-label dark" x="272" y="137">REBALANCE</text><text class="chart-label dark" x="477" y="137">SELLING</text><path class="loop-arrow" d="M187 132 H245"/><path class="loop-arrow" d="M385 132 H443"/><path class="loop-arrow" d="M515 160 C515 230 120 245 120 165"/><text class="chart-label" x="261" y="231">lower liquidity / larger response</text><text class="chart-label" x="52" y="78">ΔP ↓</text>`,
  impact: () => `<line class="chart-axis" x1="55" y1="255" x2="610" y2="255"/><line class="chart-axis" x1="55" y1="35" x2="55" y2="255"/><line class="chart-grid" x1="55" y1="145" x2="610" y2="145"/><line class="chart-grid" x1="332" y1="35" x2="332" y2="255"/><polyline class="chart-line faint" points="80,230 580,65"/><polyline class="chart-line" points="80,245 580,105"/><text class="chart-label" x="570" y="275">Q</text><text class="chart-label" x="56" y="28">ΔP</text><text class="chart-label" x="470" y="91">thin book / λ high</text><text class="chart-label dark" x="440" y="148">deep book / λ low</text><text class="chart-label" x="64" y="275">SELL</text><text class="chart-label" x="570" y="275">BUY</text>`
};

document.querySelectorAll(".model-chart").forEach((chart) => {
  chart.innerHTML = chartMarkup[chart.dataset.chart]();
});

document.querySelectorAll(".lab-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".lab-tab").forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
    document.querySelectorAll(".model-panel").forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
  });
});

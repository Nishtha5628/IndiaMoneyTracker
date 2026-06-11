// ── COUNTER ──
const dailyBudgetCr = 48200000; // ₹ crore / year
const dailyCr = dailyBudgetCr / 365;
const perMs = (dailyCr * 1e7) / 86400000; // paise per ms → rupees: *1e7 (1cr = 1e7 rupees)

const now = new Date();
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let elapsed = now - startOfDay;

function formatRupee(n) {
  if (n >= 1e7) return '₹' + (n/1e7).toFixed(2) + ' Cr';
  if (n >= 1e5) return '₹' + (n/1e5).toFixed(2) + ' L';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

const counterEl = document.getElementById('mainCounter');
let lastRender = Date.now();

function tick() {
  const now2 = Date.now();
  elapsed += now2 - lastRender;
  lastRender = now2;
  const spent = perMs * elapsed;
  counterEl.textContent = formatRupee(spent);
  requestAnimationFrame(tick);
}
tick();

// ── MINISTRIES ──
const ministries = [
  { name:'Defence', budget:'₹6.97L Cr', util:89, color:'#1A6B3C' },
  { name:'Road Transport & Highways', budget:'₹2.78L Cr', util:81, color:'#1A6B3C' },
  { name:'Railways', budget:'₹2.55L Cr', util:78, color:'#1A6B3C' },
  { name:'Rural Development', budget:'₹1.77L Cr', util:74, color:'#C8960C' },
  { name:'Education', budget:'₹1.21L Cr', util:72, color:'#C8960C' },
  { name:'Health & Family Welfare', budget:'₹90,958 Cr', util:68, color:'#C8960C' },
  { name:'MGNREGA', budget:'₹86,000 Cr', util:66, color:'#C8960C' },
  { name:'Agriculture & Cooperation', budget:'₹1.27L Cr', util:59, color:'#D92B2B' },
  { name:'Jal Jeevan Mission', budget:'₹70,163 Cr', util:53, color:'#D92B2B' },
  { name:'Smart Cities Mission', budget:'₹8,000 Cr', util:44, color:'#D92B2B' },
  { name:'Housing & Urban Affairs', budget:'₹82,577 Cr', util:71, color:'#C8960C' },
  { name:'New & Renewable Energy', budget:'₹19,100 Cr', util:63, color:'#C8960C' },
];

const grid = document.querySelector('.spending-grid');
ministries.forEach(m => {
  const stampText = m.util >= 80 ? 'On track' : m.util >= 65 ? 'Moderate' : 'At risk';
  const stampClass = m.util >= 80 ? 'stamp-high' : m.util >= 65 ? 'stamp-med' : 'stamp-low';
  const card = document.createElement('div');
  card.className = 'ministry-card fade-in';
  card.innerHTML = `
    <span class="ministry-stamp ${stampClass}">${stampText}</span>
    <p class="ministry-name">${m.name}</p>
    <div class="ministry-amount">${m.budget}</div>
    <div class="ministry-amount-label">sanctioned budget</div>
    <div class="ministry-bar-wrap">
      <div class="ministry-bar-fill" style="width:${m.util}%;background:${m.color};"></div>
    </div>
    <div class="ministry-util">
      <span class="ministry-util-pct" style="color:${m.color};">${m.util}%</span>
      <span class="ministry-util-label">utilised</span>
    </div>`;
  grid.appendChild(card);
});

// ── STATES ──
const states = [
  {code:'KL',name:'Kerala',score:82},{code:'GJ',name:'Gujarat',score:78},
  {code:'HP',name:'Himachal',score:76},{code:'TN',name:'Tamil Nadu',score:74},
  {code:'KA',name:'Karnataka',score:72},{code:'MH',name:'Maharashtra',score:68},
  {code:'AP',name:'Andhra',score:66},{code:'TS',name:'Telangana',score:65},
  {code:'PB',name:'Punjab',score:61},{code:'HR',name:'Haryana',score:63},
  {code:'RJ',name:'Rajasthan',score:58},{code:'OD',name:'Odisha',score:55},
  {code:'MP',name:'Madhya P',score:54},{code:'AS',name:'Assam',score:50},
  {code:'WB',name:'W Bengal',score:52},{code:'JH',name:'Jharkhand',score:46},
  {code:'UP',name:'Uttar P',score:42},{code:'BR',name:'Bihar',score:38},
  {code:'CG',name:'C\'garh',score:48},{code:'MN',name:'Manipur',score:56},
  {code:'TR',name:'Tripura',score:53},{code:'GA',name:'Goa',score:70},
  {code:'SK',name:'Sikkim',score:67},{code:'UK',name:'Uttrakhand',score:60},
  {code:'JK',name:'J&K',score:49},{code:'NL',name:'Nagaland',score:44},
];

function stateColor(s) {
  if(s>=75) return {bg:'#1D9E75',fg:'#04342C'};
  if(s>=65) return {bg:'#97C459',fg:'#173404'};
  if(s>=55) return {bg:'#EF9F27',fg:'#412402'};
  if(s>=45) return {bg:'#F0997B',fg:'#4A1B0C'};
  return {bg:'#F7C1C1',fg:'#501313'};
}

const sg = document.getElementById('stateGrid');
states.forEach(s => {
  const c = stateColor(s.score);
  const el = document.createElement('div');
  el.className = 'state-box';
  el.style.background = c.bg;
  el.title = `${s.name}: ${s.score}/100`;
  el.innerHTML = `<span class="state-abbr" style="color:${c.fg};">${s.code}</span><span class="state-score" style="color:${c.fg};opacity:.8;">${s.score}</span>`;
  el.addEventListener('click', () => {
    alert(`${s.name}\nDevelopment Efficiency: ${s.score}/100\n\nClick OK to explore this state's district-level data.`);
  });
  sg.appendChild(el);
});

// Rankings
const sorted = [...states].sort((a,b)=>b.score-a.score);
const ranksEl = document.getElementById('stateRanks');
sorted.slice(0,5).forEach((s,i) => {
  const c = stateColor(s.score);
  ranksEl.innerHTML += `<div class="state-rank-item">
    <span class="state-rank-pos">${i+1}</span>
    <span class="state-rank-name">${s.name}</span>
    <span class="state-rank-score" style="color:${c.bg};">${s.score}</span>
  </div>`;
});
const worstEl = document.getElementById('stateWorst');
sorted.slice(-5).reverse().forEach((s,i) => {
  const c = stateColor(s.score);
  worstEl.innerHTML += `<div class="state-rank-item">
    <span class="state-rank-pos" style="color:var(--red);">!</span>
    <span class="state-rank-name">${s.name}</span>
    <span class="state-rank-score" style="color:${c.bg};">${s.score}</span>
  </div>`;
});

// ── INTERSECTION OBSERVER ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('in-view');
      }, 60 * i);
      obs.unobserve(e.target);
    }
  });
}, {threshold: 0.1});

document.querySelectorAll('.fade-in, .project-row').forEach(el => obs.observe(el));

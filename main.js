/* ==========================================================================
   COVID-19 Global Data Dashboard - Script Logic & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const data = {
    metrics: {
      cases: { total: 6150482 },
      fatalities: { total: 370506 },
      active: { total: 3045430 }
    },
    casesByCountry: [
      { code: 'USA', total: 1816820, active: 1146200 },
      { code: 'Brz', total: 498440, active: 277250 },
      { code: 'Rus', total: 396575, active: 228900 },
      { code: 'Spa', total: 286308, active: 67200 },
      { code: 'UK', total: 272826, active: 221000 },
      { code: 'Ita', total: 232664, active: 43690 },
      { code: 'Fra', total: 188625, active: 90200 },
      { code: 'Ger', total: 183294, active: 9800 },
      { code: 'Ind', total: 181827, active: 89980 },
      { code: 'Tur', total: 163103, active: 31200 },
      { code: 'Per', total: 155671, active: 82400 },
      { code: 'Irn', total: 148950, active: 22400 },
      { code: 'Chi', total: 94858, active: 52100 },
      { code: 'Can', total: 98198, active: 33500 },
      { code: 'Mex', total: 84627, active: 16900 },
      { code: 'KSA', total: 83384, active: 24100 }
    ],
    growth: {
      number: [
        { code: 'Brz', val: 30102, display: '+30,102' },
        { code: 'USA', val: 23290, display: '+23,290' },
        { code: 'Rus', val: 8952, display: '+8,952' },
        { code: 'Ind', val: 8336, display: '+8,336' },
        { code: 'Per', val: 7386, display: '+7,386' },
        { code: 'Chi', val: 4220, display: '+4,220' },
        { code: 'Mex', val: 3227, display: '+3,227' },
        { code: 'Pak', val: 2429, display: '+2,429' }
      ],
      percent: [
        { code: 'Brz', val: 6.4, display: '+6.4%' },
        { code: 'Chi', val: 4.7, display: '+4.7%' },
        { code: 'Ind', val: 4.8, display: '+4.8%' },
        { code: 'Per', val: 5.0, display: '+5.0%' },
        { code: 'Mex', val: 4.0, display: '+4.0%' },
        { code: 'Rus', val: 2.3, display: '+2.3%' },
        { code: 'Pak', val: 3.8, display: '+3.8%' },
        { code: 'USA', val: 1.3, display: '+1.3%' }
      ]
    },
    spread: [
      { name: 'USA', percent: 0.56 },
      { name: 'Brazil', percent: 0.24 },
      { name: 'Russia', percent: 0.27 },
      { name: 'Spain', percent: 0.61 },
      { name: 'UK', percent: 0.41 },
      { name: 'Italy', percent: 0.39 },
      { name: 'France', percent: 0.29 },
      { name: 'Germany', percent: 0.22 },
      { name: 'India', percent: 0.01 },
      { name: 'Turkey', percent: 0.2 },
      { name: 'Peru', percent: 0.49 },
      { name: 'Iran', percent: 0.18 },
      { name: 'Chile', percent: 0.5 },
      { name: 'Canada', percent: 0.24 },
      { name: 'Mexico', percent: 0.5 },
      { name: 'Saudi Arabia', percent: 0.25 }
    ],
    fatalities: [
      { code: 'USA', val: 105557, rate: 5.8 },
      { code: 'UK', val: 38376, rate: 14.1 },
      { code: 'Ita', val: 33340, rate: 14.3 },
      { code: 'Brz', val: 28834, rate: 5.8 },
      { code: 'Fra', val: 28771, rate: 15.3 },
      { code: 'Spa', val: 27125, rate: 9.5 },
      { code: 'Bel', val: 9453, rate: 16.2 },
      { code: 'Mex', val: 9415, rate: 11.1 },
      { code: 'Ger', val: 8600, rate: 4.7 },
      { code: 'Irn', val: 7734, rate: 5.2 },
      { code: 'Can', val: 7073, rate: 7.2 },
      { code: 'Ned', val: 5951, rate: 12.8 },
      { code: 'Ind', val: 5185, rate: 2.8 },
      { code: 'Chn', val: 4634, rate: 5.5 },
      { code: 'Rus', val: 4555, rate: 1.1 },
      { code: 'Tur', val: 4515, rate: 2.8 }
    ],
    trendPoints: [
      { yPct: 92, val: '5.5m' },
      { yPct: 80, val: '5.6m' },
      { yPct: 68, val: '5.7m' },
      { yPct: 54, val: '5.8m' },
      { yPct: 40, val: '5.9m' },
      { yPct: 26, val: '6.0m' },
      { yPct: 12, val: '6.1m' }
    ]
  };

  function formatNum(n) {
    return n.toLocaleString('en-US');
  }

  // 1. Fade-Up Intersection Observer for Page Sections
  function initScrollAnimations() {
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    fadeUpElements.forEach(el => observer.observe(el));
  }

  // 2. Header Numbers Animation
  function animateHeader() {
    animateVal(document.getElementById('num-cases'), 0, data.metrics.cases.total, 900);
    animateVal(document.getElementById('num-fatalities'), 0, data.metrics.fatalities.total, 900);
    animateVal(document.getElementById('num-active'), 0, data.metrics.active.total, 900);
  }

  function animateVal(el, start, end, duration) {
    if (!el) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      el.textContent = formatNum(Math.floor(progress * (end - start) + start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  // 3. Cases Horizontal Bars
  function renderCasesBars(mode = 'total') {
    const container = document.getElementById('cases-list');
    if (!container) return;
    container.innerHTML = '';

    const maxVal = Math.max(...data.casesByCountry.map(c => mode === 'total' ? c.total : c.active));

    data.casesByCountry.forEach(c => {
      const val = mode === 'total' ? c.total : c.active;
      const widthPct = Math.max(12, (val / maxVal) * 100);

      const row = document.createElement('div');
      row.className = 'country-row';
      row.innerHTML = `
        <span class="country-code-lbl">${c.code}</span>
        <div class="country-bar-track">
          <div class="country-bar-fill" style="width: 0%;" data-w="${widthPct}%">
            <span class="country-val-text">${formatNum(val)}</span>
          </div>
        </div>
      `;
      container.appendChild(row);
    });

    setTimeout(() => {
      container.querySelectorAll('.country-bar-fill').forEach(f => {
        f.style.width = f.getAttribute('data-w');
      });
    }, 50);
  }

  // 4. Growth Vertical Bars
  function renderGrowthChart(mode = 'number') {
    const container = document.getElementById('growth-chart');
    if (!container) return;
    container.innerHTML = '';

    const dataset = mode === 'number' ? data.growth.number : data.growth.percent;
    const maxVal = Math.max(...dataset.map(d => d.val));

    dataset.forEach(d => {
      const hPct = Math.max(15, (d.val / maxVal) * 100);

      const col = document.createElement('div');
      col.className = 'growth-column';
      col.innerHTML = `
        <span class="growth-val-rot">${d.display}</span>
        <div class="growth-track">
          <div class="growth-fill" style="height: 0%;" data-h="${hPct}%"></div>
        </div>
        <span class="growth-code">${d.code}</span>
      `;
      container.appendChild(col);
    });

    setTimeout(() => {
      container.querySelectorAll('.growth-fill').forEach(f => {
        f.style.height = f.getAttribute('data-h');
      });
    }, 50);
  }

  // 5. Virus Spread Circles (Tiny Red Dot for India)
  function renderSpreadCircles() {
    const grid = document.getElementById('spread-grid');
    if (!grid) return;
    grid.innerHTML = '';

    data.spread.forEach(item => {
      const outerSize = 130;
      let innerSize;
      
      // India has 0.01% -> very tiny hot pink dot
      if (item.percent <= 0.02) {
        innerSize = 8; // Very small dot matching video reference!
      } else {
        const scaleRatio = Math.min(0.85, Math.max(0.12, item.percent / 0.65));
        innerSize = Math.round(outerSize * scaleRatio);
      }

      const div = document.createElement('div');
      div.className = 'spread-circle-item';
      div.innerHTML = `
        <div class="circle-outer-ring">
          <div class="circle-inner-fill" data-size="${innerSize}px"></div>
        </div>
        <div class="spread-country-title">${item.name}</div>
        <div class="spread-percent-text">${item.percent}%</div>
      `;
      grid.appendChild(div);
    });

    setTimeout(() => {
      grid.querySelectorAll('.circle-inner-fill').forEach(inner => {
        const sz = inner.getAttribute('data-size');
        inner.style.width = sz;
        inner.style.height = sz;
      });
    }, 100);
  }

  // 6. Fatalities Bars
  function renderFatalitiesBars(mode = 'number') {
    const container = document.getElementById('fatalities-list');
    if (!container) return;
    container.innerHTML = '';

    const maxVal = Math.max(...data.fatalities.map(f => mode === 'number' ? f.val : f.rate));

    data.fatalities.forEach(f => {
      const val = mode === 'number' ? f.val : f.rate;
      const displayVal = mode === 'number' ? formatNum(f.val) : `${f.rate}%`;
      const widthPct = Math.max(12, (val / maxVal) * 100);

      const row = document.createElement('div');
      row.className = 'country-row';
      row.innerHTML = `
        <span class="country-code-lbl">${f.code}</span>
        <div class="country-bar-track">
          <div class="country-bar-fill" style="width: 0%;" data-w="${widthPct}%">
            <span class="country-val-text">${displayVal}</span>
          </div>
        </div>
      `;
      container.appendChild(row);
    });

    setTimeout(() => {
      container.querySelectorAll('.country-bar-fill').forEach(f => {
        f.style.width = f.getAttribute('data-w');
      });
    }, 50);
  }

  // 7. Trend Dots
  function renderTrendDots() {
    const layer = document.getElementById('trend-dots-layer');
    if (!layer) return;
    layer.innerHTML = '';

    const total = data.trendPoints.length;
    data.trendPoints.forEach((pt, idx) => {
      const xPct = (idx / (total - 1)) * 90 + 5;

      const dot = document.createElement('div');
      dot.className = 'trend-dot-item';
      dot.style.left = `${xPct}%`;
      dot.style.top = `${pt.yPct}%`;
      layer.appendChild(dot);
    });
  }

  // Tab Listeners
  function initTabs() {
    document.querySelectorAll('.tab-cases').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-cases').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderCasesBars(e.target.dataset.mode);
      });
    });

    document.querySelectorAll('.tab-growth').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-growth').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGrowthChart(e.target.dataset.mode);
      });
    });

    document.querySelectorAll('.tab-fatalities').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-fatalities').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderFatalitiesBars(e.target.dataset.mode);
      });
    });

    const topBtn = document.getElementById('return-top');
    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Initialize All Features
  initScrollAnimations();
  animateHeader();
  renderCasesBars('total');
  renderGrowthChart('number');
  renderSpreadCircles();
  renderFatalitiesBars('number');
  renderTrendDots();
  initTabs();
});
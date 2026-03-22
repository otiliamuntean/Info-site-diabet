(function() {
  // ========== CALCULATOR IMC ==========
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const calcBtn = document.getElementById('calcBmiBtn');
  const resultDiv = document.getElementById('bmiResult');
  function computeBMI() {
    let h = parseFloat(heightInput.value);
    let w = parseFloat(weightInput.value);
    if (isNaN(h) || h < 100 || h > 250) {
      resultDiv.innerHTML = `<i class="fas fa-ruler"></i> Înălțime invalidă (100–250 cm)`;
      return;
    }
    if (isNaN(w) || w < 20 || w > 250) {
      resultDiv.innerHTML = `<i class="fas fa-weight-hanging"></i> Greutate invalidă (20–250 kg)`;
      return;
    }
    let bmi = w / ((h / 100) ** 2);
    bmi = Math.round(bmi * 10) / 10;
    let category = '', suggestion = '';
    if (bmi < 18.5) {
      category = 'subponderal';
      suggestion = 'Risc potențial, menține o dietă echilibrată.';
    } else if (bmi < 25) {
      category = 'normal (sănătos)';
      suggestion = 'Risc scăzut pentru diabet tip 2.';
    } else if (bmi < 30) {
      category = 'supraponderal';
      suggestion = 'Risc moderat crescut. Adoptă mișcare și alimentație sănătoasă.';
    } else if (bmi < 35) {
      category = 'obezitate grad I';
      suggestion = 'Risc crescut. Consultă medicul pentru prevenție.';
    } else {
      category = 'obezitate semnificativă';
      suggestion = 'Risc foarte ridicat. Evaluare medicală recomandată.';
    }
    resultDiv.innerHTML = `${bmi} <small>IMC ${category} — ${suggestion}</small>`;
  }
  if (calcBtn) calcBtn.addEventListener('click', computeBMI);
  window.addEventListener('load', computeBMI);

  // ========== CONVERTOR GLICEMIE ==========
  const mgdlInput = document.getElementById('mgdlInput');
  const mmolInput = document.getElementById('mmolInput');
  function updateFromMgdl() {
    let mgdl = parseFloat(mgdlInput.value);
    if (!isNaN(mgdl) && mgdl >= 0 && mgdl <= 800) {
      mmolInput.value = (mgdl / 18).toFixed(1);
    } else if (mgdlInput.value === '') mmolInput.value = '';
    else mmolInput.value = '?';
  }
  function updateFromMmol() {
    let mmol = parseFloat(mmolInput.value);
    if (!isNaN(mmol) && mmol >= 0 && mmol <= 45) {
      mgdlInput.value = Math.round(mmol * 18);
    } else if (mmolInput.value === '') mgdlInput.value = '';
    else mgdlInput.value = '?';
  }
  if (mgdlInput && mmolInput) {
    mgdlInput.addEventListener('input', updateFromMgdl);
    mmolInput.addEventListener('input', updateFromMmol);
    updateFromMgdl();
  }

  // ========== SFATURI ==========
  const tips = [
    "🥗 Fibrele solubile (ovăz, mere, fasole) ajută la controlul glicemiei postprandiale.",
    "💪 Doar 30 de minute de mers pe zi reduc riscul de diabet tip 2 cu până la 30%.",
    "🩸 Stresul cronic crește glicemia prin eliberarea de cortizol.",
    "🍽️ Mesele mici și regulate previn fluctuațiile mari ale zahărului din sânge.",
    "😴 Somnul insuficient (sub 6h) poate scădea sensibilitatea la insulină cu 25%.",
    "💧 Hidratarea adecvată ajută rinichii să elimine excesul de glucoză.",
    "🍎 Merele, fructele de pădure și nucile sunt gustări ideale pentru persoanele cu diabet.",
    "📉 Pierderea a 5-10% din greutate corporală poate reduce riscul de diabet tip 2 cu peste 50%.",
    "🧘‍♀️ Meditația și somnul profund îmbunătățesc controlul glicemic.",
    "🔍 Controlează-ți glicemia la intervale regulate — automonitorizarea este cheia."
  ];
  const tipText = document.getElementById('randomTipText');
  const newTipBtn = document.getElementById('newTipBtn');
  if (newTipBtn) {
    newTipBtn.addEventListener('click', () => {
      tipText.innerText = tips[Math.floor(Math.random() * tips.length)];
    });
    tipText.innerText = tips[0];
  }

  // ========== CEAS ANALOG + DIGITAL + DATĂ ==========
  const canvas = document.getElementById('analogCanvas');
  const ctx = canvas.getContext('2d');
  const digitalTimeEl = document.getElementById('digitalTime');
  const digitalDateEl = document.getElementById('digitalDate');
  const digitalDayEl = document.getElementById('digitalDay');

  function drawAnalogClock(now) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    
    // Fundal
    ctx.beginPath();
    ctx.arc(0, 0, radius - 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#2b7a8a';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Marcaje ore
    for (let i = 1; i <= 12; i++) {
      const angle = i * Math.PI * 2 / 12;
      const x = (radius - 12) * Math.sin(angle);
      const y = -(radius - 12) * Math.cos(angle);
      ctx.font = 'bold 12px "Inter"';
      ctx.fillStyle = '#1e293b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), x, y);
    }
    
    // Acțile
    const hourAngle = (hours % 12) * (Math.PI * 2 / 12) + (minutes / 60) * (Math.PI * 2 / 12);
    const minuteAngle = minutes * (Math.PI * 2 / 60);
    const secondAngle = seconds * (Math.PI * 2 / 60);
    
    // Ora
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius * 0.5 * Math.sin(hourAngle), -radius * 0.5 * Math.cos(hourAngle));
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#2b7a8a';
    ctx.stroke();
    
    // Minut
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius * 0.7 * Math.sin(minuteAngle), -radius * 0.7 * Math.cos(minuteAngle));
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1f5f6b';
    ctx.stroke();
    
    // Secundă
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius * 0.85 * Math.sin(secondAngle), -radius * 0.85 * Math.cos(secondAngle));
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#f4a261';
    ctx.stroke();
    
    // Centru
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#2b7a8a';
    ctx.fill();
    
    ctx.restore();
  }

  function updateClock() {
    const now = new Date();
    
    // Digital time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    digitalTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Date
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    digitalDateEl.textContent = now.toLocaleDateString('ro-RO', optionsDate);
    
    // Day
    const optionsDay = { weekday: 'long' };
    digitalDayEl.textContent = now.toLocaleDateString('ro-RO', optionsDay);
    
    // Analog
    drawAnalogClock(now);
  }
  
  updateClock();
  setInterval(updateClock, 1000);

  // ========== RESPIRAȚIE GHIDATĂ ==========
  const modal = document.getElementById('breathingModal');
  const breathingBtn = document.getElementById('breathingBtn');
  const closeModal = document.querySelector('.close-modal');
  const stopBtn = document.getElementById('stopBreathingBtn');
  const circle = document.getElementById('breathingCircle');
  const breathingText = document.getElementById('breathingText');
  const instruction = document.getElementById('breathingInstruction');
  
  let breathingInterval = null;
  let currentPhase = 0;
  let phaseStartTime = 0;
  let isBreathing = false;
  
  const phases = [
    { name: 'Inspiră', duration: 4000, scaleTarget: 1.6, text: '🌬️' },
    { name: 'Ține', duration: 4000, scaleTarget: 1.6, text: '🌀' },
    { name: 'Expiră', duration: 6000, scaleTarget: 1.0, text: '🌿' }
  ];
  
  function updateBreathing(now) {
    if (!isBreathing) return;
    const elapsed = now - phaseStartTime;
    const phase = phases[currentPhase];
    let progress = Math.min(1, elapsed / phase.duration);
    let scale;
    if (currentPhase === 0) {
      scale = 1 + (phase.scaleTarget - 1) * progress;
    } else if (currentPhase === 1) {
      scale = phase.scaleTarget;
    } else {
      scale = phase.scaleTarget + (1 - phase.scaleTarget) * (1 - progress);
    }
    circle.style.transform = `scale(${scale})`;
    breathingText.innerHTML = phase.text;
    instruction.innerHTML = phase.name;
    
    if (elapsed >= phase.duration) {
      currentPhase = (currentPhase + 1) % phases.length;
      phaseStartTime = now;
      requestAnimationFrame(updateBreathing);
    } else {
      requestAnimationFrame(updateBreathing);
    }
  }
  
  function startBreathing() {
    if (breathingInterval) cancelAnimationFrame(breathingInterval);
    isBreathing = true;
    currentPhase = 0;
    phaseStartTime = performance.now();
    circle.style.transform = 'scale(1)';
    breathingInterval = requestAnimationFrame(updateBreathing);
  }
  
  function stopBreathing() {
    if (breathingInterval) {
      cancelAnimationFrame(breathingInterval);
      breathingInterval = null;
    }
    isBreathing = false;
    circle.style.transform = 'scale(1)';
    breathingText.innerHTML = '●';
    instruction.innerHTML = 'Pregătit';
  }
  
  function openModal() {
    modal.style.display = 'flex';
    startBreathing();
  }
  
  function closeModalAndStop() {
    modal.style.display = 'none';
    stopBreathing();
  }
  
  breathingBtn.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeModalAndStop);
  stopBtn.addEventListener('click', closeModalAndStop);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalAndStop();
  });
})();
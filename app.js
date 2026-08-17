// TEMUR.FIT — Interaktiv Logic & Calculator

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initFaqAccordion();
});

// BMI & 40-day target calculation
function initCalculator() {
  const form = document.getElementById('fitnessForm');
  const resultsDiv = document.getElementById('calcResults');
  const targetWeightEl = document.getElementById('targetWeight');
  const targetCaloriesEl = document.getElementById('targetCalories');
  const waterIntakeEl = document.getElementById('waterIntake');
  const bmiValEl = document.getElementById('bmiVal');
  const sendResultBtn = document.getElementById('sendResultBtn');
  const resultAdviceEl = document.getElementById('resultAdvice');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value) || 25;
    const height = parseFloat(document.getElementById('height').value) || 175;
    const weight = parseFloat(document.getElementById('weight').value) || 80;
    const goal = document.getElementById('goal').value;
    const activity = parseFloat(document.getElementById('activity').value) || 1.375;

    // 1. BMI calculation (weight / height in m ^ 2)
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // 2. Basal Metabolic Rate (BMR) - Mifflin-St Jeor formula
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activity;

    // 3. Goal Adjustment & 40-Day Expected Weight
    let targetCalories = Math.round(tdee);
    let expectedWeightChange = 0;
    let goalText = '';

    if (goal === 'cut') {
      // 20% deficit for intense fat loss / cutting
      targetCalories = Math.round(tdee * 0.8);
      expectedWeightChange = -(Math.min(10, Math.max(4, weight * 0.08))).toFixed(1);
      goalText = 'Quritish va Relyef';
    } else if (goal === 'loss') {
      // 25% deficit
      targetCalories = Math.round(tdee * 0.75);
      expectedWeightChange = -(Math.min(12, Math.max(5, weight * 0.09))).toFixed(1);
      goalText = 'Tezkor Ozish';
    } else if (goal === 'lean') {
      // Slight surplus / maintenance
      targetCalories = Math.round(tdee * 1.05);
      expectedWeightChange = +(2.5).toFixed(1);
      goalText = 'Quruq Mushak';
    }

    const finalWeight = (weight + parseFloat(expectedWeightChange)).toFixed(1);

    // 4. Daily Water Requirement (approx 35-40ml per kg)
    const waterLiters = ((weight * 0.035) + 0.5).toFixed(1);

    // Render results
    targetWeightEl.textContent = `${finalWeight} kg (${expectedWeightChange > 0 ? '+' : ''}${expectedWeightChange} kg)`;
    targetCaloriesEl.textContent = `${targetCalories} kkal / kun`;
    waterIntakeEl.textContent = `${waterLiters} litr / kun`;
    bmiValEl.textContent = `${bmi} (${getBmiStatus(bmi)})`;

    resultAdviceEl.textContent = `🎯 Maqsad: ${goalText}. 40 kunda ${Math.abs(expectedWeightChange)} kg natijaga toʻgʻri ratsion va kuniga ${targetCalories} kkal bilan och qolmasdan erishasiz!`;

    // Prepare Telegram direct link with pre-filled data
    const message = encodeURIComponent(
      `Salom Temur! Men saytingizda 40 kunlik kalkulyatordan oʻtdim:\n` +
      `👤 Jins: ${gender === 'male' ? 'Erkak' : 'Ayol'}, Yosh: ${age}\n` +
      `📏 Boʻy: ${height} sm, Vazn: ${weight} kg\n` +
      `🎯 Maqsad: ${goalText}\n` +
      `🔥 Kutilayotgan natija: ${finalWeight} kg (${expectedWeightChange} kg)\n` +
      `Men 40 kunlik kursingizda qatnashmoqchiman!`
    );

    sendResultBtn.href = `https://t.me/karate_patsan?text=${message}`;

    // Show result section smoothly
    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function getBmiStatus(bmi) {
  const val = parseFloat(bmi);
  if (val < 18.5) return 'Kam vazn';
  if (val < 25) return 'Normal';
  if (val < 30) return 'Ortiqcha vazn';
  return 'Yuqori vazn';
}

// FAQ Accordion functionality
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

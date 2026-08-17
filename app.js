// ===================================================
// TEMUR.FIT — iOS Native Interactions & Logic
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Interactive Goal Calculator
  const goalButtons = document.querySelectorAll('.seg-btn');
  const mainNum = document.getElementById('calcStatMain');
  const mainSub = document.getElementById('calcStatSub');
  const featuresList = document.getElementById('calcFeatures');

  const goalData = {
    fatloss: {
      num: '-6 ... -10 kg',
      sub: 'Yogʻ yoʻqotish va qorinni tortish',
      features: [
        '✓ Individual taomnoma (och qolmasdan)',
        '✓ Kundalik 24/7 shaxsiy nazorat',
        '✓ Ogʻirlik va xavotirlar butkul ketishi'
      ]
    },
    muscle: {
      num: '+4 ... +7 kg',
      sub: 'Sifatli va quruq mushak massasi',
      features: [
        '✓ Aniq gipertrofiya mashqlar dasturi',
        '✓ Yuqori kaloriyali toʻgʻri ratsion',
        '✓ Yelka va koʻkrak qafasining kengayishi'
      ]
    },
    health: {
      num: '2X Energiya',
      sub: 'Gormonlar balansi va tiniq uyqu',
      features: [
        '✓ Ertalab yengil va tetik uygʻonish',
        '✓ Testosteron & dofamin oshishi',
        '✓ Qad-qomat va umurtqa tiklanishi'
      ]
    }
  };

  goalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      goalButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const goal = btn.dataset.goal;
      const data = goalData[goal];

      if (data && mainNum && mainSub && featuresList) {
        // Quick subtle fade transition
        mainNum.style.opacity = '0';
        mainSub.style.opacity = '0';
        featuresList.style.opacity = '0';

        setTimeout(() => {
          mainNum.textContent = data.num;
          mainSub.textContent = data.sub;
          featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

          mainNum.style.opacity = '1';
          mainSub.style.opacity = '1';
          featuresList.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 2. Horizontal Results Carousel Navigation & Dots
  const trackWrapper = document.querySelector('.results-track-wrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (trackWrapper && prevBtn && nextBtn) {
    const cardWidth = 302; // Card width (290px) + gap (12px)

    nextBtn.addEventListener('click', () => {
      trackWrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      trackWrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Update active dot on scroll
    trackWrapper.addEventListener('scroll', () => {
      const scrollPos = trackWrapper.scrollLeft;
      const index = Math.round(scrollPos / cardWidth);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    }, { passive: true });
  }

  // 3. iOS Bottom Tab Bar Active State Sync
  const tabLinks = document.querySelectorAll('.ios-tabbar .tab-item[data-target]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveTab() {
    let currentSection = 'home';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    tabLinks.forEach(tab => {
      if (tab.dataset.target === currentSection) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });

  // 4. Smooth Anchor Click for Tabs
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});

document.addEventListener('DOMContentLoaded', () => {
  
  // --- CAROUSEL LOGIC ---
  const track = document.getElementById('resultsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');
  
  if (track && prevBtn && nextBtn) {
    const updateDots = () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    };

    track.addEventListener('scroll', () => {
      // Use requestAnimationFrame for performance
      window.requestAnimationFrame(updateDots);
    });

    nextBtn.addEventListener('click', () => {
      const cardWidth = track.offsetWidth;
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      const cardWidth = track.offsetWidth;
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  // --- SCROLL SPY FOR TAB BAR ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.tab-item[data-target]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // --- HAPTIC FEEDBACK (Vibration on buttons) ---
  const buttons = document.querySelectorAll('a, button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.vibrate) {
        navigator.vibrate(15); // Light tap
      }
    });
  });

});

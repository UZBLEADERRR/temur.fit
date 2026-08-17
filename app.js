// ===================================================
// TEMUR.FIT - 40 KUNLIK CHALLENGE (ORIGINAL VERSION)
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Haptic Feedback (Tugmalar bosilganda tebranish)
    const buttons = document.querySelectorAll('.btn, .feature-card');
    
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            // Agar qurilma tebranishni qo'llab-quvvatlasa
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(15); // Yengil 15ms tebranish
            }
        }, { passive: true });
    });

    // 2. Scroll Animations (Qo'shimcha sahifa pastga tushganda animatsiya)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animatsiya elementlarini kuzatish
    document.querySelectorAll('.slide-up, .fade-in').forEach(el => {
        // CSS da animation-play-state: paused; qilib qo'yish mumkin, 
        // lekin hozirgi CSS da ular avtomatik ishlaydi. 
        // Bu kod kelajakda scroll qilinganda ishlaydigan elementlar uchun tayyorlab qo'yildi.
    });

    console.log("Temur.fit original version loaded successfully!");
});

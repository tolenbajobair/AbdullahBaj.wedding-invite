const invite  = document.getElementById('invite');
const details = document.getElementById('details');
const inner   = document.getElementById('details-inner');
const panels  = [invite, details];

let current   = 0;
let animating = false;


function easeInOutQuart(t) {
    return t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;
}


function scrollToPanel(index) {
    if (index < 0 || index >= panels.length || animating) return;
    animating = true;
    current   = index;

    const start    = window.scrollY;
    const target   = panels[index].offsetTop;
    const distance = target - start;
    const duration = 1200; 
    const t0       = performance.now();

    function step(now) {
        const progress = Math.min((now - t0) / duration, 1);
        window.scrollTo(0, start + distance * easeInOutQuart(progress));
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            animating = false;
        }
    }

    requestAnimationFrame(step);
}


window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (animating) return;
    if (e.deltaY > 20)  scrollToPanel(current + 1);
    if (e.deltaY < -20) scrollToPanel(current - 1);
}, { passive: false });


let touchY = 0;
window.addEventListener('touchstart', (e) => {
    touchY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    const diff = touchY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 40) {
        if (diff > 0) scrollToPanel(current + 1);
        else          scrollToPanel(current - 1);
    }
}, { passive: true });


document.querySelector('.scroll-cue').addEventListener('click', () => {
    scrollToPanel(1);
});


window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / invite.offsetHeight, 1);
    invite.style.opacity = 1 - progress;
}, { passive: true });


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            inner.classList.add('visible');
            observer.unobserve(inner);
        }
    });
}, { threshold: 0.15 });

observer.observe(inner);

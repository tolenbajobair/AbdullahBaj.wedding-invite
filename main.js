const invite  = document.getElementById('invite');
const details = document.getElementById('details');
const inner   = document.getElementById('details-inner');

document.querySelector('.scroll-cue').addEventListener('click', () => {
    details.scrollIntoView({ behavior: 'smooth' });
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

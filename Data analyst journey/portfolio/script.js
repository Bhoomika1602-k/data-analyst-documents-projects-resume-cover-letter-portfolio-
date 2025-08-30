// Highlight nav link when section in view
const navLinks = document.querySelectorAll('.navbar nav a');
const sections = document.querySelectorAll('section[id]');
const observerOptions = { threshold: 0.55 };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.navbar nav a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, observerOptions);
sections.forEach(sec => sectionObserver.observe(sec));

// Reveal animation on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.section').forEach(s => revealObserver.observe(s));

// Neon cursor glow
const glow = document.getElementById('neon-glow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

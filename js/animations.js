// Animações baseadas em scroll com Intersection Observer
function initializeAnimations() {
  const cards = document.querySelectorAll('.project-card');
  const titles = document.querySelectorAll('.section-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
  
  titles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    observer.observe(title);
  });
}
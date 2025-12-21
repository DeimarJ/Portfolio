var swiper = new Swiper('.mySwiper', {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: false,
  coverflowEffect: {
    depth: 500, 
    modifer: 1,
    slideShadows: false,
    rotate: 0,
    stretch: 0
  }
})

if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
  // Para tablet, escuchar el scroll del window
  window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      skillsCard1.classList.remove('show');
      skillsCard2.classList.remove('show');
      skillsCard3.classList.remove('show');
      skillsCard4.classList.remove('show');
      
      if (scrollPercentage >= 0 && scrollPercentage < 0.25) {
          skillsCard1.classList.add('show');
      } else if (scrollPercentage >= 0.25 && scrollPercentage < 0.5) {
          skillsCard2.classList.add('show');
      } else if (scrollPercentage >= 0.5 && scrollPercentage < 0.75) {
          skillsCard3.classList.add('show');
      } else if (scrollPercentage >= 0.75) {
          skillsCard4.classList.add('show');
      }
  });
  
  // Mostrar primera tarjeta al cargar
  skillsCard1.classList.add('show');
} else {
  // Para desktop, mantener el código original con rightSection
  rightSection.addEventListener('scroll', function() {
      // Tu código original aquí...
  });
}
  
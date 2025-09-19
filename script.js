// script.js
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Images for slideshow ----------
     Replace these with your local paths or URLs.
     Example: 'images/slide1.jpg' or 'https://.../myphoto.jpg'
  -------------------------------------------*/
  const imageUrls = [
    'gallery/s1.jpeg'  ,
    'gallery/s2.jpeg',
    'gallery/s3.jpeg',
    'gallery/s4.jpeg'  ,
    'gallery/s5.jpeg'
];

  const slideshow = document.getElementById('slideshow');

  // create slide elements dynamically and preload images
  imageUrls.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.backgroundImage = `url('${url}')`;
    slide.setAttribute('aria-hidden', 'true');
    slideshow.appendChild(slide);

    // preload
    const img = new Image();
    img.src = url;
  });

  const slides = slideshow.querySelectorAll('.slide');
  if (!slides.length) return;

  let current = 0;
  slides[current].classList.add('active');

  // show slide by index
  function show(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  }

  // slide timer with pause on hover
  let interval = 3000;
  let timer = setInterval(next, interval);

  function next() {
    current = (current + 1) % slides.length;
    show(current);
  }

  slideshow.addEventListener('mouseenter', () => clearInterval(timer));
  slideshow.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(next, interval);
  });

  /* ========== Modal logic ========== */
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModal');
  const submitBtn = form.querySelector('.btn-submit');

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    // trap focus on close button
    closeModalBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    // return focus to submit button
    submitBtn.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // (Here you could send data with fetch to a server)
    form.reset();
    openModal();
  });

  closeModalBtn.addEventListener('click', closeModal);

  // close when clicking outside modal-content
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) closeModal();
  });

  // close on ESC
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

});

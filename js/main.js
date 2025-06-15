// 슬라이드 배너
const slides = document.querySelectorAll('.slide');
const slideIndexSpan = document.getElementById('slide-index');
const prevBtns = document.querySelectorAll('#prev-slide');
const nextBtns = document.querySelectorAll('#next-slide');
let currentSlide = 0;
let slideTimer = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    // 각 슬라이드의 인덱스 텍스트도 변경
    const nav = slide.querySelector('.slide-nav span');
    if (nav) nav.textContent = `${idx + 1} / ${slides.length}`;
  });
  currentSlide = idx;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function startAutoSlide() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 4000);
}

prevBtns.forEach(btn => btn.addEventListener('click', () => {
  prevSlide();
  startAutoSlide();
}));
nextBtns.forEach(btn => btn.addEventListener('click', () => {
  nextSlide();
  startAutoSlide();
}));

showSlide(0);
startAutoSlide();

// 드롭다운 메뉴
const menuItems = document.querySelectorAll('.menu-item');
let menuTimeout = null;

menuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    clearTimeout(menuTimeout);
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
  item.addEventListener('mouseleave', () => {
    menuTimeout = setTimeout(() => {
      item.classList.remove('active');
    }, 200);
  });
});

// 메뉴 밖 클릭 시 드롭다운 닫기
document.body.addEventListener('click', (e) => {
  if (![...menuItems].some(item => item.contains(e.target))) {
    menuItems.forEach(i => i.classList.remove('active'));
  }
});
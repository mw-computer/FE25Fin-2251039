// main.js

// 슬라이드 기능
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const currentSlideNum = document.getElementById('current-slide');
let current = 0;
let autoSlide = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  currentSlideNum.textContent = idx + 1;
  current = idx;
}
function nextSlide() {
  let idx = (current + 1) % slides.length;
  showSlide(idx);
}
function prevSlide() {
  let idx = (current - 1 + slides.length) % slides.length;
  showSlide(idx);
}
function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
}
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });
}
showSlide(0);
startAutoSlide();

// 슬라이드 클릭 이동
slides.forEach((slide, idx) => {
  slide.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(idx);
    startAutoSlide();
  });
});

// 메뉴바 드롭다운
const navItems = document.querySelectorAll('.nav-item[data-menu]');
const dropdowns = {
  edu: document.getElementById('dropdown-edu'),
  dev: document.getElementById('dropdown-dev'),
  test: document.getElementById('dropdown-test')
};
let dropdownTimeout = null;

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    hideAllDropdowns();
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const menu = item.getAttribute('data-menu');
    if (dropdowns[menu]) {
      dropdowns[menu].style.display = 'flex';
      // 드롭다운 위치 조정 (네비게이션 메뉴 바로 아래)
      const rect = item.getBoundingClientRect();
      const navRect = document.querySelector('.navbar').getBoundingClientRect();
      dropdowns[menu].style.left = `${rect.left - navRect.left}px`;
    }
  });
  item.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(hideAllDropdowns, 200);
    item.classList.remove('active');
  });
});
Object.values(dropdowns).forEach(drop => {
  drop.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    drop.style.display = 'flex';
  });
  drop.addEventListener('mouseleave', () => {
    drop.style.display = 'none';
    navItems.forEach(i => i.classList.remove('active'));
  });
});
function hideAllDropdowns() {
  Object.values(dropdowns).forEach(drop => drop.style.display = 'none');
  navItems.forEach(i => i.classList.remove('active'));
}

// 드롭다운 메뉴 외부 클릭 시 닫기
document.addEventListener('mousemove', (e) => {
  if (![...navItems].some(item => item.contains(e.target)) &&
      !Object.values(dropdowns).some(drop => drop.contains(e.target))) {
    hideAllDropdowns();
  }
});
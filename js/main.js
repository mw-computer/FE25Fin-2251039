// 슬라이드 배너
const slides = document.querySelectorAll('.slide');
const prevBtns = document.querySelectorAll('.prev-slide');
const nextBtns = document.querySelectorAll('.next-slide');
let currentSlide = 0;
let slideTimer = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    const nav = slide.querySelector('.slide-index');
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

// 드롭다운 메뉴 (마우스)
const menuItems = document.querySelectorAll('.menu-item');
const dropdowns = {
  edu: document.getElementById('dropdown-edu'),
  dev: document.getElementById('dropdown-dev'),
  coding: document.getElementById('dropdown-coding')
};
let openMenu = null;
let hideTimeout = null;

// 메뉴 hover 시 드롭다운 열기
menuItems.forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    openDropdown(item.dataset.menu);
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
  item.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      closeDropdown();
      item.classList.remove('active');
    }, 120);
  });
});

// 드롭다운 메뉴 마우스 진입/이탈
Object.entries(dropdowns).forEach(([key, dropdown]) => {
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });
  dropdown.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      closeDropdown();
      menuItems.forEach(i => i.classList.remove('active'));
    }, 120);
  });
});

// 메뉴 밖 클릭 시 닫기
document.body.addEventListener('click', (e) => {
  if (!Object.values(dropdowns).some(dd => dd.contains(e.target))) {
    closeDropdown();
    menuItems.forEach(i => i.classList.remove('active'));
  }
});

// 드롭다운 열기/닫기 함수
function openDropdown(menu) {
  closeDropdown();
  if (dropdowns[menu]) {
    dropdowns[menu].style.display = 'flex';
    dropdowns[menu].classList.remove('hide');
    openMenu = menu;
  }
}
function closeDropdown() {
  if (openMenu && dropdowns[openMenu]) {
    dropdowns[openMenu].classList.add('hide');
    setTimeout(() => {
      dropdowns[openMenu].style.display = 'none';
      dropdowns[openMenu].classList.remove('hide');
      openMenu = null;
    }, 200);
  }
}

// 메뉴 키보드 접근성(탭)
menuItems.forEach(item => {
  item.addEventListener('focus', () => {
    openDropdown(item.dataset.menu);
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
  item.addEventListener('blur', () => {
    hideTimeout = setTimeout(() => {
      closeDropdown();
      item.classList.remove('active');
    }, 120);
  });
});

// 아이콘 클릭 이벤트 (예시)
document.querySelectorAll('.icon-img').forEach(icon => {
  icon.addEventListener('click', () => {
    alert(icon.alt + ' 클릭!');
  });
});
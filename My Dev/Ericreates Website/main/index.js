// Top Header
function handleNavShrink() {
  const nav = document.getElementById("mainNav");
  const topHeader = document.getElementById("topHeader");

  if (window.scrollY > 50) {
    nav.classList.add("shrink");
    topHeader.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
    topHeader.classList.remove("shrink");
  }
}

window.addEventListener("scroll", handleNavShrink);
window.addEventListener("resize", handleNavShrink);
window.addEventListener("DOMContentLoaded", handleNavShrink);

// Dark mode & Language switcher toggle
// 🌐 Language Switcher
document.getElementById('toggle-lang').addEventListener('change', function () {
  const isKorean = this.checked;
  const currentPath = window.location.pathname;

  if (isKorean) {
    window.location.href = currentPath.replace('/en/', '/kr/');
  } else {
    window.location.href = currentPath.replace('/kr/', '/en/');
  }
});

// Initial setting : detect device setting
window.addEventListener('DOMContentLoaded', () => {
  const userPref = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (userPref === 'dark' || (!userPref && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    document.getElementById('toggle-theme').textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('toggle-theme').textContent = '🌙';
  }
});

// Toggle button
document.getElementById('toggle-theme').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');
  this.textContent = isDark ? '☀️' : '🌙';

  // Save in Local
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Nav Hover Active
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop(); // ex: about.html
  const navLinks = document.querySelectorAll(".nav-lists a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    const filename = href.split("/").pop(); // 비교 대상

    if (filename === current || (filename === "index.html" && current === "")) {
      link.classList.add("active");
    }
  });
});

// Mobile Menu Toggle
var navList = document.getElementById("navList");

function showMenu() {
  navList.style.right = "0";
}

function hideMenu() {
  navList.style.right = "-300px";
}



//Scroll down Shrink effect
// shrink only when desktop
function handleNavShrink() {
  const nav = document.getElementById("mainNav");

  if (window.innerWidth <= 768) {
    nav.classList.remove("shrink");
    return;
  }

  if (window.scrollY > 50) {
    nav.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
  }
}

window.addEventListener("scroll", handleNavShrink);
window.addEventListener("resize", handleNavShrink); // Apply for mobile as well


// Go to top
const goTopBtn = document.getElementById("goTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    goTopBtn.style.display = "block";
  } else {
    goTopBtn.style.display = "none";
  }
});

goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
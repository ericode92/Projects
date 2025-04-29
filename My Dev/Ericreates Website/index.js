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
window.addEventListener("resize", handleNavShrink); // 모바일 전환 시에도 적용
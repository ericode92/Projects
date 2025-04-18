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


// Search Function
const data = ["Apple", "Banana", "Cherry", "Durian", "Orange", "Grape", "Watermelon"];

const searchInput = document.getElementById("search-input");
const autocompleteList = document.getElementById("autocomplete-list");
const searchButton = document.getElementById("search-button");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  autocompleteList.innerHTML = "";

  if (!query) {
    autocompleteList.classList.add("hidden");
    return;
  }

  const filtered = data.filter(item => item.toLowerCase().includes(query));
  filtered.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      searchInput.value = item;
      autocompleteList.innerHTML = "";
      autocompleteList.classList.add("hidden");
      goToSearch(item);
    });
    autocompleteList.appendChild(li);
  });

  autocompleteList.classList.remove("hidden");
});

searchButton.addEventListener("click", () => {
  goToSearch(searchInput.value);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    goToSearch(searchInput.value);
  }
});

function goToSearch(query) {
  if (!query.trim()) return;
  window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
}
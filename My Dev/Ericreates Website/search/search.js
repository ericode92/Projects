const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const autocompleteList = document.getElementById("autocomplete-list");

searchInput.addEventListener('input', function () {
    const searchText = this.value.toLowerCase(); // Change all letters to lower case
    filterImg.forEach((image) => {
        const dataName = image.getAttribute('data-name').toLowerCase(); // 이미지의 data-name을 소문자로 변환
        if (dataName.includes(searchText)) {
            image.classList.remove('hide');
            image.classList.add('show');
        } else {
            image.classList.add('hide');
            image.classList.remove('show');
        }
    });
});

function handleSearch() {
  const keyword = searchInput.value.trim();
  if (keyword) {
    window.location.href = `/My Dev/Ericreates Website/search/search.html?query=${encodeURIComponent(keyword)}`;
  }
}

// Click search button
searchButton.addEventListener('click', handleSearch);

// Press Enter Key
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

function updateAutocomplete(searchText) {
    autocompleteList.innerHTML = ''; // Reset recommended list
    if (searchText.trim() === '') {
        autocompleteList.classList.add('hidden');
        return;
    }
    
    let matches = Array.from(filterImg)
        .map(img => img.getAttribute('data-name'))
        .filter(name => name.toLowerCase().includes(searchText));

    if (matches.length > 0) {
        matches = [...new Set(matches)]; // Remove duplication
        matches.forEach(match => {
            const li = document.createElement('li');
            li.textContent = match;
            li.addEventListener('click', () => {
                searchInput.value = match;
                autocompleteList.classList.add('hidden');
                searchInput.dispatchEvent(new Event('input')); // Automatic search
            });
            autocompleteList.appendChild(li);
        });
        autocompleteList.classList.remove('hidden');
    } else {
        autocompleteList.classList.add('hidden');
    }
}

// Hide auto complete when it's focusing
searchInput.addEventListener('blur', function () {
    setTimeout(() => {
        autocompleteList.classList.add('hidden');
    }, 200);
});

// AutoComplete
let jsonData = [];

fetch('/My Dev/Ericreates Website/data/searchData.json')
  .then(res => res.json())
  .then(data => {
    jsonData = data;
  });

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();
  autocompleteList.innerHTML = "";
  if (!value) {
    autocompleteList.classList.add("hidden");
    return;
  }

  const matches = jsonData.filter(item =>
    item.title.toLowerCase().includes(value) ||
    item.tags.some(tag => tag.toLowerCase().includes(value))
  );

  matches.slice(0, 5).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.title;
    li.addEventListener("click", () => {
      searchInput.value = item.title;
      document.getElementById("search-button").click();
    });
    autocompleteList.appendChild(li);
  });

  autocompleteList.classList.toggle("hidden", matches.length === 0);
});

function performSearch(keyword) {
  localStorage.setItem("searchQuery", keyword);
  window.location.href = "/My Dev/Ericreates Website/search/search.html";
}

document.getElementById("search-button").addEventListener("click", () => {
  performSearch(searchInput.value);
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") performSearch(searchInput.value);
});


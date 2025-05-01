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

// Mobile Search Modal Toggle
// Modal Open & Close
document.getElementById('open-search-modal').addEventListener('click', () => {
  document.getElementById('search-popup').classList.remove('hidden');
});

document.getElementById('close-search-modal').addEventListener('click', () => {
  document.getElementById('search-popup').classList.add('hidden');
});

document.getElementById('search-popup').addEventListener('click', (e) => {
  const popupContent = document.querySelector('#search-popup .popup-content');
  if (!popupContent.contains(e.target)) {
    document.getElementById('search-popup').classList.add('hidden');
  }
});

// Modal Search
document.getElementById('popup-search-button').addEventListener('click', function () {
  const keyword = document.getElementById('popup-search-input').value.trim();
  if (keyword) {
    window.location.href = `/My Dev/Ericreates Website/search/search.html?query=${encodeURIComponent(keyword)}`;
  }
});

const popupSearchInput = document.getElementById('popup-search-input');
popupSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const keyword = popupSearchInput.value.trim();
    if (keyword) {
      window.location.href = `/My Dev/Ericreates Website/search/search.html?query=${encodeURIComponent(keyword)}`;
    }
  }
});

// Modal AutoComplete
document.getElementById('popup-search-input').addEventListener('input', function () {
  const searchText = this.value.toLowerCase();
  const list = document.getElementById('popup-autocomplete-list');
  list.innerHTML = '';
  if (!searchText) {
    list.classList.add('hidden');
    return;
  }

  fetch('/My Dev/Ericreates Website/data/searchData.json')
    .then(res => res.json())
    .then(data => {
      const matches = data.filter(item =>
        item.title.toLowerCase().includes(searchText) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchText))
      ).slice(0, 5);

      if (matches.length === 0) {
        list.classList.add('hidden');
        return;
      }

      matches.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.addEventListener('click', () => {
          document.getElementById('popup-search-input').value = item.title;
          window.location.href = `/My Dev/Ericreates Website/search/search.html?query=${encodeURIComponent(item.title)}`;
        });
        list.appendChild(li);
      });

      list.classList.remove('hidden');
    });
});
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

const data = ["Apple", "Banana", "Cherry", "Durian", "Orange", "Grape", "Watermelon"];

const resultInfo = document.getElementById("result-info");
const resultList = document.getElementById("search-results");

if (query) {
  const filtered = data.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  resultInfo.textContent = `Search result "${query}" (${filtered.length})`;

  if (filtered.length > 0) {
    filtered.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      resultList.appendChild(li);
    });
  } else {
    resultList.innerHTML = "<li>Couldn't find your search</li>";
  }
} else {
  resultInfo.textContent = "There's no keyword.";
}
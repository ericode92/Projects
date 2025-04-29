async function fetchData() {
  const response = await fetch('data/searchData.json');
  return response.json();
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadDetail() {
  const data = await fetchData();
  const itemId = getQueryParam('id');
  const query = getQueryParam('query');
  const item = data.find(i => i.id == itemId);

  const container = document.getElementById('detail-container');

  if (!item) {
    container.innerHTML = '<h1>Can not find a portfolio.</h1>';
    return;
  }

  const backLink = query ? `search.html?query=${encodeURIComponent(query)}` : 'search.html';

  container.innerHTML = `
    <h1>${item.title}</h1>
    <img src="${item.thumbnail}" alt="${item.title}">
    <p>${item.description}</p>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Tags:</strong> ${item.tags?.join(', ')}</p>
    <div class="button-group">
      ${item.url ? `<a class="visit-button" href="${item.url}" target="_blank">Visit Website</a>` : ''}
      <a class="back-button" href="${backLink}">← Back to Search</a>
    </div>
  `;
}

loadDetail();

async function fetchData() {
  const response = await fetch('/My Dev/Ericreates Website/data/searchData.json');
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
    <h1 style="display: flex; justify-content: space-between; align-items: center;">
      <span>${item.title}</span>
      <button class="share-button" title="공유하기">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    </h1>
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


//Share button
document.addEventListener("click", function (e) {
  if (e.target.closest(".share-button")) {
    const shareUrl = window.location.href;

    if (navigator.share) {
      // Mobile share API
      navigator.share({
        title: document.title,
        url: shareUrl,
      }).catch(console.error);
    } else {
      // Desktop Share in clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("링크가 복사되었습니다!");
      }).catch(() => {
        alert("복사에 실패했습니다.");
      });
    }
  }
});
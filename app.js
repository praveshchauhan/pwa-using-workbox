const apiKey = 'fae2f3ddedc84474bd2868bd803d5c71';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'bbc-news';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    })

    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('serviceWorker registered');
        } catch (err) {
            console.log('serviceWorker reg failed');
        }

    }
});

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.id}</option>`).join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                ${article.urlToImage ? `<img src="${article.urlToImage}" />` : ''}
            </a>
            <p>${article.description ? article.description : article.title}</p>
        </div>
    `;
}
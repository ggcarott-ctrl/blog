let currentCategory = 'Semua';
let searchQuery = '';

function initIndex() {
    renderCategories();
    renderArticles();
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderArticles();
    });
}

function renderCategories() {
    const cats = getCategories();
    const container = document.getElementById('categories');
    let html = `<button class="cat-btn active" onclick="filterCategory('Semua', this)">Semua</button>`;
    cats.forEach(c => {
        html += `<button class="cat-btn" onclick="filterCategory('${c}', this)">${c}</button>`;
    });
    container.innerHTML = html;
}

function filterCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderArticles();
}

function renderArticles() {
    let articles = getArticles();

    if (currentCategory !== 'Semua') {
        articles = articles.filter(a => a.category === currentCategory);
    }

    if (searchQuery) {
        articles = articles.filter(a =>
            a.title.toLowerCase().includes(searchQuery) ||
            a.content.toLowerCase().includes(searchQuery) ||
            a.tags.some(t => t.toLowerCase().includes(searchQuery))
        );
    }

    const container = document.getElementById('articles');

    if (articles.length === 0) {
        container.innerHTML = '<div class="empty">Tidak ada artikel ditemukan.</div>';
        return;
    }

    container.innerHTML = articles.map(a => `
        <div class="article-card" onclick="location.href='article.html?id=${a.id}'">
            <div class="meta">
                <span>${a.category}</span>
                <span>${formatDate(a.date)}</span>
                <span>${a.views || 0} views</span>
            </div>
            <h2>${escapeHtml(a.title)}</h2>
            <p>${escapeHtml(a.content)}</p>
            <div class="tags">
                ${a.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function initArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
        location.href = 'index.html';
        return;
    }

    const article = getArticleById(id);
    if (!article) {
        document.getElementById('articleContent').innerHTML = '<div class="empty">Artikel tidak ditemukan.</div>';
        return;
    }

    incrementViews(id);

    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleMeta').innerHTML = `
        <span>${article.category}</span>
        <span>${formatDate(article.date)}</span>
        <span>${article.views || 0} views</span>
    `;
    document.getElementById('articleContent').textContent = article.content;
    document.getElementById('articleTags').innerHTML = article.tags.map(t =>
        `<span class="tag">${escapeHtml(t)}</span>`
    ).join('');

    document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('commentName').value.trim();
        const text = document.getElementById('commentText').value.trim();
        if (!name || !text) return;
        addComment(id, name, text);
        document.getElementById('commentName').value = '';
        document.getElementById('commentText').value = '';
        renderComments(id);
    });

    renderComments(id);
}

function renderComments(articleId) {
    const comments = getComments(articleId);
    const container = document.getElementById('commentList');

    if (comments.length === 0) {
        container.innerHTML = '<div class="empty">Belum ada komentar.</div>';
        return;
    }

    container.innerHTML = comments.map(c => `
        <div class="comment-item">
            <button class="delete-btn" onclick="removeComment(${articleId}, ${c.id})">Hapus</button>
            <div class="name">${escapeHtml(c.name)}</div>
            <div class="date">${formatDate(c.date)}</div>
            <div class="text">${escapeHtml(c.text)}</div>
        </div>
    `).join('');
}

function removeComment(articleId, commentId) {
    if (!confirm('Hapus komentar ini?')) return;
    deleteComment(articleId, commentId);
    renderComments(articleId);
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

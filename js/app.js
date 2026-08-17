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
    document.getElementById('articleTags').innerHTML = article.tags.map(t =>
        `<span class="tag">${escapeHtml(t)}</span>`
    ).join('');

    const toc = generateTOC(article.content);
    const rendered = renderMarkdown(article.content);
    const withIds = addHeadingIds(rendered);
    document.getElementById('articleContent').innerHTML = (toc ? toc : '') + withIds;

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

function renderMarkdown(text) {
    let html = escapeHtml(text);

    html = html.replace(/~~~(\w*)\n([\s\S]*?)~~~/g, (_, lang, code) => {
        const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
        const id = 'code-' + Math.random().toString(36).slice(2, 8);
        return `<div class="code-block"><div class="code-header">${langLabel}<button class="copy-btn" onclick="copyCode('${id}')">Salin</button></div><pre><code id="${id}">${code.trim()}</code></pre></div>`;
    });

    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="section-heading">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ol>${match}</ol>`);

    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(?<!<\/ol>)(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    return html;
}

function generateTOC(text) {
    const headings = [];
    const lines = text.split('\n');
    lines.forEach(line => {
        const m = line.match(/^#{2,3} (.+)$/);
        if (m) {
            const level = line.startsWith('###') ? 3 : 2;
            const slug = m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            headings.push({ level, text: m[1], slug });
        }
    });
    if (headings.length < 2) return '';
    let html = '<div class="toc"><strong>Daftar Isi</strong><ul>';
    headings.forEach(h => {
        const indent = h.level === 3 ? ' style="padding-left:1.2rem"' : '';
        html += `<li${indent}><a href="#${h.slug}">${h.text}</a></li>`;
    });
    html += '</ul></div>';
    return html;
}

function addHeadingIds(html) {
    return html.replace(/<h2 class="section-heading">(.*?)<\/h2>/g, (_, text) => {
        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 class="section-heading" id="${slug}">${text}</h2>`;
    }).replace(/<h3>(.*?)<\/h3>/g, (_, text) => {
        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h3 id="${slug}">${text}</h3>`;
    });
}

function copyCode(id) {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
        const btn = el.closest('.code-block').querySelector('.copy-btn');
        const orig = btn.textContent;
        btn.textContent = 'Tersalin!';
        setTimeout(() => btn.textContent = orig, 1500);
    });
}

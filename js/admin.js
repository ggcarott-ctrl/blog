let editingId = null;

function initAdmin() {
    renderAdminTable();

    document.getElementById('articleForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveArticle();
    });
}

function renderAdminTable() {
    const articles = getArticles();
    const tbody = document.getElementById('articleTableBody');

    if (articles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">Belum ada artikel.</td></tr>';
        return;
    }

    tbody.innerHTML = articles.map(a => `
        <tr>
            <td>${a.id}</td>
            <td>${escapeHtml(a.title)}</td>
            <td>${a.category}</td>
            <td>${formatDate(a.date)}</td>
            <td class="actions">
                <button class="btn btn-primary btn-sm" onclick="editArticle(${a.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="removeArticle(${a.id})">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function openModal(id) {
    editingId = id || null;
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');

    if (editingId) {
        title.textContent = 'Edit Artikel';
        const article = getArticleById(editingId);
        document.getElementById('inputTitle').value = article.title;
        document.getElementById('inputCategory').value = article.category;
        document.getElementById('inputTags').value = article.tags.join(', ');
        document.getElementById('inputContent').value = article.content;
    } else {
        title.textContent = 'Artikel Baru';
        document.getElementById('articleForm').reset();
    }

    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
    editingId = null;
}

function saveArticle() {
    const title = document.getElementById('inputTitle').value.trim();
    const category = document.getElementById('inputCategory').value.trim();
    const tags = document.getElementById('inputTags').value.split(',').map(t => t.trim()).filter(Boolean);
    const content = document.getElementById('inputContent').value.trim();

    if (!title || !category || !content) {
        alert('Judul, kategori, dan konten wajib diisi!');
        return;
    }

    if (editingId) {
        updateArticle(editingId, { title, category, tags, content });
    } else {
        addArticle({ title, category, tags, content });
    }

    closeModal();
    renderAdminTable();
}

function editArticle(id) {
    openModal(id);
}

function removeArticle(id) {
    if (!confirm('Hapus artikel ini? Semua komentar juga akan dihapus.')) return;
    deleteArticle(id);
    renderAdminTable();
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

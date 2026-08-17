const STORAGE_KEY = 'blog_articles';
const COMMENT_KEY = 'blog_comments';

const DEFAULT_ARTICLES = [
    {
        id: 1,
        title: 'Selamat Datang di Blog Yoojun',
        content: 'Halo! Ini adalah artikel pertama di blog Yoojun.\n\nBlog ini dibuat dengan HTML, CSS, dan JavaScript murni tanpa framework. Fitur yang tersedia:\n\n- List artikel dengan pencarian\n- Kategori dan tag\n- Sistem komentar\n- Admin panel untuk CRUD artikel\n\nSelamat membaca!',
        category: 'Umum',
        tags: ['pengantar', 'blog'],
        date: '2026-08-17',
        views: 42
    },
    {
        id: 2,
        title: 'Tips Belajar JavaScript untuk Pemula',
        content: 'JavaScript adalah bahasa pemrograman yang wajib dikuasai oleh web developer.\n\nBerikut tips belajar JavaScript:\n\n1. Mulai dari dasar - variabel, fungsi, loop\n2. Pahami DOM manipulation\n3. Pelajari async/await dan Promise\n4. Praktik dengan proyek kecil\n5. Baca dokumentasi resmi\n\nKonsistensi adalah kunci. Luangkan minimal 1 jam sehari untuk coding.',
        category: 'Teknologi',
        tags: ['javascript', 'pemula', 'programming'],
        date: '2026-08-16',
        views: 128
    },
    {
        id: 3,
        title: 'Rekomendasi Film Bulan Ini',
        content: 'Berikut rekomendasi film yang wajib ditonton bulan ini:\n\n1. Film Action terbaru dengan efek visual luar biasa\n2. Drama Korea yang lagi viral\n3. Film dokumenter tentang teknologi AI\n\nJangan lupa siapkan camilan sebelum nonton!',
        category: 'Hiburan',
        tags: ['film', 'rekomendasi', 'hiburan'],
        date: '2026-08-15',
        views: 89
    },
    {
        id: 4,
        title: 'Resep Sederhana: Mie Goreng Spesial',
        content: 'Mie goreng adalah makanan favorit semua orang. Berikut resep sederhana:\n\nBahan:\n- 1 bungkus mie instan\n- 2 telur\n- Sayuran (kol, wortel, sawi)\n- Bawang putih, bawang merah\n- Kecap manis, kecap asin\n- Saos sambal\n\nCara membuat:\n1. Rebus mie hingga setengah matang\n2. Tumis bawang hingga harum\n3. Masak telur orak-arik\n4. Masukkan mie dan sayuran\n5. Tambahkan bumbu, aduk rata\n6. Sajikan selagi hangat\n\nSelamat mencoba!',
        category: 'Kuliner',
        tags: ['resep', 'mie', 'masak'],
        date: '2026-08-14',
        views: 256
    },
    {
        id: 5,
        title: 'Panduan Setup Development Environment',
        content: 'Setup environment yang baik adalah langkah pertama menjadi developer yang produktif.\n\nYang perlu diinstall:\n1. VS Code - Code editor terbaik\n2. Node.js - Runtime JavaScript\n3. Git - Version control\n4. Browser Chrome - Untuk debugging\n5. Terminal yang nyaman\n\nTips: Gunakan extension seperti Prettier, ESLint, dan Live Server untuk mempercepat workflow.',
        category: 'Teknologi',
        tags: ['setup', 'developer', 'tools'],
        date: '2026-08-13',
        views: 167
    }
];

function getArticles() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
        return DEFAULT_ARTICLES;
    }
    return JSON.parse(data);
}

function saveArticles(articles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

function getArticleById(id) {
    return getArticles().find(a => a.id === parseInt(id));
}

function addArticle(article) {
    const articles = getArticles();
    article.id = Date.now();
    article.date = new Date().toISOString().split('T')[0];
    article.views = 0;
    articles.unshift(article);
    saveArticles(articles);
    return article;
}

function updateArticle(id, data) {
    const articles = getArticles();
    const idx = articles.findIndex(a => a.id === parseInt(id));
    if (idx !== -1) {
        articles[idx] = { ...articles[idx], ...data };
        saveArticles(articles);
        return articles[idx];
    }
    return null;
}

function deleteArticle(id) {
    const articles = getArticles().filter(a => a.id !== parseInt(id));
    saveArticles(articles);
    deleteComments(id);
}

function incrementViews(id) {
    const articles = getArticles();
    const article = articles.find(a => a.id === parseInt(id));
    if (article) {
        article.views = (article.views || 0) + 1;
        saveArticles(articles);
    }
}

function getCategories() {
    const articles = getArticles();
    const cats = [...new Set(articles.map(a => a.category))];
    return cats.sort();
}

function getComments(articleId) {
    const data = localStorage.getItem(COMMENT_KEY);
    if (!data) return [];
    const all = JSON.parse(data);
    return (all[articleId] || []).sort((a, b) => b.id - a.id);
}

function addComment(articleId, name, text) {
    const data = localStorage.getItem(COMMENT_KEY);
    const all = data ? JSON.parse(data) : {};
    if (!all[articleId]) all[articleId] = [];
    all[articleId].push({
        id: Date.now(),
        name,
        text,
        date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem(COMMENT_KEY, JSON.stringify(all));
}

function deleteComment(articleId, commentId) {
    const data = localStorage.getItem(COMMENT_KEY);
    if (!data) return;
    const all = JSON.parse(data);
    if (all[articleId]) {
        all[articleId] = all[articleId].filter(c => c.id !== commentId);
        localStorage.setItem(COMMENT_KEY, JSON.stringify(all));
    }
}

function deleteComments(articleId) {
    const data = localStorage.getItem(COMMENT_KEY);
    if (!data) return;
    const all = JSON.parse(data);
    delete all[articleId];
    localStorage.setItem(COMMENT_KEY, JSON.stringify(all));
}

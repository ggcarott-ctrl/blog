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
    },
    {
        id: 6,
        title: 'Cara Membuat Bot Telegram di Android Menggunakan Termux dari Nol',
        content: '\n'.join([
 '## Apa itu Bot Telegram\n\nBot Telegram adalah program otomatis yang berjalan di platform Telegram. Bot bisa menjawab pesan, mengirim notifikasi, mengelola grup, dan banyak lagi. Telegram menyediakan API gratis yang bisa digunakan oleh siapa saja.\n\nKelebihan bot Telegram:\n- Gratis dan tidak dibatasi\n- Bisa diakses jutaan pengguna Telegram\n- Mendukung inline keyboard, callback, dan media\n- Bisa dijalankan 24 jam dari server atau VPS\n\n## Membuat Bot melalui BotFather\n\nLangkah pertama adalah membuat bot baru melalui @BotFather di Telegram:\n\n1. Buka Telegram, cari **@BotFather**\n2. Kirim perintah `/newbot`\n3. Beri nama bot (contoh: "Yoojun Bot")\n4. Beri username bot (harus unik dan berakhir dengan "bot", contoh: yoojun_bot)\n5. BotFather akan memberikan **token** bot kamu\n'
,'Simpan token ini baik-baik! Token ini adalah kunci akses ke bot kamu.\n\n## Mendapatkan Token Bot\n\nToken bot berformat seperti ini:\n\n```\n1234567890:ABCdefGHIjklMNOpqrsTUVwxyz\n```\n\nToken ini bisa kamu dapatkan kapan saja dari BotFather dengan perintah `/mybots`, lalu pilih bot kamu, dan klik "API Token".\n\n## Cara Menjaga Token Tetap Aman\n\nToken bot sama seperti password. Jangan pernah membaginya ke sembarang orang.\n\nYang boleh dan tidak boleh dilakukan:\n- Simpan token di file `.env` (tidak di-commit ke Git)\n- Jangan kirim token di chat publik atau grup\n- Jangan simpan token langsung di kode source'
,'- Jika token bocor, segera revoke dan buat baru dari BotFather\n\nContoh penyimpanan aman dengan file `.env`:\n\n```\nBOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz\n```\n\n## Instalasi Termux\n\nTermux adalah terminal emulator untuk Android yang bisa menjalankan Linux langsung di HP.\n\nCara install:\n1. Buka **Google Play Store** atau **F-Droid**\n2. Cari "Termux"\n3. Install **Termux** (oleh Fredrik Fornwall)\n4. Buka Termux\n\nSetelah terbuka, update paket terlebih dahulu:\n'
,'```bash\npkg update && pkg upgrade\n```\n\nTekan `Y` jika ditanya konfirmasi. Proses ini mungkin memakan waktu beberapa menit.\n\n## Instalasi Python\n\nPython adalah bahasa pemrograman yang akan kita gunakan untuk membuat bot.\n\n```bash\npkg install python\n```\n\nSetelah terinstall, cek versinya:\n\n```bash\npython --version\n```\n'
,'Pastikan muncul `Python 3.x.x`. Jika sudah, install pip (package manager Python):\n\n```bash\npkg install python-pip\n```\n\n## Instalasi Library Telegram\n\nKita akan menggunakan library `python-telegram-bot` yang memudahkan interaksi dengan Telegram API.\n\n```bash\npip install python-telegram-bot\n```\n\nTunggu hingga proses selesai. Jika muncul error, coba jalankan:\n\n```bash\npip install --upgrade pip\npip install python-telegram-bot\n```'
,'\n## Membuat Bot Python Sederhana\n\nBuat file baru bernama `bot.py`:\n\n```bash\nnano bot.py\n```\n\nLalu paste kode berikut:\n\n```python\nimport os\nfrom telegram import Update\nfrom telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes\n\nBOT_TOKEN = "TOKEN_KAMU_DI_SINI"\n\nasync def start(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    await update.message.reply_text("Halo! Saya bot Telegram dari Termux!")'
,'\nasync def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    await update.message.reply_text(f"Kamu bilang: {update.message.text}")\n\napp = ApplicationBuilder().token(BOT_TOKEN).build()\napp.add_handler(CommandHandler("start", start))\napp.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))\n\nprint("Bot sedang berjalan...")\napp.run_polling()\n```\n\nTekan `Ctrl+O` lalu `Enter` untuk save, dan `Ctrl+X` untuk keluar dari nano.\n\n**Penting:** Ganti `TOKEN_KAMU_DI_SINI` dengan token yang kamu dapatkan dari BotFather.\n\n## Command "/start"\n\nCommand `/start` adalah command pertama yang dijalankan saat user pertama kali membuka bot.\n'
,'Fungsi `start` pada kode di atas akan mengirim pesan sambutan: "Halo! Saya bot Telegram dari Termux!"\n\nKamu bisa kustom pesan sesuai kebutuhan, misalnya:\n\n```python\nasync def start(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    user = update.effective_user\n    await update.message.reply_text(\n        f"Halo {user.first_name}!\\n"\n        f"Selamat datang di bot saya.\\n"\n        f"Ketik /help untuk melihat perintah."\n    )\n```\n\n## Membuat Bot Merespons Pesan\n\nBagian `echo` pada kode di atas adalah handler untuk semua pesan teks yang bukan command.\n\n```python\nasync def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):'
,'    await update.message.reply_text(f"Kamu bilang: {update.message.text}")\n```\n\nKamu bisa menambahkan logika lebih lanjut, misalnya membalas dengan pesan tertentu:\n\n```python\nasync def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    text = update.message.text.lower()\n\n    if "halo" in text:\n        await update.message.reply_text("Halo juga! Ada yang bisa saya bantu?")\n    elif "jam berapa" in text:\n        from datetime import datetime\n        now = datetime.now().strftime("%H:%M")\n        await update.message.reply_text(f"Sekarang jam {now}")\n    else:\n        await update.message.reply_text(f"Kamu bilang: {update.message.text}")\n```\n\n## Menjalankan Bot'
,'\nJalankan bot dengan perintah:\n\n```bash\npython bot.py\n```\n\nJika berhasil, akan muncul pesan:\n\n```\nBot sedang berjalan...\n```\n\nBuka Telegram, cari bot kamu (berdasarkan username), dan kirim `/start`. Bot akan merespons!\n\nUntuk menghentikan bot, tekan `Ctrl+C` di Termux.\n\n## Menjalankan Bot Menggunakan tmux\n\nMasalah menjalankan bot di Termux: ketika kamu minimize Termux atau pindah aplikasi, bot akan mati.'
,'\nSolusinya: gunakan **tmux** (terminal multiplexer) yang membuat bot tetap berjalan di background.\n\n### Install tmux\n\n```bash\npkg install tmux\n```\n\n### Membuat Session Baru\n\n```bash\ntmux new -s bot\n```\n\nSekarang kamu berada di session tmux. Jalankan bot seperti biasa:\n\n```bash\npython bot.py\n```'
,'\n### Memisahkan dari Session\n\nTekan `Ctrl+B` lalu lepas, tekan `D`.\n\nBot tetap berjalan di background! Kamu bisa keluar dari Termux tanpa bot mati.\n\n### Kembali ke Session\n\nUntuk melihat bot lagi:\n\n```bash\ntmux attach -t bot\n```\n\n### Menghentikan Bot\n\n```bash\ntmux kill-session -t bot\n```'
,'\n### Cheat Sheet tmux\n\n- `Ctrl+B` + `D` = Detach (keluar tanpa matikan)\n- `tmux ls` = Lihat semua session\n- `tmux attach -t nama` = Masuk ke session\n- `tmux kill-session -t nama` = Hentikan session\n\n## Troubleshooting\n\n### Bot tidak merespons\n\n- Pastikan token benar (cek di BotFather)\n- Pastikan bot sudah dijadikan admin di grup (jika dipakai di grup)\n- Cek log error di terminal\n\n### Error "ModuleNotFoundError"\n\nArtinya library belum terinstall. Jalankan:\n'
,'```bash\npip install python-telegram-bot\n```\n\n### Bot mati setelah minimize Termux\n\nGunakan tmux seperti yang dijelaskan di atas.\n\n### Error "Conflict: terminated by other getUpdates request"\n\nArtinya ada 2 instance bot yang berjalan dengan token yang sama. Matikan semua bot lalu jalankan ulang.\n\n### Token bocor\n\nSegera revoke token lama dari BotFather (`/mybots` > pilih bot > API Token > Revoke), lalu buat token baru.\n\n## Ide Fitur Lanjutan\n\nSetelah menguasai dasar-dasar, kamu bisa mengembangkan bot dengan fitur:\n'
,'- **Inline Keyboard** - Tombol interaktif di bawah pesan\n- **Callback Query** - Menangani klik tombol\n- **Media** - Mengirim foto, video, dokumen\n- **Group Management** - Auto-moderator, welcome message\n- **Database** - Menyimpan data user dengan SQLite\n- **Scheduled Tasks** - Mengirim pesan otomatis dengan `JobQueue`\n- **Webhook** - Alternatif polling untuk production\n\nResources untuk belajar lebih lanjut:\n- Dokumentasi resmi: python-telegram-bot.readthedocs.io\n- Telegram Bot API: core.telegram.org/bots/api\n- Contoh bot: github.com/python-telegram-bot/python-telegram-bot/tree/master/examples'
]),
        category: 'Teknologi',
        tags: ['telegram', 'bot', 'termux', 'python', 'tutorial', 'android'],
        date: '2026-08-17',
        views: 0
    }
];

function getArticles() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(COMMENT_KEY);
        window.location.replace(window.location.pathname);
    }
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

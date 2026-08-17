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
        content: `## Apa itu Bot Telegram

Bot Telegram adalah program otomatis yang berjalan di platform Telegram. Bot bisa menjawab pesan, mengirim notifikasi, mengelola grup, dan banyak lagi. Telegram menyediakan API gratis yang bisa digunakan oleh siapa saja.

Kelebihan bot Telegram:
- Gratis dan tidak dibatasi
- Bisa diakses jutaan pengguna Telegram
- Mendukung inline keyboard, callback, dan media
- Bisa dijalankan 24 jam dari server atau VPS

## Membuat Bot melalui BotFather

Langkah pertama adalah membuat bot baru melalui @BotFather di Telegram:

1. Buka Telegram, cari **@BotFather**
2. Kirim perintah `/newbot`
3. Beri nama bot (contoh: "Yoojun Bot")
4. Beri username bot (harus unik dan berakhir dengan "bot", contoh: yoojun_bot)
5. BotFather akan memberikan **token** bot kamu

Simpan token ini baik-baik! Token ini adalah kunci akses ke bot kamu.

## Mendapatkan Token Bot

Token bot berformat seperti ini:

~~~
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
~~~

Token ini bisa kamu dapatkan kapan saja dari BotFather dengan perintah `/mybots`, lalu pilih bot kamu, dan klik "API Token".

## Cara Menjaga Token Tetap Aman

Token bot sama seperti password. Jangan pernah membaginya ke sembarang orang.

Yang boleh dan tidak boleh dilakukan:
- Simpan token di file `.env` (tidak di-commit ke Git)
- Jangan kirim token di chat publik atau grup
- Jangan simpan token langsung di kode source
- Jika token bocor, segera revoke dan buat baru dari BotFather

Contoh penyimpanan aman dengan file `.env`:

~~~
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
~~~

## Instalasi Termux

Termux adalah terminal emulator untuk Android yang bisa menjalankan Linux langsung di HP.

Cara install:
1. Buka **Google Play Store** atau **F-Droid**
2. Cari "Termux"
3. Install **Termux** (oleh Fredrik Fornwall)
4. Buka Termux

Setelah terbuka, update paket terlebih dahulu:

~~~bash
pkg update && pkg upgrade
~~~

Tekan `Y` jika ditanya konfirmasi. Proses ini mungkin memakan waktu beberapa menit.

## Instalasi Python

Python adalah bahasa pemrograman yang akan kita gunakan untuk membuat bot.

~~~bash
pkg install python
~~~

Setelah terinstall, cek versinya:

~~~bash
python --version
~~~

Pastikan muncul `Python 3.x.x`. Jika sudah, install pip (package manager Python):

~~~bash
pkg install python-pip
~~~

## Instalasi Library Telegram

Kita akan menggunakan library `python-telegram-bot` yang memudahkan interaksi dengan Telegram API.

~~~bash
pip install python-telegram-bot
~~~

Tunggu hingga proses selesai. Jika muncul error, coba jalankan:

~~~bash
pip install --upgrade pip
pip install python-telegram-bot
~~~

## Membuat Bot Python Sederhana

Buat file baru bernama `bot.py`:

~~~bash
nano bot.py
~~~

Lalu paste kode berikut:

~~~python
import os
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

BOT_TOKEN = "TOKEN_KAMU_DI_SINI"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Halo! Saya bot Telegram dari Termux!")

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"Kamu bilang: {update.message.text}")

app = ApplicationBuilder().token(BOT_TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

print("Bot sedang berjalan...")
app.run_polling()
~~~

Tekan `Ctrl+O` lalu `Enter` untuk save, dan `Ctrl+X` untuk keluar dari nano.

**Penting:** Ganti `TOKEN_KAMU_DI_SINI` dengan token yang kamu dapatkan dari BotFather.

## Command "/start"

Command `/start` adalah command pertama yang dijalankan saat user pertama kali membuka bot.

Fungsi `start` pada kode di atas akan mengirim pesan sambutan: "Halo! Saya bot Telegram dari Termux!"

Kamu bisa kustom pesan sesuai kebutuhan, misalnya:

~~~python
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    await update.message.reply_text(
        f"Halo {user.first_name}!\\n"
        f"Selamat datang di bot saya.\\n"
        f"Ketik /help untuk melihat perintah."
    )
~~~

## Membuat Bot Merespons Pesan

Bagian `echo` pada kode di atas adalah handler untuk semua pesan teks yang bukan command.

~~~python
async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"Kamu bilang: {update.message.text}")
~~~

Kamu bisa menambahkan logika lebih lanjut, misalnya membalas dengan pesan tertentu:

~~~python
async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.lower()

    if "halo" in text:
        await update.message.reply_text("Halo juga! Ada yang bisa saya bantu?")
    elif "jam berapa" in text:
        from datetime import datetime
        now = datetime.now().strftime("%H:%M")
        await update.message.reply_text(f"Sekarang jam {now}")
    else:
        await update.message.reply_text(f"Kamu bilang: {update.message.text}")
~~~

## Menjalankan Bot

Jalankan bot dengan perintah:

~~~bash
python bot.py
~~~

Jika berhasil, akan muncul pesan:

~~~
Bot sedang berjalan...
~~~

Buka Telegram, cari bot kamu (berdasarkan username), dan kirim `/start`. Bot akan merespons!

Untuk menghentikan bot, tekan `Ctrl+C` di Termux.

## Menjalankan Bot Menggunakan tmux

Masalah menjalankan bot di Termux: ketika kamu minimize Termux atau pindah aplikasi, bot akan mati.

Solusinya: gunakan **tmux** (terminal multiplexer) yang membuat bot tetap berjalan di background.

### Install tmux

~~~bash
pkg install tmux
~~~

### Membuat Session Baru

~~~bash
tmux new -s bot
~~~

Sekarang kamu berada di session tmux. Jalankan bot seperti biasa:

~~~bash
python bot.py
~~~

### Memisahkan dari Session

Tekan `Ctrl+B` lalu lepas, tekan `D`.

Bot tetap berjalan di background! Kamu bisa keluar dari Termux tanpa bot mati.

### Kembali ke Session

Untuk melihat bot lagi:

~~~bash
tmux attach -t bot
~~~

### Menghentikan Bot

~~~bash
tmux kill-session -t bot
~~~

### Cheat Sheet tmux

- `Ctrl+B` + `D` = Detach (keluar tanpa matikan)
- `tmux ls` = Lihat semua session
- `tmux attach -t nama` = Masuk ke session
- `tmux kill-session -t nama` = Hentikan session

## Troubleshooting

### Bot tidak merespons

- Pastikan token benar (cek di BotFather)
- Pastikan bot sudah dijadikan admin di grup (jika dipakai di grup)
- Cek log error di terminal

### Error "ModuleNotFoundError"

Artinya library belum terinstall. Jalankan:

~~~bash
pip install python-telegram-bot
~~~

### Bot mati setelah minimize Termux

Gunakan tmux seperti yang dijelaskan di atas.

### Error "Conflict: terminated by other getUpdates request"

Artinya ada 2 instance bot yang berjalan dengan token yang sama. Matikan semua bot lalu jalankan ulang.

### Token bocor

Segera revoke token lama dari BotFather (`/mybots` > pilih bot > API Token > Revoke), lalu buat token baru.

## Ide Fitur Lanjutan

Setelah menguasai dasar-dasar, kamu bisa mengembangkan bot dengan fitur:

- **Inline Keyboard** - Tombol interaktif di bawah pesan
- **Callback Query** - Menangani klik tombol
- **Media** - Mengirim foto, video, dokumen
- **Group Management** - Auto-moderator, welcome message
- **Database** - Menyimpan data user dengan SQLite
- **Scheduled Tasks** - Mengirim pesan otomatis dengan `JobQueue`
- **Webhook** - Alternatif polling untuk production

Resources untuk belajar lebih lanjut:
- Dokumentasi resmi: python-telegram-bot.readthedocs.io
- Telegram Bot API: core.telegram.org/bots/api
- Contoh bot: github.com/python-telegram-bot/python-telegram-bot/tree/master/examples`,
        category: 'Teknologi',
        tags: ['telegram', 'bot', 'termux', 'python', 'tutorial', 'android'],
        date: '2026-08-17',
        views: 0
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

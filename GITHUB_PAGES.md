# 🚀 Deploy ke GitHub Pages

## Langkah-langkah Deploy

### 1. Buat Repository GitHub
1. Login ke [GitHub](https://github.com)
2. Klik tombol **New Repository**
3. Beri nama repository: `chiikawa-runner`
4. Pilih **Public**
5. Klik **Create repository**

### 2. Upload File

#### Opsi A: Upload via Web
1. Di halaman repository, klik **uploading an existing file**
2. Drag & drop semua file project ini
3. Klik **Commit changes**

#### Opsi B: Upload via Git Command Line
```bash
# Clone repository (ganti USERNAME dengan username GitHub Anda)
git clone https://github.com/USERNAME/chiikawa-runner.git
cd chiikawa-runner

# Copy semua file project ke folder ini
# Lalu commit dan push
git add .
git commit -m "Initial commit - Chiikawa Runner game"
git push origin main
```

### 3. Aktifkan GitHub Pages
1. Di repository, klik tab **Settings**
2. Di sidebar kiri, klik **Pages**
3. Di bagian **Source**, pilih **Deploy from a branch**
4. Pilih branch **main** dan folder **/(root)**
5. Klik **Save**

### 4. Tunggu Deploy
- GitHub Pages akan mem-build dan deploy website Anda
- Ini membutuhkan waktu 1-5 menit
- URL akan muncul di bagian atas halaman Settings > Pages
- Biasanya: `https://USERNAME.github.io/chiikawa-runner/`

### 5. Verifikasi
- Buka URL yang diberikan
- Pastikan game berjalan dengan baik
- Test semua fitur: play, pilih karakter, game, high score

## 📁 Struktur File yang Harus Diupload

```
chiikawa-runner/
├── index.html          ✅
├── select.html         ✅
├── game.html           ✅
├── css/
│   └── style.css       ✅
├── js/
│   ├── main.js         ✅
│   ├── select.js       ✅
│   ├── game.js         ✅
│   └── audio.js        ✅
├── assets/
│   ├── images/         ✅ (folder kosong)
│   └── audio/          ✅ (folder kosong)
└── README.md           ✅
```

## ⚠️ Catatan Penting

1. **Jangan ubah nama file** - `index.html` harus tetap di root
2. **Folder structure** harus dipertahankan
3. **Case sensitive** - GitHub Pages Linux server (case-sensitive)
4. **HTTPS** - GitHub Pages otomatis menggunakan HTTPS

## 🔄 Update Game

Untuk update game:
1. Edit file di repository
2. Commit changes
3. GitHub Pages akan otomatis re-deploy

## 🆘 Troubleshooting

### Game tidak muncul?
- Pastikan `index.html` ada di root folder
- Cek browser console untuk error
- Pastikan semua file CSS dan JS ter-upload

### Audio tidak berfungsi?
- Browser memerlukan user interaction sebelum audio bisa play
- Ini normal karena kebijakan browser
- Audio akan berfungsi setelah user klik/tombol

### Styling tidak sesuai?
- Cek apakah file `css/style.css` ter-upload dengan benar
- Cek browser console untuk 404 error

---

🌸 **Selamat deploy!** 🌸

# 🌸 Chiikawa Runner - ちいかわランナー 🌸

Game endless runner bertema Chiikawa dengan gameplay seperti Subway Surfers!

![Chiikawa Runner](https://img.shields.io/badge/Chiikawa-Runner-FFB8D0?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎮 Fitur

- **3 Karakter playable**: Usagi (🐰), Hachiware (🐱), Chiikawa (🍙)
- **Coin unik per karakter**:
  - Usagi: Wortel (🥕)
  - Hachiware: Ikan (🐟)
  - Chiikawa: Onigiri (🍙)
- **Obstacle**: Rakko (musuh dari Chiikawa), kereta imut, dan barrier
- **Kontrol**:
  - Desktop: Arrow keys (↑ lompat, ↓ merunduk, ←→ pindah jalur)
  - Mobile: Swipe gesture
- **Sistem High Score** dengan localStorage
- **Efek suara** untuk lompat, ambil koin, kena musuh, dan game over
- **Background music** dengan Web Audio API
- **Visual pastel** khas Chiikawa (pink soft, hijau mint, krem)

## 🚀 Cara Bermain

1. Buka `index.html` di browser
2. Klik tombol **PLAY**
3. Pilih karakter favoritmu
4. Hindari obstacle dan kumpulkan koin!
5. Dapatkan high score tertinggi!

## 🎯 Kontrol

### Desktop
- **↑ / W / Space**: Lompat
- **↓ / S**: Merunduk
- **← / A**: Pindah ke jalur kiri
- **→ / D**: Pindah ke jalur kanan

### Mobile
- **Swipe Atas**: Lompat
- **Swipe Bawah**: Merunduk
- **Swipe Kiri**: Pindah ke jalur kiri
- **Swipe Kanan**: Pindah ke jalur kanan

## 📁 Struktur Folder

```
chiikawa-runner/
├── index.html          # Halaman utama
├── select.html         # Halaman pemilihan karakter
├── game.html           # Halaman game
├── css/
│   └── style.css       # Stylesheet utama
├── js/
│   ├── main.js         # Script halaman utama
│   ├── select.js       # Script pemilihan karakter
│   ├── game.js         # Game engine
│   └── audio.js        # Sistem audio Web Audio API
├── assets/
│   ├── images/         # Folder untuk gambar (jika diperlukan)
│   └── audio/          # Folder untuk audio (jika diperlukan)
└── README.md           # Dokumentasi
```

## 🛠️ Teknologi

- **HTML5 Canvas** untuk rendering game
- **CSS3** dengan tema pastel Chiikawa
- **Vanilla JavaScript** tanpa framework
- **Web Audio API** untuk efek suara dan musik
- **localStorage** untuk menyimpan high score

## 🎨 Tema Warna

| Warna | Kode | Penggunaan |
|-------|------|------------|
| Pink Soft | `#FFB8D0` | Tombol utama, aksen |
| Mint Soft | `#B8E0D2` | Background, aksen |
| Cream | `#FFF8E7` | Background utama |
| Yellow Soft | `#FFE4A1` | Highlight, coin |
| Lavender | `#E8D4F0` | Dekorasi |

## 📝 Catatan

- Game menggunakan emoji untuk karakter dan objek agar ringan dan tidak memerlukan asset gambar eksternal
- Audio dihasilkan secara dinamis menggunakan Web Audio API, tidak memerlukan file audio eksternal
- Game responsif dan bisa dimainkan di desktop dan mobile
- Frame rate dijaga minimal 30fps untuk performa optimal

## 🌟 Credits

- **Chiikawa** (ちいかわ) oleh Nagano
- Game ini adalah fan-made project untuk hiburan
- Lagu "Una na Una" oleh Chiikawa

## 📄 Lisensi

Project ini dibuat untuk tujuan edukasi dan hiburan. Chiikawa adalah hak cipta Nagano.

---

🌸 **Selamat bermain!** 🌸

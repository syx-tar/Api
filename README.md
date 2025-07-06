# 🌐 Browser Streaming dengan Puppeteer

Aplikasi web yang memungkinkan Anda mengendalikan browser secara remote melalui streaming real-time menggunakan Puppeteer dan Socket.IO.

## ✨ Fitur

- **Browser Remote**: Kontrol browser secara real-time melalui web interface
- **Streaming Real-time**: Streaming tampilan browser dengan framerate ~10 FPS
- **Interaksi Lengkap**: Klik, ketik, scroll, dan navigasi
- **Interface Modern**: UI yang responsif dan user-friendly
- **WebSocket**: Komunikasi real-time menggunakan Socket.IO

## 🚀 Instalasi

### Persyaratan Sistem

- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

### Langkah Instalasi

1. **Clone atau download project ini**
   ```bash
   git clone <repository-url>
   cd puppeteer-browser-streaming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   ```

   Atau untuk development dengan auto-reload:
   ```bash
   npm run dev
   ```

4. **Buka browser dan akses**
   ```
   http://localhost:3000
   ```

## 📖 Cara Penggunaan

### 1. Memulai Aplikasi

Setelah menjalankan `npm start`, aplikasi akan:
- Menjalankan server Express pada port 3000
- Membuka browser Puppeteer secara otomatis
- Menampilkan Google sebagai halaman awal

### 2. Menggunakan Interface

#### **Navigasi**
- **URL Input**: Masukkan URL dan klik "Go" atau tekan Enter
- **Back Button**: Kembali ke halaman sebelumnya
- **Forward Button**: Maju ke halaman selanjutnya
- **Refresh Button**: Refresh halaman saat ini

#### **Interaksi dengan Browser**
- **Klik**: Klik pada screenshot untuk berinteraksi dengan halaman
- **Scroll**: Gunakan mouse wheel pada screenshot untuk scroll
- **Ketik**: Tekan tombol pada keyboard untuk mengetik
- **Shortcut**: Gunakan keyboard shortcut seperti Enter, Backspace, dll.

#### **Status Monitoring**
- **Status**: Menampilkan status koneksi (Connected/Disconnected)
- **FPS**: Menampilkan framerate streaming real-time

### 3. Fitur-fitur Khusus

- **Visual Feedback**: Efek visual saat melakukan klik
- **Notifikasi**: Popup notifikasi untuk feedback aksi
- **Responsive**: Interface yang responsive untuk berbagai ukuran layar
- **Loading State**: Indikator loading saat menghubungkan ke browser

## 🔧 Konfigurasi

### Mengubah Port

Edit file `server.js` baris terakhir:
```javascript
const PORT = process.env.PORT || 3000; // Ubah 3000 ke port yang diinginkan
```

### Mengubah Kualitas Streaming

Edit file `server.js` pada bagian screenshot:
```javascript
const screenshot = await page.screenshot({
  type: 'jpeg',
  quality: 60, // Ubah 60 ke nilai 1-100 untuk kualitas
  fullPage: false
});
```

### Mengubah Framerate

Edit file `server.js` pada bagian streaming interval:
```javascript
}, 100); // Ubah 100 ke nilai ms yang diinginkan (100ms = 10 FPS)
```

## 🛠️ Troubleshooting

### Browser Tidak Muncul

**Masalah**: Browser Puppeteer tidak terbuka
**Solusi**: 
- Pastikan sistem memiliki Chrome/Chromium terinstall
- Jalankan dengan headless mode jika tidak ada display:
  ```javascript
  headless: true, // Ubah ke true di server.js
  ```

### Koneksi Terputus

**Masalah**: Status menunjukkan "Disconnected"
**Solusi**:
- Refresh halaman web
- Restart server dengan `npm start`
- Periksa console untuk error

### Performa Lambat

**Masalah**: Streaming lag atau lambat
**Solusi**:
- Turunkan kualitas screenshot (quality: 30-50)
- Perbesar interval streaming (200-500ms)
- Gunakan resolusi browser yang lebih kecil

### Error saat Install

**Masalah**: `npm install` gagal
**Solusi**:
- Hapus folder `node_modules` dan `package-lock.json`
- Jalankan `npm install` lagi
- Pastikan Node.js versi terbaru

## 📝 Arsitektur Teknis

### Backend (server.js)
- **Express.js**: Web server framework
- **Socket.IO**: Real-time communication
- **Puppeteer**: Browser automation
- **CORS**: Cross-origin resource sharing

### Frontend (public/)
- **HTML5**: Struktur halaman
- **CSS3**: Styling dan animasi
- **JavaScript ES6+**: Logika aplikasi
- **Socket.IO Client**: Komunikasi real-time

### Flow Data
1. Server menjalankan Puppeteer browser
2. Screenshot diambil setiap 100ms
3. Screenshot diencode ke base64
4. Data dikirim ke client via WebSocket
5. Client menampilkan screenshot
6. Input user dikirim balik ke server
7. Server mengeksekusi input di browser

## 🔒 Keamanan

**Peringatan**: Aplikasi ini menjalankan browser dengan akses penuh. Untuk penggunaan production:

- Implementasikan authentication
- Batasi akses URL tertentu
- Jalankan dalam container/sandbox
- Batasi jumlah concurrent connections

## 📦 Dependencies

- `express`: Web framework
- `puppeteer`: Browser automation
- `socket.io`: Real-time communication
- `cors`: Cross-origin support

## 🤝 Kontribusi

Silakan buat pull request untuk improvement atau bug fixes.

## 📄 License

MIT License

## 🙋‍♂️ Support

Jika mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.

---

**Selamat menggunakan Browser Streaming dengan Puppeteer! 🎉**

# Syx API

REST API dengan sistem autentikasi menggunakan Node.js, Express dan MySQL.

## Fitur

- Autentikasi dengan username dan password
- JWT (JSON Web Token) untuk autentikasi
- API Key untuk setiap pengguna
- Role-based access control (member dan admin)
- MySQL sebagai database

## Instalasi

### Prasyarat

- Node.js (v14 atau lebih baru)
- MySQL Server

### Langkah-langkah Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd SyxApi
```

2. Instal dependensi
```bash
npm install
```

3. Konfigurasi database
   - Buat file `.env` di root direktori (atau sesuaikan yang sudah ada)
   - Isi dengan konfigurasi yang sesuai:
```
PORT=4000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=syx_api

# JWT
JWT_SECRET=syx_api_secret_key
JWT_EXPIRES_IN=30d
```

4. Jalankan aplikasi
```bash
npm start
```

Server akan berjalan di http://localhost:4000

## Default Admin Account

Saat pertama kali menjalankan aplikasi, sebuah akun admin default akan dibuat:

- Username: `admin`
- Password: `admin123`

API Key akan ditampilkan di log saat server pertama kali dijalankan.

## Penggunaan API

Lihat [dokumentasi API](docs.md) untuk informasi lebih detail tentang endpoint yang tersedia. 

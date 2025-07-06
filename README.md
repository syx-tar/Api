# 🌐 Browser Streaming dengan Puppeteer

Aplikasi web yang memungkinkan Anda mengendalikan browser secara remote melalui streaming real-time menggunakan Puppeteer dan Socket.IO. **Sekarang mendukung akses melalui Public IP!**

## ✨ Fitur

- **Browser Remote**: Kontrol browser secara real-time melalui web interface
- **Streaming Real-time**: Streaming tampilan browser dengan framerate ~10 FPS
- **Interaksi Lengkap**: Klik, ketik, scroll, dan navigasi
- **Interface Modern**: UI yang responsif dan user-friendly
- **WebSocket**: Komunikasi real-time menggunakan Socket.IO
- **🌍 Public IP Support**: Akses dari mana saja melalui internet
- **Environment Variables**: Konfigurasi yang fleksibel

## 🚀 Instalasi

### Persyaratan Sistem

- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- Browser modern (Chrome, Firefox, Safari, Edge)
- **Port terbuka** (default: 3000) jika menggunakan public IP

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

3. **Konfigurasi Environment (Opsional)**
   ```bash
   cp .env.example .env
   # Edit .env sesuai kebutuhan
   ```

4. **Jalankan aplikasi**
   ```bash
   npm start
   ```

   Atau untuk development dengan auto-reload:
   ```bash
   npm run dev
   ```

## 📖 Cara Penggunaan

### 1. Akses Lokal
```
http://localhost:3000
```

### 2. Akses melalui LAN/Network
```
http://[IP-LOCAL]:3000
```

### 3. Akses melalui Public IP
```
http://[PUBLIC-IP]:3000
```

Server akan otomatis menampilkan semua URL yang tersedia saat startup:
```
🚀 Server started successfully!
📍 Server running on http://0.0.0.0:3000

🌐 Access URLs:
   Local:    http://localhost:3000
   Network:  http://192.168.1.100:3000 (eth0)
   Network:  http://10.0.0.50:3000 (wlan0)
```

## 🌍 Konfigurasi Public IP

### Method 1: Environment Variables
```bash
# Set environment variables
export HOST=0.0.0.0
export PORT=3000
export HEADLESS=false
export FPS=10
export QUALITY=60

npm start
```

### Method 2: File .env
```bash
# Copy dan edit file .env
cp .env.example .env
```

Edit file `.env`:
```env
# Server Configuration
PORT=3000
HOST=0.0.0.0

# Browser Configuration
HEADLESS=false
FPS=10
QUALITY=60
```

### Method 3: Direct Command
```bash
# Linux/Mac
HOST=0.0.0.0 PORT=3000 npm start

# Windows
set HOST=0.0.0.0 && set PORT=3000 && npm start
```

## 🔧 Konfigurasi Lanjutan

### Environment Variables

| Variable | Default | Deskripsi |
|----------|---------|-----------|
| `HOST` | `0.0.0.0` | IP untuk bind server |
| `PORT` | `3000` | Port server |
| `HEADLESS` | `false` | Jalankan browser tanpa GUI |
| `FPS` | `10` | Framerate streaming |
| `QUALITY` | `60` | Kualitas JPEG (1-100) |

### Mengubah Port
```bash
PORT=8080 npm start
```

### Mengubah Kualitas Streaming
```bash
QUALITY=30 npm start  # Kualitas rendah, bandwidth rendah
QUALITY=90 npm start  # Kualitas tinggi, bandwidth tinggi
```

### Mengubah Framerate
```bash
FPS=5 npm start   # 5 FPS - hemat bandwidth
FPS=15 npm start  # 15 FPS - lebih smooth
```

### Mode Headless (untuk Server)
```bash
HEADLESS=true npm start
```

## 🛡️ Keamanan untuk Public IP

> **⚠️ PERINGATAN**: Menggunakan public IP membuka akses ke semua orang di internet!

### Rekomendasi Keamanan

1. **Gunakan Firewall**
   ```bash
   # Ubuntu/Debian
   sudo ufw allow 3000/tcp
   sudo ufw enable
   
   # CentOS/RHEL
   sudo firewall-cmd --add-port=3000/tcp --permanent
   sudo firewall-cmd --reload
   ```

2. **Gunakan Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Gunakan HTTPS dengan SSL**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Generate SSL certificate
   sudo certbot --nginx -d yourdomain.com
   ```

4. **Batasi IP Access**
   ```bash
   # Allow specific IP only
   sudo ufw allow from 192.168.1.0/24 to any port 3000
   ```

## �️ Deployment di VPS/Cloud

### 1. AWS EC2
```bash
# Security Group: Allow port 3000
# Instance: t2.micro atau lebih besar

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo-url>
cd puppeteer-browser-streaming
npm install

# Install Chrome dependencies
sudo apt-get install -y gconf-service libasound2-dev libatk1.0-dev libc6-dev libcairo2-dev libcups2-dev libdbus-1-dev libexpat1-dev libfontconfig1-dev libgcc1 libgconf-2-4 libgdk-pixbuf2.0-dev libglib2.0-dev libgtk-3-dev libnspr4-dev libpango-1.0-dev libpangocairo-1.0-dev libstdc++6 libx11-dev libx11-xcb1 libxcb1-dev libxcomposite1-dev libxcursor1-dev libxdamage1-dev libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# Run with PM2
npm install -g pm2
pm2 start server.js --name browser-streaming
pm2 startup
pm2 save
```

### 2. Google Cloud Platform
```bash
# Compute Engine instance
# Allow HTTP traffic

# Same setup as AWS
```

### 3. DigitalOcean
```bash
# Droplet dengan Ubuntu
# Firewall: Allow port 3000

# Setup sama seperti AWS
```

## 🛠️ Troubleshooting

### Port Sudah Digunakan
```bash
# Cari process yang menggunakan port
lsof -i :3000

# Kill process
kill -9 <PID>

# Atau gunakan port lain
PORT=8080 npm start
```

### Browser Tidak Muncul di Server
```bash
# Gunakan headless mode
HEADLESS=true npm start
```

### Connection Timeout
```bash
# Check firewall
sudo ufw status

# Check port listening
netstat -tlnp | grep :3000
```

### Puppeteer Chrome Error
```bash
# Install dependencies
sudo apt-get install -y gconf-service libasound2-dev libatk1.0-dev libc6-dev libcairo2-dev libcups2-dev libdbus-1-dev libexpat1-dev libfontconfig1-dev libgcc1 libgconf-2-4 libgdk-pixbuf2.0-dev libglib2.0-dev libgtk-3-dev libnspr4-dev libpango-1.0-dev libpangocairo-1.0-dev libstdc++6 libx11-dev libx11-xcb1 libxcb1-dev libxcomposite1-dev libxcursor1-dev libxdamage1-dev libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## 📝 Fitur Baru (Public IP)

### 1. Connection Status
- Real-time connection indicator
- Connection URL display
- Automatic reconnection

### 2. Environment Configuration
- Flexible port and host settings
- Quality and performance tuning
- Headless mode for servers

### 3. Enhanced UI
- Better responsive design
- Connection info display
- Improved notifications

### 4. Health Check
```
GET http://your-server:3000/health
```

### 5. Keyboard Shortcuts
- `Ctrl+R` / `Cmd+R`: Refresh browser
- `Ctrl+L` / `Cmd+L`: Focus URL input

## 🔗 Contoh Penggunaan

### Lokal Development
```bash
npm start
# Access: http://localhost:3000
```

### Team Sharing (LAN)
```bash
HOST=0.0.0.0 npm start
# Access: http://[your-ip]:3000
```

### Public Demo
```bash
# Di VPS dengan public IP
HOST=0.0.0.0 PORT=3000 npm start
# Access: http://[public-ip]:3000
```

### Production dengan PM2
```bash
pm2 start ecosystem.config.js
```

## 📦 Dependencies

- `express`: Web framework
- `puppeteer`: Browser automation
- `socket.io`: Real-time communication
- `cors`: Cross-origin support
- `os`: Network interface detection

## 🤝 Kontribusi

Silakan buat pull request untuk improvement atau bug fixes.

## 📄 License

MIT License

## 🙋‍♂️ Support

Jika mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.

---

**🌍 Sekarang Anda dapat mengakses browser streaming dari mana saja di dunia! 🎉**

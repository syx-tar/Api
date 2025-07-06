class BrowserStreaming {
    constructor() {
        this.socket = null;
        this.connected = false;
        this.fpsCounter = 0;
        this.lastFpsTime = Date.now();
        
        this.initializeElements();
        this.setupEventListeners();
        this.connect();
    }
    
    initializeElements() {
        this.loading = document.getElementById('loading');
        this.browserScreen = document.getElementById('browserScreen');
        this.screenshot = document.getElementById('screenshot');
        this.overlay = document.getElementById('overlay');
        this.status = document.getElementById('status');
        this.fps = document.getElementById('fps');
        this.urlInput = document.getElementById('urlInput');
        this.goBtn = document.getElementById('goBtn');
        this.backBtn = document.getElementById('backBtn');
        this.forwardBtn = document.getElementById('forwardBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
    }
    
    setupEventListeners() {
        // Navigation controls
        this.goBtn.addEventListener('click', () => this.navigate());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.navigate();
        });
        
        this.backBtn.addEventListener('click', () => this.socket?.emit('back'));
        this.forwardBtn.addEventListener('click', () => this.socket?.emit('forward'));
        this.refreshBtn.addEventListener('click', () => this.socket?.emit('refresh'));
        
        // Mouse interactions on screenshot
        this.screenshot.addEventListener('click', (e) => this.handleClick(e));
        this.screenshot.addEventListener('wheel', (e) => this.handleScroll(e));
        
        // Keyboard interactions
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Prevent context menu on screenshot
        this.screenshot.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    connect() {
        // Dynamic server URL detection untuk public IP support
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        
        // Socket.IO akan otomatis detect URL jika tidak dispesifikasikan
        this.socket = io({
            transports: ['websocket', 'polling'],
            timeout: 20000,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            maxReconnectionAttempts: 5
        });
        
        this.socket.on('connect', () => {
            this.connected = true;
            this.updateStatus('Connected');
            this.hideLoading();
            this.showNotification('Connected to server', 'success');
            console.log('🔗 Connected to server');
        });
        
        this.socket.on('disconnect', (reason) => {
            this.connected = false;
            this.updateStatus('Disconnected');
            this.showLoading();
            this.showNotification(`Disconnected: ${reason}`, 'error');
            console.log('❌ Disconnected from server:', reason);
        });
        
        this.socket.on('connect_error', (error) => {
            console.error('❌ Connection error:', error);
            this.showNotification('Connection failed', 'error');
        });
        
        this.socket.on('reconnect', (attemptNumber) => {
            console.log('🔄 Reconnected after', attemptNumber, 'attempts');
            this.showNotification('Reconnected to server', 'success');
        });
        
        this.socket.on('reconnect_error', (error) => {
            console.error('❌ Reconnection error:', error);
        });
        
        this.socket.on('screenshot', (base64Image) => {
            this.updateScreenshot(base64Image);
            this.updateFPS();
        });
        
        this.socket.on('error', (message) => {
            console.error('Server error:', message);
            this.showNotification(message, 'error');
        });
    }
    
    updateScreenshot(base64Image) {
        this.screenshot.src = `data:image/jpeg;base64,${base64Image}`;
    }
    
    updateFPS() {
        this.fpsCounter++;
        const now = Date.now();
        
        if (now - this.lastFpsTime >= 1000) {
            this.fps.textContent = `FPS: ${this.fpsCounter}`;
            this.fpsCounter = 0;
            this.lastFpsTime = now;
        }
    }
    
    updateStatus(status) {
        this.status.textContent = status;
        this.status.className = status.toLowerCase().replace(' ', '-');
    }
    
    showLoading() {
        this.loading.style.display = 'flex';
        this.browserScreen.style.display = 'none';
    }
    
    hideLoading() {
        this.loading.style.display = 'none';
        this.browserScreen.style.display = 'flex';
    }
    
    navigate() {
        const url = this.urlInput.value.trim();
        if (!url) return;
        
        let fullUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            fullUrl = 'https://' + url;
        }
        
        this.socket?.emit('navigate', fullUrl);
        this.showNotification(`Navigating to ${fullUrl}`, 'info');
    }
    
    handleClick(e) {
        if (!this.connected) return;
        
        const rect = this.screenshot.getBoundingClientRect();
        const scaleX = this.screenshot.naturalWidth / rect.width;
        const scaleY = this.screenshot.naturalHeight / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        this.socket.emit('click', { x: Math.round(x), y: Math.round(y) });
        this.showClickEffect(e.clientX, e.clientY);
    }
    
    handleScroll(e) {
        if (!this.connected) return;
        
        e.preventDefault();
        this.socket.emit('scroll', { deltaY: e.deltaY });
    }
    
    handleKeyPress(e) {
        if (!this.connected) return;
        
        // Don't capture key events when typing in URL input
        if (e.target === this.urlInput) return;
        
        // Handle special keys
        const specialKeys = {
            'Enter': 'Enter',
            'Backspace': 'Backspace',
            'Tab': 'Tab',
            'Escape': 'Escape',
            'ArrowUp': 'ArrowUp',
            'ArrowDown': 'ArrowDown',
            'ArrowLeft': 'ArrowLeft',
            'ArrowRight': 'ArrowRight',
            'Space': ' '
        };
        
        if (specialKeys[e.code]) {
            e.preventDefault();
            this.socket.emit('keypress', specialKeys[e.code]);
        } else if (e.key.length === 1) {
            // Regular character
            this.socket.emit('type', e.key);
        }
    }
    
    showClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'interaction-highlight';
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 600);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const colors = {
            'info': '#4a9eff',
            'success': '#4caf50',
            'error': '#f44336',
            'warning': '#ff9800'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 6px;
            color: white;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            background: ${colors[type] || colors.info};
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Method untuk menampilkan informasi koneksi
    showConnectionInfo() {
        const info = {
            url: window.location.href,
            protocol: window.location.protocol,
            host: window.location.host,
            userAgent: navigator.userAgent,
            connected: this.connected
        };
        
        console.log('🔗 Connection Info:', info);
        return info;
    }
}

// Initialize the browser streaming when page loads
document.addEventListener('DOMContentLoaded', () => {
    const browserStreaming = new BrowserStreaming();
    
    // Expose to global scope untuk debugging
    window.browserStreaming = browserStreaming;
    
    // Show connection info
    setTimeout(() => {
        browserStreaming.showConnectionInfo();
    }, 1000);
});
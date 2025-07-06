const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

let browser = null;
let page = null;
let streamingInterval = null;

// Initialize Puppeteer
async function initBrowser() {
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--window-size=1280,720'
      ]
    });
    
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto('https://www.google.com');
    
    console.log('Browser initialized successfully');
  } catch (error) {
    console.error('Error initializing browser:', error);
  }
}

// Start streaming screenshots
function startStreaming(socket) {
  if (streamingInterval) {
    clearInterval(streamingInterval);
  }
  
  streamingInterval = setInterval(async () => {
    if (page) {
      try {
        const screenshot = await page.screenshot({
          type: 'jpeg',
          quality: 60,
          fullPage: false
        });
        
        const base64Screenshot = screenshot.toString('base64');
        socket.emit('screenshot', base64Screenshot);
      } catch (error) {
        console.error('Error taking screenshot:', error);
      }
    }
  }, 100); // Stream at ~10 FPS
}

// Handle socket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Start streaming when client connects
  startStreaming(socket);
  
  // Handle navigation
  socket.on('navigate', async (url) => {
    if (page) {
      try {
        await page.goto(url);
        console.log('Navigated to:', url);
      } catch (error) {
        console.error('Navigation error:', error);
        socket.emit('error', 'Failed to navigate to URL');
      }
    }
  });
  
  // Handle clicks
  socket.on('click', async (data) => {
    if (page) {
      try {
        await page.click(`[data-x="${data.x}"][data-y="${data.y}"]`) || 
        await page.mouse.click(data.x, data.y);
        console.log('Clicked at:', data.x, data.y);
      } catch (error) {
        console.error('Click error:', error);
      }
    }
  });
  
  // Handle typing
  socket.on('type', async (text) => {
    if (page) {
      try {
        await page.keyboard.type(text);
        console.log('Typed:', text);
      } catch (error) {
        console.error('Type error:', error);
      }
    }
  });
  
  // Handle key presses
  socket.on('keypress', async (key) => {
    if (page) {
      try {
        await page.keyboard.press(key);
        console.log('Key pressed:', key);
      } catch (error) {
        console.error('Key press error:', error);
      }
    }
  });
  
  // Handle scroll
  socket.on('scroll', async (data) => {
    if (page) {
      try {
        await page.mouse.wheel({ deltaY: data.deltaY });
        console.log('Scrolled:', data.deltaY);
      } catch (error) {
        console.error('Scroll error:', error);
      }
    }
  });
  
  // Handle page refresh
  socket.on('refresh', async () => {
    if (page) {
      try {
        await page.reload();
        console.log('Page refreshed');
      } catch (error) {
        console.error('Refresh error:', error);
      }
    }
  });
  
  // Handle back navigation
  socket.on('back', async () => {
    if (page) {
      try {
        await page.goBack();
        console.log('Navigated back');
      } catch (error) {
        console.error('Back navigation error:', error);
      }
    }
  });
  
  // Handle forward navigation
  socket.on('forward', async () => {
    if (page) {
      try {
        await page.goForward();
        console.log('Navigated forward');
      } catch (error) {
        console.error('Forward navigation error:', error);
      }
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (streamingInterval) {
      clearInterval(streamingInterval);
    }
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  if (streamingInterval) {
    clearInterval(streamingInterval);
  }
  if (browser) {
    await browser.close();
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initBrowser();
});
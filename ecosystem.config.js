module.exports = {
  apps: [
    {
      name: 'browser-streaming',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0',
        PORT: 3000,
        HEADLESS: false,
        FPS: 10,
        QUALITY: 60
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3000,
        HEADLESS: true,
        FPS: 8,
        QUALITY: 50
      },
      env_development: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0',
        PORT: 3000,
        HEADLESS: false,
        FPS: 10,
        QUALITY: 60
      },
      env_staging: {
        NODE_ENV: 'staging',
        HOST: '0.0.0.0',
        PORT: 3000,
        HEADLESS: true,
        FPS: 10,
        QUALITY: 55
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      time: true,
      
      // Auto restart
      restart_delay: 1000,
      max_restarts: 5,
      min_uptime: '10s',
      
      // Memory management
      max_memory_restart: '500M',
      
      // Process management
      kill_timeout: 5000,
      shutdown_with_message: true,
      
      // Monitoring
      pmx: true,
      merge_logs: true,
      
      // Advanced settings
      node_args: '--max-old-space-size=512',
      
      // Health check
      health_check_http: {
        path: '/health',
        port: 3000,
        interval: 30000,
        timeout: 5000
      }
    }
  ]
};
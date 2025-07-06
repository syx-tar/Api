# Modern PHP Web Application

A beautiful, modern PHP web application built with Slim Framework, Twig templating, and Bootstrap 5.

## Features

- 🚀 **Modern PHP 8.1+** with latest features
- 🎨 **Beautiful UI** with Bootstrap 5 and Font Awesome icons
- 🏗️ **Slim Framework** for lightweight, fast performance
- 📝 **Twig Templating** for clean, maintainable templates
- 🔌 **RESTful API** endpoints
- 📱 **Responsive Design** that works on all devices
- 🎯 **MVC Architecture** with organized controllers
- 📦 **Composer** for dependency management

## Quick Start

### Prerequisites

- PHP 8.1 or higher
- Composer

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   ```

3. Start the development server:
   ```bash
   composer start
   ```

4. Open your browser and visit: http://localhost:8000

## API Endpoints

- `GET /` - Home page
- `GET /about` - About page
- `GET /api/hello` - Hello API endpoint
- `GET /api/status` - System status API endpoint

## Project Structure

```
├── public/
│   └── index.php          # Application entry point
├── src/
│   └── Controllers/       # Application controllers
│       ├── HomeController.php
│       └── ApiController.php
├── templates/             # Twig templates
│   ├── base.twig         # Base template
│   ├── home.twig         # Home page template
│   └── about.twig        # About page template
├── vendor/               # Composer dependencies
├── composer.json         # Composer configuration
└── README.md            # This file
```

## Technologies Used

- **PHP 8.1+** - Modern PHP with latest features
- **Slim Framework 4** - Lightweight PHP framework
- **Twig 3** - Powerful templating engine
- **Bootstrap 5** - Modern CSS framework
- **Font Awesome** - Beautiful icons
- **Composer** - Dependency management

## Development

### Running Tests

```bash
composer test
```

### Adding New Routes

Add routes in `public/index.php`:

```php
$app->get('/new-route', [YourController::class, 'method']);
```

### Creating Controllers

Create new controllers in `src/Controllers/`:

```php
<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class YourController
{
    public function method(Request $request, Response $response, $args)
    {
        // Your logic here
    }
}
```

## License

This project is open source and available under the [MIT License](LICENSE).
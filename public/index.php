<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;
use App\Controllers\HomeController;
use App\Controllers\ApiController;

// Create App
$app = AppFactory::create();

// Add Error Middleware
$app->addErrorMiddleware(true, true, true);

// Create Twig
$twig = Twig::create(__DIR__ . '/../templates', ['cache' => false]);

// Add Twig-View Middleware
$app->add(TwigMiddleware::create($app, $twig));

// Routes
$app->get('/', [HomeController::class, 'index']);
$app->get('/about', [HomeController::class, 'about']);
$app->get('/api/hello', [ApiController::class, 'hello']);
$app->get('/api/status', [ApiController::class, 'status']);

$app->run();
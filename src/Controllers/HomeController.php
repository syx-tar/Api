<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Views\Twig;

class HomeController
{
    public function index(Request $request, Response $response, $args)
    {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'home.twig', [
            'title' => 'Welcome to Our Modern PHP App',
            'message' => 'Hello, World! This is a modern PHP web application built with Slim Framework.'
        ]);
    }

    public function about(Request $request, Response $response, $args)
    {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'about.twig', [
            'title' => 'About Us',
            'content' => 'This is a sample PHP web application built with Slim Framework and Twig templating.'
        ]);
    }
}
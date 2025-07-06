<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ApiController
{
    public function hello(Request $request, Response $response, $args)
    {
        $data = [
            'message' => 'Hello from API!',
            'timestamp' => date('Y-m-d H:i:s'),
            'status' => 'success',
            'version' => '1.0.0',
            'server' => $_SERVER['SERVER_NAME'] ?? 'localhost'
        ];
        
        $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function status(Request $request, Response $response, $args)
    {
        $data = [
            'status' => 'online',
            'uptime' => $this->getUptime(),
            'memory_usage' => $this->getMemoryUsage(),
            'php_version' => phpversion(),
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }

    private function getUptime()
    {
        if (function_exists('sys_getloadavg')) {
            $load = sys_getloadavg();
            return "Load: " . implode(', ', $load);
        }
        return "N/A";
    }

    private function getMemoryUsage()
    {
        $memory = memory_get_usage(true);
        return round($memory / 1024 / 1024, 2) . ' MB';
    }
}
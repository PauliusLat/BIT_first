<?php

namespace BIT\app;

use BIT\app\App;

class ApiRoute
{
    public static function apiRoute() {
        /**$get_param = $_GET['route'] - /bebras/api/?route=labas*/
        $app = App::start();  
        $get_param = $app->getService('request')->query->get('route', '');
        $routes = require $app->routeDir.'apiRoutes.php';
        if (file_exists(get_stylesheet_directory() . '/frontRoutes.php')) {
            $routesTheme = require get_stylesheet_directory().'/frontRoutes.php';

            $routes = array_merge($routes, $routesTheme);
        }
        foreach ($routes as $key => $route) {
            if ($key == $get_param) {
                list($controller, $method) = explode('@', $route);
                $controller = 'BIT\\controllers\\' . $controller;
                return $app->run($controller, $method);
                //return (new $controller)->$method();
            }
        }
        
    }
}
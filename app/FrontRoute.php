<?php

namespace BIT\app;

use BIT\app\App;

class FrontRoute
{
// Iš frontRoutes.php paima kontrolerį ir metodą ir jį paleidžia
    static function frontRoute($atts) {
        $app = App::start();        
        $routes = require $app->routeDir.'frontRoutes.php';
        if (file_exists(get_stylesheet_directory() . '/frontRoutes.php')) {
            $routesTheme = require get_stylesheet_directory().'/frontRoutes.php';

            $routes = array_merge($routes, $routesTheme);
        }
        
        $a = shortcode_atts( [
            'route' => '',	
        ], $atts );
        list($controller, $method) = explode('@', $routes[$a['route']]);
        $controller = 'BIT\\controllers\\' . $controller;
        return (new $controller)->$method();
    }

}

/**App __construct() uzregistruoti FrontRoute klase add_shortcode*/
//add_shortcode( 'front_shortcode', [FrontRoute::class, 'frontRoute'] );

/**Shortcode iškvietimas*/
//[front_shortcode route="event"]

<?php

namespace BIT\app;

use BIT\app\App;



class FrontRoute
{
    // Iš frontRoutes.php paima kontrolerį ir metodą ir jį paleidžia
    static function frontRoute($atts, $content, $shortcode_tag)
    {

        $app = App::start();
        $routes = [];
        $routesIni = require $app->routeDir . 'frontRoutes.php';
        foreach ($routesIni as $key => $value) {
            $routes += $value;
        }
        if (file_exists(get_stylesheet_directory() . '/frontRoutes.php')) {
            $routesTheme = require get_stylesheet_directory() . '/frontRoutes.php';
            // _d($routesTheme);
            $routes = array_merge($routes, $routesTheme);
        }

        $a = shortcode_atts([
            'route' => '',
            'args' => ''
        ], $atts);
        list($controller, $method) = explode('@', $routes[$a['route']]);
        // _d(list($controller, $method) = explode('@', $routes[$a['route']]));
        $controller = 'BIT\\controllers\\' . $controller;
        if ($a['args'] === '') {
            return (new $controller)->$method();
        } else {
            return (new $controller)->$method($a['args']);
        }
    }
}

/**App __construct() uzregistruoti FrontRoute klase add_shortcode*/
//add_shortcode( 'front_shortcode', [FrontRoute::class, 'frontRoute'] );

/**Shortcode iškvietimas*/
//[front_shortcode route="event"]

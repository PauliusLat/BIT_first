<?php

namespace BIT\app;

use BIT\app\App;

class AdminRoute {

    public static function start() {
        add_action('admin_menu', function() {
            $routes = require PLUGIN_DIR_PATH . 'routes/adminRoute.php';
            foreach ($routes as $path => $route) {
                list($controller, $method) = explode('@', $route, 2);
                $controller = 'BIT\\controllers\\' . $controller;
                // use $controller;
                // (new $controller)->$method()
                $app = App::start();
                add_menu_page(ucfirst($path) . ' Title', ucfirst($path) . ' Menu', 'manage_options', $path, 
                function () use ($controller, $method, $app) {
                    echo $app->run($controller, $method);
                    // (new $controller)->$method();
                });
            }
        });
    }
}

// add_menu_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', string $icon_url = '', int $position = null );
// add_submenu_page( string $parent_slug, string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', int $position = null );
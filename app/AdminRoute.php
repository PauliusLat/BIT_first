<?php

namespace BIT\app;

use BIT\app\App;

class AdminRoute
{

    public static function start()
    {
        add_action('admin_menu', function () {
            $routes = require PLUGIN_DIR_PATH . 'routes/adminRoute.php';
            foreach ($routes as $path => $route) {
                if (is_array($route)) {
                    list($parentPath) = explode('@', $path, 2);
                    $position = 0;
                    foreach ($route as $subPath => $subRoute) {
                        list($controller, $method) = explode('@', $subRoute, 2);
                        $controller = 'BIT\\controllers\\' . $controller;
                        $app = App::start();
                        if ($position === 0) {
                            add_submenu_page($parentPath, ucfirst($subPath), ucfirst($subPath), 'manage_options', $parentPath);
                        } else {
                            add_submenu_page(
                                (strpos($subPath, '0') === 0) ? null : $parentPath,
                                ucfirst($subPath),
                                ucfirst($subPath),
                                'manage_options',
                                $parentPath.'-'.$subPath,
                                function () use ($controller, $method, $app) {
                                    echo $app->run($controller, $method);
                                }
                            );
                        }
                        $position++;
                    }
                } else {
                    list($controller, $method) = explode('@', $route, 2);
                    $controller = 'BIT\\controllers\\' . $controller;
                    $app = App::start();
                    add_menu_page(
                        ucfirst($path),
                        ucfirst($path) . ' Menu',
                        'manage_options',
                        $path,
                        function () use ($controller, $method, $app) {
                            echo $app->run($controller, $method);
                        }
                    );
                }
            }
        });
    }
}


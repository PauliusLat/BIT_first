<?php

namespace BIT\app;

use BIT\app\App;

class View
{
    public static function render(string $templateName, array $vars = [])
    {
        /** $templateName = 'bebras.event'; //(theme view/bebras/event.php) */
        // kelias iki aktyvios temos
        $templateName = str_replace('.', '/', $templateName);
        // _dc($templateName);
        if ($templateName == 'header') {
            $path = get_stylesheet_directory() . '/' . $templateName . '.php';
        } else {
            $path = get_stylesheet_directory() . '/views/' . $templateName . '.php';
        }

        // kintamieji is masyvo $vars
        extract($vars);

        ob_start();
        require $path;
        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }

    public static function adminRender(string $templateName, array $vars = [])
    {
        /** $templateName = 'bebras.event'; //(theme view/bebras/event.php) */
        // kelias iki aktyvios temos
        $templateName = str_replace('.', '/', $templateName);
        //path iki plugin views
        $app = App::start();
        $path = $app->viewDir . $templateName . '.php';
        // kintamieji is masyvo $vars
        extract($vars);

        ob_start();
        require $path;
        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }
}

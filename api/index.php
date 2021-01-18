<?php

require __DIR__ . '/../../../../wp-load.php';

require_once '../vendor/autoload.php';

if (!defined('PLUGIN_DIR_URL')) {
    define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
}

if (!defined('PLUGIN_DIR_PATH')) {
    define('PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));
}

use BIT\app\ApiRoute;

$response = ApiRoute::apiRoute(/*$app*/);
if ($response) {
    $response->send();
}

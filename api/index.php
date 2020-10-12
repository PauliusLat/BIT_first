<?php

require __DIR__ . '/../../../../wp-load.php';

// require(C:\\xampp\\htdocs\\wordpress\\wp-content\\plugins\\BIT-first\\api/../../../../../wp-load.php

require_once '../vendor/autoload.php';

// C:\\xampp\\htdocs\\wordpress\\wp-content\\plugins\\BIT-first\\api../vendor/autoload.php

if (!defined('PLUGIN_DIR_URL')){
    define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));}

if (!defined('PLUGIN_DIR_URL')){
    define('PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));
}

// require_once PLUGIN_DIR_PATH . 'vendor/autoload.php';

// use BIT\app\App;
use BIT\app\ApiRoute;

// $app = App::start();

$response = ApiRoute::apiRoute(/*$app*/);

// $response = ApiRoute::apiRoute(/*$app*/);
//     if($response){
//         $response->send();
//     }
$response->send();
// Cia neturi buti jokiu try cach visi nusitrinkite
//WP pats gaudo is isveda i debug.log !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!





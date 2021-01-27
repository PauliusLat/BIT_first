<?php

// use BIT\app\Category;
// use BIT\app\Query;
// use BIT\app\Tag;
// use BIT\models\NewsPost;
use BIT\app\App;
// use BIT\app\Cookie;
//use BIT\app\Query;
// use BIT\app\Tag;
////use BIT\app\Page;
// use BIT\app\Post;
// use BIT\app\Pagination;
// use BIT\app\FrontMenu;
// use BIT\app\Session;
use BIT\app\coreExeptions\NotSetException;



/**
 * Plugin Name: BIT First
 * Plugin URI: https://www.yourwebsiteurl.com/
 * Description: First.
 * Version: 1.0
 * Author: Your Name Here
 * Author URI: http://yourwebsiteurl.com/
 **/



require_once __DIR__ . '/vendor/autoload.php';

define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
define('PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));

App::start();
// $session = App::start()->getService('session');
// _dc($session->get('ideja'));

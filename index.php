<?php

/**
 * Plugin Name: BIT First
 * Plugin URI: https://www.yourwebsiteurl.com/
 * Description: First.
 * Version: 1.0
 * Author: Your Name Here
 * Author URI: http://yourwebsiteurl.com/
 **/
use BIT\models\AlbumPost;
use BIT\app\App;
use BIT\app\Query;
use BIT\app\Post;
use BIT\app\RequestId;
use BIT\app\Cookie;
use BIT\app\Transient;
use BIT\app\Session;
use BIT\controllers\NewsController;
use BIT\models\IdeaPost;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use BIT\app\coreExeptions\wrongArgsTypeExeption;

require_once __DIR__.'/vendor/autoload.php';

define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
define('PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));


App::start();

$session = Session::start();

// _dc($session );
//  _dc($_COOKIE);
// $session->set(4,9); 
//  
// _dc($_COOKIE);
// $session->set('od',2);
// $session->set('obd',2);
// $session->set('aaaaaaaaa',2);
// //$session->set('kkkkkk',2);

// $session->set('la','bu');
// $session->set('aaaaaaaaa',2);
// // $session->set('bbbbbbbbbb',2);
// $session->flash('flash',7);
// _dc($session->get('flash'));

// $session->set('b',7);
// $session->deleteSession();


// _dc(Session::$array);

// $session->delete('bbbbbbbbbb');
// // $session->flash('llllll',7);

// // $session->flash('ppppp',7);

// $transient = Transient::start();
// $transient->deleteTransient();
// delete_transient('1223');
// // _dc($session);
// delete_transient('1069');

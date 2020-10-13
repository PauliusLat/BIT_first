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


// add_action('init', function() {
// //     $album = new AlbumPost;
// //     $album->save();
// // //      _dc( $album);
// // // $album->addTag(['atostogos', 'namai']);
// // // $album->addTag(['tttt']);
// // // $album->addCat('indai', 'maincat');
// // $album->addCat(['lekstutes', 'sauksteliai'], 'maincat', 45); //gl padaryti, kad ne is butu o stringas kaip kat

// // ($album->getCats());
// //  _dc($album->getChildCats([45, 0]));

// // $album->addTag('ooorrr');
// //     // echo '<pre>';    
   
//     // _dc( $album);
// //     // wp_remove_object_terms( '953', '27', 'hashtag');
// // $album->removeTag(['atostogos', 'namai']);
// // // 
// // 
// // $album->removeCat('Indai');

// // _dc($album->getChildCats([45, 0]));
// // _dc($album->getAllCats());
// //

// // _dc($album->getTags()->sortBy('count', 'desc'));
// //     //  $idea = new IdeaPost;
// //     //  $idea->save();
// //     //  _dc( $idea);
// //     //  $idea->addTag('');
//  });



// $request = App::start()->getService('request');
// $request->attributes->set('mykey', 'myvalue');
// $parameters = $request->attributes->get('mykey', 'myvalue');

// _dc($parameters);






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
use BIT\app\ApiRoute;
use BIT\app\Query;
use BIT\app\Post;
use BIT\app\Page;
use BIT\app\RequestId;
use BIT\app\Cookie;
use BIT\app\Transient;
use BIT\app\Session;
use BIT\app\Category;
use BIT\app\View;
use BIT\app\Collection;
use BIT\controllers\NewsController;
use BIT\models\IdeaPost;
use BIT\models\NewsPost;
use BIT\app\Tag;
use BIT\app\modelTraits\Tcategory;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use BIT\app\coreExeptions\wrongArgsTypeExeption;

require_once __DIR__.'/vendor/autoload.php';

define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
define('PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));

$app = App::start();
$query = new Query;

$api = new ApiRoute;
// 
// _dc($app->getService('request')->query->get('route', ''));



// $my_post = array(
//     'post_content'   => "My page content",
//     'post_title'     => 'idea',
//     'post_name'      => 'idea',
//     'post_type'      => 'page',  // must be 'page'  to accept the 'page_template' below
//     'page_template'  => "listing.php",
//     'post_status'    => "publish"
// );
// $ID = wp_insert_post( $my_post );
// $permalink = get_permalink($ID);
// echo "<br />ID for new page is $ID, Permalink for new page is $permalink";

// _dc($query->postMeta('event_date', 'konkreti data, kurios reikia')->postSort('event_time')->getPost()->all());
// $getPostType = $query->postSort('date','DESC')->getPost();

// _dc($getPostType);

// _dc($app->getService('requestId'));
// $category = new Category;
// _dc(View::adminRender('category.edit', ['url' => PLUGIN_DIR_URL, 'category' => $category]));

add_action('init', function() {

    // $album = new AlbumPost;
    // $album->save();

    // $tag = new Tag;
    // $tag->addTagtoDB('hot');
    // $album->addTag('cold');
    // $terms = get_terms(['name'=>'aauga', 'taxonomy'=> 'maincat', 'hide_empty'=>false]);
    // _dc($terms);
//     $category = new Category;
//     $page = new Page;
    // $page->createPage('kalendorius');
    // $my_post = array(
    //     'post_title'    => 'Ideja',
    //     'post_type'     => 'page',
    //     'post_name'     => 'ideja',
    //     'post_content'  => '[front_shortcode route="ideja"]',
    //     'post_status'   => 'publish',
    //     'comment_status' => 'closed',
    //     'ping_status' => 'closed',
    //     'post_author' => 1,
    //     'menu_order' => 0
    //   );
      
    //   $id = wp_insert_post( $my_post );
    //   $permalink = get_permalink($id);
    //   _dc($permalink);



    // _dc($category->get_taxonomy_hierarchy());

    // _dc(get_term_children(43, 'maincat'));
    // $album = new AlbumPost;
    // $album->save();
// // //      _dc( $album);
// // // $album->addTag(['atostogos', 'namai']);
// // // $album->addTag(['tttt']);
// $album->addCat('indai', 'maincat');
// $album->addCat('baldai', 'maincat');
// $album->addCat(['lekstutes', 'sauksteliai'], 'maincat', 45); //gl padaryti, kad ne is butu o stringas kaip kat
// $album->addCat([' mazo lekstutes', 'dideles lekstutes'], 'maincat', 53);
    // _dc($category->get_taxonomy_hierarchy('maincat'));
// //  _dc($album->getChildCats([45, 0]
// _dc($category);
//  _dc($category->getTermId('stalai'));
// _dc(get_term_by('name', 'stalai', 'maincat'));
// $category->addCat('stalai', 'maincat');
// // $album->addTag('ooorrr');
// //     // echo '<pre>';    
   
//     // _dc( $album);
// //     // wp_remove_object_terms( '953', '27', 'hashtag');
// // $album->removeTag(['atostogos', 'namai']);
// // // 
// // 
// // $album->removeCat('Indai');

// // _dc($album->getChildCats([45]));
//  _dc($album->get_taxonomy_hierarchy('maincat', 45));
// // $album->get_taxonomy_hierarchy(['maincat', 45]);
// //  _dc($album->getCats());
// //

// // _dc($album->getTags()->sortBy('count', 'desc'));
// //     //  $idea = new IdeaPost;
// //     //  $idea->save();
// //     //  _dc( $idea);
// //     //  $idea->addTag('');
});



// $request = App::start()->getService('request');
// $request->attributes->set('mykey', 'myvalue');
// $parameters = $request->attributes->get('mykey', 'myvalue');

// _dc($parameters);






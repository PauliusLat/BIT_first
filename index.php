
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
use BIT\app\Server;
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
// $query = new Query;

// $api = new ApiRoute;

// $session = App::start()->getService('session');
// _dc($_SERVER);

// $server = new Server;

// // now try it
// $ua=$server->getBrowser();
// _dc($ua);
// $yourbrowser= "Your browser: " . $ua['name'] . " " . $ua['version'] . " on " .$ua['platform'] . " reports: <br >" . $ua['userAgent'];
// print_r($yourbrowser);
// $user_agent = $_SERVER['HTTP_USER_AGENT'] . "\n\n";
// _dc(get_browser_name($user_agent));

// $session = new Session;
// $session->set(9,3);
// // _dc($session->get(4));
//  $session->set(9,3);
// $session->set('b',[3,2,4]);

// $session->set('id',5);
// _dc($session->get('id'));

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

// add_action('init', function() {



    // $terms = $category->getTaxonomyHierarchy('maincat');
    // _dc($terms);

    // foreach ($terms as $term){
    //     _dc($term);
    // }
    // $cats = $category->flattenArray($terms);
    // _dc($cats);

    // $terms = $category->get_taxonomy_hierarchy()->pluck('name', 'slug', 'term_id', 'parent');
    // _dc($terms);

// function flatten_array($array) {
//     $flattened_array = array();
//     array_walk_recursive($array, function($a) use (&$flattened_array) { $flattened_array[] = $a; });
//     return $flattened_array;
// }

// _dc(flatten_array($terms));

// function flattenArray($array)
// {
// static $flattened = [];
// if(is_array($array) && count($array) > 0)
// {   
//     foreach ($array as $member) {
//         if(empty($member->children)) 
//         {
//             $flattened[] = $member; 
//         } else
//         {
//             flattenArray($member->children);
//             unset($member->children);
//             $flattened[] = $member; 
//         }
//     }
// }
// return $flattened;
// }

// _dc($category->flattenArray($category->get_taxonomy_hierarchy_arr('maincat')));

// function flattenWithKeys(array $array, $childPrefix = '.', $root = '', $result = array()) {
//     // redundant with type hint
//     //if(!is_array($array)) return $result;

//     ### print_r(array(__LINE__, 'arr' => $array, 'prefix' => $childPrefix, 'root' => $root, 'result' => $result));

//     foreach($array as $k => $v) {
//         if(is_array($v) || is_object($v)) $result = flattenWithKeys( (array) $v, $childPrefix, $root . $k . $childPrefix, $result);
//         else $result[ $root . $k ] = $v;
//     }
//     return $result;
// }

// _dc(flattenWithKeys($terms));


    // function array_flatten($array) {

    //     $return = array();
    //     foreach ($array as $key => $value) {
    //         //  _dc((array)$value);
    //         // _dc($value);
    //         if (is_array($value)){ $return = array_merge($return, array_flatten((array)$value));}
    //         else {$return[$key] = $value;}
    //     }
    //     return $return;
     
    // }

    //  _dc(array_flatten($terms));
    //array_flatten($terms);


    //    $args = array(

//     'hide_empty'         => 0,
//     'echo'               => 0,
//     'taxonomy'           => 'maincat',
//     'hierarchical'  =>1,
//     'show_count' => 1,

// );


// wp_list_categories( $args );
    // $category->deleteCatFromDb(103);

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
    // $album->save();
// // //      _dc( $album);
// // // $album->addTag(['atostogos', 'namai']);
// // // $album->addTag(['tttt']);
// $album->addCat('indai', 'maincat');
// $album->addCat('baldai', 'maincat');
// $category->addCat(['mazi sauksteliai'], 54);
// $album->attachCat('mazi sauksteliai');
 //gl padaryti, kad ne is butu o stringas kaip kat
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
// });







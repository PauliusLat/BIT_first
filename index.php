<?php

use BIT\app\Category;
// use BIT\app\Query;
// use BIT\app\Tag;
use BIT\models\NewsPost;
use BIT\app\App;
use BIT\app\Cookie;
use BIT\app\Query;
// use WP_Query;
use BIT\app\Page;
use BIT\app\Post;
use BIT\app\Pagination;
use BIT\app\FrontMenu;
use BIT\app\Session;



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

// $app = App::start();

// _dc($session->get('333333333333cassdca'));
// $server = new Server;
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

// $query = new Query;
// $getcount = wp_count_posts('page');

// echo "<div style = 'font: 20px;padding: 100px;'>'.$getcount.'</div>";

// _dc($getPostType);
// _dc($app->getService('requestId'));
// $category = new Category;
// _dc(View::adminRender('category.edit', ['url' => PLUGIN_DIR_URL, 'category' => $category]));


// add_action('init', function () {
    // $query = new Query;
    // $Pages = $query->postOffset('page', 4)->getPost()->all();
    // _dc($Pages);
    // $pages = $query->postType('page')->getPost()->all();
    // _dc($pages);
    // $news = new NewsPost;
    // $news->save();
    // $arr = explode('#', '#oras#astrus#naujas');
    // // array_shift($arr);
    // // _dc($arr);
    // $news->addTag($arr);
    // $arr = $news->getCatsId(374);
    // _dc($arr);


    // $args = array(
    //     'descendants_and_self' => 0,
    //     'selected_cats' => false,
    //     'popular_cats' => false,
    //     // 'walker' => is a Walker_Category_Checklist instance, 
    //     'taxonomy' => 'maincat',
    //     'checked_ontop' => true
    // );

    // // NOTICE! Understand what this does before running. 
    // $result = wp_terms_checklist($args);
    // _dc($result);



    // $category = new Category;
    // $catImage = $category->getCatImage(192, 'image');
    // _dc($catImage);

    // wp_set_object_terms(328, 154, 'maincat');
    // $news = new NewsPost;
    // $postCats = $news->getCats(328);
    // _dc($postCats);
    // $query = new Query;
    // // $page = $query->postName('namai')->getPost()->all();
    // // _dc($query->postType('page')->getPost()->all());
    // $post = new Page;
    // $page = get_page_by_title('namai', 'OBJECT', 'page');
    // $page = $post->get($page->ID);
    // _dc($page);
    // $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
    // _dc($page);
    // $args = array(
    //     'post_type'  => 'page',
    //     'meta_key'   => 'pageState',
    //     // 'orderby'    => 'meta_value_num',
    //     // 'order'      => 'ASC',
    //     'meta_query' => array(
    //         array(
    //             'key'     => 'pageState',
    //             'value'   => ['Site_page', 'Menu_page'],
    //             // 'compare' => 'IN',
    //         ),
    //     ),
    // );
    // $query = new WP_Query($args);
    // _dc($query);
    // 
    // $pages = $query->postType('page')->postMeta('pageState', 'Menu_page')->getPost()->all();
    // $pages = $query->postType('page')->getPost()->all();
    // _dc($pages);


    // $session = new Session;
    // $session->set('fgbsfsdf', 'gergerger');
    // var_dump($session);

    // // // $session->deleteSession();
    // $session->flash('ooo', 5);
    // _dc($session->get('ooo'));
    // _dc($_COOKIE['Bit']);
    // $page = new Page;
    // // $page = $page->get(162);
    // // // _dc($page);
    // $menu = new FrontMenu;
    // _dc($menu);

    // $args = ['slug' => 'dovanos-namai'];
    // wp_update_term(107, 'maincat', $args);
    // $args = ['parent' => 0, 'description' => '', 'slug' => '', 'taxonomy_type' => 'maincat'];
    // $category = new Category;
    // $cat = $category->getCatPage(108);

    // // _dc($cat);
    // $category = new Category;
    // $category->deleteCatFromDb(135);

    // $categories = array_reverse($category->flattenArray($category->getTaxonomyHierarchyArr()));
    // _dc($categories);


    // $x = NewsPost::get(1628);
    // _dc($x->masyvas); 
    // _dc($x->masyvas); 
    // $x->save();
    // });


    // foreach ($x as $key => $value) {
    // if((int)($value->ID) > 400){

    //     $value->delete();
    // }
    // }
    // $session = App::start()->getService('session');
    // $news = new NewsPost;
    // $news->save();
    // $news->attachCat('164');
    // $news->addTag('blablabla');
    // $session->delete('message');
    // $session->flash('messkukuku', 'tokiu pavadinimu kategorija jau sukurta');
    // var_dump($session->get('messkukuku'));

    // $terms = $category->getTaxonomyHierarchy('maincat');
    // _dc($terms);

    // $category = new Category;
    // $category->addCat('bbb');

    // $terms = $category->getTaxonomyHierarchyArr('maincat');

    // _dc($terms);

    // foreach ($terms as $term){
    //     _dc($term);
    // }

    //  $cats = $category->flattenArray($terms);

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
    //   $flattened[] = $member;
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
// });

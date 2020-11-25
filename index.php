
<?php

use BIT\app\Category;
use BIT\app\Query;
use BIT\models\AlbumPost;
use BIT\models\NewsPost;
use BIT\app\Tag;
use BIT\app\Attachment;
use BIT\app\App;


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

// $pages = Page::all()->pageState('Site Page')->all();
// _dc($pages);
// _dc($_SERVER);
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

$query = new Query;
// $getcount = wp_count_posts('page');

// echo "<div style = 'font: 20px;padding: 100px;'>'.$getcount.'</div>";

// _dc($getPostType);
// _dc($app->getService('requestId'));
// $category = new Category;
// _dc(View::adminRender('category.edit', ['url' => PLUGIN_DIR_URL, 'category' => $category]));



add_action('init', function () {
    $session = App::start()->getService('session');

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


});

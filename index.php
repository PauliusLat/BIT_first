
<?php

use BIT\app\Category;
use BIT\app\Query;
use BIT\models\AlbumPost;
use BIT\models\NewsPost;
use BIT\app\Tag;
use BIT\app\Attachment;
use BIT\app\App;
use BIT\app\Session;
use BIT\app\Transient;



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

// $session = Session::start();
// // $session->deleteSession();
// $session->set('a', 2);
// // _dc(Transient::start());
// $session->set('b', '8');
// $session->set('c', '8');
// // // $session->set('d', '8');
// // // $session->set('e', '8');
// // // $session->set('0', '8');

// // $session->set('ppppppppp', '8');
// // $session->set('yyyyyy', '8');
// // $session->flash('ppppppppp', '8');
// $session->get('b');


// add_action('init', function () {
  
    // $terms = $category->getTaxonomyHierarchy('maincat');
    // _dc($terms);
    // $news = new NewsPost;
    // $news->save();


    // $news->addCatDbPost('kaledos');

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

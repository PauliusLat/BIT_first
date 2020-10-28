<?php
namespace BIT\app;

class Page {

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    public function createPage($post_type, $post_title) {
        $args = [
        'post_title'    => $post_title,
        'post_type'     => 'page',
        'post_name'     => $post_type,
        'post_content'  => '[front_shortcode route="'.$post_type.'"]',
        'post_status'   => 'publish',
        'comment_status' => 'closed',
        'ping_status' => 'closed',
        'post_author' => 1,
        'menu_order' => 0
        ];

        $id = wp_insert_post( $args );
        $permalink = get_permalink($id);


    }

   
   
}
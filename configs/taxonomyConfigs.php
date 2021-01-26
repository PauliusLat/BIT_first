<?php

return [

    'hashtag' => [
        // Add new "Hashtags" taxonomy to Posts register_taxonomy('hashtag', 'post', $args)
        // Non-hierarchical taxonomy (tag)
        'hierarchical' => false,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'show_in_quick_edit' => true,
        'show_admin_column' => true,
        'show_in_rest' => false,
        'query_var' => true,
        // This array of options controls the labels displayed in the WordPress Admin UI
        'labels' => [
            'name' => _x('Hashtags', 'taxonomy general name'),
            'singular_name' => _x('Hashtag', 'taxonomy singular name'),
            'search_items' =>  __('Search Hashtags'),
            'all_items' => __('All Hashtags'),
            // 'parent_item' => __( 'Parent Hashtag' ),
            // 'parent_item_colon' => __( 'Parent Hashtag:' ),
            'edit_item' => __('Edit Hashtag'),
            'update_item' => __('Update Hashtag'),
            'add_new_item' => __('Add New Hashtag'),
            'new_item_name' => __('New Hashtag Name'),
            'menu_name' => __('Hashtags'),
        ],
        // Control the slugs used for this taxonomy
        'rewrite' => [
            'slug' => 'hashtag', // This controls the base slug that will display before each term
            'with_front' => false, // Don't display the category base before "/hashtag/"
            'hierarchical' => false // If true, this will allow URL's like "/locations/boston/cambridge/"
        ],
    ],

    'ideatag' => [
        // Add new "Ideatags" taxonomy to Posts register_taxonomy('ideatag', 'post', $args)
        // Non-hierarchical taxonomy (tag)
        'hierarchical' => false,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'show_in_quick_edit' => true,
        'show_admin_column' => true,
        'show_in_rest' => false,
        'query_var' => true,
        // This array of options controls the labels displayed in the WordPress Admin UI
        'labels' => [
            'name' => _x('Ideatags', 'taxonomy general name'),
            'singular_name' => _x('Ideatag', 'taxonomy singular name'),
            'search_items' =>  __('Search Ideatags'),
            'all_items' => __('All Ideatags'),
            // 'parent_item' => __( 'Parent Ideatag' ),
            // 'parent_item_colon' => __( 'Parent Ideatag:' ),
            'edit_item' => __('Edit Ideatag'),
            'update_item' => __('Update Ideatag'),
            'add_new_item' => __('Add New Ideatag'),
            'new_item_name' => __('New Ideatag Name'),
            'menu_name' => __('Ideatags'),
        ],
        // Control the slugs used for this taxonomy
        'rewrite' => [
            'slug' => 'ideatag', // This controls the base slug that will display before each term
            'with_front' => false, // Don't display the category base before "/ideatag/"
            'hierarchical' => false // If true, this will allow URL's like "/locations/boston/cambridge/"
        ],
    ],

    'maincat' => [
        // Add new "Ideatags" taxonomy to Posts register_taxonomy('ideatag', 'post', $args)
        // Non-hierarchical taxonomy (tag)
        'hierarchical' => true,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'show_in_quick_edit' => true,
        'show_admin_column' => true,
        'show_in_rest' => false,
        'query_var' => true,
        // This array of options controls the labels displayed in the WordPress Admin UI
        'labels' => [
            'name' => _x('Maincats', 'taxonomy general name'),
            'singular_name' => _x('Maincat', 'taxonomy singular name'),
            'search_items' =>  __('Search Maincats'),
            'all_items' => __('All Maincats'),
            // 'parent_item' => __( 'Parent Maincat' ),
            // 'parent_item_colon' => __( 'Parent Maincat:' ),
            'edit_item' => __('Edit Maincat'),
            'update_item' => __('Update Maincat'),
            'add_new_item' => __('Add New Maincat'),
            'new_item_name' => __('New Maincat Name'),
            'menu_name' => __('Maincats'),
        ],
        // Control the slugs used for this taxonomy
        'rewrite' => [
            'slug' => 'maincat', // This controls the base slug that will display before each term
            'with_front' => false, // Don't display the category base before "/ideatag/"
            'hierarchical' => true // If true, this will allow URL's like "/locations/boston/cambridge/"
        ],
    ]

];

//add_action( 'init', 'add_custom_taxonomies', 0 )
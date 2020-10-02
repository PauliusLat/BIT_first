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
            'name' => _x( 'Hashtags', 'taxonomy general name' ),
            'singular_name' => _x( 'Hashtag', 'taxonomy singular name' ),
            'search_items' =>  __( 'Search Hashtags' ),
            'all_items' => __( 'All Hashtags' ),
            // 'parent_item' => __( 'Parent Hashtag' ),
            // 'parent_item_colon' => __( 'Parent Hashtag:' ),
            'edit_item' => __( 'Edit Hashtag' ),
            'update_item' => __( 'Update Hashtag' ),
            'add_new_item' => __( 'Add New Hashtag' ),
            'new_item_name' => __( 'New Hashtag Name' ),
            'menu_name' => __( 'Hashtags' ),
        ],
        // Control the slugs used for this taxonomy
        'rewrite' => [
            'slug' => 'hashtag', // This controls the base slug that will display before each term
            'with_front' => false, // Don't display the category base before "/hashtag/"
            'hierarchical' => false // If true, this will allow URL's like "/locations/boston/cambridge/"
        ],
    ]
];

//add_action( 'init', 'add_custom_taxonomies', 0 )
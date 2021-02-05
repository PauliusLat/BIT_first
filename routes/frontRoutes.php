<?php

// example Controller names and functions
// 'event' (key) is provided for the shortcode as attribute
return [
    'system' => [
        'events' => 'EventController@index',
        'showAlbum' => 'GalleryFrontController@show',
        'kategorija' => 'CategoryFrontController@index',
        'showNews' => 'NewsFrontController@show',
        // 'menufront' => 'FrontMenuController@index',
    ],

    'menu' => [
        'all-album' => 'AlbumFrontController@index',
        'kalendorius' => 'CalendarFrontController@index',
        'ideja' => 'IdeaController@frontIndex',
        'idejos' => 'IdeasController@index',
        'news' => 'NewsFrontController@index',
        'uploade-images' => 'GalleryFrontController@uploadeIndex',
    ],

];

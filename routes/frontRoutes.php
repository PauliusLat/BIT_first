<?php

// example Controller names and functions
// 'event' (key) is provided for the shortcode as attribute
return [
    'events' => 'EventController@index',
    'uploade-images' => 'GalleryFrontController@uploadeIndex',
    'all-album' => 'AlbumFrontController@index',
    'showAlbum' => 'GalleryFrontController@show',
    // 'showAlbum' => 'GalleryFrontController@lightbox',
    'kalendorius' => 'CalendarFrontController@index',
    'ideja' => 'IdeaController@frontIndex',
    'kategorija' => 'CategoryFrontController@index',
    'idejos' => 'IdeasController@index',
    'test' => 'TestController@front',
    'showNews' => 'NewsFrontController@show',
    'news' => 'NewsFrontController@index',
    'menufront' => 'FrontMenuController@index',
];

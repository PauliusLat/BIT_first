<?php

// example Controller names and functions
// 'event' (key) is provided for the shortcode as attribute
return [

    'events' => 'EventController@index',
    'uploade-images' => 'GalleryFrontController@uploadeIndex',
    'all-album' => 'AlbumFrontController@index',
    'kalendorius' => 'CalendarFrontController@index',
    'ideja' => 'IdeaController@frontIndex',
    'idejos' => 'IdeasController@index',
    'kategorija' => 'CategoryFrontController@index',
    'test' => 'TestController@front',
    'showNews' => 'NewsFrontController@show',
    'news' => 'NewsFrontController@index',
];

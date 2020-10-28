<?php

return [
	'admin' => 'AdminController@index',
	'news' => 'NewsController@create',
	'news@' => ['list' => 'NewsController@create', 'news_edit' => 'NewsController@edit'],

	'idejos' => 'IdeAdminController@adminIndex',
	'galerija' => 'GalleryAdminController@adminIndex',
	
	'kalendorius' => 'CalendarAdminController@adminIndex',

	'philosophy' => 'PhilosophyController@index',

	'category' => 'CategoryAdminController@create',
	'category@' => ['list' =>'CategoryAdminController@create', 'category_store'=> 'CategoryAdminController@store','category_edit'=> 'CategoryAdminController@edit', 'category_destroy'=> 'CategoryAdminController@destroy', 'category_update'=> 'CategoryAdminController@update'],
	
	'page' => 'PageController@create',
	'page@' => ['list' =>'PageController@create', 'page_edit'=> 'PageController@edit', 'page_store'=> 'PageController@store', 'page_destroy'=> 'PageController@destroy', 'page_update'=> 'PageController@update']
];

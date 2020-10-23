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

	'category@' => ['list' =>'CategoryAdminController@create', 'category_edit'=> 'CategoryAdminController@edit']
	
];

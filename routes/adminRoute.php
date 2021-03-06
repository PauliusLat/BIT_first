<?php
// array works like SUBMENUS;
// '0' in front of KEY makes submenu Hidden;
// SubMenus SLUG made of parent NAME '-' child NAME;

use BIT\controllers\CacheController;

return [
	// 'admin' => 'AdminController@index',
	'news' => 'NewsAdminController@create',
	'news@' => [
		'add new' => 'NewsAdminController@create',
		'list' => 'NewsAdminController@list',
		'0edit' => 'NewsAdminController@edit'
	],

	'idejos' => 'IdeAdminController@adminIndex',

	'galerija' => 'GalleryAdminController@index',
	'galerija@' => [
		'0def' => 'GalleryAdminController@index',
		'0edit' => 'GalleryAdminController@edit',
		'0delete' => 'GalleryAdminController@attDelete'
	],

	// 'login' => 'FrontLoginController@login',
	// 'login@' => [
	// 	'0def' => 'LoginController@index',
	// '0edit' => 'LoginController@edit',
	// '0delete' => 'LoginController@attDelete'
	// ],

	// 'newspage' => 'NewsFrontController@index',
	// 'newspage@' => [
	// 	'0paging' => 'NewsFrontController@paging',
	// ],
	// 'kategorija' => 'CategoryFrontController@index',

	'kalendorius' => 'CalendarAdminController@adminIndex',

	// 'category' => 'CategoryAdminController@create',
	// 'category@' => ['list' =>'CategoryAdminController@create', 'category_store'=> 'CategoryAdminController@store','category_edit'=> 'CategoryAdminController@edit', 'category_destroy'=> 'CategoryAdminController@destroy', 'category_update'=> 'CategoryAdminController@update'],

	'category' => 'CategoryController@index',

	'page' => 'PageController@index',
	// 'page@' => ['list' =>'PageController@create', 'page_edit'=> 'PageController@edit', 'page_store'=> 'PageController@store', 'page_destroy'=> 'PageController@destroy', 'page_update'=> 'PageController@update'],

	'tag' => 'TagController@index',
	// 'tag@' => ['list' =>'TagController@create', 'tag_edit'=> 'TagController@edit', 'tag_store'=> 'TagController@store', 'tag_destroy'=> 'TagController@destroy', 'tag_update'=> 'TagController@update']

	'create' => 'AdminMenuController@index',
	'create@' => [
		'0def' => 'AdminMenuController@index',
		'0menufront' => 'FrontMenuController@index',
		//'0newspage' => 'NewsFrontController@index'
	],


	'cache' => 'CacheController@index',
	'cache@' => [
		'0def' => 'CacheController@index',
		'0clear' => 'CacheController@clearCache',
		'0enable' => 'CacheController@enableCache'
	]
];

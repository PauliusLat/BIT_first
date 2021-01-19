<?php

namespace BIT\controllers;

class FrontMenuController {
	public function index() {
		// $query = new Query;
		// $menus = $query->postType('menu')->getPost()->all();
		// $menu = $menus[0];
		// return View::adminRender('adminMenu.headerfront', ['menu' =>  $menu]);
		// return View::render('header');
	}
	public function create() {
		$query = new Query;
		$menus = $query->postType('menu')->getPost()->all();
		$menu = $menus[0];
		$output = View::adminRender('adminMenu.headerfront', ['menu' => $menu]);
		$response = new JsonResponse(['html' => $output]);
		return $response;
		//return View::render('header', ['html' => $output]);
	}
}

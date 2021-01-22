<?php

namespace BIT\controllers;

use BIT\app\Query;
use BIT\app\View;
use Symfony\Component\HttpFoundation\JsonResponse;


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
		$output = View::adminRender('frontMenu.headerfront', ['menu' => $menu]);
		$response = new JsonResponse(['html' => $output]);
		return $response;
		//return View::render('header', ['html' => $output]);
	}
}

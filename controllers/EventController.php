<?php
namespace BIT\controllers;
use BIT\app\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EventController {
	public function __construct() {
		//
	}

	function index(Request $request) {
		$response = new Response;
		$output = View::render('calendar', ['a' => 86]);
		$response->prepare($request);
		$response->setContent(json_encode(['html' => $output]));
		// var_dump($request->query->get('route'));
		return $response;
	}
}
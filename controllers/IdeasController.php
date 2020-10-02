<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\IdeaPost;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IdeasController {
	public function __construct() {
	}

	public function index() {
		return View::render('ideas.idejos');
	}

	public function render(Request $request, IdeaPost $idea) {

		$data = (IdeaPost::all())->pluck('idea_content', 'idea_like', 'post_date', 'idea_solution', 'ID')->all();

		$response = new Response;
		$output = View::render('ideas.idejos');
		$response->prepare($request);
		$response = new JsonResponse(['html' => $output, 'allData' => $data]);

		return $response;
	}
}

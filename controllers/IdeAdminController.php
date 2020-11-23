<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\IdeaPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class IdeAdminController
{
	public function __construct()
	{
	}

	public function adminIndex()
	{
		return View::adminRender('idea.idejos');
	}

	public function render(Request $request, IdeaPost $idea)
	{

		$data = (IdeaPost::all())->pluck('idea_content', 'idea_like', 'post_date', 'idea_solution', 'ID')->all();

		$response = new Response;
		$output = View::adminRender('idea.idejos');
		$response->prepare($request);
		$response = new JsonResponse(['html' => $output, 'allData' => $data]);

		return $response;
	}

	public function edit(Request $requestJson)
	{
		$idea = new IdeaPost;

		$request = $this->decodeRequest($requestJson);

		$ideaContent = $idea->idea_content = $request->request->get('content');
		$editId = $request->request->get('id');

		$editPost = IdeaPost::get($editId);

		$array = [];
		if (is_array($ideaContent) && count(array_filter($ideaContent)) != "") {
			$array = $ideaContent;

			$txt = '';
			foreach ($array as $text) {
				$txt .= $text . ' ';
			}
			$editPost->idea_content = $txt;
			$editPost->save();
		}
		return $response = new Response;
	}

	public function create(Request $requestJson)
	{
		$idea = new IdeaPost;

		$request = $this->decodeRequest($requestJson);

		$soliutionId = $idea->ID = $request->request->get('id');
		$soliution = $idea->idea_solution = $request->request->get('content');

		$soliutionPost = IdeaPost::get($soliutionId);

		if (is_array($soliution)) {
			$array = $soliution;

			$txt = '';
			foreach ($array as $text) {
				$txt .= $text . ' ';
			}

			$soliutionPost->idea_solution = $txt;

			$soliutionPost->save();
		}
		return $response = new Response;
	}
	//	public function delete($force_delete = false)
	public function delete(IdeaPost $idea)
	{
		$idea->delete();

		return $response = new Response;
	}

	public function decodeRequest($request)
	{

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}
}

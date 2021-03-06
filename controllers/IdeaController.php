<?php

namespace BIT\controllers;

use BIT\app\Server;
use BIT\app\Session;
use BIT\app\View;
use BIT\models\AlbumPost;
use BIT\models\IdeaPost;
use BIT\models\NewsPost;
use BIT\app\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IdeaController
{

	public function frontIndex()
	{

		$albumData = (AlbumPost::all())->all();
		$album = View::adminRender('album.albumHome', ["data" => $albumData]);

		$allNews = NewsPost::all()->all();
		$news = View::adminRender('news.homeNews', ['html' => $allNews]);

		return View::render('home.ideja', ["news" => $news, "album" => $album]);
	}

	public function render(Request $request)
	{
		$data = (IdeaPost::all())->pluck('idea_content', 'idea_like', 'post_date', 'ID')->all();

		$response = new Response;
		$output = View::render('home.ideja');
		$response->prepare($request);
		$response = new JsonResponse(['data' => $output, 'allData' => $data]);

		return $response;
	}

	public function create(Request $requestJson, Session $session)
	{
		// $server = new Server;

		$idea = new IdeaPost;

		$response = new Response;

		$request = $this->decodeRequest($requestJson);

		$array = $idea->idea_content = $request->request->get('idea');

		if (is_array($array) && count(array_filter($array)) != "") {
			$txt = '';
			foreach ($array as $text) {
				$txt .= $text . ' ';
			}
			$idea->idea_content = $txt;
			$idea->save();
		} else {
			$like = $request->request->get('idea_like');

			if ($like && $session->get('ideja' . $like) != $like) {
				$ideaLike = IdeaPost::get($like);
				$ideaLike->idea_like = $ideaLike->idea_like + 1;
				$ideaLike->save();
				$session->set('ideja' . $like, $like);
			}
		}
		return $response;
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

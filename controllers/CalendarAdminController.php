<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\EventPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class CalendarAdminController
{
	public function __construct()
	{
	}

	public function adminIndex()
	{
		return View::adminRender('calendar.kalendorius');
	}

	public function create()
	{
		$data = (EventPost::all())->pluck('event_description', 'event_date', 'event_time', 'ID')->all();
		$response = new JsonResponse(['allData' => $data]);
		return $response;
	}

	public function store(Request $requestJson, EventPost $eventPost)
	{	
	// 	$app = App::start();
	// $request = $app->getService('eventPost');
	//  _dc($request);
		// _dc($eventPost);
		$eventPost = new EventPost;
		$request = $this->decodeRequest($requestJson);
		_dc($request);
		
		$eventPost->event_description = $request->request->get('event');
		$eventPost->event_time = $request->request->get('time');
		$eventPost->event_date = $request->request->get('date');

		$eventPost->save();

		return $response = new Response;
	}

	public function delete(Request $requestJson, EventPost $event)
	{

		$request = $this->decodeRequest($requestJson);
		$deleteId = $event->ID = $request->request->get('eventID');
		if ($deleteId) {
			$deletePost = EventPost::get($deleteId);
			$deletePost->delete();
		}
		$data = (EventPost::all())->pluck('event_description', 'event_date', 'event_time', 'ID')->all();
		$response = new JsonResponse(['allData' => $data]);
		return $response;
		
	}

	private function decodeRequest($request)
	{
		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}
		return $request;
	}
}

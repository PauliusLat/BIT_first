<?php

namespace BIT\controllers;

use BIT\app\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use BIT\models\EventPost;

class EventController
{
	public function __construct()
	{
	}

	function index()
	{
		return View::render('events.events');
	}
	
	function create()
	{
		$data = (EventPost::all())->pluck('event_description', 'event_date', 'event_time')->all();
		$response = new JsonResponse(['html' => $data]);

		return $response;
	}
}

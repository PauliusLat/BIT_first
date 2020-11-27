<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\EventPost;
use BIT\app\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class CategoryFrontController
{
	public function __construct()
	{
	}

	public function index()
	{
		return View::render('catfront.cat');
		// return View::adminRender('catfront.cat');
	}

	public function create()
	{
		// $data = (EventPost::all())->pluck('event_description', 'event_date', 'event_time', 'ID')->all();
		// $response = new JsonResponse(['allData' => $data]);
		// return $response;
	}
}

<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\app\Attachment;
use BIT\app\Query;
use BIT\app\Page;
use BIT\models\NewsPost;
use BIT\app\RequestId;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;


class NewsFrontController
{

    public function index()
    {
        $allNews = NewsPost::all()->all();
        $output = View::adminRender('news.front', ['html' =>  $allNews]);
        return View::render('news.news',  ["html" => $output]);
    }

    public function show(Request $request)
    {

        $id = $request->request->get('id');
        // var_dump($id);
        $news = NewsPost::get($id);

        return View::render('news.show',  ["html" => $news]);
    }

    protected function decodeRequest($request)
    {

        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : array());
        }

        return $request;
    }
}

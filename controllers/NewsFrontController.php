<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\NewsPost;


class NewsFrontController
{

    public function index()
    {
        $allNews = NewsPost::all()->all();
        $output = View::adminRender('news.front', ['html' =>  $allNews]);
        return View::render('news.news',  ["html" => $output]);
    }


    public function show(String $id){


        $news = NewsPost::get($id);
        $title = $news->post_title;
        $content = $news->news_content;
        $date = $news->post_date;
        $image = null;
        foreach($news->attachments as $value){
            $image = $value->getUrl();
           // $alt = $value->getAtl();
        }

        return View::render('news.show',  ["content" => $content, "date" => $date, "image" => $image, "title" => $title]);
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

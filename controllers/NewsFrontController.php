<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\app\App;
use BIT\models\NewsPost;
use BIT\app\Page;
use BIT\app\Pagination;
use Symfony\Component\HttpFoundation\Request;


class NewsFrontController
{

    public function index()
    {
        $request = App::start()->getService('request');
        // _dc($request);
        if ($request->request->get('pageSelected') != null) {
            $limit = $request->request->get('pageSelected');
        } else {
            $limit = 5;
        }

        if (is_int($request->request->get('pages')) || strlen($request->request->get('hash')) != 0) {
            $number = $request->request->get('hash');
        } else {
            $number = 1;
        }
        $allNews = NewsPost::all()->all();
        $total = count(NewsPost::all()->all());
        // _dc($total);
        $pagination = new Pagination($limit, $number, $total);
        // $pagesPost = Page::all()->all();
        $pagesPost = array_values($allNews);
        // _dc($pagesPost);
        $pageArr = [];
        foreach ($pagesPost as $key => $value) {
            if ($key >= $pagination->offset && count($pageArr) < $limit) {
                array_push($pageArr, $value);
            }
        }
        $output = View::adminRender('news.front', ['html' =>  $pageArr, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage]);
        return View::render('news.news',  ['html' => $output]);
    }


    public function show(String $id)
    {
        $news = NewsPost::get($id);
        $title = $news->post_title;
        $content = $news->news_content;
        $date = $news->post_date;
        $image = null;
        foreach ($news->attachments as $value) {
            $image = $value->getUrl();
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

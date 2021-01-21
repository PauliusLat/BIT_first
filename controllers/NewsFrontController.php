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
        if ($request->query->get('showitems') != null) {
            $limit = $request->query->get('showitems');
        } else {
            $limit = 5;
        }

        if ($request->query->get('psl')) {
            $number = $request->query->get('psl');
        } else {
            $number = 1;
        }

        $allNews = NewsPost::all()->all();
        $total = count(NewsPost::all()->all());
        $pagination = new Pagination($limit, $number, $total);
        $pagesPost = array_values($allNews);
        $pageArr = [];
        foreach ($pagesPost as $key => $value) {
            if ($key >= $pagination->offset && count($pageArr) < $limit) {
                array_push($pageArr, $value);
            }
        }

        $newsLink =  reset(Page::all()->shortCode('news')->all())->getLink();
        $output = View::adminRender('news.front', ['newsLink' => $newsLink, 'html' =>  $pageArr, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage]);
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

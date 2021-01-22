<?php

namespace BIT\controllers;

use BIT\app\Query;
use BIT\app\App;
use BIT\app\Page;
use BIT\app\Pagination;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlbumFrontController
{
    public function index()
    {
        $pageArr = Page::all()->shortCode('uploade-images')->all();
        $pageArr = reset($pageArr);
        $page = $pageArr->getLink();
        return View::render('gallery.all-album', ['page' => $page]);
    }

    public function create()
    {
        $request = App::start()->getService('request');
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

        $albumData  = (AlbumPost::all())->all();
        // $allNews = NewsPost::all()->all();
        $total = count($albumData);
        $pagination = new Pagination($limit, $number, $total);
        $pagesPost = array_values($albumData);
        $pageArr = [];
        foreach ($pagesPost as $key => $value) {
            if ($key >= $pagination->offset && count($pageArr) < $limit) {
                array_push($pageArr, $value);
            }
        }

        $output = View::adminRender('album.album',  ["data" => $pageArr, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }
}

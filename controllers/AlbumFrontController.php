<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\app\Query;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlbumFrontController
{
    public function index()
    {
        $query = new Query;
        $page = $query->postType('page')->postName('upload-images')->getPost()->all();
        $page = $page[0];
        $page = $page->getLink();
        return View::render('gallery.all-album', ['page' => $page]);
    }

    public function create()
    {
        $albumData  = (AlbumPost::all())->all();
        $output = View::adminRender('album.album',  ["data" => $albumData]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }
}

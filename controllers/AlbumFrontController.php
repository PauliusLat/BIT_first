<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlbumFrontController
{
    public function index()
    {
        return View::render('gallery.all-album');
    }

    public function create()
    {
    
        $albumData  = (AlbumPost::all())->all();
       
        $output = View::adminRender('album.album',  ["data" => $albumData]);
        $response = new JsonResponse(['html' => $output]);

        return $response;
    }
}


<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlbumFrontController
{
    public function index()
    {
        return View::render('gallery.all-album');
    }

    public function create(AlbumPost $album)
    {
        $allImages = [];
        $albumData  = (AlbumPost::all())->all();
        foreach ($albumData as $data) {
            $allImages[] = $data->album_title;
            foreach ($data->attachments as $key => $img) {
                $allImages[] = $img->getUrl();
            }
        }

        $output = View::adminRender('album.album',  ["album" => $allImages]);
        $response = new JsonResponse(['html' => $output]);

        return $response;
    }

    public function indexAdmin(Request $request)
    {
        $allImages = [];
        $albumData  = (AlbumPost::all())->all();
        // echo '<pre>';
        // var_dump($albumData);
        foreach ($albumData as $data) {
            $allImages[] = $data->album_title;
            foreach ($data->attachments as $key => $img) {
                // echo '<pre>';
                // var_dump($img->getUrl());
                $allImages[] = $img->getUrl();
            }
        }
        echo '<pre>';
        var_dump($allImages);
        // return View::adminRender('album.album', ["album" => $allImages]);
        // $response = new Response;
        // $output = View::adminRender('album.album');
        // $response->prepare($request);
        // $response = new JsonResponse(['html' => $output]);
// var_dump($output);
        // return $response;
        return View::adminRender('album.album', ["album" => $allImages]);
    }
}

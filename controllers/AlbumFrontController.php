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

        $output = View::adminRender('album.album',  ["album" => $albumData]);
        $response = new JsonResponse(['html' => $output]);

        return $response;
    }
}

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
        $albumName = [];
        $albumData  = (AlbumPost::all())->all();
        foreach ($albumData as $data) {
            $albumName[] = $data->album_title;
            foreach ($data->attachments as $key => $img) {
                $allImages[] = $img->getUrl();
            }
        }
        $albumName = str_replace(' ', '-', $albumName);
        $output = View::adminRender('album.album',  ["album" => $albumName]);
        $response = new JsonResponse(['html' => $output]);

        return $response;
    }
}

<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\View;
use BIT\app\Attachment;
use BIT\models\NewsPost;
use BIT\models\AlbumPost;
use BIT\app\Category;
use BIT\app\Tag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class TagController {

    public function index()
    {
        return View::adminRender('tag.maintag');
    }

    public function create(Request $request)
    {
        $tag = new Tag;
        $tags = $tag->getAllTags(); 
        $output = View::adminRender('tag.tag',  ["tags" => $tags]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function store(Request $requestJson){
        // $data = $requestJson->getContent();
         _dc($requestJson);

        // $response = new Response;
		$request = $this->decodeRequest($requestJson);
        // // _dc($request);
        $tag = new Tag;
        $name = $request->request->get('name');
        _dc($name);

        $newTag = $tag->addTagtoDB($name);
        _dc($newTag);

       
        // $response = new Response;
        // $response->prepare($request);
        // wp_redirect('http://localhost:8080/wordpress/wp-admin/admin.php?page=category');
        // exit;
        return $response = new Response;
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

    public function decodeRequest($request) {

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}

}
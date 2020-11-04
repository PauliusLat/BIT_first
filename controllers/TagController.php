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
		$request = $this->decodeRequest($requestJson);
        $tag = new Tag;
        $name = $request->request->get('tag_name');
        $slug = $request->request->get('tag_slug');
        $description = $request->request->get('tag_description');
        $newTag = $tag->addTagtoDB($name, $slug, $description);
        return $response = new Response;
    }  

    public function edit(Request $requestJson){
        $request = $this->decodeRequest($requestJson);
        $tag = new Tag;
        $id = $request->request->get('editID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $tag = $tag->getTag($id, $taxonomy_type);
        $output = View::adminRender('tag.edit',  ['tag' => $tag]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function update(Request $requestJson)
    {
        $tag = new Tag;
        $request = $this->decodeRequest($requestJson);
        $name = $request->request->get('tag_name');
        $slug = $request->request->get('tag_slug');
        $description = $request->request->get('tag_description');
        $id = $request->request->get('updateId');
        $updateTag = $tag->updateTag($id, $name, $slug, $description);
        $tags = $tag->getAllTags(); 
        $output = View::adminRender('tag.tag',  ["tags" => $tags]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function destroy(Request $requestJson){

        $tag = new Tag;
        $request = $this->decodeRequest($requestJson);   
        $tags = $tag->getAllTags(); 
        $id = $request->request->get('deleteID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $tag->deleteTagFromDb($id, $taxonomy_type);
        return $response = new Response;
        $response->prepare($request);
        return $response;

    }

    public function decodeRequest($request) {
		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}

}
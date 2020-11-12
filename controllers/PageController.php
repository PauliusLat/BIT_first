<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\Page;
use BIT\app\View;
use BIT\app\Attachment;
use BIT\models\NewsPost;
use BIT\models\AlbumPost;
use BIT\app\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class PageController {

    public function index()
    {
        return View::adminRender('page.mainpage');
    }

    public function create(Request $request)
    {
        $pages = Page::all()->all(); 
        $output = View::adminRender('page.page',["pages" => $pages]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function store(Request $requestJson){
		$request = $this->decodeRequest($requestJson);
        $page = new Page;
        $name = $request->request->get('page_title');
        // $slug = $request->request->get('page_slug');
        $post = $request->request->get('post_type');
        $page->setRoute($post);
        $page->setTitle($name);
        //update nenaudoti sito metodo
        $page->save();
        return $response = new Response;
    }  

    public function edit(Request $requestJson, Page $page){

        $request = $this->decodeRequest($requestJson);
        $id = $request->request->get('editID');
        $output = View::adminRender('page.edit',  ['page' => $page]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function update(Request $requestJson, Page $page){
       
        $request = $this->decodeRequest($requestJson);
        $page->post_title = $request->request->get('page_title');
        $page->save();
        $pages = Page::all()->all();  
        $output = View::adminRender('page.page',  ["pages" => $pages]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function destroy(Request $requestJson, Page $page){

        $request = $this->decodeRequest($requestJson);   
        $pages = Page::all()->all();  
        $page->delete();
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
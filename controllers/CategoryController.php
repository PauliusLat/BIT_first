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


class CategoryController {

    public function index()
    {
        return View::adminRender('category.maincat');
    }

    public function create(Request $request)
    {
        $category = new Category;
        $categories = array_reverse($category->flattenArray($category->getTaxonomyHierarchyArr('maincat')));
        $output = View::adminRender('category.category',  ["categories" => $categories]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function store(Request $requestJson){
		$request = $this->decodeRequest($requestJson);
        $category = new Category;
        $name = $request->request->get('cat_name');
        $slug = $request->request->get('cat_slug');
        $description = $request->request->get('cat_description');

        if($request->request->get('cat_parent')){
            $parent_id = $request->request->get('cat_parent');
        }else {
            $parent_id = 0;
        }
        // $parent = $request->request->get('cat_parent');
        $newCat = $category->addCat($name, $parent_id, $slug,  $description);
        return $response = new Response;
    }  

    public function edit(Request $requestJson){
        $request = $this->decodeRequest($requestJson);
        $category = new Category;
        $id = $request->request->get('editID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $category = $category->getCat($id, $taxonomy_type);
        $output = View::adminRender('category.edit',  ['category' => $category]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function update(Request $requestJson)
    {
        $category = new Category;
        $request = $this->decodeRequest($requestJson);
        $name = $request->request->get('cat_name');
        $slug = $request->request->get('cat_slug');
        $description = $request->request->get('cat_description');
        $id = $request->request->get('updateId');
        $updateCat = $category->updateCat($id, $name, $slug, $description);
        $categories = $category->getAllCats(); 
        $output = View::adminRender('category.category',  ["categories" => $categories]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function destroy(Request $requestJson){

        $category = new Category;
        $request = $this->decodeRequest($requestJson);   
        $categories = $category->getAllCats();
        $id = $request->request->get('deleteID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $category->deleteCatFromDb($id, $taxonomy_type);
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
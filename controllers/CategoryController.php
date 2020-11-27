<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\View;
use BIT\app\Attachment;
use BIT\models\NewsPost;
use BIT\models\AlbumPost;
use BIT\app\Category;
use BIT\app\Session;
use BIT\app\Tag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class CategoryController
{

    public function index()
    {
        return View::adminRender('category.maincat');
    }

    public function create(Request $request, Session $session)
    {
        $category = new Category;
        $categories = array_reverse($category->flattenArray($category->getTaxonomyHierarchyArr()));
        $message = $session->get('message');
        $output = View::adminRender('category.category',  ['categories' => $categories, 'message' => $message]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function store(Request $request)
    {
        //     $request = $this->decodeRequest($requestJson);
        $category = new Category;
        $name = $request->request->get('title');
        $slug = $request->request->get('slug');
        $description = $request->request->get('content');

        if ($request->request->get('cat_parent')) {
            $parent_id = $request->request->get('cat_parent');
        } else {
            $parent_id = 0;
        }

        $category->addCat($name, $parent_id, $slug,  $description);

        if ($request->files->get('image')) {
            // _dc($request->files->get('image'));
            $uploads_dir = wp_upload_dir();
            $target_file = basename($_FILES["picture"]["name"]); //nuotrauka
            move_uploaded_file($_FILES["picture"]["tmp_name"], "$uploads_dir/$target_file"); //nuotrauka
            $picture = $request->files->get('picture')->getClientOriginalName();
            $catID =  $category->getTermId($name);
            $category->addImageToCat($catID, "my_term_key", $picture);
        }
        return new Response;
    }

    public function edit(Request $requestJson)
    {
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

    public function destroy(Request $requestJson)
    {

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

    public function decodeRequest($request)
    {
        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : array());
        }

        return $request;
    }
}

<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\View;
// use BIT\app\Attachment;
// use BIT\models\NewsPost;
// use BIT\models\AlbumPost;
use BIT\app\Category;
use BIT\app\Session;
// use BIT\app\Tag;
use BIT\app\Page;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;

require PLUGIN_DIR_PATH . '/../../../wp-load.php';
require_once(ABSPATH . 'wp-admin/includes/image.php');


class CategoryController
{

    public function index()
    {
        return View::adminRender('category.maincat');
    }

    public function create(Session $session)
    {
        $category = new Category;
        $categories = array_reverse($category->flattenArray($category->getTaxonomyHierarchyArr()));
        $message = $session->get('alert_message');
        $success_message = $session->get('success_message');
        $uploads_dir = wp_upload_dir();
        $path = $uploads_dir['url'] . '/';
        $url = $path;
        $output = View::adminRender('category.category',  ['categories' => $categories, 'message' => $message, 'success_message' => $success_message, 'url' => $url]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $request, Session $session)
    {
        $name = $request->request->get('title');
        $slug = $request->request->get('slug');
        $description = $request->request->get('content');
        if ($request->request->get('cat_parent')) {
            $parent_id = $request->request->get('cat_parent');
        } else {
            $parent_id = 0;
        }

        $categ = get_term_by('name', $name, 'maincat');
        if ($categ->name == $name) {
            $session->flash('alert_message', 'tokiu pavadinimu kategorija jau sukurta');
            $categ->name != $name;
        } else {
            $session->flash('success_message', 'kategorija sėkmingai sukurta');
        }

        $createPage = $request->request->get('page');
        if ($createPage == 1) {
            $page = new Page();
            $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
            $pageState = [];
            foreach ($page_state as $state => $value) {
                if ($state == 'category' || $state == 'site' || $state == 'system') {
                    array_push($pageState, $value);
                }
            }
            $page->pageState = $pageState;
            $page->setRoute('kategorija');
            $page->setTitle($name);
            $page->save();
        }

        $category = new Category;
        $category->addCat($name, $parent_id, $slug,  $description);
        $catID =  $category->getCatId($name);
        $category->addPageToCat($catID, 'page', $page->ID);

        if ($request->files->get('image')) {
            $uploads_dir = wp_upload_dir();
            $path = $uploads_dir['path'] . '/';
            $target_file = basename($_FILES['image']['name']);
            move_uploaded_file($_FILES["image"]["tmp_name"], "$path/$target_file");
            $picture = $request->files->get('image')->getClientOriginalName();
            $catID =  $category->getCatId($name);
            $category->addImageToCat($catID, "image", $picture);
        }

        return new JsonResponse;
    }

    public function edit(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $category = new Category;
        $id = $request->request->get('editID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $category = $category->getCat($id, $taxonomy_type);
        $output = View::adminRender('category.edit',  ['category' => $category]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson)
    {
        $category = new Category;
        $request = $this->decodeRequest($requestJson);
        $name = $request->request->get('cat_name');
        $slug = $request->request->get('cat_slug');
        $description = $request->request->get('cat_description');
        $id = $request->request->get('updateId');
        $category->updateCat($id, $name, $slug, $description);
        $categories = $category->getAllCats();
        $output = View::adminRender('category.category',  ["categories" => $categories]);
        return new JsonResponse(['html' => $output]);
    }

    public function destroy(Request $requestJson)
    {
        $category = new Category;
        $request = $this->decodeRequest($requestJson);
        $category->getAllCats();
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

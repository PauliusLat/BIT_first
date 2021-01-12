<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\View;
use BIT\app\Attachment;
// use BIT\models\NewsPost;
// use BIT\models\AlbumPost;
use BIT\app\Category;
use BIT\app\Session;
use BIT\app\Pagination;
use BIT\app\Cookie;
use BIT\app\Transient;
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

    public function create(Request $requestJson, Session $session)

    {
        $request = $this->decodeRequest($requestJson);

        if ($request->request->get('pageSelected') != null) {
            $limit = $request->request->get('pageSelected');
        } else {
            $limit = 5;
        }

        if (is_int($request->request->get('pages')) || strlen($request->request->get('hash')) != 0) {
            $number = $request->request->get('hash');
        } else {
            $number = 1;
        }

        $total = wp_count_terms('maincat', ['hide_empty' => false]);
        $pagination = new Pagination($limit, $number, $total);
        $category = new Category;
        $categories = array_reverse($category->flattenArray($category->getTaxonomyHierarchyArr($limit, $pagination->offset)));

        if ($session->get('alert_message') != null) {
            $message = $session->get('alert_message');
        } else if ($session->get('success_message') != null) {
            $success_message = $session->get('success_message');
        } else {
            $message = "";
        }

        $output = View::adminRender('category.category',  ['nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage, 'categories' => $categories, 'message' => $message,  'success_message' => $success_message, 'category' => $category]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $request)

    {
        $session = App::start()->getService('session');
        $category = new Category;
        $name = $request->request->get('title');
        $slug = $request->request->get('slug');
        $description = $request->request->get('content');
        if ($request->request->get('cat_parent')) {
            $parent_id = $request->request->get('cat_parent');
        } else {
            $parent_id = 0;
        }

        //check if category ex 
        $categ = get_term_by('name', $name, 'maincat');
        if ($name == '') {
            $session->flash('alert_message', 'įrašykite kategorijos pavadinimą');
        } elseif ($name == $categ->name && $name != '') {
            $session->flash('alert_message', 'tokiu pavadinimu kategorija jau sukurta');
        } else {
            //add category to db and get cat ID
            $session->flash('success_message', 'kategorija sėkmingai sukurta');
            $term_id = $category->addCat($name, $parent_id, $slug,  $description);
        }

        $createPage = $request->request->get('page');
        if ($createPage == '0' && $term_id != null) {
            $category->addPageToCat($name, $term_id, 'page');
        }


        if ($request->files->get('image')) {
            $file = $request->files->get('image');
            $image = new Attachment();
            $image->save($file);
            $category->addImageToCat($term_id, "image", $image->ID);
        }
        return new JsonResponse;
    }

    public function edit(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $id = $request->request->get('editID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $cat = new Category;
        $category = $cat->getCat($id, $taxonomy_type);
        $catImage = $cat->getCatImage($category->term_id);
        $urlImg = $catImage->getUrl();
        $parent = $cat->getCatParent($id);
        $pageLink = $cat->getCatPageLink($category->term_id);
        $output = View::adminRender('category.edit',  ['category' => $category, 'urlImg' =>  $urlImg, 'pageLink' => $pageLink, 'catImage' => $catImage, 'parent' => $parent]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Session $session)
    {
        $request = $this->decodeRequest($requestJson);
        $name = $request->request->get('cat_name');
        $slug = $request->request->get('cat_slug');
        $description = $request->request->get('cat_description');
        if ($request->request->get('cat_parent')) {
            $parent_id = $request->request->get('cat_parent');
        } else {
            $parent_id = 0;
        }
        $id = $request->request->get('updateId');
        //update cat and cat page
        $category = new Category;
        $category->updateCat($id, $name, $slug, $description, $parent_id);
        if ($request->files->get('image')) {
            if ($category->getCatImage($id)) {
                $category->deleteCatImage($id);
            }

            $file = $request->files->get('image');
            $image = new Attachment();
            // $image->setAlt($altText);
            // $image->setCaption($imgTitle);
            $image->save($file);
            $category->addImageToCat($id, "image", $image->ID);
        }
        // $session->flash('success_message', 'kategorija sėkmingai pakoreguota');
        return new Response;
    }

    public function destroy(Request $requestJson, Session $session)
    {
        $request = $this->decodeRequest($requestJson);
        $id = $request->request->get('deleteID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        //delete cat and cat page
        Category::deleteCatFromDb($id, $taxonomy_type);
        $session->flash('success_message', 'kategorija sėkmingai ištrinta');
        return new Response;
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

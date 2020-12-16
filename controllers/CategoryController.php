<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\View;
use BIT\app\Attachment;
// use BIT\models\NewsPost;
// use BIT\models\AlbumPost;
use BIT\app\Category;
use BIT\app\Session;
use BIT\app\Pagination;
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

        $pagination = new Pagination($limit, $number);
        $category = new Category;
        $categories = array_reverse($category->flattenArray($category->getTaxonomyHierarchyArr($limit, $pagination->offset)));
        // foreach ($categories as $cat) {
        //     $category = new Category;
        //     $catImage = $category->getCatImage($cat->term_id);
        //     $urlImg = $catImage->getUrl();
        //     $pageLink =  $category->getCatPageLink($cat->term_id);
        // }
        $message = $session->get('alert_message');
        $success_message = $session->get('success_message');
        // $uploads_dir = wp_upload_dir();
        // $url = $uploads_dir['url'] . '/';
        $output = View::adminRender('category.category',  ['nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage, 'categories' => $categories, 'message' => $message, 'success_message' => $success_message, 'category' => $category]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $request, Session $session)
    {
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
        if ($categ->name == $name) {
            $session->flash('alert_message', 'tokiu pavadinimu kategorija jau sukurta');
            $categ->name != $name;
        } else {
            //add category to db and get cat ID
            $term_id = $category->addCat($name, $parent_id, $slug,  $description);
            $session->flash('success_message', 'kategorija sėkmingai sukurta');
        }

        // create category page if selected
        $createPage = $request->request->get('page');
        if ($createPage == 1) {
            $category->addPageToCat($name, $term_id, 'page');
        }

        //add category image
        if ($request->files->get('image')) {
            $file = $request->files->get('image');
            $image = new Attachment();

            // $image->setAlt($altText);
            // $image->setCaption($imgTitle);
            $image->save($file);
            _dc($image);
            // $uploads_dir = wp_upload_dir();
            // $path = $uploads_dir['path'] . '/';
            // $target_file = basename($_FILES['image']['name']);
            // move_uploaded_file($_FILES["image"]["tmp_name"], "$path/$target_file");
            // $picture = $request->files->get('image')->getClientOriginalName();
            // $catID =  $category->getCatId($name);
            $category->addImageToCat($term_id, "image", $image->ID);
        }
        return new JsonResponse;
    }

    public function edit(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $id = $request->request->get('editID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $category = Category::getCat($id, $taxonomy_type);
        $output = View::adminRender('category.edit',  ['category' => $category]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Session $session)
    {
        $request = $this->decodeRequest($requestJson);
        $name = $request->request->get('cat_name');
        $slug = $request->request->get('cat_slug');
        $description = $request->request->get('cat_description');
        $id = $request->request->get('updateId');
        //update cat and cat page
        Category::updateCat($id, $name, $slug, $description);
        $session->flash('success_message', 'kategorija sėkmingai pakoreguota');
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

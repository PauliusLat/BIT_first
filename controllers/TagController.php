<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\View;
use BIT\app\Attachment;
use BIT\models\NewsPost;
use BIT\models\AlbumPost;
use BIT\app\Category;
use BIT\app\Tag;
use BIT\app\Pagination;
use BIT\app\Session;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class TagController
{

    public function index()
    {
        return View::adminRender('tag.maintag');
    }

    public function create(Request $request)
    {

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
        // $offset = ($number - 1)  * $limit;
        // $total = wp_count_terms('hashtag', ['hide_empty' => false]);
        // $pages = ceil($total / $limit);
        // if ($number < $pages) {
        //     $nextpage = $number + 1;
        // } else {
        //     $nextpage = $number;
        // }
        // if ($number > 1) {
        //     $prevpage = $number - 1;
        // } else {
        //     $prevpage = $number;
        // }
        // $lastpage = $pages;
        // $firstpage = 1;

        // $tag = new Tag;
        // $pageArr = $tag->setPage($limit, $number);
        // foreach ($pageArr as $key => $value) {
        //     if ($key == 'offset') {
        //         $offset = $value;
        //     }
        //     if ($key == 'nextpage') {
        //         $nextpage = $value;
        //     }
        //     if ($key == 'prevpage') {
        //         $prevpage = $value;
        //     }
        //     if ($key == 'pages') {
        //         $pages = $value;
        //     }
        //     if ($key == 'lastpage') {
        //         $lastpage = $value;
        //     }
        //     if ($key == 'firstpage') {
        //         $firstpage = $value;
        //     }
        // }

        $pagination = new Pagination($limit, $number);
        $tags = get_terms('hashtag', array('number' => $limit, 'hide_empty' => false, 'offset' => $pagination->offset));
        $output = View::adminRender('tag.tag',  ['tags' => $tags, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function store(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $tag = new Tag;
        $name = $request->request->get('tag_name');
        $slug = $request->request->get('tag_slug');
        $description = $request->request->get('tag_description');
        $tag->addTagtoDB($name, $slug, $description);
        return new Response;
    }

    public function edit(Request $requestJson)
    {
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
        $tag->updateTag($id, $name, $slug, $description);
        $tags = $tag->getAllTags();
        $output = View::adminRender('tag.tag',  ["tags" => $tags]);
        $response = new JsonResponse(['html' => $output]);
        return $response;
    }

    public function destroy(Request $request)
    {

        $tag = new Tag;
        $tags = $tag->getAllTags();
        $id = $request->request->get('deleteID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $tag->deleteTagFromDb($id, $taxonomy_type);
        return $response = new Response;
        $response->prepare($request);
        echo "<pre>";
        var_dump($response);
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

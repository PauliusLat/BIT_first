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

        $total = wp_count_terms('hashtag', ['hide_empty' => false]);
        $pagination = new Pagination($limit, $number, $total);
        $tags = get_terms('hashtag', array('number' => $limit, 'hide_empty' => false, 'offset' => $pagination->offset));
        $output = View::adminRender('tag.tag',  ['tags' => $tags, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $request)
    {
        $tag = new Tag;
        $name = $request->request->get('tag_name');
        $slug = $request->request->get('tag_slug');
        $description = $request->request->get('tag_description');
        $tag->addTagtoDB($name, $slug, $description);
        return new Response;
    }

    public function edit(Request $request)
    {
        $id = $request->request->get('editID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        $tag = Tag::getTag($id, $taxonomy_type);
        $output = View::adminRender('tag.edit',  ['tag' => $tag]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $request)
    {
        $name = $request->request->get('tag_name');
        $slug = $request->request->get('tag_slug');
        $description = $request->request->get('tag_description');
        $id = $request->request->get('updateId');
        Tag::updateTag($id, $name, $slug, $description);
        return new Response;
    }

    public function destroy(Request $request)
    {
        $id = $request->request->get('deleteID');
        $taxonomy_type = $request->request->get('taxonomy_type');
        Tag::deleteTagFromDb($id, $taxonomy_type);
        return new Response;
    }
}

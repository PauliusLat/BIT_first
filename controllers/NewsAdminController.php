<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\app\Attachment;
use BIT\app\Query;
use BIT\app\Page;
use BIT\models\NewsPost;
use BIT\app\RequestId;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;


class NewsAdminController
{

    public function index()
    {
        return View::adminRender('news.index');
    }

    public function create(Request $request)
    {
        return View::adminRender('news.create');
    }

    public function store(Request $request)
    {
        $title = $request->request->get('title');
        $content = $request->request->get('content');
        $altText = $request->request->get('altText');
        $imgTitle = $request->request->get('imageTitle');
        $file = $request->files->get('image');

        $page = new Page();
        $page->pageState = 'News Page';
        $page->setRoute('showNews');
        $page->setTitle($title);
        $page->save();

        $news = new NewsPost();
        $news->post_parent = $page->ID;
        $news->post_title = $title;
        $news->news_content = $content;
        $news->save();

        $image = new Attachment();
        $image->setAlt($altText);
        $image->setCaption($imgTitle);
        $image->save($file, $news->ID);

        return $response = new Response();
    }


    public function show(Request $request)
    {
        $id = $request->request->get('id');
        $news = NewsPost::get($id);
    }

    public function edit()
    {
        return View::adminRender('news.edit');
    }

    public function apiEditPost(Request $request, NewsPost $newsPost)
    {
        $allNews = NewsPost::all()->all();
        $output = View::adminRender('news.renderEdit', ['html' =>  $allNews]);
        $response = new JsonResponse(['html' =>  $output]);
        return $response;
    }

    public function update(Request $request, NewsPost $newsPost)
    {
        $newsPost->news_content = $request->get('news-content');

        $newsPost->save();
        $newsPost;
        $news = NewsPost::all();
        $response = new Response;
        $response->prepare($request);
        $response->setContent(json_encode(['list' => 'hello']));
        // $response->setContent(json_encode(['list' => View::adminRender('news.list', ['news' => $news])]));
        return $response;
    }

    public function destroy(NewsPost $newsPost)
    {
        $newsPost->delete();
        return new Response;
    }

    protected function decodeRequest($request)
    {

        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : array());
        }

        return $request;
    }
}

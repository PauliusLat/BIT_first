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

    public function createPost()
    {


        // $html = require '/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/views/news/list.php';
        // $news = NewsPost::all()->all();
        $html = View::adminRender('news.post');
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

        $page->setRoute('showNews',$news->ID );
        $page->save();


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
        // return View::adminRender('news.renderEdit', ['html' =>  $newsPost]);
        
    }

    public function update(Request $request)
    {
        $news = NewsPost::get($request->request->get('id'));
        $file = $request->files->get('image');
        $image = null;
        foreach($news->attachments as $att) {
            $image = $att;
        }

        $news->post_title = $request->request->get('title');
        $news->news_content = $request->request->get('content');
        $news->save();
        
        $image->setAlt($request->request->get('altText'));
        $image->setCaption($request->request->get('imageTitle'));
        $image->save($file, $news->ID);
        

        return $response = new Response();

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

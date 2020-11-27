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

    public function edit(Request $request, NewsPost $newsPost)
    {
        $allNews = NewsPost::all()->all();
        // echo '<pre>';
        // var_dump ($allNews);
        // foreach (NewsPost::all()->all() as $news) {
            // $pageLink1 = Page::get($news->ID)->getLink();
        //     $content2 = $news->news_content;
        //     $title3 = $news->post_title;
        //     $date4 = $news->post_date;

        //     $allImages = $news->attachments;

        //     foreach ($allImages as $image) {
        //         $url5 = $image->getUrl();
        //         $altText6 = $image->getAlt();
        //     }
        // }
        $output = View::adminRender('news.renderEdit', ['html' =>  $allNews]);
        $response = new JsonResponse(['html' =>  $output]);
        return $response;
        // return View::adminRender('news.edit', ['html' =>  $allNews]);
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

<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\Page;
use BIT\app\View;
use BIT\models\NewsPost;
use BIT\app\Category;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class NewsAdminController
{

	// public function index()
	// {
	// 	return View::adminRender('news.index');
	// }

	public function create()
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

		//add category tp post
		$cat = $request->request->get('category');
		$catInt = array_map('intval', explode(',', $cat));
		$news->attachCat($catInt);

		//add tag to post
		$tag = $request->request->get('tag');
		if (isset($tag)) {
			$tagsArr = explode('#', $tag);
			$news->addTag($tagsArr);
		}

		$page->setRoute('showNews', $news->ID);
		$page->save();

		$image = new Attachment();
		$image->setAlt($altText);
		$image->setCaption($imgTitle);
		$image->save($file, $news->ID);
		return new Response();
	}

	public function show(Request $request)
	{
		$id = $request->request->get('id');
		$news = NewsPost::get($id);
	}
	public function edit(NewsPost $news)
	{
		$postCats = $news->getCatsId($news->ID);
		$postTags = $news->getTags($news->ID);

		return View::adminRender('news.edit', ['data' => $news, 'postCats' => $postCats, 'postTags' => $postTags,]);
	}

	public function list()
	{
		return View::adminRender('news.list');
	}

	public function listPost(Request $request)
	{
		$uri = admin_url('admin.php?page=0edit');
		$allNews = NewsPost::all()->all();
		$output = View::adminRender('news.renderList', ['html' => $allNews,  'uri' => $uri]);
		$response = new JsonResponse(['html' => $output]);
		return $response;
	}

	public function update(Request $request)
	{
		$news = NewsPost::get($request->request->get('id'));
		$file = $request->files->get('image');
		$image = null;
		// var_dump($request->request->get('id'));
		if ($attachments = $news->attachments) {
			foreach ($attachments as $att) {
				$image = $att;
			}
		} elseif (!$attachments && $file) {
			$image = new Attachment;
		}
		$news->post_title = $request->request->get('title');
		$news->news_content = $request->request->get('content');
		$news->save();

		//update post category
		$cat = $request->request->get('category');
		$catInt = array_map('intval', explode(',', $cat));
		$news->attachCat($catInt);

		//update post tag
		$tag = $request->request->get('tag');
		$tagInt = array_map('intval', explode(',', $tag));
		$news->attachTag($tagInt);


		$image->setAlt($request->request->get('altText'));
		$image->setCaption($request->request->get('imageTitle'));
	
		$image->save($file, $news->ID);

		return new Response();
	}

	public function destroy(NewsPost $newsPost)
	{
		$newsPost->delete();
		$page = Page::get($newsPost->post_parent);
		$page->delete(true);
		foreach ($newsPost->attachments as $img) {
			$img->delete();
		}
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

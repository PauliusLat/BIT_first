<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\View;
use BIT\app\Page;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GalleryAdminController
{

	public function index()
	{
		$albums = (AlbumPost::all())->all();
		return View::adminRender('gallery.list', ['albums' => $albums]);
	}

	public function create(Request $request, AlbumPost $album)
	{
		$data = (AlbumPost::all())->all();
		$response = new Response;
		$output = View::render('gallery.all-images');
		$response->prepare($request);
		$response = new JsonResponse(['html' => $output, 'Images' => $data]);
		return $response;
	}

	public function edit(AlbumPost $album)
	{
		return View::adminRender('gallery.edit', ['data' => $album]);
	}

	public function update(Request $request, AlbumPost $albumPost)
	{


		$albumPost->post_title = $request->request->get('title');
		$albumPost->profileImgId = $request->request->get('profileImgID');
		$albumPost->save();
	}
	public function deleteAttachment(Attachment $attachment)
	{
		$attachment->delete();
	}

	public function delete(AlbumPost $albumPost)
	{
		$albumPost->delete();
		$page = Page::get($albumPost->post_parent);
		$page->delete(true);
		foreach ($albumPost->attachments as $img) {
			$img->delete();
		}
		return new Response;
	}

	public function attDelete(Request $request, Attachment $attachment)
	{

		if ($attachment->ID) {
			$attachment->delete();
		};
		$album = AlbumPost::get($request->request->get('album'));
		header("Location:" . get_admin_url() . 'admin.php?page=galerija-0edit&id=' . $album->ID);
		die;
	}
}

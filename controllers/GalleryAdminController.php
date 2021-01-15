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
		return View::adminRender('gallery.list');
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

	public function renderList()
	{
		$uri = admin_url('admin.php?page=galerija-0edit');
		$allAlbums = AlbumPost::all()->all();
		$output = View::adminRender('gallery.renderList', ['html' => $allAlbums,  'uri' => $uri]);
		$response = new JsonResponse(['html' => $output]);
		return $response;
	}

	public function edit(AlbumPost $album)
	{
		return View::adminRender('gallery.edit', ['data' => $album]);
	}

	public function update(Request $request, AlbumPost $album){
		$album->post_title = $request->request->get('title');
		$album->profileImgId = $request->request->get('prifileImgID');
		$album->save();
	}
	public function deleteAttachment(Attachment $attachment){
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

	// public function store(Request $request, AlbumPost $album) {

	// 	foreach ($request->request as $key => $a) {
	// 		if ($key == "album") {
	// 			$album->album_title = $a;
	// 			$album->save();
	// 		}
	// 	}
	// 	var_dump($request->file);
	// 	$count = 0;
	// 	$tags = [];
	// 	foreach ($request->request as $value) {
	// 		$tags[] = trim($value);
	// 	}
	// 	foreach ($request->files->all() as $key => $filesArr) {
	// 		if ($filesArr instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
	// 			$count++;
	// 			$image = new Attachment();
	// 			foreach ($tags as $key1 => $tag) {
	// 				if ($key1 + 1 == $count) {
	// 					// var_dump($image);
	// 					// $image->save($request->files->all()[$key], $album->ID);
	// 					// $image->addTag($tags[$key1]);
	// 					// $image->save();
	// 				}
	// 			}
	// 		}
	// 	}
	// 	// } elseif (is_array($filesArr)) {
	// 	// 	foreach ($filesArr as $file) {
	// 	// 		$image = new Attachment();
	// 	//$image->save($file);
	// 	// $image->addTag('pridedamas tag');
	// 	// $image->save();
	// 	// }
	// 	//$image->save($file, $post_id);





	private function decodeRequest($request)
	{

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}
}

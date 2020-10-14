<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class GalleryAdminController
{
	public function __construct()
	{

		// 		$attachment = new Attachment();
		// $attachment->save($request, $post_parent_id(optional)); -sukuria nauja, arba update’ina esanti.
		// $attachment->delete();
		// $attachment->getURL();
		// $attachment->geAttachmentDetails();
	}

	public function adminIndex()
	{
		return View::adminRender('gallery.galerija');
	}

	public function create(Request $request, AlbumPost $album)
	{
		echo '<pre>';
		// var_dump($request->request);
		// _dc($request);
		$tags = [];
		foreach ($request->request as $value) {
			$tags[] = trim($value);
		}
		var_dump($tags);
		foreach ($request->files->all() as $key => $filesArr) {
			if ($filesArr instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
				$image = new Attachment();

				foreach ($tags as $key1 => $tag) {
					if ($key == $key) {
						$image->save($request->files->all()[$key]);
						$image->addTag($tags[$key1]);
						$image->save();
					}
				}
				//	$image->save($filesArr);

			} elseif (is_array($filesArr)) {
				foreach ($filesArr as $file) {
					$image = new Attachment();
					//$image->save($file);
					// $image->addTag('pridedamas tag');
					// $image->save();
				}
			}
		}
		$data = (Attachment::all())->all();
		// var_dump($data);
		// post_name


		/** Example usage:
		 * $album = new AlbumPost;
		 * $album->save();
		 * $album->addCat('cat1', 'maincat'); or $album->addCat(['cat1', 'cat2', '........'], 'maincat', ID tevines kategorijos));*/


		// $album->save();
		// $album->addTag('pridedamas tag');
		// $album->getAllTags();
		// $album->getTags('maincat')->sortBy('count', 'desc');

		return new Response();
	}

	public function render()
	{

		$data = (Attachment::all())->all();
		foreach ($data as $img) {
			$allImages = $img->getUrl();
		}
	}

	// private function getFilesFromRequest(Request $request){
	// 	foreach($request->files->all() as $filesArr) {
	// 		if($filesArr instanceof \Symfony\Component\HttpFoundation\File\UploadedFile){
	// 			$image = new Attachment();
	// 			$image->save($filesArr);
	// 		}elseif(is_array($filesArr)){
	// 			foreach ($filesArr as $file) {
	// 				$image = new Attachment();
	// 				$image->save($file);
	// 			}
	// 		}
	// 	}
	// }

	private function decodeRequest($request)
	{

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}
}

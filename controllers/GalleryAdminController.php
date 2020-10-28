<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GalleryAdminController {
	public function __construct() {

		// 		$attachment = new Attachment();
		// $attachment->save($request, $post_parent_id(optional)); -sukuria nauja, arba update’ina esanti.
		// $attachment->delete();
		// $attachment->getURL();
		// $attachment->geAttachmentDetails();
	}

	public function adminIndex() {
		return View::adminRender('gallery.galerija');
	}

	public function store(Request $request, AlbumPost $album) {
		foreach ($request->request as $key => $a) {
			if ($key == "album") {
				$album->album_title = $a;
				$album->save();
			}
		}

		$count = 0;
		$tags = [];
		foreach ($request->request as $value) {
			$tags[] = trim($value);
		}
		var_dump($request);
		foreach ($request->files->all() as $key => $filesArr) {
			if ($filesArr instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
				$count++;
				$image = new Attachment();
				foreach ($tags as $key1 => $tag) {
					if ($key1 + 1 == $count) {
						// var_dump($image);
						// $image->save($request->files->all()[$key], $album->ID);
						// $image->addTag($tags[$key1]);
						// $image->save();
					}
				}
			}
		}
		// } elseif (is_array($filesArr)) {
		// 	foreach ($filesArr as $file) {
		// 		$image = new Attachment();
		//$image->save($file);
		// $image->addTag('pridedamas tag');
		// $image->save();
		// }
		//$image->save($file, $post_id);

		//AlbumPost::get($post_id)->attachments; grazina albuma

		// 	}
		// }
		// $data = (Attachment::all())->all();
		// $new = new Attachment();
		// $tg = $new->getAllTags();
		// var_dump($tg);
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

	public function create(Request $request, AlbumPost $album) {
		$data = (AlbumPost::all())->all();
		//AlbumPost::get($post_id)->attachments; grazina albuma
		// $allImages = [];
		// $data = (Attachment::all())->all();
		// foreach ($data as $img) {
		// 	$allImages = $img->getUrl();
		// }

		$response = new Response;
		$output = View::render('gallery.all-images');
		$response->prepare($request);
		$response = new JsonResponse(['html' => $output, 'Images' => $data]);

		return $response;
	}

	private function decodeRequest($request) {

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}
}

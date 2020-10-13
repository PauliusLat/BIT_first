<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CalendarFrontController {
	public function __construct() {

// 		$attachment = new Attachment();
		// $attachment->save($request, $post_parent_id(optional)); -sukuria nauja, arba update’ina esanti.
		// $attachment->delete();
		// $attachment->getURL();
		// $attachment->geAttachmentDetails();
	}

	public function index() {
		return View::render('calendar.kalendorius');
	}

	public function create(Request $request, AlbumPost $album) {

		foreach ($request->files->all() as $filesArr) {
			if ($filesArr instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
				$image = new Attachment();

				$image->save($filesArr);
			} elseif (is_array($filesArr)) {
				foreach ($filesArr as $file) {
					$image = new Attachment();
					$image->save($file);
				}
			}
		}

		// $album->save();
		// $album->addTag('pridedamas tag');
		// $album->getAllTags();
		// $album->getTags('maincat')->sortBy('count', 'desc');

		return new Response();

	}

	public function render() {

		// $data = (Atachment::all())->all();
		// foreach ($data as $img) {
		// 	$allImages = $img->getUrl();
		// }
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

	private function decodeRequest($request) {

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

		return $request;
	}

}
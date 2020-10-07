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

	public function create(Request $requestJson, AlbumPost $album) {
		$request = $this->decodeRequest($requestJson);
		// $album = AlbumPost::get($post_id);
		$image = new Attachment();
		// var_dump($request->files);
		// $image ->save($request);
		//  = $request->request->get('formData');
		
	//	$image->save($request, $album->ID);

		return $response = new Response;
	}

	public function decodeRequest($request){

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

        return $request;
	}

}

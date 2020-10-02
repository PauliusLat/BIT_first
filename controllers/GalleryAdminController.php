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

	// public function create(Request $request, AlbumPost $album) {

		// $album = AlbumPost::get($post_id);
		// $image = new Attachment();
		// $image->save($request, $album->ID);

	// 	return $response = new Response;
	// }
}


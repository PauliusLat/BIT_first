<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\Page;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GalleryFrontController
{
	public function uploadeIndex()
	{
		return View::render('gallery.uploade-images');
	}

	public function store(Request $request)
	{
		$title = $request->request->get('albumTitle');
		$files = $request->files->all()['image'];
		$profileImg = explode(',', $request->request->get('album'));
		$imgTags = explode(',', $request->request->get('tag'));

		if ($title && $files) {
			$page = new Page();
			$page->pageState = 'Album Page';
			$page->setRoute('show');
			$page->setTitle($title);
			$page->save();
			$album = new AlbumPost();
			$album->post_parent = $page->ID;
			$album->post_title = $title;
			$album->save();

			//add category tp post
			$cat = $request->request->get('category');
			$catInt = array_map('intval', explode(',', $cat));
			$album->attachCat($catInt);

			//add tag to post
			$tag = $request->request->get('tag');
			$tagInt = array_map('intval', explode(',', $tag));
			$album->attachTag($tagInt);

			$page->setRoute('showAlbum', $album->ID);
			$page->save();

			$firstProfile = true;
			for ($i = 0; $i < count($files); $i++) {
				if ($files[$i] instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
					$image = new Attachment();
					$image->save($files[$i], $album->ID);

					if (isset($imgTags[$i])) {
						$iTags = explode('# ', $imgTags[$i]);
						foreach ($iTags as $itag) {
							$image->addTag($itag);
						}
					}
					if ($firstProfile) {
						$album->profileImgId = $image->ID;
						$firstProfile = false;
						$album->save();
					}
					if (strcmp($profileImg[$i], 'true') === 0) {
						$album->profileImgId = $image->ID;
						$album->save();
					}
				}
			}
		}
		return new Response();
	}

	public function show(String $id)
	{
		$album = AlbumPost::get($id);
		$title = $album->post_title;
		$images = $album->attachments ?? [];
		return View::render('gallery.show', ["images" => $images, "title" => $title]);
	}

	private function decodeRequest($request)
	{
		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}
		return $request;
	}
}

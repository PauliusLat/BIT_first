<?php

namespace BIT\controllers;

use BIT\app\Attachment;
use BIT\app\View;
use BIT\app\Page;
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
		$title = $request->request->get('album');
		if ($title) {
			$page = new Page();
			$page->pageState = 'Album Page'; 
			$page->setRoute('all-album');
			$page->setTitle($title);
			$page->save();
			
			$album = new AlbumPost();
			$album->post_parent = $page->ID;
			$album->post_title = $title;
			$album->profileImgId = 
			$album->save();
		}
		
		$counter = 0;
		foreach ($request->files->all() as $index => $file) {

			if ($file instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
				$image = new Attachment();
				$image->save($file, $album->ID);
				if(isset($request->request->all()['tag'.$counter])){
					$tags = explode(' ', $request->request->all()['tag'.$counter]);
					foreach ($tags as $tag) {
						$image->addTag($tag);
					}
				}
	// _dc($image->getTags());
				if($request->request->all()['album'.$counter]){
					$album->profileImgId = $image->ID;
					$album->save();
				}
			}
			$counter++;
		}
		return new Response();
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

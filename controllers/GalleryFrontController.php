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
		$files = $request->files->all();
		if ($title && $files) {
			$page = new Page();
			$page->pageState = 'Album Page'; 
			$page->setRoute('all-album');
			$page->setTitle($title);
			$page->save();
			
			$album = new AlbumPost();
			$album->post_parent = $page->ID;
			$album->post_title = $title;
			$album->save();
			
			
			$counter = 0;
			$firstProfile = true;
			foreach ($files as $index => $file) {
				
				if ($file instanceof \Symfony\Component\HttpFoundation\File\UploadedFile) {
					$image = new Attachment();
					
					$image->save($file, $album->ID);
					if(isset($request->request->all()['tag'.$counter])){
						$tags = explode(' ', $request->request->all()['tag'.$counter]);
						foreach ($tags as $tag) {
							$image->addTag($tag);
						}
					}
					if($firstProfile){
						
						$album->profileImgId = $image->ID;
						$firstProfile = false;
						$album->save();
						
					}
					if(strcmp($request->request->all()['album'.$counter], 'true') === 0){
						$album->profileImgId = $image->ID;
						$album->save();
					}
				}
				$counter++;
			}
		}
			return new Response();
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

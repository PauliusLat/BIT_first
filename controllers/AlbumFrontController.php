<?php

namespace BIT\controllers;

use BIT\app\Page;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlbumFrontController {
	public function index() {
		return View::render('gallery.all-album');
	}

	public function create(AlbumPost $album) {

		$page = (Page::all())->all();
		foreach ($page as $key => $value) {
			$value->getLink();
		}
		// $allImages = [];
		// $albumName = [];
		$albumData = (AlbumPost::all())->all();

		// echo '<pre>';
		// var_dump($page);
		foreach ($albumData as $data) {

			// echo "<pre>";
			// var_dump($data->profileImgId);
			//     $albumName[] = $data->album_title;
			//     foreach ($data->attachments as $key => $img) {
			//         $allImages[] = $img->getUrl();
			//     }
		}
		// var_dump($albumName);
		// $output = View::adminRender('album.album',  ["data" => $albumData]);
		// return View::render('gallery.all-album', ['data' => $output]);
		$output = View::adminRender('album.album', ["data" => $albumData]);
		// var_dump( $output) ;
		$response = new JsonResponse(['html' => $output]);

		return $response;
	}
}

// $page = new Page();
// $page->setRoute(‘album’);  - sklaisutuose routo pavadinimas is frontRoutes i kuri nori nukreipti.
// $page->setTitle($userio_albumo_pavadinimas’); - skliaustuose Page pavadinimas kuris bus ir slug, arba kintamasis - gautas ir request - albumo_pavadinimas;
// // $page->pageState = ‘Site Page’;   - cia gali priskirti pageState. Sita eilute nebuina, jei nieko nerasysi pageState defaultas Site Page, kaip pas Arvyda.
// $page->save();
// $album = new AlbumPost();
// $album->post_parent = $page->ID;
// // $album->savybe = ‘tekstas’;  - priskiri reikalingas savybes;
// $album->save()
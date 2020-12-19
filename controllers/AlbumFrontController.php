<?php

namespace BIT\controllers;

use BIT\app\Page;
use BIT\app\View;
use BIT\models\AlbumPost;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlbumFrontController
{
    public function index()
    {
        return View::render('gallery.all-album');
    }

    public function create()
    {

    
        $albumData  = (AlbumPost::all())->all();

       
        $output = View::adminRender('album.album',  ["data" => $albumData]);
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
<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\Page;
use BIT\app\View;
use BIT\app\FrontMenu;
use BIT\app\Query;
// use BIT\app\Attachment;
// use BIT\models\NewsPost;
// use BIT\models\AlbumPost;
// use BIT\app\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FrontMenuController
{
    public function index()
    {
        $query = new Query;
        $menus = $query->postType('menu')->getPost()->all();
        $menu = $menus[0];
        $output = View::adminRender('adminMenu.headerfront', ['html' =>  $menu]);
        
        return View::render('header', ['html' => $output]);
    }
}

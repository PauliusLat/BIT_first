<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\Page;
use BIT\app\View;
use BIT\app\FrontMenu;
use BIT\app\Query;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FrontMenuController
{
    public function index()
    {
        // $query = new Query;
        // $menus = $query->postType('menu')->getPost()->all();
        // $menu = $menus[0];
        // return View::adminRender('adminMenu.headerfront', ['menu' =>  $menu]);
        // return View::render('header');
    }

    public function create()
    {
        $query = new Query;
        $menus = $query->postType('menu')->getPost()->all();
        $menu = $menus[0];
        $output =  View::adminRender('adminMenu.headerfront', ['menu' =>  $menu]);
        $response = new JsonResponse(['html' => $output]);

        return $response;
        //return View::render('header', ['html' => $output]);
    }
}

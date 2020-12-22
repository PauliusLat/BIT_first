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
        // _dc($menus);
        if ($menus) {
            $menu = $menus[0];
            $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
            $page = new Page;
            return View::adminRender('frontmenu.mainmenu', ['menu' => $menu, 'pages' => $pages, 'page' => $page]);
        } else {
            $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
            $page = new Page;
            return View::adminRender('frontmenu.initmenu', ['pages' => $pages, 'page' => $page]);
        }
    }

    public function create()
    {
        $query = new Query;
        $menus = $query->postType('menu')->getPost()->all();
        $menu = $menus[0];
        $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
        return new JsonResponse(['html' => $pages]);
    }

    public function store(Request $request, FrontMenu $menu)
    {
        $id = $request->request->get('id');
        if ($id == 0 || $id == 'undefined' || !isset($id) || $id == null || $id == '') {
            $menuPost = new FrontMenu;
        } else {
            $menuPost = FrontMenu::get($id);
        }

        $title = $request->request->get('names');
        $menuPost->names = explode(',', $title);
        $page = $request->request->get('pages');
        $menuPost->pages = explode(',', $page);
        $links = $request->request->get('pageLinks');
        $menuPost->pageLinks = explode(',', $links);
        $menuPost->save();
        // _dc($menuPost);
        return new Response;
    }
}

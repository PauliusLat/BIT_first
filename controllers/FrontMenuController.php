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
        return View::adminRender('frontmenu.menucreate');
    }

    public function create()
    {
        $query = new Query;
        $menus = $query->postType('menu')->getPost()->all();

        if ($menus) {
            $menu = $menus[0];
            $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
            $catPages = $query->postMetaArr('page', 'pageState', 'Category_page')->getPost()->all();
            $page = new Page;
            return View::adminRender('frontmenu.mainmenu', ['menu' => $menu, 'pages' => $pages, 'page' => $page, 'catPages' => $catPages]);
        } else {
            $query = new Query;
            $menus = $query->postType('menu')->getPost()->all();

            $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
            $catPages = $query->postMetaArr('page', 'pageState', 'Category_page')->getPost()->all();
  
            $page = new Page;

            $output = View::adminRender('frontmenu.initmenu', ['pages' => $pages, 'page' => $page, 'catPages' => $catPages]);

            return new JsonResponse(['html' => $output]);
        }
    }

    public function store(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $id = $request->request->get('id');
        if ($id == 0 || $id == 'undefined' || !isset($id) || $id == null || $id == '') {
            $menuPost = new FrontMenu;
        } else {
            $menuPost = FrontMenu::get($id);
        }

        $title = $request->request->get('names');
        $menuPost->names = $title;
        $subtitle = $request->request->get('childnames');
        $menuPost->subnames = $subtitle;
        $page = $request->request->get('pages');
        $menuPost->pages = $page;
        $subpage = $request->request->get('childpages');
        $menuPost->subpages = $subpage;
        $links = $request->request->get('pageLinks');
        // $menuPost->pageLinks = explode(',', $links);
        $menuPost->pageLinks = $links;
        $sublinks = $request->request->get('childpageLinks');
        $menuPost->subpageLinks = $sublinks;
        // $menuPost->save();
        // _dc($menuPost);
        return new Response;
    }

    public function decodeRequest($request)
    {
        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : array());
        }
        return $request;
    }
}

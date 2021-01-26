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

class AdminMenuController
{

    public function index()
    {
        return View::adminRender('adminMenu.menucreate');
    }

    public function create()
    {
        $query = new Query;
        // $menus = $query->postType('menu')->getPost()->all();
        $menus = FrontMenu::all()->all();


        if ($menus) {
            $menu = reset($menus);
            $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
            //$catPages = $query->postMetaArr('page', 'pageState', 'Category_page')->getPost()->all();
            $page = new Page;
            $output = View::adminRender('adminMenu.mainmenu', ['menu' => $menu, 'pages' => $pages, 'page' => $page]);
            return new JsonResponse(['html' => $output]);
        } else {
            // $query = new Query;
            // $menus = $query->postType('menu')->getPost()->all();
            $pages = $query->postMetaArr('page', 'pageState', 'Menu_page')->getPost()->all();
            $catPages = $query->postMetaArr('page', 'pageState', 'Category_page')->getPost()->all();
            $page = new Page;
            $output = View::adminRender('adminMenu.initmenu', ['pages' => $pages, 'page' => $page, 'catPages' => $catPages]);
            return new JsonResponse(['html' => $output]);
        }
    }


    public function store(Request $request)
    {
        $id = $request->request->get('id');
        if ($id == 0 || $id == 'undefined' || !isset($id) || $id == null || $id == '') {
            $menuPost = new FrontMenu;
        } else {
            $menuPost = FrontMenu::get($id);
        }

        $rvalues = $request->request->get('all');
        $rpageNames = $request->request->get('select');
        $rmenuItems = $request->request->get('text');
        $rpageLinks = $request->request->get('textLink');
        $rextLinks = $request->request->get('link');

        $values = explode(',', $rvalues);
        $pageNames = explode(',', $rpageNames);
        $menuItems = explode(',', $rmenuItems);
        $pageLinks = explode(',', $rpageLinks);
        $extLinks = explode(',', $rextLinks);

        $namesArr = [];
        $subnamesArr = [];
        $bigSubnamesArr = [];

        $menuItemsArr = [];
        $submenuItemsArr = [];
        $bigSubmenuItemsArr = [];

        $pageLinksArr = [];
        $subpageLinksArr = [];
        $bigSubpageLinksArr = [];

        $extLinksArr = [];
        $subextLinksArr = [];
        $bigSubextLinksArr = [];

        foreach ($values as $index => $bool) {
            if ($bool == 'true' && $index == 0) {
                array_push($namesArr, $pageNames[$index]);
                array_push($menuItemsArr, $menuItems[$index]);
                array_push($pageLinksArr, $pageLinks[$index]);
                array_push($extLinksArr, $extLinks[$index]);
            } else if ($bool == 'true' && $index > 0 && $index != count($values) - 1) {
                array_push($bigSubnamesArr, $subnamesArr);
                array_push($bigSubmenuItemsArr, $submenuItemsArr);
                array_push($bigSubpageLinksArr, $subpageLinksArr);
                array_push($bigSubextLinksArr, $subextLinksArr);
                $subnamesArr = [];
                $submenuItemsArr = [];
                $subpageLinksArr = [];
                $subextLinksArr = [];
                array_push($namesArr, $pageNames[$index]);
                array_push($menuItemsArr, $menuItems[$index]);
                array_push($pageLinksArr, $pageLinks[$index]);
                array_push($extLinksArr, $extLinks[$index]);
            } else if ($bool == 'true' && $index = count($values) - 1) {
                array_push($bigSubnamesArr, $subnamesArr);
                array_push($bigSubmenuItemsArr, $submenuItemsArr);
                array_push($bigSubpageLinksArr, $subpageLinksArr);
                array_push($bigSubextLinksArr, $subextLinksArr);
                $subnamesArr = [];
                $submenuItemsArr = [];
                $subpageLinksArr = [];
                $subextLinksArr = [];
                array_push($bigSubnamesArr, $subnamesArr);
                array_push($bigSubmenuItemsArr, $submenuItemsArr);
                array_push($bigSubpageLinksArr, $subpageLinksArr);
                array_push($bigSubextLinksArr, $subextLinksArr);

                array_push($namesArr, $pageNames[$index]);
                array_push($menuItemsArr, $menuItems[$index]);
                array_push($pageLinksArr, $pageLinks[$index]);
                array_push($extLinksArr, $extLinks[$index]);
            } else if ($bool == 'false' && $index == count($values) - 1) {
                array_push($subnamesArr, $pageNames[$index]);
                array_push($submenuItemsArr, $menuItems[$index]);
                array_push($subpageLinksArr, $pageLinks[$index]);
                array_push($subextLinksArr, $extLinks[$index]);

                array_push($bigSubnamesArr, $subnamesArr);
                array_push($bigSubmenuItemsArr, $submenuItemsArr);
                array_push($bigSubpageLinksArr, $subpageLinksArr);
                array_push($bigSubextLinksArr, $subextLinksArr);
            } else {
                array_push($subnamesArr, $pageNames[$index]);
                array_push($submenuItemsArr, $menuItems[$index]);
                array_push($subpageLinksArr, $pageLinks[$index]);
                array_push($subextLinksArr, $extLinks[$index]);
            }
        }

        $menuPost->names = $menuItemsArr;
        $menuPost->subnames = $bigSubmenuItemsArr;
        $menuPost->pages = $namesArr;
        $menuPost->subpages = $bigSubnamesArr;
        $menuPost->pageLinks = $pageLinksArr;
        $menuPost->subpageLinks = $bigSubpageLinksArr;
        $menuPost->extLinks = $extLinksArr;
        $menuPost->subextLinks = $bigSubextLinksArr;
        $menuPost->save();

        return new Response;
    }

    // public function decodeRequest($request)
    // {
    //     if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
    //         $data = json_decode($request->getContent(), true);
    //         $request->request->replace(is_array($data) ? $data : array());
    //     }
    //     return $request;
    // }
}

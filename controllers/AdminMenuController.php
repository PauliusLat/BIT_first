<?php

namespace BIT\controllers;

use BIT\app\Page;
use BIT\app\View;
use BIT\app\FrontMenu;
use BIT\app\Session;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AdminMenuController
{

    public function index()
    {
        return View::adminRender('adminMenu.menucreate');
    }

    public function create(Session $session)
    {
        $menus = FrontMenu::all()->all();
        $pages = Page::all()->pageState('Menu_page')->all();

        if ($menus) {
            $menu = (reset($menus));
            $view = 'adminMenu.mainmenu';
        } else {
            $menu = new FrontMenu;
            $view = 'adminMenu.initmenu';
        }
        $success_message = '';
        $message  = '';
        if ($session->get('alert_message')) {
            $message = $session->get('alert_message');
        } else if ($session->get('success_message')) {
            $success_message = $session->get('success_message');
        } else {
            $message = "";
            $success_message = "";
        }

        $output = View::adminRender($view, ['menu' => $menu, 'pages' => $pages, 'message' => $message,  'success_message' => $success_message]);
        return new JsonResponse(['html' => $output]);
    }


    public function store(Request $request, Session $session)
    {
        // _dc($request->request);
        $id = $request->request->get('id');
        if (!$id || $id == 'undefined') {
            $menuPost = new FrontMenu;
            $session->flash('success_message', 'meniu sėkmingai sukurtas');
        } else {
            $menuPost = FrontMenu::get($id);
            $session->flash('success_message', 'meniu sėkmingai pakoreguotas');
        }

        $rvalues = $request->request->get('all');           //status
        $rpageNames = $request->request->get('select');     //page name 
        $rmenuItems = $request->request->get('text');       //menu name
        $rpageLinks = $request->request->get('textLink');   //page ID

        $rextLinks = $request->request->get('link');        //extLink

        $values = explode(',', $rvalues);
        $pageNames = explode(',', $rpageNames);
        $menuItems = explode(',', $rmenuItems);
        $pageLinks = explode(',', $rpageLinks);
        $extLinks = explode(',', $rextLinks);

        $rowsArr = [];

        foreach ($values as $index => $bool) {
            $index = $index;
            if ($bool == 'true') {
                array_push($rowsArr, ['is_mainmenu' => $bool, 'page_ID' => $pageLinks[$index], 'menu_name' => $menuItems[$index], 'external_link' => $extLinks[$index], 'submenus' => []]);
            } else {
                array_push($rowsArr[count($rowsArr) - 1]['submenus'], ['is_mainmenu' => $bool, 'page_ID' => $pageLinks[$index], 'menu_name' => $menuItems[$index], 'external_link' => $extLinks[$index],]);
            }
        }

        $menuPost->menuElements = $rowsArr;
        $menuPost->save();
        return new Response;
    }
}

<?php

namespace BIT\controllers;

use BIT\app\Page;
use BIT\app\FrontMenu;
use BIT\app\View;
use BIT\app\Session;
// use BIT\app\Attachment;
// use BIT\models\NewsPost;
// use BIT\models\AlbumPost;
use BIT\app\Query;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use BIT\app\Pagination;
use BIT\app\coreExeptions\NotSetException;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;


class PageController
{

    public function index()
    {
        return View::adminRender('page.mainpage');
    }

    public function create(Request $request, Session $session)
    {
        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $menu_page_state = $page_state['main'];
        if ($request->request->get('pageSelected') != null) {
            $limit = $request->request->get('pageSelected');
        } else {
            $limit = 5;
        }
        if (is_int($request->request->get('pages')) || strlen($request->request->get('hash')) != 0) {
            $number = $request->request->get('hash');
        } else {
            $number = 1;
        }

        $allPages = Page::all()->all();
        $pagesPost = [];
        $systemStates = $page_state['system'] ?? [];
        if (!empty($allPages) && is_array($allPages)) {
            foreach ($allPages as $pag) {
                if (is_array($pag->pageState)) {
                    $bool = true;
                    foreach ($pag->pageState as $state) {
                        if (in_array($state, $systemStates)) {
                            $bool = false;
                            break;
                        }
                    }
                    if ($bool) array_push($pagesPost, $pag);
                }
            }
        } else {
            throw new NotSetException('Nei vienas puslapis dar nesukurtas');
        }


        $total = count($pagesPost);
        $pagination = new Pagination($limit, $number, $total);
        $pageArr = [];
        foreach ($pagesPost as $key => $value) {
            if ($key >= $pagination->offset && count($pageArr) < $limit) {
                array_push($pageArr, $value);
            }
        }
        $success_message = '';
        $message  = '';
        if ($session->get('alert_message') != null) {
            $message = $session->get('alert_message');
        } else if ($session->get('success_message') != null) {
            $success_message = $session->get('success_message');
        } else {
            $message = "";
        }
        $output = View::adminRender('page.page', ["postPages" =>  $pageArr, 'post_types' => $post_types['menu'], 'menu_page_state' => $menu_page_state, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage, 'message' => $message,  'success_message' => $success_message]);
        return new JsonResponse(['html' => $output]);
    }


    public function store(Request $request, Session $session)
    {
        $page = new Page;
        $name = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $pagest = $request->request->get('page_state');
        $state = ['Site_page'];
        if ($pagest) {
            $pagestate = explode(',', $pagest);
            foreach ($pagestate as $value) {
                array_push($state, $value);
            }
        }

        $page->pageState = $state;
        $page->setRoute($post);
        $page->setTitle($name);
        if ($name == '') {
            $session->flash('alert_message', 'įrašykite puslapio pavadinimą');
        } else {
            $session->flash('success_message', 'puslapis sėkmingai sukurtas');
            $page->save();
        }
        return new Response;
    }

    public function edit(Page $page)
    {
        $postContent = $page->post_content;
        $codeArr = str_word_count($postContent, 1);
        $shortcode = $codeArr[3];
        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $menu_page_state = $page_state['main'];
        $ID = $page->ID;
        $output = View::adminRender('page.edit',  ['page' => $page, 'post_types' => $post_types['menu'], 'menu_page_state' => $menu_page_state, 'shortcode' => $shortcode, 'ID' => $ID]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $request, Page $page, Session $session)
    {
        $title = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $pagest = $request->request->get('page_state');
        $state = ['Site_page'];
        if ($pagest) {
            $pagestate = explode(',', $pagest);
            foreach ($pagestate as $value) {
                array_push($state, $value);
            }
        }
        $page->pageState = $state;
        $page->setRoute($post);
        $page->setTitle($title);
        $page->post_name = $request->request->get('page_name');
        $session->flash('success_message', 'puslapis sėkmingai pakoreguotas');
        $page->save();
        return new JsonResponse;
    }

    public function destroy(Page $page, Session $session)
    {
        if (in_array('Menu_page', $page->pageState)) {
            $session->flash('alert_message', 'puslapis neištrintas! negalite trinti MENU PAGE. Jei tikrai norite ištrinti, pakeiskite puslapio rūšį ir nenaudokite jo MENU.');
            return new Response;
        }
        if (in_array('Home_page', $page->pageState)) {
            $session->flash('alert_message', 'puslapis neištrintas! negalite trinti HOME PAGE. Jei tikrai norite ištrinti, pakeiskite puslapio rūšį ir nenaudokite jo kaip HOME PAGE.');
            return new Response;
        }
        foreach (reset(FrontMenu::all()->all())->menuElements as $value) {
            if ($value['page_ID'] == $page->ID) {
                $session->flash('alert_message', 'puslapis neištrintas! Puslapis įtrauktas į pagrindinį MENU');
                return new Response;
            }
        }
        $page->delete(true);
        $session->flash('success_message', 'puslapis sėkmingai ištrintas');
        return new Response;
    }
}

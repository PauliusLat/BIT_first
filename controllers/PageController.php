<?php

namespace BIT\controllers;

use BIT\app\Page;
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

        $total = count(Page::all()->all());
        $pagination = new Pagination($limit, $number, $total);
        $pagesPost = Page::all()->all();
        $pagesPost = array_values($pagesPost);

        // _dc($pagesPost);
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
        // _dc($pagination);
        $output = View::adminRender('page.page', ["postPages" =>  $pageArr, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage, 'message' => $message,  'success_message' => $success_message]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $request, Session $session)
    {
        // $query = new Query;
        // $menus = $query->postType('menu')->getPost()->all();
        // $menu = $menus[0];
        // $request = $this->decodeRequest($requestJson);
        $page = new Page;
        $name = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $pagest = $request->request->get('page_state');
        $pagestate = explode(',', $pagest);
        $state = ['Site_page',];
        if ($pagestate) {
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
        $output = View::adminRender('page.edit',  ['page' => $page, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'shortcode' => $shortcode, 'ID' => $ID]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $request, Page $page, Session $session)
    {
        $title = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $pagest = $request->request->get('page_state');
        $pagestate = explode(',', $pagest);
        $state = ['Site_page',];
        if ($pagestate) {
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
        $page->delete(true);
        $session->flash('success_message', 'puslapis sėkmingai ištrintas');
        return new Response;
    }
}

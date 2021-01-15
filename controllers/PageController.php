<?php

namespace BIT\controllers;

use BIT\app\Page;
use BIT\app\View;
use BIT\app\Session;

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

    public function create(Request $requestJson, Session $session)
    {
        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $menu_page_state = $page_state['main'];
        $request = $this->decodeRequest($requestJson);

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
        $pages = Page::all()->all();
        $pageArr = [];
        foreach ($pages as $key => $value) {
            if ($key >= $pagination->offset && count($pageArr) < $limit) {
                array_push($pageArr, $value);
            }
        }

        if ($session->get('alert_message') != null) {
            $message = $session->get('alert_message');
        } else if ($session->get('success_message') != null) {
            $success_message = $session->get('success_message');
        } else {
            $message = "";
        }

        $output = View::adminRender('page.page', ["postPages" =>  $pageArr, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pages' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage, 'message' => $message,  'success_message' => $success_message]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $requestJson, Session $session)
    {
        $request = $this->decodeRequest($requestJson);
        $page = new Page;
        $name = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $state = $request->request->get('page_state');
        foreach ($state as $value) {
            array_push($page->pageState, $value);
        }
        $page->setRoute($post);
        $page->setTitle($name);
        if ($name == '') {
            $session->flash('alert_message', 'įrašykite puslapio pavadinimą');
        } else {
            //add category to db and get cat ID
            $session->flash('success_message', 'puslapis sėkmingai sukurtas');
            $page->save();
        }

        return new Response;
    }

    public function edit(Page $page)
    {

        $postContent = $page->post_content;
        $codeArr = str_word_count($postContent, 1);
        $shortcode = explode("'", $codeArr[3])[1];
        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $menu_page_state = $page_state['main'];
        $ID = $page->ID;
        $output = View::adminRender('page.edit',  ['page' => $page, 'oldValue' => $oldValue, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'shortcode' => $shortcode, 'ID' => $ID]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Page $page, Session $session)
    {
        $request = $this->decodeRequest($requestJson);
        $title = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $pagestate = $request->request->get('page_state');
        $state = ['Site_page'];
        foreach ($pagestate as $value) {
            array_push($state, $value);
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
        $session->flash('success_message', 'puslapis sėkmingai ištrintas');
        $page->delete();
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

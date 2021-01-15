<?php

namespace BIT\controllers;

use BIT\app\Page;
use BIT\app\View;
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

    public function create(Request $requestJson)
    {
        // $pages = Page::all()->all(); //cia reiktu ofseto
        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $menu_page_state = $page_state['main'];
        $request = $this->decodeRequest($requestJson);

        if ($request->request->get('pageSelected') != null) {
            $limit = $request->request->get('pageSelected');
        } else {
            $limit = 3;
        }

        if (is_int($request->request->get('pages')) || strlen($request->request->get('hash')) != 0) {
            $number = $request->request->get('hash');
        } else {
            $number = 1;
        }

        $query = new Query;
        $total = count(Page::all()->all());
        // dar neveikia offset, reikia ziuret
        $pages = $query->postOffset('page', $pagination->offset)->getPost()->all();
        $pagination = new Pagination($limit, $number, $total);
        $output = View::adminRender('page.page', ["pages" => $pages, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'nextpage' => $pagination->nextpage, 'prevpage' => $pagination->prevpage, 'limit' => $limit, 'pagesnr' => $pagination->pages, 'lastpage' => $pagination->lastpage, 'firstpage' => $pagination->firstpage]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $page = new Page;
        $name = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        if ($request->request->get('page_state') && $request->request->get('page_state') != 'Site_page') {
            array_push($page->pageState, $request->request->get('page_state'));
        }
        $page->setRoute($post);
        $page->setTitle($name);
        $page->save();
        // _dc($page);
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
        $oldValue = 1;
        foreach ($page->pageState as $key => $value) {
            if ($value != 'Site_page' && array_key_exists($key, $page->pageState)) {
                $oldValue = $value;
            }
        }
        $ID = $page->ID;
        $output = View::adminRender('page.edit',  ['page' => $page, 'oldValue' => $oldValue, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'shortcode' => $shortcode, 'ID' => $ID]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Page $page)
    {
        $request = $this->decodeRequest($requestJson);
        $title = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        $pagestate = $request->request->get('page_state');
        foreach ($page->pageState as $key => $value) {
            if ($value != 'Site_page' && array_key_exists($key, $page->pageState)) {
                $replace = [$key => $pagestate];
                $page->pageState = array_replace($page->pageState, $replace);
            }
        }
        $page->setRoute($post);
        $page->setTitle($title);
        $page->post_name = $request->request->get('page_name');
        $page->save();
        return new JsonResponse;
    }

    public function destroy(Page $page)
    {
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

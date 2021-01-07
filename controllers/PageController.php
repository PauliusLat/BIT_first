<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\Page;
use BIT\app\View;
// use BIT\app\Attachment;
// use BIT\models\NewsPost;
// use BIT\models\AlbumPost;
// use BIT\app\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;


class PageController
{

    public function index()
    {
        return View::adminRender('page.mainpage');
    }

    public function create()
    {
        $pages = Page::all()->all();
        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';

        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $menu_page_state = $page_state['main'];

        $output = View::adminRender('page.page', ["pages" => $pages, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state]);
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
        $output = View::adminRender('page.edit',  ['page' => $page, 'post_types' => $post_types, 'menu_page_state' => $menu_page_state, 'shortcode' => $shortcode, 'ID' => $ID]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Page $page)
    {
        $request = $this->decodeRequest($requestJson);
        $title = $request->request->get('page_title');
        $post = $request->request->get('post_type');
        if ($request->request->get('page_state')) {
            array_push($page->pageState, $request->request->get('page_state'));
        }


        $page->setRoute($post);
        $page->setTitle($title);
        $page->post_name = $request->request->get('page_name');
        $page->save();
        // _dc($page);
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

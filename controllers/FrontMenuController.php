<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\Page;
use BIT\app\View;
use BIT\app\FrontMenu;
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
        return View::adminRender('frontmenu.mainmenu');
    }

    public function create()
    {
        // $pages = Page::all()->all();
        // $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
        // $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        $output = View::adminRender('frontmenu.menucreate', ["pages" => $pages, 'post_types' => $post_types, 'page_state' => $page_state]);
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $page = new Page;
        $name = $request->request->get('page_title');
        // $slug = $request->request->get('page_slug');
        $post = $request->request->get('post_type');
        $pageState = [];
        $page_state = require PLUGIN_DIR_PATH . 'configs/pageStateConfigs.php';
        foreach ($page_state as $state => $value) {
            if ($state == 'site') {
                array_push($pageState, $value);
            }
        }
        if ($request->request->get('page_state') || $request->request->get('page_state') != 'Site_page') {
            $pageState[] = $request->request->get('page_state');
        }
        $page->pageState = $pageState;
        $pageState = $request->request->get('page_state');
        $page->setRoute($post);
        $page->setTitle($name);
        //update nenaudoti sito metodo
        $page->save();
        return new Response;
    }

    public function edit(Page $page)
    {
        $output = View::adminRender('page.edit',  ['page' => $page]);
        return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Page $page)
    {
        $request = $this->decodeRequest($requestJson);
        $page->post_title = $request->request->get('page_title');
        $page->post_name = $request->request->get('page_name');
        $page->save();
        // $output = View::adminRender('page.page');
        // $response = new JsonResponse(['html' => $output]);
        return $response = new JsonResponse;
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

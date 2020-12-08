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
        $output = View::adminRender('frontmenu.menucreate');
        return new JsonResponse(['html' => $output]);
    }

    public function store(Request $requestJson)
    {
        $request = $this->decodeRequest($requestJson);
        $menu = new FrontMenu;
        if ($request->request->get('item_name')) {
            array_push($name, $request->request->get('item_name'));
            array_push($index, $menu->getItemUuid());
        }
        if ($request->request->get('item_page')) {
            array_push($page, $request->request->get('item_page'));
        }
        return new Response;
    }

    public function edit(Page $page)
    {
        // $output = View::adminRender('page.edit',  ['page' => $page]);
        // return new JsonResponse(['html' => $output]);
    }

    public function update(Request $requestJson, Page $page)
    {
        $request = $this->decodeRequest($requestJson);
        $page->post_title = $request->request->get('page_title');
        $page->post_name = $request->request->get('page_name');
        $page->save();
        // $output = View::adminRender('page.page');
        // $response = new JsonResponse(['html' => $output]);
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

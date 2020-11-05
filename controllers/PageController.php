<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\Page;
use BIT\app\View;
use BIT\app\Attachment;
use BIT\models\NewsPost;
use BIT\models\AlbumPost;
use BIT\app\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class PageController {

    public function create(Request $request){
        return View::adminRender('page.create', ['url' => PLUGIN_DIR_URL]);
    }

    public function store(Request $request){
        $page = new Page;
        $post_type = $request->request->get('post-type');
        $post_title = $request->request->get('page-name');
        $page->createPage($post_type, $post_title);
        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost/wordpress/wp-admin/admin.php?page=page');
        exit;
        return $response;
    }  

    public function edit(Request $request){
       
        return View::adminRender('category.edit', ['url' => PLUGIN_DIR_URL, 'categories' => $categories, 'category' => $category]);

    }

    public function update(Request $request){
       

        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost/wordpress/wp-admin/admin.php?page=page');
        exit;
        return $response;

    }

    public function destroy(Request $request){

        
        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost/wordpress/wp-admin/admin.php?page=page');
        exit;
        return $response;

    }

  


}
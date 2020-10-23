<?php

namespace BIT\controllers;

use BIT\app\App;
use BIT\app\View;
use BIT\app\Attachment;
use BIT\models\NewsPost;
use BIT\models\AlbumPost;
use BIT\app\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class CategoryAdminController {

    public function create(Request $request){
        $category = new Category;
        $categories = $category->getAllCats();
        return View::adminRender('category.create', ['url' => PLUGIN_DIR_URL, 'categories' => $categories]);
    }

    public function store(Request $request, Category $category){
        // $category = new Category;
        $app = App::start();
        // _dc($category);
        $categories = $category->getAllCats();
       
        $name = $request->request->get('category-name');
        $slug = $request->request->get('category-slug');
        $description = $request->request->get('category-description');
        $parent_name = $request->request->get('tevines-kategorijos');
        $parent_id = $category->getTermId($parent_name);
        $category->addCat($name, $description, $parent_id);

        //add image to category
        $uploads_dir = '/opt/lampp/htdocs/wordpress/wp-content/plugins/BIT_first/resources/img';
        $target_file = basename($_FILES["picture"]["name"]); //nuotrauka
        move_uploaded_file($_FILES["picture"]["tmp_name"], "$uploads_dir/$target_file");//nuotrauka
        $picture = $request->files->get('picture')->getClientOriginalName();
        $catID =  $category->getTermId($name);
        $category->addImageToCat($catID, "my_term_key" , $picture);
        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost:8080/wordpress/wp-admin/admin.php?page=category');
        exit;
        return $response;
    }  

    public function edit(Request $request, Category $category){
        // $app = App::start();
        // $category = new Category;
        // _dc($category);
        // $categories = $category->getAllCats();
        
        return View::adminRender('category.edit', ['url' => PLUGIN_DIR_URL, 'category' => $category]);

    }

    public function delete(){

    }

    public function update(){


    }


}
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
      
        foreach ($categories as $cat){
            $children = $category->getChildCats($cat->term_id);
        }
        
        return View::adminRender('category.create', ['url' => PLUGIN_DIR_URL, 'categories' => $categories, 'children' => $children]);
    }

    public function store(Request $request, Category $category){
        // $category = new Category;
        $app = App::start();
        // _dc($category);
        $categories = $category->getAllCats();
        $name = $request->request->get('category-name');
        $slug = $request->request->get('category-slug');
        $description = $request->request->get('category-description');

        if($request->request->get('tevines-kategorijos')){
            $parent_name = $request->request->get('tevines-kategorijos');
            $parent_id = $category->getCatId($parent_name);
        }else {
            $parent_id = 0;
        }
        $category->addCat($name, $description, $parent_id);

        //add image to category
        if($request->files->get('picture')){
            $uploads_dir = '/opt/lampp/htdocs/wordpress/wp-content/plugins/BIT_first/resources/img';
            $target_file = basename($_FILES["picture"]["name"]); //nuotrauka
            move_uploaded_file($_FILES["picture"]["tmp_name"], "$uploads_dir/$target_file");//nuotrauka
            $picture = $request->files->get('picture')->getClientOriginalName();
            $catID =  $category->getTermId($name);
            $category->addImageToCat($catID, "my_term_key" , $picture);
        }
        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost/wordpress/wp-admin/admin.php?page=category');
        exit;
        return $response;
    }  

    public function edit(Request $request, Category $category){
        // $categories = $category->getAllCats();
        $id = $request->query->get('id');
        $category = $category->getCat($id);
        
        return View::adminRender('category.edit', ['url' => PLUGIN_DIR_URL, 'category' => $category]);

    }

    public function update(Request $request, Category $category){
       
        $categories = $category->getAllCats();
        $id = $request->query->get('id');
        $name = $request->request->get('category-name');
        $slug = $request->request->get('category-slug');
        $description = $request->request->get('category-description');
        $parent_name = $request->request->get('tevines-kategorijos');
        $parent_id = $category->getCatId($parent_name);
        $category->updateCat($id, $name, $description, $parent_id);
       
        if ($request->files->get('picture')){
            $image = $category->getCatImage($id, "my_term_key");
            $category->deleteCatImage($id, "my_term_key");
            $uploads_dir = '/opt/lampp/htdocs/wordpress/wp-content/plugins/BIT_first/resources/img';
            $target_file = basename($_FILES["picture"]["name"]); //nuotrauka
            move_uploaded_file($_FILES["picture"]["tmp_name"], "$uploads_dir/$target_file");//nuotrauka
            $picture = $request->files->get('picture')->getClientOriginalName();
            $category->addImageToCat($id, "my_term_key" , $picture);
        }

        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost/wordpress/wp-admin/admin.php?page=category');
        exit;
        return $response;

    }

    public function destroy(Request $request, Category $category){

        $id = $request->query->get('id');
        $category->deleteCatFromDb($id);
        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost/wordpress/wp-admin/admin.php?page=category');
        exit;
        return $response;

    }

  


}
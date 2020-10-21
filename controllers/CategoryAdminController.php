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

    public function store(Request $request){
        $category = new Category;
        $categories = $category->getAllCats();
        $app = App::start();
    //  _dc($request = $app->getService('request'));
        _dc($name = $request->request->get('category-name'));
        _dc($slug = $request->request->get('category-slug'));
        _dc($description = $request->request->get('category-description'));
        _dc($parent_name = $request->request->get('tevines-kategorijos'));
        _dc($parent = get_term_by('name', $parent_name, 'maincat'));

        $category->addCat($name, $description, 'maincat', $parent->term_id);

        // _dc($_FILES);
        // _dc($dirpath = dirname(getcwd()));
        $uploads_dir = '/opt/lampp/htdocs/wordpress/wp-content/plugins/BIT_first/resources/img';
        $target_file = basename($_FILES["picture"]["name"]); //nuotrauka
        move_uploaded_file($_FILES["picture"]["tmp_name"], "$uploads_dir/$target_file");//nuotrauka
        // _dc($request);
        $picture = $request->files->get('picture')->getClientOriginalName();
        $url = $app->apiUrl.'/resources/img/';
        // $picture = new Attachment;
        // $picture->save($request->files->get('picture'));
        echo '<pre>';
        // _dc($picture);
        // var_dump($picture);
        _dc($category); 
        // $category->image = $picture;  
        // _dc($category->image);  
        add_term_meta( 78, "my_term_key" , $picture );
        $category->image = get_term_meta(78, "my_term_key");
        // _dc( $image);
        // add_term_meta( 78, "my_term_key" , $picture );
        // $file = "$uploads_dir/$target_file";
        // $response = new BinaryFileResponse($file);
        // $cat = file_get_contents('/opt/lampp/htdocs/grazus/Uzdaviniai/composer/img/kaciukas1.jpeg');// nuotrauka
        // $cat1 = 'data:image/jpeg;base64,'.base64_encode($cat);

        // _dc($request->file->get('picture'));
        $response = new Response;
        $response->prepare($request);
        wp_redirect('http://localhost:8080/wordpress/wp-admin/admin.php?page=category');
        exit;
        return $response;

    }  
}
<?php

namespace BIT\controllers;

// use BIT\app\App;
use BIT\app\View;
// use BIT\app\Attachment;
// use BIT\app\Category;
// use BIT\app\Session;
// use BIT\app\Pagination;
// use BIT\app\Cookie;
// use BIT\app\Page;
// use Symfony\Component\HttpFoundation\Request;
// use Symfony\Component\HttpFoundation\Response;
// use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;
// require PLUGIN_DIR_PATH . '/../../../wp-load.php';
// require_once(ABSPATH . 'wp-admin/includes/image.php');

class FrontLoginController
{
    public function index()
    {
        $output = View::adminRender('frontLogin.login');
        return View::render('login.login', ['html' => $output]);
    }

    public function login()
    {
        //return $output = View::adminRender('frontLogin.loginlogin');
        $output = View::adminRender('frontLogin.loginlogin');
        return View::render('login.loginlogin', ['html' => $output]);

        // return View::render('login.login', ['html' => $output]);
    }
}

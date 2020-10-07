<?php

namespace BIT\controllers;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use BIT\app\App;

class AdminController {
    // public function __construct()
    // {
    //     echo "Create HomeController";
    // }

    public function index() {
        echo PLUGIN_DIR_URL . '<br>';
        echo '
            <br>
            <button id="editButton"> Click </button>
        ';


    }
}
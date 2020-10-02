<?php

namespace BIT\controllers;

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

        echo "<script language='javascript'>
            const editButton = document.querySelector('#editButton');
            // console.log(editButton);
            // console.log('JS');
            if (editButton) {
                editButton.addEventListener('click', () => { 
                    console.log('clicked');
                    axios.get('" . PLUGIN_DIR_URL . "/api?route=test'
                    // , {route: 'test'}
                    )
                    // get can also have params
                    .then((response) => {  
                        console.log(response);
                        console.log(response.data);
                        console.log(response.data.a);
                        // displayMessages(response.data);
                        // drawIndexInit();
                    })
                    .catch((error) => {
                        console.log(error);
                        // displayErrorMessages(error.response.data.errors);
                    });
                });
            }
        </script>";
    }
}
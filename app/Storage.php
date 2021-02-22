<?php

namespace BIT\app;

// require __DIR__ . '/../vendor/autoload.php';

class Storage
{

    // const FILE_NAME = __DIR__ . '/users.json';
    // const FILE_NAME = 'app/users.json';


    public static function addUser(array $data)

    {
        wp_insert_user($data);
    }

    // public static function getUser()

    // {
    //     $data = file_get_contents(self::FILE_NAME);

    //     return json_decode($data);
    // }
}

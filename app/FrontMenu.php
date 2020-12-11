<?php

namespace BIT\app;

use Ramsey\Uuid\Uuid;

// use BIT\app\Post;

class FrontMenu extends Post
{
    protected static $type = 'menu';
    // private static $obj;

    // public static function start()
    // {
    //     return self::$obj ?? self::$obj = new self;
    // }

    // public $index = [];
    public $names = [];
    public $pages = [];
    public $links = [];


    // public function __get($dir)
    // {
    //     return $this->$dir;
    // }
}

<?php

namespace BIT\app;

use Ramsey\Uuid\Uuid;

// use BIT\app\Post;

class FrontMenu extends Post
{
    protected static $type = 'menu';
    public $names = [];
    public $pages = [];
    public $pageLinks = [];
    public $links = [];
}

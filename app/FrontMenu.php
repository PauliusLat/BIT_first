<?php

namespace BIT\app;

use Ramsey\Uuid\Uuid;

// use BIT\app\Post;

class FrontMenu extends Post
{
    protected static $type = 'menu';

    public $index = [];
    public $names = [];
    public $pages = [];


    public function getItemUuid()
    {
        return Uuid::uuid4();
    }

    // public function __construct($limit, $number)
    // {

    //     // $this->offset = ($number - 1)  * $limit;
    //     // $total = wp_count_terms('hashtag', ['hide_empty' => false]);
    //     // $this->pages = ceil($total / $limit);

    //     // if ($number < $this->pages) {
    //     //     $this->nextpage = $number + 1;
    //     // } else {
    //     //     $this->nextpage = $number;
    //     // }

    //     // if ($number > 1) {
    //     //     $this->prevpage = $number - 1;
    //     // } else {
    //     //     $this->prevpage = $number;
    //     // }

    //     // $this->lastpage = $this->pages;
    //     // $this->firstpage = 1;

    //     // return [$this->pages, $this->offset, $this->nextpage, $this->prevpage, $this->lastpage, $this->firstpage];
    // }

    public function __get($dir)
    {
        return $this->$dir;
    }
}

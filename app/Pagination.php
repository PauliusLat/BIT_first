<?php

namespace BIT\app;

class Pagination
{
    public $offset;
    public $pages;
    public $nextpage;
    public $prevpage;
    public $lastpage;
    public $firstpage;
    // private static $obj;

    // public static function start()
    // {
    //     return self::$obj ?? self::$obj = new self;
    // }

    public function __construct($limit, $number)
    {
        $this->offset = ($number - 1)  * $limit;
        $total = wp_count_terms('hashtag', ['hide_empty' => false]);
        $this->pages = ceil($total / $limit);

        if ($number < $this->pages) {
            $this->nextpage = $number + 1;
        } else {
            $this->nextpage = $number;
        }

        if ($number > 1) {
            $this->prevpage = $number - 1;
        } else {
            $this->prevpage = $number;
        }

        $this->lastpage = $this->pages;
        $this->firstpage = 1;

        // return [$this->pages, $this->offset, $this->nextpage, $this->prevpage, $this->lastpage, $this->firstpage];
    }

    public function __get($dir)
    {
        return $this->$dir;
    }
}

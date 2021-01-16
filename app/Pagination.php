<?php

namespace BIT\app;

class Pagination
{
    private $offset;
    private $pages;
    private $nextpage;
    private $prevpage;
    private $lastpage;
    private $firstpage;


    public function __construct($limit, $number, $total)
    {
        $this->offset = ($number - 1)  * $limit;
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

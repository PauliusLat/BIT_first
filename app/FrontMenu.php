<?php

namespace BIT\app;


class FrontMenu extends Post
{
    protected static $type = 'menu';
    public $names = [];
    public $pages = [];
    public $pageLinks = [];
    public $links = [];
}

<?php

namespace BIT\app;


class FrontMenu extends Post
{
    protected static $type = 'menu';
    public $names = [];
    public $pages = [];
    public $pageLinks = [];
    public $extLinks = [];
    public $subnames = [];
    public $subpages = [];
    public $subpageLinks = [];
    public $subextLinks = [];
}

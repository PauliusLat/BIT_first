<?php

namespace BIT\app;

use BIT\app\modelTraits\Tcategory;

class Category
{
    use Tcategory;
    private $cattax = ['maincat'];
    static private $obj;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }
}

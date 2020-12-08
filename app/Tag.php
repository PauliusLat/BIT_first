<?php

namespace BIT\app;

use BIT\app\modelTraits\Ttaxonomy;
use BIT\controllers\controllerTraits\Tpagination;

class Tag
{
    use Ttaxonomy;
    use Tpagination;
    private $taxonomy = ['hashtag', 'ideatag'];
    static private $obj;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }
}

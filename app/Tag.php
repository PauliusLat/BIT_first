<?php
namespace BIT\app;
use BIT\app\modelTraits\Ttaxonomy;

class Tag {
    use Ttaxonomy;
    private $taxonomy = ['hashtag', 'ideatag'];
    static private $obj;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

   
   
}
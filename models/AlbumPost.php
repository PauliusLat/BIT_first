<?php

namespace BIT\models;
use BIT\app\modelTraits\Talbum;
use BIT\app\Post;

class AlbumPost extends Post{

    use Talbum;

    protected static $type = 'album';
    
}
<?php

namespace BIT\models;
use BIT\app\modelTraits\Tnews;
use BIT\app\Post;

class NewsPost extends Post{
    use Tnews;
    protected static $type = 'news';

}
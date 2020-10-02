<?php

namespace BIT\models;
use BIT\app\modelTraits\Tidea;
use BIT\app\Post;


class IdeaPost extends Post{
    use Tidea;
    protected static $type = 'idea';
}
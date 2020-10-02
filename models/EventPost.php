<?php

namespace BIT\models;
use BIT\app\modelTraits\Tevent;
use BIT\app\Post;

class EventPost extends Post{

    use Tevent;

    protected static $type = 'event';

    
    
}
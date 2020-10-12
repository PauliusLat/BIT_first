<?php

namespace BIT\models;
use BIT\app\modelTraits\Ttaxonomy;
use BIT\app\modelTraits\Tcategory;
use BIT\app\modelTraits\Tevent;
use BIT\app\Post;

class EventPost extends Post{

    use Ttaxonomy;
    // use Tcategory;
    use Tevent;

    protected static $type = 'event';

}
<?php

namespace BIT\models;
use BIT\app\modelTraits\Ttaxonomy;
use BIT\app\modelTraits\Tcategory;
use BIT\app\modelTraits\Tnews;
use BIT\app\Post;

class NewsPost extends Post{
    use Ttaxonomy;
    use Tcategory;
    use Tnews;
    protected static $type = 'news';

}
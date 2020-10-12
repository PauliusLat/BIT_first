<?php

namespace BIT\models;
use BIT\app\modelTraits\Ttaxonomy;
use BIT\app\modelTraits\Tcategory;
use BIT\app\modelTraits\Tidea;
use BIT\app\Post;


class IdeaPost extends Post{
    use Ttaxonomy;
    use Tcategory;
    use Tidea;
    protected static $type = 'idea';
}
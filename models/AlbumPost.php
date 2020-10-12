<?php

namespace BIT\models;
use BIT\app\modelTraits\Talbum;
use BIT\app\modelTraits\Ttaxonomy;
use BIT\app\Post;

class AlbumPost extends Post {

	use Ttaxonomy;
	// use Tcategory;
	use Talbum;

	protected static $type = 'album';

}
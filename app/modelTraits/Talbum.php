<?php
namespace BIT\app\modelTraits;

trait Talbum{
    
    public $album_date = 'YYYY-MM_DD';
    public $album_content = '';
    private $taxonomy = ['hashtag', 'ideatag'];
    private $cattax = ['maincat'];
    public $album_title = '';
}
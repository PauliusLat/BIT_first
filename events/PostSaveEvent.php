<?php
namespace BIT\events;

use Symfony\Contracts\EventDispatcher\Event;

class PostSaveEvent extends Event 
{
    const NAME = 'post.save';
    private $id;

    public function __construct($id)
    {
        $this->id = $id;   
    }
    public function getId()
    {
        return $this->id;
    }


}
<?php
namespace BIT\app\coreExeptions;

class PostNotExistExeption extends \Exception 
{
    function __construct($msg) 
    {
        parent::__construct($msg);
    }
}
<?php
namespace BIT\app\coreExeptions;

class PostIdNotSetException extends \Exception 
{
    function __construct($msg) 
    {
        parent::__construct($msg);
    }
}
<?php
namespace BIT\app\coreExeptions;

class InvalidOrderArgException extends \Exception 
{
    function __construct($msg) 
    {
        parent::__construct($msg);
    }
}
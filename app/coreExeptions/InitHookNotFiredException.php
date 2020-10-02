<?php
namespace BIT\app\coreExeptions;

class InitHookNotFiredException extends \Exception 
{
    function __construct($msg) 
    {
        parent::__construct($msg);
    }
}
<?php

namespace BIT\app\coreExeptions;

class NotSetException extends \Exception
{
    function __construct($msg)
    {
        parent::__construct($msg);
    }
}

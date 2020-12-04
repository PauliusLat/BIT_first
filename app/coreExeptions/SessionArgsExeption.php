<?php

namespace BIT\app\coreExeptions;

class SessionArgsExeption extends \Exception
{
    function __construct($msg)
    {
        parent::__construct($msg);
    }
}

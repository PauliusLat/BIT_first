<?php
namespace BIT\app\coreExeptions;

class wrongArgsTypeExeption extends \Exception{
    function __construct($message = ''){
        parent::__construct($message);
    }

}

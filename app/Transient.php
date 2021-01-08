<?php

namespace BIT\app;

use BIT\app\Cookie;
// use BIT\app\App;
use BIT\app\Session;
use BIT\app\coreExeptions\SessionArgsExeption;

// use session

class Transient
{
    static private $obj;
    private $name;
    private $value;
    private $newValue;
    // private $setValue;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    private function __construct()
    {
        $this->name = (string)Cookie::getUuid();
// if/else pridejau
        // if(get_transient($this->name)){
            $this->value = get_transient($this->name);
        // }else{
            // set_transient($this->name, Session::$array);
            // $this->value = get_transient($this->name);

        // }
        
        $this->newValue = $this->value;

        if($this->newValue){
            foreach ($this->newValue as $index => $string) {
                if (is_array($string)) {
                    continue;
                }
                if (strpos($string, 'autodelete') !== FALSE)
                unset($this->newValue[$index]);
                $namee = substr($string, 11);
            }
            
            foreach ($this->newValue as $index => $string) {
                if ($index == $namee) {
                    unset($this->newValue[$index]);
                }
            }
        }
    }

    public function deleteTransient()
    {
        delete_transient($this->name);
    }


    public function __get($dir)
    {
        return $this->$dir;
    }

    public function __destruct()
    {
        $setValue = Session::$array;

        if ($this->name && is_array($setValue) && isset($_COOKIE['Bit'])) {
            set_transient($this->name, $setValue);
        } else {
            throw new SessionArgsExeption('Error: session set should be an array and name can not be set');
        }
    }
}

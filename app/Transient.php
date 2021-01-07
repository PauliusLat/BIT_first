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
        $this->name = Cookie::getUuid();
        // _dc($this->name);
        $this->value = get_transient($this->name);
        // _dc($this->value);
        if ($this->value) {
            $this->newValue = $this->value;
            foreach ($this->newValue as $index => $string) {
                if (is_array($string)) {
                    continue;
                }
                if (strpos($string, 'autodelete') !== FALSE)
                    unset($this->newValue[$index]);
                $name = substr($string, 11);
            }

            foreach ($this->newValue as $index => $string) {
                if ($index == $name) {
                    unset($this->newValue[$index]);
                }
            }
        } else {
            $this->value = [];
            $this->newValue = $this->value;
        }
    }

    public function deleteTransient()
    {
        // _dc($this->name);
        delete_transient($this->name);
    }


    public function __get($dir)
    {
        return $this->$dir;
    }

    public function __destruct()
    {
        $setValue = Session::$array;
        if ($this->name && isset($_COOKIE['Bit'])) {
            set_transient($this->name, $setValue);
            // var_dump($this->name);
            // dc(isset($_COOKIE['Bit']));
        } else {
            throw new SessionArgsExeption('Error: Cookie name should be set');
        }
    }
}

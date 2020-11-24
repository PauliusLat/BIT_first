<?php

namespace BIT\app;

use BIT\app\Cookie;
use BIT\app\App;
use BIT\app\Session;

// use session

class Transient
{
    static private $obj;
    private $name;
    private $value;
    private $newValue;
    private $setValue;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    public function __construct()
    {
        $this->name = Cookie::getUuid();
        $this->value = get_transient($this->name);

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
        set_transient($this->name, $setValue);
    }
}

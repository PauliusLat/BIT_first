<?php

namespace BIT\app;

use BIT\app\Transient;
use BIT\app\Cookie;
use BIT\app\coreExeptions\SessionArgsExeption;

class Session
{
    public static $array = [];
    static private $obj;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    public function set($a, $b)
    {
        $transient = Transient::start();
        self::$array = $transient->newValue;
        self::$array[$a] = $b;
        // if (is_array(self::$array)) {
        return self::$array;
        //     } else {
        //         throw new SessionArgsExeption('Error: session set should be an array');
        //     }
    }

    public function flash($a, $b)
    {
        $transient = Transient::start();
        self::$array = $transient->newValue;
        self::$array[$a] = $b;
        array_push(self::$array, 'autodelete_' . $a);
        // if (is_array(self::$array)) {
        return self::$array;
        // } else {
        //     throw new SessionArgsExeption('Error: session set should be an array');
        // }
    }

    public function get($index)
    {
        $transient = Transient::start();
        self::$array = $transient->value;
        if (array_key_exists($index, self::$array)) {
            $indexValue =  self::$array[$index];
            self::$array = $transient->newValue;
            return $indexValue;
        } else {
            self::$array = $transient->newValue;
            return null;
        }
    }

    // public function get($index)
    // {
    //     $transient = Transient::start();
    //     self::$array = $transient->value;
    //     if (array_key_exists($index, self::$array)) {
    //         $indexValue =  self::$array[$index];
    //         self::$array = $transient->newValue;
    //         return $indexValue;
    //     } else {
    //         self::$array = $transient->newValue;
    //         return null;
    //     }
    // }

    public function delete($index)
    {
        $transient = Transient::start();
        self::$array = $transient->value;
        unset(self::$array[$index]);
        return self::$array;
    }

    public function deleteSession()
    {
        Transient::start()->deleteTransient();
        Cookie::deleteCookie();
        //self::$obj = null;
    }

    // public function __destruct()
    // {
    //     self::$obj = null;
    // }

    public function __get($dir)
    {
        return $this->$dir;
    }
}

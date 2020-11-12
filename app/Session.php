<?php
namespace BIT\app;
use BIT\app\Transient;
use BIT\app\Cookie;

class Session{

    private $name;
    public static $array = [];
    static private $obj;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    public function set($a, $b){
        $transient = Transient::start();
        self::$array = $transient->newValue; 
        self::$array[$a] = $b;
        return self::$array;
    }

    public function flash($a, $b){
        $transient = Transient::start();
        self::$array = $transient->newValue;
        self::$array[$a] = $b;
        array_push( self::$array, 'autodelete_'.$a);
        return self::$array;  
    }

    public function get($index){
        $transient = Transient::start();
        self::$array = $transient->value;
        if(array_key_exists ($index , self::$array)){
            $indexValue =  self::$array[$index];
            self::$array = $transient->newValue; 
            return $indexValue;
        }else{
            self::$array = $transient->newValue; 
            return null;
        }
    }

    public function delete($index){
        $transient = Transient::start();
        self::$array = $transient->value;
        unset(self::$array[$index]); 
        return self::$array;
    }

    public function deleteSession(){
        $transient = Transient::start();
        $transient->deleteTransient();
        Cookie::deleteCookie();
    }

    public function __get($dir)
    {
        return $this->$dir;
    }


}
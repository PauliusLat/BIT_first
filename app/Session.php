<?php
namespace BIT\app;
use BIT\app\Transient;

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
            _dc('ddddddddd');
            _dc(self::$array);
            _dc('ddddddddd');
            _dc('kkkkkkkkkk');
            self::$array[$a] = $b;
            // _dc(self::$array);
            // _dc('kkkkkkkkkk');
            return self::$array;
    }

    public function flash($a, $b){
        $transient = Transient::start();
        // $this->array = get_transient($this->name);
        self::$array = $transient->newValue;
        self::$array[$a] = $b;
        array_push( self::$array, 'autodelete_'.$a);
        // _dc(self::$array);
        // _dc('kukukulululul');
        return self::$array;  
    }

    public function get($index){
        $transient = Transient::start();
        self::$array = $transient->value;
        _dc('aaaaaaaaaa');
        _dc(self::$array);
        _dc('aaaaaaaaaa');
        $indexValue =  self::$array[$index];
        return $indexValue;
    }

    public function delete($index){
        $transient = Transient::start();
        self::$array = $transient->value;
        unset(self::$array[$index]); 
        return self::$array;
    }

    //delete session - ir cookio ir transiento istrynimas;
    //turi buti istrintas po vieno kreipimosi. Isiraso i transiento masyva. kitus pasizymeti, kitu raktu. Kai kita karta kreipiames i sesija 
    

    public function __get($dir)
    {
        return $this->$dir;
    }


}
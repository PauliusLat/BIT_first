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
//sito nereikia nes settinsim transiente
    public function  __construct(){
        // $this->name = Cookie::getUuid();    
        // $transient = Transient::start();
        // $this->array;
    }

    public function set($a, $b){
            $transient = Transient::start();
            self::$array = $transient->newValue; 
            // $this->array = get_transient($this->name);//jeigu pakeiciu sita eilute, dingsta is sesijos
            // _dc('ddddddddd');
            // _dc(self::$array);
            // // _dc($this->name);
            // _dc('ddddddddd');
            // // $this->array = $transient->newValue;
            // _dc('kkkkkkkkkk');
            self::$array[$a] = $b;
            // _dc(self::$array);
            // _dc('kkkkkkkkkk');
            return self::$array;
           
           
            // _dc('______________');
            // // _dc('tralialialia');
            // set_transient($this->name,$this->array);
            // $array = get_transient($this->name);
            // _dc($array);
    }

    public function flash($a, $b){
        $transient = Transient::start();
        // $this->array = get_transient($this->name);
        $this->array = $transient->newValue;
        $this->array[$a] = $b;
        array_push($this->array, 'autodelete_'.$a);
        // _dc($this->array);
        // _dc('kukuk');
        return $this->array;
        // set_transient($this->name,$this->array);
        // $array = get_transient($this->name);
        //  _dc($array);
        //  _dc('kukukulululul');
    }

    public function get($name, $index){
        $transient = Transient::start();
        $this->name = $name;
        $value = $transient->value;
        $indexValue = $value[$index];
        return $indexValue;
    }

    public function delete($name, $index){
        $transient = Transient::start();
        $this->name = $name;
        $value = $transient->value;
        unset($value[$index]); 
        return $value;
        ///itas turi buti tranwiente
        // $transient = set_transient($name, $value);
        // return $transient;
    }

    //delete session - ir cookio ir transiento istrynimas;
    //turi buti istrintas po vieno kreipimosi. Isiraso i transiento masyva. kitus pasizymeti, kitu raktu. Kai kita karta kreipiames i sesija 
    

    public function __get($dir)
    {
        return $this->$dir;
    }


}
<?php
namespace BIT\app;
use BIT\app\Cookie;
use BIT\app\App;
use BIT\app\Session;

// use session

class Transient{
static private $obj;
private $name;
private $value; 
private $newValue;
private $setValue;
///turi pereiti per konstruktoriu, tada kitais metodais kreipsimes i objekta.
//delete metodas, kuris automatiskai issikviecia. Pasidaro kopija reiksmiu(objekto savybe) ir tada istrin, kad jo nebebutu transiente, o butu sesijos metu kopijoje, kuria gauna sesijos klase.  
//public static function getTransient($name(cookie uuid), $value)

//tik transiento klase bendrauja su duomennu baze.

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    public function __construct(){
        $this->name = Cookie::getUuid();
        $this->value = get_transient($this->name);
        _dc('1111111111');
        _dc($this->value);
        _dc('1111111111');

        $this->newValue = $this->value;
        foreach($this->newValue as $index => $string) {
            if (strpos($string, 'autodelete') !== FALSE)
                unset($this->newValue[$index]);  
                $name = substr($string, 11); 
        }
        
        foreach ($this->newValue as $index=>$string){
            if ($index == $name){
                unset($this->newValue[$index]);
            }
        }
    }

    public function deleteTransient(){
    //    _dc('delete transient');
    //    _dc($this->name);
        delete_transient($this->name);
    }

    public function __get($dir)
    {
        return $this->$dir;
    }
    
    public function __destruct(){
        $setValue = Session::$array;
        _dc('000000000');
        _dc($setValue);
        _dc('000000000');
        set_transient($this->name,$setValue);
    }

}


//transiento klase turi gauti transient ir sukurti jam reiksmes papildomas
//isoriniai metodai set, get - kuris gali is transiento tam tikra reiksme - pagal uuid ir key. 
//delete tik tam tikra reiksme is transiento.istrinti turi ir key ir value. 
//ir dar reiki visa transienta ir visa cooki istrinti.(unset)
//flash metodo dar reikia, kuris panasus i set - trumpalaike sesija. panasus laravelyje yra . Kaip set, tik turi viena perkrovima turi galioti. flash reikia zymeti sesijoje tarnybiniais zneklais, ir kai pasibaigs reiks istrinti. 
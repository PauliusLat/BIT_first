<?php
namespace BIT\app;
use BIT\models\IdeaPost;

class Cookie {
    private static $uuid;
    
    public static function getUuid(){
        self::$uuid = rand(1000, 2000);
        if (!isset($_COOKIE['Bit'])) {
            setcookie("Bit", self::$uuid); 
        }
        self::$uuid = $_COOKIE['Bit'];
       
        return self::$uuid;
    }

    public static function deleteCookie(){
        unset($_COOKIE[self::$uuid]);
    }

    public static function ideaCookie($like){
        $cookieName = "Idea_cookie-".$like;
        if ( isset($_COOKIE[$cookieName]) ) {
            $cookie = unserialize($_COOKIE[$cookieName]);
        } else {
            $cookie = array();
        }     
        if ( ! in_array($like, $cookie) ) {
            $cookie[] = $like;
        }       
        setcookie($cookieName, serialize( $cookie), time()+365*24*60*60, '/');   
    }

    public function __get($dir)
    {
        return $this->$dir;
    }

}

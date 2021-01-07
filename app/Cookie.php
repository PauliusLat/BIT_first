<?php

namespace BIT\app;

use BIT\models\IdeaPost;

class Cookie
{
    private static $uuid;

    public static function getUuid()
    {
        self::$uuid = rand(1000, 2000);
        if (!isset($_COOKIE['Bit'])) {
            setcookie('Bit', self::$uuid);
        }
        self::$uuid = $_COOKIE['Bit'];
        return self::$uuid;
    }

    public static function deleteCookie()

    {
        // dc(self::$uuid);
        unset($_COOKIE['Bit']);
        // setcookie("Bit", "", time() - 3600);
    }
}

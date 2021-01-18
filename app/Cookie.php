<?php

namespace BIT\app;


class Cookie
{
    private static $uuid;
    const COOKIENAME = 'New';

    public static function getUuid()
    {

        self::$uuid = rand(1000, 2000);
        if (!isset($_COOKIE[self::COOKIENAME])) {
            setcookie(self::COOKIENAME, self::$uuid, time() + 24 * 3600 * 30 * 5 * 12, '/');

        }
        self::$uuid = $_COOKIE[self::COOKIENAME];
        return self::$uuid;
    }

    public static function deleteCookie()

    {

        // dc(self::$uuid);
        // unset($_COOKIE['Bit']);
        setcookie(self::COOKIENAME, "", time() - 3600, '/');

    }
}

<?php

namespace BIT\app;


class Cookie
{
    private static $uuid;
    const COOKIENAME = 'bitas';

    public static function getUuid()
    {
        self::$uuid = rand(1000, 2000);

        if (!isset($_COOKIE[self::COOKIENAME])) {
            setcookie(self::COOKIENAME, self::$uuid, time() + 24 * 3600 * 30 * 5 * 12, '/');
            $_COOKIE[self::COOKIENAME] = self::$uuid;
        }
        return  self::$uuid = $_COOKIE[self::COOKIENAME];
    }

    public static function deleteCookie()

    {
        setcookie(self::COOKIENAME, "", time() - 3600, '/');
    }
}

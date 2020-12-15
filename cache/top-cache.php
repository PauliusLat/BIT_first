<?php

$url = $_SERVER['SCRIPT_NAME'];
$break = explode('/', $url);
$file = $break[count($break)-1];
$cachefile = 'cached-'.substr_replace($file, "", -4).'.html';

if(file_exists($cachefile)){
    readfile($cachefile);
    exit;
}
ob_start();

?>
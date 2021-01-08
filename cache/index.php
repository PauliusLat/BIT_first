<?php

namespace BitCache;


$loadFromCache = true;
define('C_DIR_1', '/loads/');

foreach (getallheaders() as $name => $value) {
   
    if ($name == 'X_BIT-Cache' && $value == 0) {
        $loadFromCache = false;
        break;
    }
}
if ($loadFromCache) {
    if (!empty($_POST) || !empty($_GET)) {
        $loadFromCache = false;
        file_put_contents(__DIR__.C_DIR_1.'_method.html', print_r(['post'=>$_POST,'get'=>$_GET,'uri'=>$_SERVER['REQUEST_URI']], 1), FILE_APPEND);
    }
}if ($loadFromCache) {
    $url = getScheme().getHost().$_SERVER['REQUEST_URI'];
    if (preg_match('/^http::\/\/www\./i', $url)) {            //turi buti      /^http:|:\/\/www\./i
        $loadFromCache = false;
        
    }
}if ($loadFromCache) {
    if (preg_match('/wp-admin/i', $url)) {            // tik frontui
        $loadFromCache = false;        
    }
}if ($loadFromCache) {
    $url = getScheme().getHost().$_SERVER['REQUEST_URI'];
    if (preg_match('/reviews\/?$/i', $url)) {
        $loadFromCache = false;
    }
}if ($loadFromCache) {
    define('BIT_CACHE_SALT', 'sdkfhlsdhfioewfndsiofsdnofnsdof');
    $cacheId = md5($_SERVER['REQUEST_URI'].BIT_CACHE_SALT);
    $cacheFile = __DIR__.C_DIR_1.$cacheId.'.html';

    if (file_exists($cacheFile)) {
        echo file_get_contents($cacheFile);
        die();
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6");
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'X_BIT-Cache: 0',
        'X_BIT-Cache-Set-Time: 6000'
        ]);
    $output = curl_exec ($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
    if($httpcode != 200) {
        file_put_contents(__DIR__.C_DIR_1.'_status.html', print_r(['status'=>$httpcode,'uri'=>$_SERVER['REQUEST_URI']],1), FILE_APPEND);
    } 
    if(!curl_errno($ch) && $output && $httpcode == 200) {
        file_put_contents(__DIR__.C_DIR_1.$cacheId.'.html', $output);
        echo $output;
        die();
    }
}   

function getScheme(){
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
    }else{
        $protocol = 'http';
    }
    return $protocol.'://';
}

function getHost() {
    $possibleHostSources = ['HTTP_X_FORWARDED_HOST', 'HTTP_HOST', 'SERVER_NAME', 'SERVER_ADDR'];
    $sourceTransformations = [
                                'HTTP_X_FORWARDED_HOST' => function($value){
                                    $elements = explode(',', $value);
                                    return trim(end($elements));
                                }
                            ];
    $host = '';
    foreach ($possibleHostSources as $source) {
        if (!empty($host)) {
            break;
        }
        if (empty($_SERVER[$source])) {
            continue;
        }
        $host = $_SERVER[$source];
        if (array_key_exists($source, $sourceTransformations)) {
        $host = $sourceTransformations[$source]($host);
        }
    }
    $host = preg_replace('/:\d+$/', '', $host);
    return trim($host).':8080';                               //remove :8080.
}


<?php

namespace BIT\app;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use BIT\app\Config;
use BIT\app\FrontRouter;
use BIT\app\AdminRoute;
use BIT\app\Cookie;
use BIT\cache\ClearCache;
use BIT\models\IdeaPost;

class App
{
    private $containerBuilder;
    private $loader;
    private $routeDir;
    private $viewDir;
    private $resourseDir;
    private $apiUrl;
    private $controller;
    private $method;
    private $reflectionParams;
    private $params;
    private $config;
    static private $obj;

    public static function start()
    {
        return self::$obj ?? self::$obj = new self;
    }

    private function __construct()
    {
        Config::postTypeRegister();
        Config::customTaxonomyRegister();
        $this->routeDir = PLUGIN_DIR_PATH . 'routes/';
        $this->viewDir = PLUGIN_DIR_PATH . 'views/';
        $this->resourseDir = PLUGIN_DIR_PATH . 'resources/';
        $this->apiUrl = PLUGIN_DIR_URL; // unused
        $this->containerBuilder = new ContainerBuilder();
        $this->loader = new PhpFileLoader($this->containerBuilder, new FileLocator(__DIR__));
        $this->loader->load('service.php');
        add_action('admin_enqueue_scripts', function () {
            wp_enqueue_style('app', PLUGIN_DIR_URL . 'public/style/app.css');
            wp_enqueue_style('app');
            wp_enqueue_script('js', PLUGIN_DIR_URL . 'public/js/app.js', [], 1, true);
            wp_enqueue_script('js');
            wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js');
        });
        add_shortcode('front_shortcode', [FrontRoute::class, 'frontRoute']);
        AdminRoute::start();
        Session::start();
        // ClearCache::start();

        // require_once __DIR__.'/../cache/clearCache.php';

    }

    public function getService($service)
    {
        return $this->containerBuilder->get($service);
    }

    //metodas, aprasantis refleksija
    public function run($controller, $method)
    {
        $this->controller = $controller;
        $this->method = $method;
        $this->reflectionParams = (new \ReflectionMethod($this->controller, $this->method))->getParameters();

        $params = [];

        foreach ($this->reflectionParams as $val) {
            if ($val->getType()) {
                $params[] = $this->getService($val->getType()->getName()); // kvieciu is konteinerio
            }
        }
        return (new $this->controller)->{$this->method}(...$params);
    }

    // magic metodas, kuris leidžia prieiti prie privačios savybės
    public function __get($dir)
    {
        return $this->$dir;
    }
}

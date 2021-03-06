<?php

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use BIT\app\Attachment;
use Symfony\Component\HttpFoundation\Request;
use BIT\models\NewsPost;
use BIT\models\IdeaPost;
use BIT\models\EventPost;
use BIT\models\AlbumPost;
use BIT\app\RequestId;
use BIT\app\Cookie;
use BIT\app\Session;
use BIT\app\Category;
use BIT\app\Page;
use BIT\app\FrontMenu;

return function (ContainerConfigurator $configurator) {

    $services = $configurator->services()
        ->defaults()
        ->autowire()      // Automatically injects dependencies in your services.
        ->autoconfigure();


    $services->set('request', Request::class)
        // In versions earlier to Symfony 5.1 the service() function was called ref()
        ->factory([Request::class, 'createFromGlobals']);
    $services->alias(Request::class, 'request');

    $services->set('requestId', RequestId::class)
        ->args([ref(Request::class)]);
    $services->alias(RequestId::class, 'requestId');

    $services->set('Category', Category::class)
        ->args([ref(RequestId::class)]);
    $services->alias(Category::class, 'category');

    $services->set('menu', FrontMenu::class)
        ->args([ref(RequestId::class)]);
    $services->alias(FrontMenu::class, 'menu');

    $services->set('newsPost', NewsPost::class)
        ->args([ref(RequestId::class)]);
    $services->alias(NewsPost::class, 'newsPost');

    $services->set('attachment', Attachment::class)
        ->args([ref(RequestId::class)]);
    $services->alias(Attachment::class, 'attachment');

    $services->set('albumPost', AlbumPost::class)
        ->args([ref(RequestId::class)]);
    $services->alias(AlbumPost::class, 'albumPost');

    $services->set('eventPost', EventPost::class)
        ->args([ref(RequestId::class)]);
    $services->alias(EventPost::class, 'eventPost');

    $services->set('ideaPost', IdeaPost::class)
        ->args([ref(RequestId::class)]);
    $services->alias(IdeaPost::class, 'ideaPost');

    $services->set('page', Page::class)
        ->args([ref(RequestId::class)]);
    $services->alias(Page::class, 'page');

    $services->set('uuid', Cookie::class)
        ->factory([Cookie::class, 'getUuid']);
    $services->alias(Cookie::class, 'uuid');

    $services->set('session', Session::class)
        ->factory([Session::class, 'start']);
    $services->alias(Session::class, 'session');

    $services->set('category', Category::class)
        ->factory([Category::class, 'start']);
    $services->alias(Category::class, 'category');
};

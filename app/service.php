<?php
namespace Symfony\Component\DependencyInjection\Loader\Configurator;
use Symfony\Component\HttpFoundation\Request;
use BIT\models\NewsPost;
use BIT\models\IdeaPost;
use BIT\models\EventPost;
use BIT\models\AlbumPost;
use BIT\app\RequestId;
use BIT\app\Cookie;

return function(ContainerConfigurator $configurator) {

    $services = $configurator->services();
    $services->set('request', Request::class)
    // In versions earlier to Symfony 5.1 the service() function was called ref()
    ->factory([Request::class, 'createFromGlobals']);
    $services->alias(Request::class, 'request');
    
    $services->set('requestId', RequestId::class)
    ->args([ref(Request::class)]);
    $services->alias(RequestId::class, 'requestId');

    $services->set('newsPost', NewsPost::class)
    ->args([ref(RequestId::class)]);
    $services->alias(NewsPost::class, 'newsPost');

    $services->set('albumPost', AlbumPost::class)
    ->args([ref(RequestId::class)]);
    $services->alias(AlbumPost::class, 'albumPost');

    $services->set('eventPost', EventPost::class)
    ->args([ref(RequestId::class)]);
    $services->alias(EventPost::class, 'eventPost');

    $services->set('ideaPost', IdeaPost::class)
    ->args([ref(RequestId::class)]);
    $services->alias(IdeaPost::class, 'ideaPost');

    $services->set('uuid', Cookie::class)
    ->factory([Cookie::class, 'getUuid']);
    $services->alias(Cookie::class, 'uuid');

};
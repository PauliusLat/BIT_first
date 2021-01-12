<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\models\CacheConfig;
use BIT\app\coreExeptions\PostNotExistExeption;
use Symfony\Component\HttpFoundation\Request;

class CacheController
{
	
	public function index()
	{
		return $this->renderView();
	}


    public function clearCache()
	{
		$files = glob(__DIR__.'/../cache/loads/*.[hH][tT][mM][lL]') ?? [];
		$count = 0;
		foreach( $files as $file){
			if(strcmp($file, __DIR__.'/../cache/loads/_method.html') == 0 || strcmp($file, __DIR__.'/../cache/loads/_status.html') == 0) continue;
			unlink($file);
			$count++;
		}
		$message = 'Ištrinti failai: '.$count;
		return $this->renderView(['message' => $message]);
	}


    public function enableCache(Request $request)
	{
		$status = false;
		if(isset($request->request->all()['thumb-button'])){
			$status = true;
		}
		$this->storeStatus($status);
		$this->changeHtaccess($status);
		
		return $this->renderView();
	}


	private function renderView(...$args){

		$arr =['cacheStatus' => $this->getCahceStaus()];
		foreach ($args as $value) {
			foreach ($value as $key => $arg) {
				$arr[$key] = $arg;
			}
		}
		return View::adminRender('cache.cache', $arr);
	}


	private function getCahceStaus(){

		$cacheStatus = 'unchecked';

		if(CacheConfig::all()->all()){
			foreach (CacheConfig::all()->all() as $key => $value) {
				$cacheStatus = $value->post_title;
			}
		}else{
			$status = new CacheConfig;
			$status->post_title = $cacheStatus;
			$status->save();
		}

		return $cacheStatus;
	}


	private function storeStatus($status){
		$post = null;
		
		if(CacheConfig::all()->all()){
			foreach (CacheConfig::all()->all() as $key => $value) {
				$post = $value;
			}
		}else{
			throw new PostNotExistExeption('Patikrinti kodel nesukurtas CacheConfig postas DB');
		}
		
		if($status){
			$post->post_title = 'checked';
			$post->save();
		}
		else{
			$post->post_title = 'unchecked';
			$post->save();
		}
	}


	 private function changeHtaccess($status){
		if($status){
			copy(ABSPATH.'/plugin-access/cacheaccess/.htaccess', ABSPATH.'/.htaccess');
		}else{
			copy(ABSPATH.'/plugin-access/htaccess/.htaccess', ABSPATH.'/.htaccess');
		}
		$this->clearCache();
	 }


   

	

}

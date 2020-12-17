<?php

namespace BIT\app\modelTraits;

use BIT\app\Attachment;

trait Talbum
{

  private $taxonomy = ['hashtag', 'ideatag'];
  private $cattax = ['maincat'];
  public $profileImgId = 0;

  public function getProfileImage()
  {
    if ($this->profileImgId) {
      return Attachment::get($this->profileImgId);
    }
  }
}

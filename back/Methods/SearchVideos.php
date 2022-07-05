<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Video.php';

use Entities\Video;
use Methods\Entities\BaseApiMethod;

/**
 * searchVideos method
 */
class SearchVideos extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'GET';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'query'
    ];

    public function actionDefault()
    {
        $resp = Video::getVideosByPartName($this->getFromGet('query')) ?? [];
        $this->answer($resp);
    }
}

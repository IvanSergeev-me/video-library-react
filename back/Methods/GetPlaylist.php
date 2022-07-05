<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Playlist.php';

use Entities\Playlist;
use Methods\Entities\BaseApiMethod;

/**
 * getPlaylist method
 */
class GetPlaylist extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'GET';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'id'
    ];

    public function actionDefault()
    {
        $playlist = Playlist::getPlaylist((int) $this->getFromGet('id'));
        if (!$playlist) {
            $this->answerError('no playlist');
            return;
        }
        $this->answer($playlist);
    }
}

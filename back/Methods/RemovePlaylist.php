<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Playlist.php';

use Entities\Playlist;
use Methods\Entities\BaseApiMethod;

/**
 * removePlaylist method
 */
class RemovePlaylist extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'POST';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'id'
    ];

    public function actionDefault()
    {
        $playlist = Playlist::getPlaylist($this->getFromPost('id'));
        if (!$playlist) {
            $this->answerError('no playlist');
            return;
        }

        $playlist->deletePlaylist();
        $this->answer(['ok']);
    }
}

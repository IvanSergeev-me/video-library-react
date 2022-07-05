<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Playlist.php';

use Entities\Playlist;
use Methods\Entities\BaseApiMethod;

/**
 * changePriorityPlaylist method
 */
class ChangePriorityPlaylist extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'POST';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'id',
        'priority'
    ];

    public function actionDefault()
    {
        $playlist = Playlist::getPlaylist((int) $this->getFromPost('id'));
        if (!$playlist) {
            $this->answerError('no playlist');
            return;
        }
        $playlist->setPriority($this->getFromPost('priority'));
        $this->answer($playlist);
    }
}

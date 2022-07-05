<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Playlist.php';

use Entities\Playlist;
use Methods\Entities\BaseApiMethod;

/**
 * editPlaylist method
 */
class EditPlaylist extends BaseApiMethod
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

        $name = $this->getFromPost('name');
        $description = $this->getFromPost('description');
        if ($name) {
            $playlist->setName($name);
        }
        if ($description) {
            $playlist->setDescription($description);
        }
        $this->answer($playlist);
    }
}

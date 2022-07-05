<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Playlist.php';
require_once 'Entities/User.php';

use Entities\Playlist;
use Entities\User;
use Methods\Entities\BaseApiMethod;

/**
 * addPlaylist method
 */
class AddPlaylist extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'POST';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'creator_id',
        'name'
    ];

    public function actionDefault()
    {
        $user = User::getUser($this->getFromPost('creator_id'));
        if (!$user) {
            $this->answerError('no user');
            return;
        }

        $playlist = Playlist::createPlaylist(
            (int) $this->getFromPost('creator_id'),
            $this->getFromPost('name'),
            $this->getFromPost('description') ?? ''
        );
        $this->answer(['id' => $playlist]);
    }
}

<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/User.php';

use Entities\User;
use Methods\Entities\BaseApiMethod;

/**
 * getPlaylists method
 */
class GetPlaylists extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'GET';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'creator_id'
    ];

    public function actionDefault()
    {
        $user = User::getUser($_GET['creator_id']);
        if (!$user) {
            $this->answerError('no user');
            return;
        }

        if ($this->getFromGet('short')) {
            $playlists = [];
            foreach ($user->getPlaylists() as $playlist) {
                $playlists[] = ['id' => $playlist->id, 'name' => $playlist->name];
            }
            $this->answer($playlists);
        } else {
            $this->answer($user->getPlaylists());
        }
    }
}

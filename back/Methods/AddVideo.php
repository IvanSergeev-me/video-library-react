<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Playlist.php';
require_once 'Entities/Video.php';

use Entities\Playlist;
use Entities\Video;
use Methods\Entities\BaseApiMethod;

/**
 * addVideo method
 */
class AddVideo extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'POST';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'playlist_id',
        'name',
        'link'
    ];

    public function actionDefault()
    {
        $playlist = Playlist::getPlaylist($this->getFromPost('playlist_id'));
        if (!$playlist) {
            $this->answerError('no playlist');
            return;
        }

        $video = Video::addVideo(
            (int) $this->getFromPost('playlist_id'),
            $this->getFromPost('name'),
            $this->getFromPost('description') ?? '',
            $this->getFromPost('link')
        );

        $this->answer(['id' => $video]);
    }
}

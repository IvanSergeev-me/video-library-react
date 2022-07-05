<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Video.php';

use Entities\Video;
use Methods\Entities\BaseApiMethod;

/**
 * changePriorityVideo method
 */
class ChangePriorityVideo extends BaseApiMethod
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
        $video = Video::getVideo((int) $this->getFromPost('id'));
        if (!$video) {
            $this->answerError('no video');
            return;
        }

        $video->setPriority($this->getFromPost('priority'));
        $this->answer($video);
    }
}

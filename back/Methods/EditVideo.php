<?php
require_once 'Entities/BaseApiMethod.php';
require_once 'Entities/Video.php';

use Entities\Video;
use Methods\Entities\BaseApiMethod;

/**
 * editVideo method
 */
class EditVideo extends BaseApiMethod
{
    /** @var string api method (POST/GET) */
    protected const METHOD = 'POST';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [
        'id'
    ];

    public function actionDefault()
    {
        $video = Video::getVideo($this->getFromPost('id'));
        if (!$video) {
            $this->answerError('no video');
            return;
        }

        $name = $this->getFromPost('name');
        $description = $this->getFromPost('description');
        if ($name) {
            $video->setName($name);
        }
        if ($description) {
            $video->setDescription($description);
        }

        $this->answer($video);
    }
}

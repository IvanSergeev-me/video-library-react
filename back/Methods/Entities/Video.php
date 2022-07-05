<?php


namespace Entities;

use R;

require_once 'rb-mysql.php';

/**
 *
 */
class Video
{
    private const TABLE = 'videos';

    public int $id;
    public string $name;
    public int $playlist_id;
    public string $description;
    public string $link;
    public string $preview;
    public int $priority;
    public string $add_date;


    /**
     * @param $id
     * @param $name
     * @param $playlist_id
     * @param $description
     * @param $link
     * @param $preview
     * @param $priority
     * @param $add_date
     */
    public function __construct(
        $id=null,
        $name=null,
        $playlist_id=null,
        $description=null,
        $link=null,
        $preview=null,
        $priority=null,
        $add_date=null
    )
    {
        $this->id = $id;
        $this->name = $name;
        $this->playlist_id = $playlist_id;
        $this->description = $description;
        $this->link = $link;
        $this->preview = $preview;
        $this->priority = $priority;
        $this->add_date = $add_date;
    }

    /**
     * @param $playlist_id
     * @param $name
     * @param $description
     * @param $link
     *
     * @return int|string|null
     * @throws \RedBeanPHP\RedException\SQL
     */
    public static function addVideo($playlist_id, $name, $description, $link)
    {
        $video = R::dispense(self::TABLE);
        $video->name = $name;
        $video->playlist_id = $playlist_id;
        $video->description = $description;
        $video->link = $link;
        $video->preview = self::getPreviewPicLink($link);

        $id = R::store($video);
        $video = R::load(self::TABLE, $id);
        $video->priority = $id;
        R::store($video);
        return $id;
    }

    /**
     * @param $priority
     *
     * @return void
     * @throws \RedBeanPHP\RedException\SQL
     */
    public function setPriority($priority)
    {
        $video = R::load(self::TABLE, $this->id);
        $video->priority = $priority;
        R::store($video);
    }

    public function deleteVideo()
    {
        $video = R::load(self::TABLE, $this->id);
        R::trash($video);
    }

    /**
     * @param $playlist_id
     * @param $limit
     *
     * @return array
     */
    public static function getVideos($playlist_id, $limit): array
    {
        $videosResult = [];
        $videos = R::findAll(self::TABLE, 'playlist_id = ? order by priority desc limit ?', [$playlist_id, $limit]);

        foreach ($videos as $video) {
            $videosResult[] = new Video(
                $video->id,
                $video->name,
                $video->playlist_id,
                $video->description,
                $video->link,
                $video->preview,
                $video->priority,
                $video->add_date
            );
        }
        return $videosResult;
    }

    /**
     * @param $video_id
     *
     * @return Video
     */
    public static function getVideo($video_id): ?Video
    {
        $video = R::load(self::TABLE, $video_id);
        if (!$video->id) {
            return null;
        }

        return new Video(
            $video->id,
            $video->name,
            $video->playlist_id,
            $video->description,
            $video->link,
            $video->preview,
            $video->priority,
            $video->add_date,
        );
    }

    /**
     * Get video preview by youtube link
     *
     * @param $link
     *
     * @return string
     */
    private static function getPreviewPicLink($link): string
    {
        if (strpos($link, '?v=')) {
            $videoId = explode('?v=', $link)[1];
        } else {
            $videoId = explode('/', $link)[3] ?? null;
        }

        return "https://img.youtube.com/vi/$videoId/hqdefault.jpg";
    }

    /**
     * @param $name
     *
     * @return void
     * @throws \RedBeanPHP\RedException\SQL
     */
    public function setName($name)
    {
        $video = R::load(self::TABLE, $this->id);
        $video->name = $name;
        R::store($video);
        $this->name = $name;
    }

    /**
     * @param $description
     *
     * @return void
     * @throws \RedBeanPHP\RedException\SQL
     */
    public function setDescription($description)
    {
        $video = R::load(self::TABLE, $this->id);
        $video->description = $description;
        R::store($video);
        $this->description = $description;
    }

    /**
     * @param $partName
     *
     * @return array
     */
    public static function getVideosByPartName($partName): array
    {
        $resp = R::find(self::TABLE, 'name LIKE ?', ["%$partName%"]);
        $videos = [];
        foreach ($resp as $video) {
            $videos[] = new Video(
                $video->id,
                $video->name,
                $video->playlist_id,
                $video->description,
                $video->link,
                $video->preview,
                $video->priority,
                $video->add_date
            );
        }
        return $videos;
    }

}
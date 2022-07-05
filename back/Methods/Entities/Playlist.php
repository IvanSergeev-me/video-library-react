<?php


namespace Entities;

use R;

require_once 'rb-mysql.php';
require_once 'Video.php';


/**
 *
 */
class Playlist
{
    private const TABLE = 'playlists';

    public int $id;
    public string $name;
    public string $description;
    public int $creator_id;
    public int $priority;
    public string $creation_date;
    public array $videos;

    /**
     */
    public function __construct(
        $id=null,
        $name=null,
        $description=null,
        $creator_id=null,
        $priority=null,
        $creation_date=null,
        $videosLimit = 5
    )
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->creator_id = $creator_id;
        $this->priority = $priority;
        $this->creation_date = $creation_date;
        $this->videos = self::getVideos($videosLimit);
    }

    /**
     * @param int    $creator_id
     * @param string $name
     * @param string $description
     *
     * @return int
     * @throws \RedBeanPHP\RedException\SQL
     */
    public static function createPlaylist(int $creator_id, string $name, string $description): int
    {
        $playlist = R::dispense(self::TABLE);
        $playlist->creator_id = $creator_id;
        $playlist->name = $name;
        $playlist->description = $description;
        return R::store($playlist);
    }

    /**
     * @param int $id
     *
     * @return null|Playlist
     * @throws \Exception
     */
    public static function getPlaylist(int $id): ?Playlist
    {
        $playlist = R::load(self::TABLE, $id);
        if (!$playlist->id) {
            return null;
        }

        return new Playlist(
            $playlist->id,
            $playlist->name,
            $playlist->description,
            $playlist->creator_id,
            $playlist->priority,
            $playlist->creation_date,
            100
        );
    }

    /**
     * @return Playlist[]
     */
    public static function getPlaylists($creator_id): array
    {
        $playlistObjs = [];
        $playlists = R::findAll(self::TABLE, 'creator_id = ?', [$creator_id]);
        foreach ($playlists as $playlist) {
            $playlistObjs[] = new Playlist(
                $playlist->id,
                $playlist->name,
                $playlist->description,
                $playlist->creator_id,
                $playlist->priority,
                $playlist->creation_date
            );
        }
        return $playlistObjs;
    }

    /**
     * @param $priority
     *
     * @return void
     * @throws \RedBeanPHP\RedException\SQL
     */
    public function setPriority($priority)
    {
        $playlist = R::load(self::TABLE, $this->id);
        $playlist->priority = $priority;
        R::store($playlist);
    }

    /**
     * @param $name
     *
     * @return void
     * @throws \RedBeanPHP\RedException\SQL
     */
    public function setName($name)
    {
        $playlist = R::load(self::TABLE, $this->id);
        $playlist->name = $name;
        R::store($playlist);
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
        $playlist = R::load(self::TABLE, $this->id);
        $playlist->description = $description;
        R::store($playlist);
        $this->description = $description;
    }

    public function deletePlaylist()
    {
        $playlist = R::load(self::TABLE, $this->id);
        R::trash($playlist);
    }

    /**
     * @param int $limit
     *
     * @return array
     */
    public function getVideos(int $limit=5): array
    {
        return Video::getVideos($this->id, $limit);
    }
}
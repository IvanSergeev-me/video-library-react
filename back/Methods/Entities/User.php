<?php


namespace Entities;

use R;

require_once 'rb-mysql.php';
require_once 'Playlist.php';


/**
 *
 */
class User
{
    private const TABLE = 'users';

    public int $id;
    public string $username;
    public string $password;

    /**
     * @param $id
     * @param $username
     * @param $password
     */
    public function __construct($id=null, $username=null, $password=null)
    {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * @param string $username
     * @param string $password
     *
     * @return int new user's id
     * @throws \RedBeanPHP\RedException\SQL
     */
    public static function createUser(string $username, string $password): int
    {
        $user = R::dispense(self::TABLE);
        $user->username = $username;
        $user->password = $password;
        return R::store($user);
    }

    /**
     * @param int $id
     *
     * @return User|null
     */
    public static function getUser(int $id): ?User
    {
        $user = R::load(self::TABLE, $id);
        if (!$user->id) {
            return null;
        }

        return new User($user->id, $user->username, $user->password);
    }

    /**
     * @return Playlist[]
     */
    public function getPlaylists(): array
    {
        return Playlist::getPlaylists($this->id);
    }
}
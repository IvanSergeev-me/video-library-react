<?php

require_once 'Methods/GetPlaylist.php';
require_once 'Methods/GetPlaylists.php';
require_once 'Methods/AddPlaylist.php';
require_once 'Methods/RemovePlaylist.php';
require_once 'Methods/ChangePriorityPlaylist.php';
require_once 'Methods/EditPlaylist.php';
require_once 'Methods/AddVideo.php';
require_once 'Methods/ChangePriorityVideo.php';
require_once 'Methods/EditVideo.php';
require_once 'Methods/RemoveVideo.php';
require_once 'Methods/SearchVideos.php';

const API_METHODS = [
    // playlist methods
    'getPlaylist' => GetPlaylist::class,
    'getPlaylists' => GetPlaylists::class,
    'addPlaylist' => AddPlaylist::class,
    'removePlaylist' => RemovePlaylist::class,
    'changePriorityPlaylist' => ChangePriorityPlaylist::class,
    'editPlaylist' => EditPlaylist::class,
    // video methods
    'addVideo' => AddVideo::class,
    'changePriorityVideo' => ChangePriorityVideo::class,
    'editVideo' => EditVideo::class,
    'removeVideo' => RemoveVideo::class,
    'searchVideos' => SearchVideos::class
];

$requestUrl = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$methodName = explode('/', $requestUrl)[2];

if (!isset(API_METHODS[$methodName])) {
    die("No api method");
}

$className = API_METHODS[$methodName];
$class = new $className();
$class->actionDefault();

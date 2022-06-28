import axios from 'axios';
//var cors = require('cors');
// This should already be declared in your API file

const instance = axios.create({
    baseURL:"http://mycofe.ru/api/",
});
let headers = {
    "Content-Type": "application/json"
}
export const PlaylistAPI = {
    getPlaylists(creatorId){
        return instance.get(`getPlaylists.php?creator_id=${creatorId}`);
    },
    getPlaylist(id){
        return instance.get(`getPlaylist.php?id=${id}`)
    },
    deletePlaylist(id){
        return instance.post(`removePlaylist.php`, {id})
    },
    getShortPlaylists(creatorId){
        return instance.get(`getPlaylists.php?creator_id=${creatorId}&short=1`);
    },
    createPlaylist(creator_id, name){
        let playlist = {
            creator_id: creator_id,
            name: name,
            description: "",
        }
        return instance.post(`addPlaylist.php`, playlist, headers);
    }
};
export const VideoAPI = {
    addVideo(playlist_id, name, description, link){
        let video = {
            playlist_id:playlist_id,
            name:name,
            description:description,
            link:link
        }
        return instance.post(`addVideo.php`, video);
    }

}
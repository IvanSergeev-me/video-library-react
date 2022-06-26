import axios from 'axios';

const instance = axios.create({
    baseURL:"http://mycofe.ru/api/"
});
export const PlaylistAPI = {
    getPlaylists(creatorId){
        return instance.get(`getPlaylists.php?creator_id=${creatorId}`);
    },
    deletePlaylist(id){
        return instance.post(`removePlaylist.php`, {id})
    },
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
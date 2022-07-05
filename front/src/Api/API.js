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
        return instance.get(`getPlaylists?creator_id=${creatorId}`);
    },
    getPlaylist(id){
        return instance.get(`getPlaylist?id=${id}`)
    },
    deletePlaylist(id){
        return instance.post(`removePlaylist`, {id})
    },
    getShortPlaylists(creatorId){
        return instance.get(`getPlaylists?creator_id=${creatorId}&short=1`);
    },
    createPlaylist(creator_id, name){
        let playlist = {
            creator_id: creator_id,
            name: name,
            description: "",
        }
        return instance.post(`addPlaylist`, playlist, headers);
    },
    editPlaylist(id, name, description){
        let toEdit = {
            id:id,
            name:name,
            description:description
        }
        return instance.post(`editPlaylist`,toEdit);
    },
    changePriority(priority){
        return instance.post(`changePriorityPlaylist`, priority)
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
        return instance.post(`addVideo`, video);
    },
    editVideo(id, name, description){
        let toEdit = {
            id:id,
            name:name,
            description:description
        }
        return instance.post(`editVideo`,toEdit);
    },
    changePriority(id, newPriority){
        let toEdit = {
            id: id,
            priority: newPriority,
        }
        return instance.post(`changePriorityVideo`,toEdit);
    },
    deleteVideo(id){
        return instance.post(`removeVideo`, {id})
    },
}
export const SearchAPI = {
    getResult(query){
        return instance.get(`searchVideos?query=${query}`);
    },
}
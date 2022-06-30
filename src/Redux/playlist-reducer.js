import { PlaylistAPI, VideoAPI } from "../Api/API";

const UPDATE_TITLE = "playlist-reducer/UPDATE_TITLE";
const DELETE_PLAYLIST = "playlist-reducer/DELETE_PLAYLIST";
const DELETE_DESCRIPTION = "playlist-reducer/DELETE_DESCRIPTION";
const UPDATE_DESCRIPTION = "playlist-reducer/UPDATE_DESCRIPTION";
const SET_PLAYLIST = "playlist-reducer/SET_PLAYLIST";

let initialState = {
    //Страница конкретного плейлиста
    playlist:{
        id:0,
        name:"",
        description:"",
        creator_id:null,
        priority:0,
        creation_date:"",
        videos:[
            {
                id:0,
                link:"",
                name:"",
                description:"",
                priority:0,
                add_date:"",
            },
        ]
    },
    isEmpty:true

};
const playlistReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_PLAYLIST:
            return {...state, playlist:action.playlist, isEmpty:false}
        case UPDATE_DESCRIPTION:{
            let description = action.description;
            let newPlaylist = state.playlist;
            newPlaylist.description = description;
            return {...state,playlist:newPlaylist}
        }           
        case UPDATE_TITLE: {
            let title = action.title;
            let newPlaylist = state.playlist;
            newPlaylist.name = title;
            return {...state,playlist:newPlaylist}
        }           
        case DELETE_PLAYLIST:    
            return {...state,playlist:initialState.playlist, isEmpty:true};
        case DELETE_DESCRIPTION:
            return {...state, ...state.playlist.description = "Нет описания."}
        default: return state;
    };
};

export const updateTitle = (title) => ({type:UPDATE_TITLE, title});
export const updateDescription = (description) => ({type:UPDATE_DESCRIPTION, description});
export const deletePlaylist = () => ({type:DELETE_PLAYLIST});
export const deleteDescription = () => ({type:DELETE_DESCRIPTION});
export const setPlaylist = (playlist) => ({type:SET_PLAYLIST, playlist});

export const  deletePlaylistThunk = (id) => async (dispatch) =>{  
    await PlaylistAPI.deletePlaylist(id);
    dispatch(deletePlaylist());
}
export const updatePlaylist = (id, name, description) => async (dispatch) =>{
    await PlaylistAPI.editPlaylist(id, name, description)
    if (name) await dispatch(updateTitle(name));
    if (description) await dispatch(updateDescription(description));
}
export const updateVideo = (id, name, description) => async (dispatch) =>{
    await VideoAPI.editVideo(id, name, description)
}
export const getPlaylistThunk = (id) => async (dispatch) =>{
    let response = await PlaylistAPI.getPlaylist(id); 
    dispatch(setPlaylist(response.data))
}
export const updateVideoPriority = (id, newPriority) => async (dispatch) =>{
    await VideoAPI.changePriority(id, newPriority)
}

export default playlistReducer;
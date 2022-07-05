import { PlaylistAPI, VideoAPI } from "../Api/API";

const SET_CATEGORIES = "load-reducer/SET_CATEGORIES";

let initialState = {
    categories:[{id:0, name:""}]
};
const loadReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_CATEGORIES:    
            return {...state,categories:action.categories};
        default: return state;
    };
};

export const setCategories = (categories) => ({type:SET_CATEGORIES, categories});

export const  getCategoriesThunk = (creator_id) => async (dispatch) =>{  
    let response = await PlaylistAPI.getShortPlaylists(creator_id);
    dispatch(setCategories(response.data));
};
export const  createCategoryThunk = (creator_id, name) => async (dispatch) =>{  
    await PlaylistAPI.createPlaylist(creator_id, name);
    dispatch(getCategoriesThunk(creator_id));
};
export const  addVideoThunk = (playlist_id, name, description, link) => async (dispatch) =>{  
    await VideoAPI.addVideo(playlist_id, name, description, link);
};
export default loadReducer;
import { PlaylistAPI } from "../Api/API";

const SET_LIBRARY = "library-reducer/SET_LIBRARY";

let initialState = {
    isEmpty: true,
    playlists:[
        //Объект Категория
        {
            //Ид самой категории
            id: 0,
            //Ид создателя
            creator_id:null,
            //Название категории
            name:"",
            //Приоритет (задается пользователем)
            priority:0,
            //Дата создания плейлиста
            creation_date:"",
            //Видео внутри плейлиста
            videos:[
                //Объект Видео
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
    ]
};
const libraryReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_LIBRARY:{
            return {...state, playlists:action.playlists, isEmpty:false}
        }
        default: return state;
    };
};
export const setLibrary = (playlists) => ({type:SET_LIBRARY, playlists});
export const  getPlaylistsThunk = () => async (dispatch) =>{  
    let creator_id = 1;  
    let response = await PlaylistAPI.getPlaylists(creator_id);
        dispatch(setLibrary(response.data));
};
export default libraryReducer;
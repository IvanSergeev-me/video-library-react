import { PlaylistAPI } from "../Api/API";

const UPDATE_TITLE = "playlist-reducer/UPDATE_TITLE";
const DELETE_PLAYLIST = "playlist-reducer/DELETE_PLAYLIST";
const DELETE_DESCRIPTION = "playlist-reducer/DELETE_DESCRIPTION";
const UPDATE_DESCRIPTION = "playlist-reducer/UPDATE_DESCRIPTION";

let initialState = {
    //Страница конкретного плейлиста
    id:0,
    name:"Test",
    description:"Описание конкретного плейлиста пользователя, которое он сам задает",
    creator_id:null,
    priority:0,
    creation_date:"6 june, 20:20",
    //Структура элементов массива соотсветствует гл. страницеы
    videos:[
        {
            id:1,
            link:"https://www.youtube.com/watch?v=SmmUWN-VJCs",
            name:"test1",
            description:"Тестовое описание для видео под номером 1. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
            priority:0,
            add_date:"6 june, 20:20",
        },
        {
            id:2,
            link:"https://www.youtube.com/watch?v=SmmUWN-VJCs",
            name:"test2",
            description:"Тестовое описание для видео под номером 2. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
            priority:0,
            add_date:"6 june, 20:20",
        },
        {
            id:3,
            link:"https://www.youtube.com/watch?v=SmmUWN-VJCs",
            name:"test3",
            description:"Тестовое описание для видео под номером 2. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
            priority:0,
            add_date:"6 june, 20:20",
        },
        {
            id:4,
            link:"https://www.youtube.com/watch?v=SmmUWN-VJCs",
            name:"test4",
            description:"Тестовое описание для видео под номером 2. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
            priority:0,
            add_date:"6 june, 20:20",
        },
        {
            id:5,
            link:"https://www.youtube.com/watch?v=SmmUWN-VJCs",
            name:"test5",
            description:"Тестовое описание для видео под номером 2. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
            priority:0,
            add_date:"6 june, 20:20",
        },
        {
            id:6,
            link:"https://www.youtube.com/watch?v=SmmUWN-VJCs",
            name:"test6",
            description:"Тестовое описание для видео под номером 2. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
            priority:0,
            add_date:"6 june, 20:20",
        },
    ]

};
const playlistReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case UPDATE_DESCRIPTION:    
            return {...state,description:action.description};
        case UPDATE_TITLE:    
            return {...state,name:action.title};
        case DELETE_PLAYLIST:    
            return {...state,videos:[]};
        case DELETE_DESCRIPTION:
            return {...state, description:"Нет описания."}
        default: return state;
    };
};

export const updateTitle = (title) => ({type:UPDATE_TITLE, title});
export const updateDescription = (description) => ({type:UPDATE_DESCRIPTION, description});
export const deletePlaylist = () => ({type:DELETE_PLAYLIST});
export const deleteDescription = () => ({type:DELETE_DESCRIPTION});

export const  deletePlaylistThunk = (id) => async (dispatch) =>{  
    let response = await PlaylistAPI.deletePlaylist(id);
        //dispatch(deletePlaylist());
        console.log(response.data);   
};

export default playlistReducer;
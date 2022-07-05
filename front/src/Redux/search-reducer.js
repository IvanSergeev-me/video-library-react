import {SearchAPI } from "../Api/API";

const SET_RESULT = "search-reducer/SET_RESULT";

let initialState = {
    //Страница конкретного плейлиста
    videos:[
    ]

};
const searchReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_RESULT:
            return {...state, videos:action.result}
        default: return state;
    };
};

export const setResult = (result) => ({type:SET_RESULT, result});

export const getResultThunk = (query) => async (dispatch) =>{
    let response = await SearchAPI.getResult(query); 
    console.log(response.data)
    dispatch(setResult(response.data))
}


export default searchReducer;
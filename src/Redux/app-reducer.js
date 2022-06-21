const SET_INIT = "app-reducer/SET_INIT";
const SET_THEME = "app-reducer/SET_THEME";

let initialState = {
    initialised:false,
    theme:"default"
};
const appReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_INIT:    
            return {...state,initialised:true};
        case SET_THEME:
            return {...state, theme:action.theme}
        default: return state;
    };
};

export const setIniatialised = () => ({type:SET_INIT});
export const setTheme = (theme) => ({type:SET_THEME, theme});

export const  initialize = () => async (dispatch) =>{     
};
export default appReducer;

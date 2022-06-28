import React from 'react';
import { useSelector } from 'react-redux/es/exports';

export const withTheme = (Component) =>{
   
    return (props) => {
        let theme = useSelector(state => state.appInit.theme);
        return <Component {...props} theme={theme}/>
}
};

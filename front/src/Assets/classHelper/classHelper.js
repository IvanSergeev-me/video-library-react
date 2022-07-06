import classNames from "classnames/bind";

export const getButtonClass = (theme,styles, propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        button:true,
        buttonColor_default:theme==="default",
        buttonColor_light:theme==="light"
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
export const getTextClass = (theme,styles, propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        text:true,
        color_default:theme==="default",
        color_light:theme==="light"
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
export const getSectionClass = (theme,styles,propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        section:true,
        default_theme:theme==="default",
        light_theme:theme==="light"
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
export const getElementClass = (theme,styles,propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        element:true,
        default_element_theme:theme==="default",
        light_element_theme:theme==="light"
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
/*=====*/
export const getClass = (theme,styles, ...properties) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {}
    for(const property of properties){
        if(property) classNamesObject[property] = true;
        classNamesObject[`${property}_${theme}`] = true;
    }
    return cx(classNamesObject);
}
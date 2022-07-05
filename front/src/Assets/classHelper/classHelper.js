import classNames from "classnames/bind";

export const getButtonClass = (theme,styles, propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        button:true,
        buttonColor_default:theme==="default"?true:false,
        buttonColor_light:theme==="light"?true:false
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
export const getTextClass = (theme,styles, propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        text:true,
        color_default:theme==="default"?true:false,
        color_light:theme==="light"?true:false
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
export const getSectionClass = (theme,styles,propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        section:true,
        default_theme:theme==="default"?true:false,
        light_theme:theme==="light"?true:false
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
export const getElementClass = (theme,styles,propName) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {
        element:true,
        default_element_theme:theme==="default"?true:false,
        light_element_theme:theme==="light"?true:false
    }
    if(propName) classNamesObject[propName] = true;
    return cx(classNamesObject);
}
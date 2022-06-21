import classNames from "classnames/bind";

export const getButtonClass = (theme,styles) =>{
    let cx = classNames.bind(styles);
    return cx({
        button:true,
        buttonColor_default:theme==="default"?true:false,
        buttonColor_light:theme==="light"?true:false
    });
}
export const getTextClass = (theme,styles) =>{
    let cx = classNames.bind(styles);
    return cx({
        text:true,
        color_default:theme==="default"?true:false,
        color_light:theme==="light"?true:false
    });
}
export const getSectionClass = (theme,styles) =>{
    let cx = classNames.bind(styles);
    return cx({
        section:true,
        default_theme:theme==="default"?true:false,
        light_theme:theme==="light"?true:false
    });
}
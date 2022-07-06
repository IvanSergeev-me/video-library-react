import classNames from "classnames/bind";

export const getClass = (theme,styles, ...properties) =>{
    let cx = classNames.bind(styles);
    let classNamesObject = {}
    for(const property of properties){
        if(property) classNamesObject[property] = true;
        classNamesObject[`${property}_${theme}`] = true;
    }
    return cx(classNamesObject);
}
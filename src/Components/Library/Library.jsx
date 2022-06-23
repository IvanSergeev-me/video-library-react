import React from "react";
import { useSelector } from "react-redux";
import { getSectionClass, getTextClass } from "../../Assets/classHelper/classHelper";
import Greetings from "../Greetings/Greetings";
import CategoryRow from "./CategoryRow/CategoryRow";
import styles from "./Library.module.css";


const Library = (props) =>{
    let library = useSelector(state => state.library.playlists);
    let theme = useSelector(state => state.appInit.theme);

    if(library.length === 0) return <Greetings />;
    let playlists = library.map(categoryRow => <CategoryRow 
        key={categoryRow.id} 
        id={categoryRow.id} 
        name={categoryRow.name} 
        creationDate={categoryRow.creationDate}
        priority = {categoryRow.priority}
        theme = {theme}
        videos={categoryRow.videos}/>);
    let libraryClass = getSectionClass(theme, styles);
    let headingClass = getTextClass(theme, styles, "heading");
    return(
        <section className={libraryClass}>
            <h1 className={headingClass}>Ваша библиотека</h1>
            <div>
            
                {playlists}
            </div>
        </section>
    )
}
export default Library;
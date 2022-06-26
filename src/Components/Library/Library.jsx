import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSectionClass, getTextClass } from "../../Assets/classHelper/classHelper";
import { getPlaylistsThunk } from "../../Redux/library-reducer";
import Greetings from "../Greetings/Greetings";
import CategoryRow from "./CategoryRow/CategoryRow";
import styles from "./Library.module.css";


const Library = (props) =>{
    const dispatch = useDispatch();
    let library = useSelector(state => state.library.playlists);
    let theme = useSelector(state => state.appInit.theme);
    let isLibraryEmpty = useSelector(state => state.library.isEmpty);
    useEffect(() => {
        dispatch(getPlaylistsThunk());
    // eslint-disable-next-line
    },[]);
    if(isLibraryEmpty) return <Greetings />;
    let playlists = library.map(categoryRow => <CategoryRow 
        key={categoryRow.id} 
        id={categoryRow.id} 
        name={categoryRow.name} 
        creationDate={categoryRow.creation_date}
        priority = {categoryRow.priority}
        theme = {theme}
        videos={categoryRow.videos}/>);
    let libraryClass = getSectionClass(theme, styles);
    let headingClass = getTextClass(theme, styles, "heading");
    return(
        <section className={libraryClass}>
            <h1 className={headingClass}>Ваша библиотека</h1>
            <div className={styles.playlists_container}>
                {playlists}
            </div>
        </section>
    )
}
export default Library;
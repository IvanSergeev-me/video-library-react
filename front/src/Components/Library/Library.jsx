import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClass } from "../../Assets/classHelper/classHelper";
import { getPlaylistsThunk } from "../../Redux/library-reducer";
import Greetings from "../Greetings/Greetings";
import { withTheme } from "../HOC/withTheme";
import CategoryRow from "./CategoryRow/CategoryRow";
import styles from "./Library.module.css";

const Library = (props) =>{
    const dispatch = useDispatch();
    let library = useSelector(state => state.library.playlists);
    let isLibraryEmpty = useSelector(state => state.library.isEmpty);
    useEffect(() => {
        dispatch(getPlaylistsThunk());
    // eslint-disable-next-line
    },[]);

    let theme = props.theme;

    if(isLibraryEmpty || library.length === 0) return <Greetings />;

    let playlists = library.map(categoryRow => <CategoryRow 
        key={categoryRow.id} 
        id={categoryRow.id} 
        name={categoryRow.name} 
        creationDate={categoryRow.creation_date}
        priority = {categoryRow.priority}
        theme = {theme}
        videos={categoryRow.videos}/>);
    let libraryClass = getClass(theme, styles, "section");
    let headingClass = getClass(theme, styles, "heading","color");
    return(
        <section className={libraryClass}>
            <h1 className={headingClass}>Ваша библиотека</h1>
            <div className={styles.playlists_container}>
                {playlists}
            </div>
        </section>
    )
}
export default withTheme(Library);
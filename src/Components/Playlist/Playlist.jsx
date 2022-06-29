import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import styles from "./Playlist.module.css"
import { getButtonClass, getSectionClass, getTextClass } from "../../Assets/classHelper/classHelper";
import VideoCard from "../Library/VideoCard/VideoCard";
import pencil from "../../Assets/Images/pencil.png";
import cross from "../../Assets/Images/close.png";
import { updateDescription, updateTitle, deleteDescription, getPlaylistThunk, deletePlaylistThunk, deletePlaylist } from "../../Redux/playlist-reducer";
import { withTheme } from "../HOC/withTheme";
import { getPlaylistsThunk } from "../../Redux/library-reducer";

const Playlist = (props) =>{
    let params = useParams();
    let navigate = useNavigate();
    //let isEmpty = useSelector(state => state.playlist.isEmpty);
    let playlist = useSelector(state => state.playlist.playlist);
    let theme = props.theme;
    let dispatch = useDispatch();
    let [titleEditMode, toggleTitleEditMode] = useState(false);
    let [title, setTitle] = useState(playlist.name);

    let [descrEditMode, toggleDescrEditMode] = useState(false);
    let [description, setDescription] = useState(playlist.description);

    //Mount
    useEffect(()=>{
        dispatch(getPlaylistThunk(params.id));
        setTitle(playlist.name);
        setDescription(playlist.description);
        // eslint-disable-next-line
    },[playlist.name, playlist.description]);

    //Unmount
    useEffect(() => {
        return () => {
          dispatch(deletePlaylist())
        }
        // eslint-disable-next-line
      }, []);
    let toggleEditTitle = (param) =>{
        if (param === "title"){
            titleEditMode?toggleTitleEditMode(false):toggleTitleEditMode(true);
            if(titleEditMode){
                dispatch(updateTitle(title));
            }
        }
        if (param === "descr"){
            descrEditMode?toggleDescrEditMode(false):toggleDescrEditMode(true);
            if(descrEditMode){
                dispatch(updateDescription(description));
            }
        }
    }

    let deleteThisPlaylist = (e) =>{
        dispatch(deletePlaylistThunk(params.id));
        navigate("/");
        dispatch(getPlaylistsThunk());
        e.preventDefault();
    }
    let deleteThisDescription= (e) =>{
        dispatch(deleteDescription());
        e.preventDefault();
    }
    let onTitleChange = (e) =>{
        setTitle(e.currentTarget.value);
    }
    let onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value);
    }
    
    let videos = playlist.videos.sort((a,b)=>{if (a.priority > b.priority) {return 1;}if (a.name < b.name) {return -1;}return 0})
    .map(video=><VideoCard
        key = {video.id}
        id = {video.id}
        link = {video.link}
        name = {video.name}
        description = {video.description}
        priority = {video.priority}
        addDate = {video.add_date}
        theme={theme}
        
        />);
    return(
        <section className={styles.playlist_section}>
            <div className={styles.playlist_section__heading}>
                {titleEditMode?
                <div>
                    <textarea 
                        className={getSectionClass(theme,styles,"edit_field")} 
                        autoFocus={true} 
                        value = {title} 
                        onBlur={(e)=>{toggleEditTitle("title"); e.preventDefault();}} 
                        onChange={onTitleChange}/>
                </div>:
                <h2 
                    onDoubleClick={(e)=>{toggleEditTitle("title"); e.preventDefault();}} 
                    className={getTextClass(theme, styles, "heading__title")}>Ваш плейлист - {playlist.name}
                </h2>}
                <button 
                    onClick={(e)=>{toggleEditTitle("title"); e.preventDefault();}} 
                    className={getButtonClass(theme,styles, "heading__icon")}>
                        <img src={pencil} alt="edit" />
                </button>
                <button 
                    onClick={deleteThisPlaylist} 
                    className={getButtonClass(theme,styles, "heading__icon")}>
                        <img src={cross} alt="delete" />
                </button>
            </div>
            <div className={styles.playlist_section__description}>
            <span className={styles.date_text}>создан {playlist.creation_date}</span>
                {descrEditMode?
                <textarea 
                    className={getSectionClass(theme,styles,"edit_field")} 
                    autoFocus={true} 
                    value = {description} 
                    onBlur={(e)=>{toggleEditTitle("descr"); e.preventDefault();}} 
                    onChange={onDescriptionChange}/>:
                    <p 
                        onDoubleClick={(e)=>{toggleEditTitle("descr"); e.preventDefault();}} 
                        className={getTextClass(theme, styles, "description__text")}>{playlist.description}
                    </p>}
                <div className={styles.description__buttons}>
                    <button 
                        onClick={(e)=>{toggleEditTitle("descr"); e.preventDefault();}} 
                        className={getButtonClass(theme,styles, "heading__icon")}>
                            <img src={pencil} alt="edit" />
                    </button>
                    <button 
                        onClick={deleteThisDescription} 
                        className={getButtonClass(theme,styles, "heading__icon")}>
                            <img src={cross} alt="delete" />
                    </button>
                </div>
            </div>
            <div className={styles.playlist_section__videos}>
                    {videos}  
            </div>
            
        </section>
    )
}
export default withTheme(Playlist);
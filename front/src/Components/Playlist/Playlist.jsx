import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import styles from "./Playlist.module.css"
import { getButtonClass, getSectionClass, getTextClass } from "../../Assets/classHelper/classHelper";
import VideoCard from "../Library/VideoCard/VideoCard";
import pencil from "../../Assets/Images/pencil.png";
import cross from "../../Assets/Images/close.png";
import { getPlaylistThunk, deletePlaylistThunk, deletePlaylist, updatePlaylist, updateVideoPriority, deleteDescription } from "../../Redux/playlist-reducer";
import { withTheme } from "../HOC/withTheme";
import { getPlaylistsThunk } from "../../Redux/library-reducer";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import popup_styles from "./Popup.module.css";

const Playlist = (props) =>{
    let params = useParams();
    let navigate = useNavigate();
    let playlist = useSelector(state => state.playlist.playlist);
    let videos_ = useSelector(state => state.playlist.playlist.videos);
    let theme = props.theme;
    let dispatch = useDispatch();
    let [titleEditMode, toggleTitleEditMode] = useState(false);
    let [title, setTitle] = useState(playlist.name);

    let [descrEditMode, toggleDescrEditMode] = useState(false);
    let [description, setDescription] = useState(playlist.description);

    let [items, setItems] = useState(videos_);
    let [currentItem, setCurrentItem] = useState(null);
    
    //Mount
    useEffect(()=>{   
        setTitle(playlist.name);
        setDescription(playlist.description);
        setItems(videos_);
        dispatch(getPlaylistThunk(params.id));
        // eslint-disable-next-line
    },[playlist.name, playlist.description ]);

    //Unmount
    useEffect(() => {
        return () => {
            dispatch(deletePlaylist())
        }
        // eslint-disable-next-line
      }, []);

    //Update
    useEffect(() => {
        setItems(videos_);
        // eslint-disable-next-line
      }, [videos_]);

    let toggleEditTitle = (param) =>{
        if (param === "title"){
            titleEditMode?toggleTitleEditMode(false):toggleTitleEditMode(true);
            if(titleEditMode){
                dispatch(updatePlaylist(params.id, title, description));
            }
        }
        if (param === "descr"){
            descrEditMode?toggleDescrEditMode(false):toggleDescrEditMode(true);
            if(descrEditMode){
                dispatch(updatePlaylist(params.id, title, description));
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
        setTitle(e.currentTarget.value)
    }

    let onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value);
    }
    
    const dragStart = (e, video) => {
        setCurrentItem(video)
    }

    const dragLeave = (e, position) => {
        e.target.style.boxShadow = "none";
        e.target.style.background = "";
    }

    const dragOver = (e) =>{
       
        e.target.style.boxShadow = "10px 10px 10px 10px rgba(0, 0, 0, 0.55)";
        e.preventDefault();
    }

    const dragEnd = (e) =>{
        e.target.style.boxShadow = "none";
        e.target.style.background = "";
    }

    const drop = (e, video) => {
        setItems(items.map((item)=>{
            console.log(item)
        if(item.id === video.id){
            dispatch(updateVideoPriority(item.id, currentItem.priority));
            return {...item, priority:currentItem.priority}
        }
        if(item.id === currentItem.id){
            dispatch(updateVideoPriority(item.id, video.priority));
            return{...item, priority:video.priority}
        }
        return item;
        }))
        e.target.style.background = "";
        e.target.style.boxShadow = "none";
        e.preventDefault();
    };

    let videos = items.sort((a,b)=>{if (a.priority > b.priority) {return 1;}else {return -1;}})
    .map(video=><VideoCard
        onDragStart={(e) => dragStart(e, video)}
        onDragLeave={dragLeave}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        onDrop={(e) => drop(e, video)}
        draggable={true}
        key = {video.id}
        id = {video.id}
        link = {video.link}
        name = {video.name}
        description = {video.description}
        priority = {video.priority}
        addDate = {video.add_date}
        canEdit={true}
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
                    className={getTextClass(theme, styles, "heading__title")}>Ваш плейлист - {title}
                </h2>}
                <button 
                    onClick={(e)=>{toggleEditTitle("title"); e.preventDefault();}} 
                    className={getButtonClass(theme,styles, "heading__icon")}>
                        <img src={pencil} alt="edit" />
                </button>
                <Popup position="right center" trigger={<button 
                    className={getButtonClass(theme,styles, "heading__icon")}>
                        <img src={cross} alt="delete" />
                </button>}>
                    <div className={getSectionClass(theme, popup_styles)}>
                        <div className={getTextClass(theme, popup_styles, "popup_text")}>Вы уверены?</div>
                        <div className={getButtonClass(theme, popup_styles)} onClick={deleteThisPlaylist} >Да</div>
                    </div>
                </Popup>
                
            </div>
            <div className={styles.playlist_section__description}>
            <span className={styles.date_text}>создан {playlist.creation_date}</span>
                {descrEditMode?
                <textarea 
                    className={getSectionClass(theme,styles,"edit_field")} 
                    autoFocus={true} 
                    value = {description} 
                    placeholder={"Введите описание"}
                    onBlur={(e)=>{toggleEditTitle("descr"); e.preventDefault();}} 
                    onChange={onDescriptionChange}/>:
                    <p 
                        onDoubleClick={(e)=>{toggleEditTitle("descr"); e.preventDefault();}} 
                        className={getTextClass(theme, styles, "description__text")}>{description?description:"Добавьте описание плейлиста"}
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
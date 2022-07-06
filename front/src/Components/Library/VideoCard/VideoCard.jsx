import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { getElementClass, getTextClass } from "../../../Assets/classHelper/classHelper";
import { deleteVideoThunk, updateVideo } from "../../../Redux/playlist-reducer";
import pencil from "../../../Assets/Images/pencil.png";
import styles from "../Library.module.css";

const VideoCard = (props) =>{
    let link = props.link;
    let canEdit = props.canEdit;
    let pureLink = link.replaceAll('https://www.youtube.com/watch?v=', '');
    let picture = `https://img.youtube.com/vi/${pureLink}/hqdefault.jpg`;
    let dispatch = useDispatch();
   
    let [mouseOnVideo, toggleDescription] = useState(false);

    let [descrEditMode, toggleDescrEditMode] = useState(false);
    let [description, setDescription] = useState(props.description);

    let [nameEditMode, toggleNameEditMode] = useState(false);
    let [name, setName] = useState(props.name);

    let [isNameHover, toggleNameHover] = useState(false);

    let onVideoMouseEnter = () =>{
        mouseOnVideo?toggleDescription(false):toggleDescription(true);
    }
    let onNameHover = () =>{
        if(canEdit) isNameHover?toggleNameHover(false): toggleNameHover(true);
    }

    let onDescriptionEdit = (e) =>{
        if(canEdit){
            descrEditMode?toggleDescrEditMode(false):toggleDescrEditMode(true);
            if(descrEditMode){
                dispatch(updateVideo(props.id,name, description));
            }
        }   
        e.preventDefault();
    }

    let onNameEdit = (e) =>{
        if(canEdit){
            toggleNameHover(false);
            nameEditMode?toggleNameEditMode(false):toggleNameEditMode(true);
            if(nameEditMode){
                dispatch(updateVideo(props.id, name, description));
            }
        }
        e.preventDefault();
    }

    let onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value);
    }

    let onNameChange = (e) =>{
        setName(e.currentTarget.value);
    }

    let onDelete = () =>{
        dispatch(deleteVideoThunk(props.id));
    }

    return(
        <div draggable={props.draggable} 
            onDragStart={props.onDragStart}
            onDragLeave={props.onDragLeave}
            onDragOver={props.onDragOver}
            onDragEnd={props.onDragEnd} 
            onDrop={props.onDrop} 
            className={styles.video_container}>
            <div onMouseEnter={onVideoMouseEnter} onMouseLeave={onVideoMouseEnter} className={styles.video_container__video}>
                <img className={styles.video__preview} src={picture} alt="video_preview" />
                {mouseOnVideo?
                <div className={styles.video__description}>
                    {canEdit?<div className={styles.description__top_panel}><span onClick={onDelete}>Удалить</span></div>:null}
                    <div>
                        <p className={styles.description__date}>Добавлен {props.addDate}</p>
                        {descrEditMode?<textarea 
                            className={styles.description__textarea} 
                            autoFocus={true} 
                            value={description}
                            onChange={onDescriptionChange}
                            placeholder={"Введите описание"} 
                            onBlur={onDescriptionEdit} />:
                        <p onDoubleClick={onDescriptionEdit} className={styles.description__text}>
                            {description?description:
                            canEdit?<button onClick={onDescriptionEdit} className={styles.description__button}>Добавить описание</button>:null}
                        </p>}
                    </div>
                    
                </div>:null}
                
            </div>
            <div className={styles.video_container__info}>
                {nameEditMode?<input className={styles.info__video_name_edit}  value={name} autoFocus={true} onBlur={onNameEdit} onChange={onNameChange}/>: 
                <p onMouseEnter={onNameHover} onMouseLeave={onNameHover} className={getTextClass(props.theme, styles, "info__video_name")} onDoubleClick={onNameEdit}>
                    <span>{name}</span> {isNameHover?<img className={getElementClass(props.theme, styles, "info__video_name_edit_pencil")} onClick={onNameEdit} src={pencil} alt={"pencil"}/>:null}
                </p>}
               
                <a href={link} className={getTextClass(props.theme, styles, "info__video_link")}>Перейти к источнику</a>
            </div>
        </div>
    )
}
export default React.memo(VideoCard);


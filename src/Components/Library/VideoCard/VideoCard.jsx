import React, { useState} from "react";
import { getTextClass } from "../../../Assets/classHelper/classHelper";
import styles from "../Library.module.css";

const VideoCard = (props) =>{
    let link = props.link;
    let name = props.name;
    let pureLink = link.replaceAll('https://www.youtube.com/watch?v=', '');
    let picture = `https://img.youtube.com/vi/${pureLink}/hqdefault.jpg`;
    let [mouseOnVideo, toggleDescription] = useState(false);
    let onVideoMouseEnter = () =>{
        mouseOnVideo?toggleDescription(false):toggleDescription(true);
    }
    
    return(
        <div 
            className={styles.video_container}>
            <div onMouseEnter={onVideoMouseEnter} onMouseLeave={onVideoMouseEnter} className={styles.video_container__video}>
                <img className={styles.video__preview} src={picture} alt="video_preview" />
                {mouseOnVideo?
                <div className={styles.video__description}>
                    <p className={styles.description__date}>Добавлен {props.addDate}</p>
                    <p className={styles.description__text}>{props.description}</p>
                </div>:null}
                
            </div>
            <div className={styles.video_container__info}>
                <p className={getTextClass(props.theme, styles, "info__video_name")}>{name}</p>
                <a href={link} className={getTextClass(props.theme, styles, "info__video_link")}>Перейти к источнику</a>
            </div>
        </div>
    )
}
export default VideoCard;
/*
draggable={true} 
            onDragStart={e => dragStartHandler(e)} 
            onDragOver={e => dragOverHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragEnd={e=>dragEndHandler(e)}
            onDrop={e => dropHandler(e)}

            let dragStartHandler = (e) =>{
        console.log("drug")
        e.preventDefault();
    }
    let dragOverHandler = (e) =>{
        console.log("over")
        e.preventDefault();
    }
    let dragLeaveHandler = (e) =>{
        console.log("leave")
        e.preventDefault();
    }
    let dragEndHandler = (e) =>{
        console.log("end")
        e.preventDefault();
    }
    let dropHandler = (e) =>{
        console.log("drop")
        e.preventDefault();
    }
            */
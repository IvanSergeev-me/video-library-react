import React from "react";
import VideoCard from "../VideoCard/VideoCard";
import styles from "../Library.module.css";
import buttonStyles from "./CategoryRow.module.css";
import { getTextClass, getButtonClass } from "../../../Assets/classHelper/classHelper";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import { NavLink } from "react-router-dom";
import { isVideosEmpty } from "../../../Assets/objectHelper/objectHelper";

const CategoryRow = (props) =>{
    let theme = props.theme;
    let videos = props.videos.map(video=><VideoCard
    key = {video.id}
    id = {video.id}
    link = {video.link}
    name = {video.name}
    canEdit={false}
    description = {video.description}
    priority = {video.priority}
    addDate = {video.add_date}
    theme={theme}
    />);
    const options = {
        items: 5,
        nav: false,
        rewind: true,
        autoplay: true
    };
    return(
        <div className={styles.category_row}>
            <div className={styles.category_row__heading}>
                <NavLink to={`playlist/${props.id}`}><h3 className={getTextClass(theme, styles, "row_title")}>{props.name}</h3></NavLink>
                <span className={styles.date_text}>создан {props.creationDate}</span>
            </div>
            {isVideosEmpty(props.videos)?
                    <div className={styles.videos__add_some_video}>
                        <p className={getTextClass(theme, styles, "videos__text")}>В этом плейлисте пока нет видео</p>
                        <NavLink className={getButtonClass(theme, buttonStyles)} to="/load">Загрузить видео</NavLink>
                    </div>:
                    <div className={styles.category_row__videos}>
                    <OwlCarousel options={options}>
                        {videos}
                        <NavLink to={`playlist/${props.id}`} className={getButtonClass(theme, styles, "videos__more_button")}>
                            <span>Ещё</span>
                        </NavLink>
                    </OwlCarousel>
                
            </div>}
        </div>
    )
}

export default CategoryRow;
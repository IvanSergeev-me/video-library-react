import React from "react";
import VideoCard from "../VideoCard/VideoCard";
import styles from "../Library.module.css";
import { getTextClass } from "../../../Assets/classHelper/classHelper";
//import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CategoryRow = (props) =>{
    let theme = props.theme;
    let videos = props.videos.map(video=><VideoCard
    key = {video.id}
    id = {video.id}
    link = {video.link}
    name = {video.name}
    description = {video.description}
    priority = {video.priority}
    addDate = {video.addDate}
    theme={theme}
    />);
    return(
        <div className={styles.category_row}>
            <div className={styles.category_row__heading}>
                <h3 className={getTextClass(theme, styles, "row_title")}>{props.name}</h3>
                <span className={styles.date_text}>{props.creationDate}</span>
            </div>
            <div className={styles.category_row__videos}>
                {videos}
            </div>
        </div>
    )
}

export default CategoryRow;
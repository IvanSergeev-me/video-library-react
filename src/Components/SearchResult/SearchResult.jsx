import React from 'react';
import { useSelector } from 'react-redux';
import { withTheme } from '../HOC/withTheme';
import VideoCard from '../Library/VideoCard/VideoCard';
import styles from './SearchResult.module.css';
import { getTextClass } from '../../Assets/classHelper/classHelper';

const SearchResult = (props) => {
    let result = useSelector(state => state.search.videos);
    let theme = props.theme;
    if(result.length === 0) return <div className={getTextClass(theme, styles, "result_section__heading")}>Ничего не нашлось :\</div>
    let resultData = result.map(video=><VideoCard
        draggable={false}
        key = {video.id}
        id = {video.id}
        link = {video.link}
        name = {video.name}
        description = {video.description}
        priority = {video.priority}
        addDate = {video.add_date}
        canEdit={true}
        theme={theme}      
        />)
    return ( 
        <div className={styles.result_section}>
            <h2 className={getTextClass(theme, styles, "result_section__heading")}>Результаты поиска - найдено: {result.length}</h2>
            <div className={styles.result_section__videos}>
                {resultData}
            </div>
        </div>
    );
}
 
export default withTheme(SearchResult);
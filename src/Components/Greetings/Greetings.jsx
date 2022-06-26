import React from "react";
import styles from './Greetings.module.css';
import { useSelector } from "react-redux";
import Carousel from 'react-spring-3d-carousel';
import { config } from "react-spring";
import {slides} from "./slides.js";
import {getButtonClass, getSectionClass, getTextClass} from "../../Assets/classHelper/classHelper";
import { NavLink } from "react-router-dom";

const Greetings = (props) =>{

    let theme = useSelector(state => state.appInit.theme);
    
    let greetingsClass = getSectionClass(theme, styles);
    let buttonColorClass = getButtonClass(theme, styles);
    let textColorClass = getTextClass(theme, styles);

    return(
        <section className={greetingsClass}>
                <div className={styles.text_container}><p className={textColorClass}>Данный проект - является курсовой работой студента Московского Политеха, Сергеева Ивана. <br />
                Этот сайт помогает в создании различных видеобиблиотек, которыми управляет пользователь.<br />То, что вы сможете получить, показано на картинках ниже. Приятного использования!
                </p></div>
                <div className={styles.Carousel}>
                    <Carousel slides={slides} showNavigation={true} animationConfig={config.wobbly} goToSlideDelay={1000} goToSlide={0}/>
                </div>
                <div className={styles.button_container}>
                    <NavLink to="/load" className={buttonColorClass}>Создать свою коллекцию</NavLink>
                </div>  
        </section>
    )
}
export default Greetings;
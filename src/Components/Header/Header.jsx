import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { setTheme } from "../../Redux/app-reducer";
import { options, defaultStyles, lightStyles, defaultThemeSelect, lightThemeSelect} from "./Options";
import { getButtonClass, getTextClass } from "../../Assets/classHelper/classHelper";

let cx = classNames.bind(styles);

const Header = (props) =>{
    const dispatch = useDispatch();

    let theme = useSelector(state => state.appInit.theme);
    let headerClass = cx({
        header: true,
        default_theme:theme==="default"?true:false,
        light_theme:theme==="light"?true:false
      });
    let textColorClass = getTextClass(theme, styles);
    let buttonColorClass = getButtonClass(theme, styles);
    let onSelectChange = (value) =>{
        let payload = value.value;
        dispatch(setTheme(payload));
    }
    
    let stylesSelect = theme==="default"?defaultStyles:lightStyles;
    let themeSelect = theme==="default"?defaultThemeSelect:lightThemeSelect;

    return(
        <header className={headerClass}>
            <div className={styles.header__left}>
                <nav className={styles.header__nav}>
                    <NavLink className={buttonColorClass} to="/">Моя библиотека</NavLink>
                    <NavLink className={buttonColorClass} to="/load">Добавить</NavLink>
                </nav>
            </div> 
            <div className={styles.header__search}>
                Тут поиск будет
            </div>
            <div className={styles.header__right}>
                <div className={styles.header__select}>
                    <span className={textColorClass}>Тема:</span>
                    <Select onChange={onSelectChange} styles={stylesSelect} theme={themeSelect} options={options}  defaultValue={options[0]}/>
                </div>
                <NavLink className={buttonColorClass} to="/registration">Регистрация</NavLink>
                <NavLink className={buttonColorClass} to="/login">Вход</NavLink>
            </div>
        </header>
    )
}
export default Header;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import form_styles from './Form.module.css';
import { useDispatch} from "react-redux";
import Select from 'react-select'
import { setTheme } from "../../Redux/app-reducer";
import { options, customStyles} from "./Options";
import {getClass, getElementClass, getSectionClass} from "../../Assets/classHelper/classHelper";
import { getStylesSelect } from "../../Assets/SelectHelper/SelectHelper";
import { withTheme } from "../HOC/withTheme";
import { useForm} from "react-hook-form";
import { getResultThunk } from "../../Redux/search-reducer";

const Header = (props) =>{
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let theme = props.theme;
    let headerClass = getSectionClass(theme,styles,"header")

    let onSelectChange = (value) =>{
        let payload = value.value;
        dispatch(setTheme(payload));
    }
    
    let stylesSelect = getStylesSelect(theme, customStyles);

    let onFormSubmit = (query) =>{
        navigate("/search");
        dispatch(getResultThunk(query.query));
    }

    return(
        <header className={headerClass}>
            <div className={styles.header__left}>
                <nav className={styles.header__nav}>
                    <NavLink className={getClass(theme, styles, "button")} to="/">Моя библиотека</NavLink>
                    <NavLink className={getClass(theme, styles, "button")} to="/load">Добавить</NavLink>
                </nav>
            </div> 
            <div className={getClass(theme, styles, "text")}>
                <SearchForm onFormSubmit={onFormSubmit} theme={theme}/>
            </div>
            <div className={styles.header__right}>
                <div className={styles.header__select}>
                    <span className={getClass(theme, styles, "text")}>Тема:</span>
                    <Select onChange={onSelectChange} styles={stylesSelect} options={options}  defaultValue={options[0]}/>
                </div>
                <NavLink className={getClass(theme, styles, "button")} to="/registration">Регистрация</NavLink>
                <NavLink className={getClass(theme, styles, "button")} to="/login">Вход</NavLink>
            </div>
        </header>
    )
}
const SearchForm = (props) => {
    // eslint-disable-next-line 
    const { register, handleSubmit, watch} = useForm();

    let onSubmit = (data) =>{ 
        props.onFormSubmit(data);
    }
    return ( 
        <form className={form_styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input className={getElementClass(props.theme, form_styles, "form__input")} placeholder="Поиск по видео" {...register("query")} />
            <button to={"/search"} className={getClass(props.theme, form_styles, "form__button")} type="submit">Найти</button>
        </form>
     );
}
 

export default withTheme(Header);
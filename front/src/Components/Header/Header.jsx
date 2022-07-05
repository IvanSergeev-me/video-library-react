import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import form_styles from './Form.module.css';
import { useDispatch} from "react-redux";
import Select from 'react-select'
import { setTheme } from "../../Redux/app-reducer";
import { options, customStyles} from "./Options";
import { getButtonClass, getElementClass, getSectionClass, getTextClass } from "../../Assets/classHelper/classHelper";
import { getStylesSelect } from "../../Assets/SelectHelper/SelectHelper";
import { withTheme } from "../HOC/withTheme";
import { useForm} from "react-hook-form";
import { getResultThunk } from "../../Redux/search-reducer";

const Header = (props) =>{
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let theme = props.theme;
    let headerClass = getSectionClass(theme,styles,"header")
    let textColorClass = getTextClass(theme, styles);
    let buttonColorClass = getButtonClass(theme, styles);

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
                    <NavLink className={buttonColorClass} to="/">Моя библиотека</NavLink>
                    <NavLink className={buttonColorClass} to="/load">Добавить</NavLink>
                </nav>
            </div> 
            <div className={getTextClass(theme, styles, "header__search")}>
                <SearchForm onFormSubmit={onFormSubmit} theme={theme}/>
            </div>
            <div className={styles.header__right}>
                <div className={styles.header__select}>
                    <span className={textColorClass}>Тема:</span>
                    <Select onChange={onSelectChange} styles={stylesSelect} options={options}  defaultValue={options[0]}/>
                </div>
                <NavLink className={buttonColorClass} to="/registration">Регистрация</NavLink>
                <NavLink className={buttonColorClass} to="/login">Вход</NavLink>
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
            <button to={"/search"} className={getButtonClass(props.theme, form_styles, "form__button")} type="submit">Найти</button>
        </form>
     );
}
 

export default withTheme(Header);
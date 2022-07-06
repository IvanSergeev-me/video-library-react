import React, { useEffect, useState } from "react";
import {  getClass } from "../../Assets/classHelper/classHelper";
import { withTheme } from "../HOC/withTheme";
import styles from "./Load.module.css";
import aside_styles from "./Aside.module.css";
import form_styles from "./Form.module.css";
import popup_styles from "./Popup.module.css";
import { useForm} from "react-hook-form";
import { addVideoThunk, createCategoryThunk, getCategoriesThunk } from "../../Redux/load-reducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Load = (props) =>{

    let dispatch = useDispatch();
    let creator_id = 1; //hardcoded value
    let [selectedCategory, selectCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () =>  setModalOpen(false);

    let categories = useSelector(state => state.load.categories);

    useEffect(() => {
        dispatch(getCategoriesThunk(creator_id));
    // eslint-disable-next-line
    },[]);
     
    const onAsideSubmit = (data) =>{
        dispatch(createCategoryThunk(creator_id, data.new_category_name))
    }
    const onVideoSubmit = (data) =>{
        let name = data.name;
        let description = data.description;
        let link = data.link;
        if(selectedCategory){
            dispatch(addVideoThunk(selectedCategory, name, description, link));
            setModalOpen(true)
        }
        else{
            console.log("wrong")
        }
    }
    const onCategorySelect = (id) =>{
        selectCategory(id);
    }

    let theme = props.theme;
    const contentStyle = { padding: '0', border:"none" };
    return(
        <section className={styles.load_section}>
             <Popup className={popup_styles.popupContent} modal closeOnDocumentClick onClose={closeModal} open={modalOpen} position="right center"
             {...{ contentStyle}}>
                <div className={getClass(theme, popup_styles,"section")}>
                    <div className={popup_styles.top_panel}><span onClick={closeModal} className={getClass(theme, popup_styles, "section__close","color")}>Закрыть</span></div>
                    <div className={getClass(theme, popup_styles, "section__header","color")}>Видео добавлено!</div>
                    <div className={getClass(theme, popup_styles, "section__text","color")}>Вы можете посмотреть его в Вашей библиотеке</div>
                    <NavLink className={getClass(theme,popup_styles,"button")} to={"/"}>Перейти</NavLink>
                </div>     
            </Popup>
            <aside className={getClass(theme, aside_styles, "load_section__aside","section")}>
                <div className={aside_styles.aside_top}>
                    <h3 className={getClass(theme, aside_styles, "aside_top__header", "color")}>Ваши плейлисты</h3>
                    <div className={aside_styles.aside_top__categories}>
                        {categories.map(category => <Category 
                        selectedCategory={selectedCategory} 
                        onCategorySelect={onCategorySelect} 
                        key={category.id} id={category.id} 
                        name={category.name} theme={theme}/>)}
                    </div>
                </div>
                <div className={aside_styles.aside__add_category_form}> 
                    <h2 className={getClass(theme, aside_styles, "aside_top__header","color")}>Создайте плейлист</h2> 
                    <AddCategoryForm onAsideSubmit={onAsideSubmit} theme={theme} />
                </div>
            </aside>
            <div className={styles.load_section__add_container}>
                <h2 className={getClass(theme, styles, "add_container__header","color")}>Добавьте ваше видео</h2>
                <div className={styles.add_container__form}>
                    <AddVideoForm onVideoSubmit={onVideoSubmit} theme={theme} selectedCategory={selectedCategory}/>
                </div>
            </div>
        </section>
    )
}
const Category = (props) =>{
    let SelectThis = () =>{
        props.onCategorySelect(props.id);
    }
    let isSelected = props.selectedCategory === props.id;
    return(
        <div onClick={SelectThis} className={`${aside_styles.category_container} ${isSelected?aside_styles.selected_category:null} ${getClass(props.theme, aside_styles,"section")}`}>
            <p className={getClass(props.theme, aside_styles, "category_text","color")}>{props.name}</p>
        </div>
    )
}
/*======== FORMS BELOW ========*/

let AddCategoryForm = (props) =>{
    // eslint-disable-next-line 
    const { register, handleSubmit,reset, watch,  formState: { errors } } = useForm();
    let onSubmit = (data) =>{ 
        props.onAsideSubmit(data);
        reset();  
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className={form_styles.category_form__container}>
            
            {errors.new_category_name && <span className={getClass(props.theme, form_styles, "error_label","color")}>Это поле обязательно</span>}
            <div className={form_styles.category_form__fields}>
                <input className={getClass(props.theme, form_styles, "category_form__input","section")} placeholder="Название категории..." {...register("new_category_name", { required: true })} />
                <button className={getClass(props.theme, form_styles, "category_form__button","button")} type="submit">Создать</button>
            </div>
        </form>
    )
    
}
let AddVideoForm = (props) =>{
    // eslint-disable-next-line 
    const { register, control, handleSubmit,setError,clearErrors, watch, reset, formState: { errors } } = useForm();
    let onSubmit = (data) =>{
            props.onVideoSubmit(data);
            reset();
    }
    let checkErrors = () =>{
        if(!props.selectedCategory) setError("categoryNotSelected");
        else clearErrors("categoryNotSelected");
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className={form_styles.video_form__container}>
            <div className={form_styles.video_form__fields}>
            {errors.categoryNotSelected && <span className={getClass(props.theme, form_styles, "error_label","color")}>Укажите плейлист для загрузки</span>}
            {errors.name && <span className={getClass(props.theme, form_styles, "error_label","color")}>Это поле обязательно</span>}
                <input className={getClass(props.theme, form_styles, "video_form__input","section")} 
                    placeholder="Название видео..." {...register("name", { required: true })} />
            </div>
            <div className={form_styles.video_form__fields}>
            {errors.link && <span className={getClass(props.theme, form_styles, "error_label","color")}>Это поле обязательно</span>}
                <input className={getClass(props.theme, form_styles, "video_form__input","section")} 
                    placeholder="Ссылка на видео..." {...register("link", { required: true })} />
            </div>
            <div className={form_styles.video_form__fields}>
                <textarea className={getClass(props.theme, form_styles, "video_form__textarea","section")} 
                    {...register("description", { required: false })} placeholder="Описание (необязательно)..."/>
            </div>
            <button onClick={checkErrors} className={getClass(props.theme, form_styles, "video_form__button","button")} type="submit">Добавить</button>
            
        </form>
    )
}
export default withTheme(Load);



import React, { useEffect, useState } from "react";
import { getSectionClass, getTextClass, getButtonClass } from "../../Assets/classHelper/classHelper";
import { withTheme } from "../HOC/withTheme";
import styles from "./Load.module.css";
import aside_styles from "./Aside.module.css";
import form_styles from "./Form.module.css";
import { useForm, Controller } from "react-hook-form";
import { addVideoThunk, createCategoryThunk, getCategoriesThunk } from "../../Redux/load-reducer";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { customStyles, options } from "./Options";
import { getStylesSelect} from "../../Assets/SelectHelper/SelectHelper";

const Load = (props) =>{

    let dispatch = useDispatch();
    let creator_id = 1; //hardcoded value
    let [selectedCategory, selectCategory] = useState(null);

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
        }
        else{
            console.log("wrong")
        }
    }
    const onCategorySelect = (id) =>{
        selectCategory(id);
    }

    let theme = props.theme;
    
    return(
        <section className={styles.load_section}>
            <aside className={getSectionClass(theme, aside_styles, "load_section__aside")}>
                <div className={aside_styles.aside_top}>
                    <h3 className={getTextClass(theme, aside_styles, "aside_top__header")}>Ваши плейлисты</h3>
                    <div className={aside_styles.aside_top__categories}>
                        {categories.map(category => <Category 
                        selectedCategory={selectedCategory} 
                        onCategorySelect={onCategorySelect} 
                        key={category.id} id={category.id} 
                        name={category.name} theme={theme}/>)}
                    </div>
                </div>
                <div className={aside_styles.aside__add_category_form}> 
                    <h2 className={getTextClass(theme, aside_styles, "aside_top__header")}>Создайте плейлист</h2> 
                    <AddCategoryForm onAsideSubmit={onAsideSubmit} theme={theme}/>
                </div>
            </aside>
            <div className={styles.load_section__add_container}>
                <h2 className={getTextClass(theme, styles, "add_container__header")}>Добавьте ваше видео</h2>
                <div className={styles.add_container__form}>
                    <AddVideoForm onVideoSubmit={onVideoSubmit} theme={theme}/>
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
        <div onClick={SelectThis} className={`${aside_styles.category_container} ${isSelected?aside_styles.selected_category:null} ${getSectionClass(props.theme, aside_styles)}`}>
            <p className={getTextClass(props.theme, aside_styles, "category_text")}>{props.name}</p>
        </div>
    )
}
/*======== FORMS BELOW ========*/

let AddCategoryForm = (props) =>{
    // eslint-disable-next-line 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    return(
        <form onSubmit={handleSubmit(props.onAsideSubmit)} className={form_styles.category_form__container}>
            {errors.new_category_name && <span className={getTextClass(props.theme, form_styles, "error_label")}>Это поле обязательно</span>}
            <div className={form_styles.category_form__fields}>
                <input className={getSectionClass(props.theme, form_styles, "category_form__input")} placeholder="Название категории..." {...register("new_category_name", { required: true })} />
                <button className={getButtonClass(props.theme, form_styles, "category_form__button")} type="submit">Создать</button>
            </div>
        </form>
    )
    
}
let AddVideoForm = (props) =>{
    // eslint-disable-next-line 
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({defaultValues: {
        priority: 0
      }});
    let selectStyles = getStylesSelect(props.theme, customStyles);
    
    return(
        <form onSubmit={handleSubmit(props.onVideoSubmit)} className={form_styles.video_form__container}>
            <div className={form_styles.video_form__fields}>
            {errors.name && <span className={getTextClass(props.theme, form_styles, "error_label")}>Это поле обязательно</span>}
                <input className={getSectionClass(props.theme, form_styles, "video_form__input")} 
                    placeholder="Название видео..." {...register("name", { required: true })} />
            </div>
            <div className={form_styles.video_form__fields}>
            {errors.link && <span className={getTextClass(props.theme, form_styles, "error_label")}>Это поле обязательно</span>}
                <input className={getSectionClass(props.theme, form_styles, "video_form__input")} 
                    placeholder="Ссылка на видео..." {...register("link", { required: true })} />
            </div>
            <div className={form_styles.video_form__fields}>
                <textarea className={getSectionClass(props.theme, form_styles, "video_form__textarea")} 
                    {...register("description", { required: false })} placeholder="Описание (необязательно)..."/>
            </div>
            <button className={getButtonClass(props.theme, form_styles, "video_form__button")} type="submit">Добавить</button>
        </form>
    )
}
export default withTheme(Load);



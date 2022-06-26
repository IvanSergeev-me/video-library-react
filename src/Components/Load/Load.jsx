import React from "react";

const Load = (props) =>{
    return(
        <section>
            <aside>
                <h3>Ваши плейлисты</h3>
                <div>
                    <PlaylistCard />
                </div>
                <div>
                    form here
                </div>
            </aside>
            <div>
                <h2>Добавьте ваше видео</h2>
                <div>
                    тут формы
                </div>
            </div>
        </section>
    )
}
export default Load;

const PlaylistCard = (props) =>{
    return(
        <div>
            <p>Название плейлиста из бд</p>
        </div>
    )
}
/*
const onSubmit = (data) =>{ 
        props.loginThunk(data);
    }
<LoginReduxForm onSubmit={onSubmit} />   
const LoginForm = (props) =>{
    return(
        <form className={s.login_form} onSubmit={props.handleSubmit}>
            {props.error?<div className={s.form_login_password_error}>{props.error}</div>:null}
            {createField("Введите вашу почту", "Email", [requiredField,maxLength] , Input)}
            {createField("Пароль", "Password", [requiredField,maxLength] , Input, {type:"password"})}
            <div className={s.login_form__checkbox_container}>
                <Field name="rememberMe" component={"input"} className={s.login_form__checkbox_container_checkbox} id="checkbox_rememberme" type="checkbox"/> 
                <label htmlFor="checkbox_rememberme" className={s.login_form__checkbox_container_text}>Запомнить меня</label>
            </div>
            {props.captchaUrl?<div className={s.captchaForm}>
                    <img src={props.captchaUrl} alt="captcha" />
                    {createField("Введите капчу", "captcha", [requiredField] , Input)}
                </div>:null}
            <div className={s.login_form__buttons}>
                <button className={s.login_form__button}>
                    Войти
                </button>
                <button className={s.login_form__button}>
                    Зарегистрироваться
                </button>
            </div>

        </form>
    );
};
const LoginReduxForm = reduxForm({
    form:"loginForm"
})(LoginForm);
*/
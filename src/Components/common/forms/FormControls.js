import React from 'react';
import { Field } from 'redux-form';
import inputStyle from './input.module.css';
import textareaStyle from './textarea.module.css';

export const FormControl = ({input, meta: {touched, error}, children}) =>{
    const hasError = touched && error;
    return(
        <div className={inputStyle.container}>
            {hasError&&<span className={inputStyle.error_message}>{error}</span>}
            {children}
        </div>  
    )
}
// + " " + (hasError?s.login_form__input_error:"")
export const Input = (props) =>{
    const {input, meta, child, ...restProps} = props;
    const hasError = meta.touched && meta.error;
    return <FormControl {...props} ><input className={inputStyle.login_form__input + " " + (hasError?inputStyle.login_form__input_error:"")} {...input} {...restProps}/> </FormControl>      
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea className={textareaStyle.textarea} {...input} {...restProps} /></FormControl>
}
export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    return(
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)}
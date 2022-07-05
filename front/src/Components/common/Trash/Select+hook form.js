import { customStyles} from "../common/Trash/Options";
import { getStylesSelect} from "../../Assets/SelectHelper/SelectHelper";

let selectStyles = getStylesSelect(props.theme, customStyles);

<div className={form_styles.video_form__fields}>
<Controller name={"priority"} control={control} render={({ field: { value,  onChange, onBlur } }) => {
    return(<Select 
        options={options}  
        onChange={onChange} 
        value={value}
        styles={selectStyles}
        placeholder={"Выберите приоритет видео"}   
        defaultValue={options[0]}/>)
}}/>

</div>
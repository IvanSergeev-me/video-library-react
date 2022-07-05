export const options = [
    { value: 'default', label: 'Обычная' },
    { value: 'light', label: 'Светлая' },
  ]
  export let customStyles = {
    default:{
        display:"flex",
        "backgroundColor":"white",
        border:"2px solid #c95667",
        outline:"#c95667",
        height:"48px",
        width:"200px",
        "fontFamily": "'Roboto', sans-serif"
    },
    light:{
        display:"flex",
        "backgroundColor":"white",
        border:"2px solid #350134",
        outline:"#350134",
        height:"48px",
        width:"200px",
        "fontFamily": "'Roboto', sans-serif"
    }
}
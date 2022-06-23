export const options = [
    { value: 'default', label: 'Обычная' },
    { value: 'light', label: 'Светлая' },
  ]
export const defaultThemeSelect = (theme) =>{ 
    return({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            primary25: '#3e3f56',
            primary: '#c95667',
        },
    })
}
export const lightThemeSelect = (theme) =>{ 
    return({
        ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary25: '#bdbdbd',
                primary: '#350134',
            },
    })
}
export const defaultStyles = {
    control: () => ({
        display:"flex",
        "backgroundColor":"white",
        border:"2px solid #c95667",
        outline:"#c95667",
        height:"48px",
        width:"200px",
        "fontFamily": "'Roboto', sans-serif"
      }),
  }
export const lightStyles = {
    control: () => ({
        display:"flex",
        "backgroundColor":"white",
        border:"2px solid #350134",
        outline:"#350134",
        height:"48px",
        width:"200px",
        "fontFamily": "'Roboto', sans-serif"
      }),
  }

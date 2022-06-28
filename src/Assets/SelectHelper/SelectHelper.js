export const getStylesSelect = (theme, customStyles) =>{
    switch (theme){
        case "light":{
            return {
                control: () => (customStyles.light),
                option: (styles) => {
                    return {
                        ...styles,
                        "color":"black",
                        "backgroundColor":"white",
                        ":hover":{"backgroundColor":"#350134", "color":"white"},
                        "fontSize":"1em",
                        "fontFamily": "'Roboto', sans-serif" 
                    }
                },
                menu:(styles) =>{
                    return {
                        ...styles,
                        "borderRadius":"0",
                        "border":"0",
                        "padding":"0",
                        "backgroundColor":"white",
                        
                    }
                }
            }
        }
        default:{
            return{
                control: () => (customStyles.default),
                option: (styles) => {
                    return {
                        ...styles,
                        "color":"white",
                        "backgroundColor":"#3e3f56",
                        ":hover":{"backgroundColor":"#c95667"},
                        "fontSize":"1em",
                        "fontFamily": "'Roboto', sans-serif" 
                    }
                },
                menu:(styles) =>{
                    return {
                        ...styles,
                        "borderRadius":"0",
                        "border":"0",
                        "padding":"0",
                        "backgroundColor":"#3e3f56",
                        
                    }
                }
            }
        }
    }
}

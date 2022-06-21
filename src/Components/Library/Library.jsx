import React from "react";
import { useSelector } from "react-redux";
import Greetings from "../Greetings/Greetings";
import Header from "../Header/Header";

const Library = (props) =>{
    let library = useSelector(state => state.library.videos);
    if(library.length === 0) return <Greetings />;
    return(
        <section>
            library page
        </section>
    )
}
export default Library;
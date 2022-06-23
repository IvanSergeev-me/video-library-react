import React from "react";

const Playlist = (props) =>{
    return(
        <div>
            {props.video?props.video.name:"playlist without videos"}
        </div>
    )
}
export default Playlist;
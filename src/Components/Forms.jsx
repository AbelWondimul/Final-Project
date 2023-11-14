import React from "react";
import '../App.css';
import {Link } from "react-router-dom";

const Forms = (props) => {
    return(
        
        
        <div className="container col box" >
            <div>
                <h2>{props.name}</h2>
                <br></br>
                <p className='p'>{props.speed}</p>
            </div>
        </div>
        
    )
}

export default Forms;
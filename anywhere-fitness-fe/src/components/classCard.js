import React from 'react'

function classCard(props){
    return(
        <div>
        
        <p> Class Time: {props.time}</p>
        <p> Class Type: {props.classtype}</p>
        <p>Duration: {props.duration}</p>
        <p>Intensity Level: {props.intensityLevel}</p>
        <p>Class Location: {props.location}</p>
        </div>
    )
}
export default classCard;
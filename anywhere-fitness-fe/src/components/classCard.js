import React from "react";

function ClassCard(props) {
  console.log(props);
  return (
    <div>
      <p>Class Name: {props.details.classname}</p>
      <p>Location: {props.details.location}</p>
      <p>Date: {props.details.date}</p>
      <p>Time: {props.details.time}</p>
      <p>Class Type: {props.details.classtype}</p>
      <p>Duration: {props.details.duration}</p>
      <p>IntensityLevel: {props.details.intensityLevel}</p>
      <p>Current Attendees Number: {props.details.currentAttendeesNo}</p>
      <p>Max Size: {props.details.maxsize}</p>
    </div>
  );
}
export default ClassCard;

import React from "react";
import { Card } from './formStyles'


function ClassCard(props) {
  console.log(props);
  return (
    <Card>
      <h3>Class Name: {props.details.classname}</h3>
      <p>Location: {props.details.location}</p>
      <p>Date: {props.details.date}</p>
      <p>Time: {props.details.time}</p>
      <p>Class Type: {props.details.classtype}</p>
      <p>Duration: {props.details.duration}</p>
      <p>IntensityLevel: {props.details.intensityLevel}</p>
      <p>Current Attendees Number: {props.details.currentAttendeesNo}</p>
      <p>Max Size: {props.details.maxsize}</p>
    </Card>
  );
}
export default ClassCard;
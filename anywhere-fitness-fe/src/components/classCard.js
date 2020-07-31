import React, { useState } from "react";
import { Card2 } from './formStyles'
import axiosWithAuth from '../utils/axiosWithAuth'
import EditClasses from './EditClasses'

import '../style.css'

function ClassCard(props) {
  const { id } = props.details
  const [editing, setEditing] = useState(false)
  const [classToEdit, setClassToEdit] = useState(props)
  console.log(props)

  const editClass = id => {
    setEditing(true)
    setClassToEdit(id)
    axiosWithAuth(classToEdit)
      .get(`/instructor/classes/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setClassToEdit(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`class.${classToEdit.id}`, classToEdit)
      .then(() => { window.location.reload() })
      .catch(err => console.log(err))
    setEditing(false)
  }

  const deleteClass = e => {
    axiosWithAuth().delete(`/instructor/classes/${id}`, classToEdit)
      .then((res) => { window.location.reload() })
      .catch((err) => console.log(err))
  }

  const addClass = e => {
    axiosWithAuth().post(`/client/classes/${id}`)
      .then((res) => { window.location.reload() })
      .catch(err => console.log(err))
  }

  const removeClass = e => {
    axiosWithAuth().delete(`/client/${id}`)
      .then((res) => { window.location.reload() })
      .catch(err => console.log(err))
  }

  return (
    <Card2>
      <h3>Class Name: {props.details.classname}</h3>
      <p>Location: {props.details.location}</p>
      <p>Date: {props.details.date}</p>
      <p>Time: {props.details.time}</p>
      <p>Class Type: {props.details.classtype}</p>
      <p>Duration: {props.details.duration}</p>
      <p>IntensityLevel: {props.details.intensityLevel}</p>
      <p>Current Attendees Number: {props.details.currentAttendeesNo}</p>
      <p>Max Size: {props.details.maxsize}</p>

      <button onClick={e => { editClass() }}> Edit </button>
      {editing && <EditClasses details={props.details} saveEdit={saveEdit} />}
      {/* <button onClick={e => { editClass(id) }}>Edit</button> */}
      <button onClick={e => { deleteClass(id) }}>Delete</button>
      <button onClick={e => { addClass(id) }}>Add Class</button>
      <button onClick={e => { removeClass(id) }}>Remove Class</button>
    </Card2>
  );
}
export default ClassCard;
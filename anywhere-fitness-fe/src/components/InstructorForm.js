import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
// import Order from './Order'
import * as yup from 'yup'
import {
    Input,
    Select,
    Button,
    Form,
    DatePickerStyle,
    Error
} from './formStyles'

import { connect } from 'react-redux'
import { PostClasses } from '../store/actions/fitnessActions'




const formSchema = yup.object().shape({
    name: yup.string()
        .min(2, "must include atleast 2 characters")
        .required("Name is requried"),
    startDate: yup.string()
        .required("must select a date"),
    duration: yup.string()
        .required("must select duration"),
    type: yup.string()
        .required("must select a type"),
    Intensity: yup.string()
        .required("must select an intensity"),
    Location: yup.string()
        .required("must select a location"),
    currentNumber: yup.number()
        .min(1, "Number must be greater than 0").required(),
    maxMembers: yup.number()
        .min(1, "number must be greater than 0").required(),
})
const InstructorForm = (props) => {
    const [application, setApplication] = useState([])
    const [isDisabled, setDisabled] = useState(true)

    const [formState, setFormState] = useState({
        name: "",
        startDate: "",
        duration: "",
        type: "",
        Intensity: "",
        Location: "",
        currentNumber: 0,
        maxMembers: 0,
    })

    const [errorState, setErrorState] = useState({
        name: "",
        startDate: "",
        duration: "",
        type: "",
        Intensity: "",
        Location: "",
        currentNumber: "",
        maxMembers: "",
    })

    const validate = (e) => {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                })
            }).catch(err => {
                console.log(err.errors)
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setDisabled(!valid);
        })
    }, [formState])

    const inputChange = e => {
        e.persist()
        validate(e)
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    // const datePickerChange = date => {
    //     setFormState({ ...formState, startDate: date })
    // }



    const formSubmit = (e) => {
        e.preventDefault()
        formSchema.isValid(formState).then(valid => {
            if (valid) {
                props.PostClasses()
            } else {
                alert("you must fill out all fields")
            }
        }

        ).then(res => {
            console.log(res)

        })
            .catch(err => {
                console.log(err)
            })
        console.log("form submitted")

    }

    return (
        <div>
            <Form onSubmit={formSubmit}>

                <label htmlFor="name">
                    NAME:
                        <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                    {errorState.name ? <Error>{errorState.name}</Error> : null}
                </label>


                <label htmlFor="date">
                    {/* <DatePickerStyle>
                        YYYY-MM-DD:
                        <DatePicker
                            type="button"
                            name="date"
                            id="date"
                            showTimeSelect
                            dateFormat="Pp"
                            selected={formState.startDate}
                            onChange={datePickerChange}
                        />
                        {errorState.date ? <Error>{errorState.date}</Error> : null}
                    </DatePickerStyle> */}
                </label>

                <label htmlFor="duration">
                    Duration:
                        <Select
                        value={formState.duration}
                        name="duration"
                        id="duration"
                        onChange={inputChange}>
                        <option value="">N/A</option>
                        <option value="30">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="1 1/2 hours">1 1/5 hours</option>
                        <option value="2 hours">2 hours</option>
                    </Select>
                    {errorState.duration ? <Error>{errorState.duration}</Error> : null}
                </label>

                <label htmlFor="type">
                    TYPE:
                        <Select
                        value={formState.type}
                        name="type"
                        id="type"
                        onChange={inputChange}>
                        <option value="N/A">N/A</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Legs">Legs minutes</option>
                        <option value="Arms">Arms</option>
                        <option value="Chest">Chest</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Zumba">Zumba</option>
                        <option value="Turbo-Kick">Turbo-Kick</option>
                    </Select>
                    {errorState.type ? <Error>{errorState.type}</Error> : null}
                </label>

                <label htmlFor="Intensity">
                    Intensity:
                        <Select
                        value={formState.Intensity}
                        name="Intensity"
                        id="Intensity"
                        onChange={inputChange}>
                        <option value="N/A">N/A</option>
                        <option value="easy">easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Psycho Path">Psycho Path</option>
                    </Select>
                    {errorState.Intensity ? <Error>{errorState.Intensity}</Error> : null}
                </label>

                <label htmlFor="Location">
                    Location:
                        <Select
                        value={formState.Location}
                        name="Location"
                        id="Location"
                        onChange={inputChange}>
                        <option value="N/A">N/A</option>
                        <option value="indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>

                    </Select>
                    {errorState.Location ? <Error>{errorState.Location}</Error> : null}
                </label>

                <label htmlFor="currentNumber">
                    Current members:
                        <Input
                        type="number"
                        name="currentNumber"
                        id="currentNumber"
                        placeholder="0"
                        value={formState.currentNumber}
                        onChange={inputChange}
                    />
                    {errorState.currentNumber ? <Error>{errorState.currentNumber}</Error> : null}
                </label>

                <label htmlFor="maxMembers">
                    Maximum members:
                        <Input
                        type="number"
                        name="maxMembers"
                        id="maxMembers"
                        placeholder="0"
                        value={formState.maxMembers}
                        onChange={inputChange}
                    />
                    {errorState.maxMembers ? <Error>{errorState.maxMembers}</Error> : null}
                </label>

                <Button disabled={false}>Submit</Button>
            </Form>

            {/* {application.map(item => <Order data={item} />)} */}

        </div>
    )
}

function mapStateToProps(state) {
    return {
        isFetching: state.isFetching,
        classes: state.classes
    }
}


export default connect(mapStateToProps, {
    PostClasses
})
    (InstructorForm);
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import {
    Input,
    Select,
    Button,
    Form,
    Error,
    SelectContainer,
    FormAlign
} from './formStyles'

const formSchema = yup.object().shape({
    className: yup.string()
    .min(5, "must include more than 5 characters")
    .required("must include class name"),
    name: yup.string()
    .min(2, "must include atleast 2 characters")
    .required("Name is requried"),
    date: yup.string()
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
const InstructorForm = () => {
const [application, setApplication] = useState([])
const [isDisabled, setDisabled] = useState(true)

const [formState, setFormState] = useState({
    className: "",
    name: "",
    date: "",
    duration: "",
    type: "",
    Intensity: "",
    Location: "",
    currentNumber: 0,
    maxMembers: 0,
})

const [errorState, setErrorState] = useState({
    className: "*",
    name: "*",
    date: "*",
    duration: "*",
    type: "*",
    Intensity: "*",
    Location: "*",
    currentNumber: "*",
    maxMembers: "*",
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
    setFormState({...formState, [e.target.name]: e.target.value})
}


const formSubmit = (e) => {
    e.preventDefault()
    formSchema.isValid(formState).then(valid => {
        if(valid) {
            axios.post('https://reqres.in/api/users', formState)
        } else {
            alert("you must fill out all fields")
        }
    }

    ).then(err => {
        console.log(err)
    })
    console.log("form submitted")

}

    return(
            <div>
            <Form onSubmit={formSubmit}>
                <FormAlign>

                <label htmlFor="className">
                        <SelectContainer>
                        Class name:
                        <Input
                        type="text"
                        name="className"
                        id="className"
                        placeholder="Create Class Name"
                        value={formState.className}
                        onChange={inputChange}
                        />
                        {errorState.className ? <Error>{errorState.className}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="name">
                        <SelectContainer>
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
                        </SelectContainer>
                    </label>
                
                
                    <label htmlFor="date">
                        
                        
                        <SelectContainer>
                        DATE:
                        <Input
                        type="text"
                        name="date"
                        id="date"
                        placeholder="Enter Date"
                        value={formState.date}
                        onChange={inputChange}
                        />
                        {errorState.date ? <Error>{errorState.date}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="duration">
                    <SelectContainer>
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
                        </SelectContainer>
                    </label>

                    <label htmlFor="type">
                        <SelectContainer>
                        TYPE:
                        <Select
                        value={formState.type}
                        name="type"
                        id="type"
                        onChange={inputChange}>
                            <option value="">N/A</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Legs">Legs minutes</option>
                            <option value="Arms">Arms</option>
                            <option value="Chest">Chest</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Zumba">Zumba</option>
                            <option value="Turbo-Kick">Turbo-Kick</option>
                        </Select>
                        {errorState.type ? <Error>{errorState.type}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="Intensity">
                        <SelectContainer>
                        Intensity:
                        <Select
                        value={formState.Intensity}
                        name="Intensity"
                        id="Intensity"
                        onChange={inputChange}>
                            <option value="">N/A</option>
                            <option value="easy">easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Psycho Path">Psycho Path</option>         
                        </Select>
                        {errorState.Intensity ? <Error>{errorState.Intensity}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="Location">
                        <SelectContainer>
                        Location:
                        <Select
                        value={formState.Location}
                        name="Location"
                        id="Location"
                        onChange={inputChange}>
                            <option value="">N/A</option>
                            <option value="indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                           
                        </Select>
                        {errorState.Location ? <Error>{errorState.Location}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="currentNumber">
                        <SelectContainer>
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
                        </SelectContainer>
                    </label>

                    <label htmlFor="maxMembers">
                        <SelectContainer>
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
                        </SelectContainer>
                    </label>
                    </FormAlign>
                <Button disabled={false}>Submit</Button>
            </Form>
           
            </div>
    )
}



export default InstructorForm;
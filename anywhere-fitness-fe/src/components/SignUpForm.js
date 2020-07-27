import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string()
    .min(3, "name must be longer than 2 letters")
    .required("must include name"),
    username: yup.string()
    .min(5, "username must be longer than 5 letters"),
    email: yup.string().email("must include a valid email address")
    .required("must include a email address"),
    password: yup.string()
    .min(5, "must include atleast 5 characters")
    .required("must include a password"),
    roll: yup.string()
    .required("must select a roll")
})

const SignUpForm = () => {
    const [application, setApplication] = useState([])
    const [isDisabled, setDisabled] = useState(true)

    const [formState, setFormState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        roll: "please choose a roll"
       
    })
    const [errorState, setErrorState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        roll: "please choose a roll"
       
    })

    const validate = (e) => {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
        .then( valid => {
            setErrorState({
                ...errorState,
                [e.target.name]: ""
            })
        })
        .catch(err => {
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
              });
        }, [formState])

    const inputChange = e => {
        e.persist()
        validate(e)
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log("form submitted")
        
        axios.post('https://reqres.in/api/users', formState)
        .then( res => {
            setApplication([...application, res.data])
            window.location.href = '/Instructor'
            
        }
            )
    }
    return (
        <div>
            <Form onSubmit={formSubmit}>

            <label htmlFor="roll">
                <RollSelect>
                name="roll"
                id="roll"
                placeholder="Enter Password"
                value={formState.password}
                onChange={inputChange}
                        <option value="Select a Role">Select a Role</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Client">Client</option>
                </RollSelect>
                </label>

                <label htmlFor="name">
                <NameInput
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                value={formState.name}
                onChange={inputChange}
                />
                {errorState.name ? <p>{errorState.name}</p> : null}
                </label>

                <label htmlFor="username">
                <UserNameInput
                type="text"
                name="username"
                id="username"
                placeholder="Enter UserName"
                value={formState.username}
                onChange={inputChange}
                />
                {errorState.username ? <p>{errorState.username}</p> : null}
                </label>

                <label htmlFor="email">
                <EmailInput
                type="text"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={formState.email}
                onChange={inputChange}
                />
                {errorState.email ? <p>{errorState.email}</p> : null}
                </label>

                <label htmlFor="password">
                <PasswordInput
                type="text"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={formState.password}
                onChange={inputChange}
                />
                {errorState.password ? <p>{errorState.password}</p> : null}
                </label>               
                <Button disabled={isDisabled}>Submit</Button>
            </Form>
            
        </div>
    )
}
const RollSelect = styled.select`

`
const PasswordInput = styled.input`

`
const EmailInput = styled.input`

`
const UserNameInput = styled.input`

`
const Button = styled.button`
width: 140px;
height: 45px;
font-family: 'Roboto', sans-serif;
font-size: 11px;
text-transform: uppercase;
letter-spacing: 2.5px;
font-weight: 500;
color: #000;
background-color: #fff;
border: none;
border-radius: 45px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease 0s;
cursor: pointer;
outline: none;
display:flex;
align-items:center;
justify-content: center;
margin: 10px;

&:hover {

background-color: #2EE59D;
box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
color: #fff;
transform: translateY(-7px);
}
}
`
const Form = styled.form`
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
margin: 10px;
`
const NameInput = styled.input`

`
export default SignUpForm;
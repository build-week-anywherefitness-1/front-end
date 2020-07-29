import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import {
    Input,
    Select,
    Button,
    Form,
    Error,
    SelectContainer,
    FormAlign,
    HeaderDiv,
} from './formStyles'

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
        roll: "Instructor"

    })
    const [errorState, setErrorState] = useState({
        name: "*",
        username: "*",
        email: "*",
        password: "*",
        roll: ""

    })

    const validate = (e) => {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
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
        setFormState({ ...formState, [e.target.name]: e.target.value })

    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log("form submitted")

        axios.post('https://reqres.in/api/users', formState)
            .then(res => {
                console.log(res.data)
                setApplication([...application, res.data])
                if (formState.roll === 'Instructor') {
                    window.location.href = '/Instructor'
                } else {
                    window.location.href = '/Client'
                }
            }
            )
    }
    return (
        <div>

            <Form onSubmit={formSubmit}>
                <FormAlign>
                    <HeaderDiv>
                        <h2>Sign Up</h2>
                    </HeaderDiv>
                    <label htmlFor="roll">
                        <SelectContainer>
                            Select Role:
                    <Select
                                name="roll"
                                id="roll"
                                placeholder="Enter Password"
                                value={formState.roll}
                                onChange={inputChange}
                            >
                                <option value="Instructor">Instructor</option>
                                <option value="Client">Client</option>
                            </Select>
                            {errorState.roll ? <Error>{errorState.roll}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="name">
                        <SelectContainer>
                            Name:
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

                    <label htmlFor="email">
                        <SelectContainer>
                            Email:
                        <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                value={formState.email}
                                onChange={inputChange}
                            />
                            {errorState.email ? <Error>{errorState.email}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="username">
                        <SelectContainer>
                            Username
                        <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter UserName"
                                value={formState.username}
                                onChange={inputChange}
                            />
                            {errorState.username ? <Error>{errorState.username}</Error> : null}
                        </SelectContainer>
                    </label>

                    <label htmlFor="password">
                        <SelectContainer>
                            Password:
                        <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                value={formState.password}
                                onChange={inputChange}
                            />
                            {errorState.password ? <Error>{errorState.password}</Error> : null}
                        </SelectContainer>
                    </label>
                </FormAlign>
                <Button disabled={isDisabled} onClick={() => ToastsStore.success("Sign Up successful")}>Submit</Button>
                <ToastsContainer store={ToastsStore} />

            </Form>

        </div>
    )
}

export default SignUpForm;
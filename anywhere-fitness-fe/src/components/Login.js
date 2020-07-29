import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
// import styled from 'styled-components'
import {
    Input,
    Select,
    Button,
    FormStyle,
    Error,
    SelectContainer,
    FormAlign
} from './formStyles'

const formSchema = yup.object().shape({
    username: yup
        .string()
        .required('Must Include username'),
    password: yup
        .string()
        .min(8, 'Must be atleast 8 characters long')
        .required('must be a valid email address'),
    // role: yup
    //     .string()
    //     .oneOf(['Instructor', 'Client'], "Please select a role")


})

export default function Login(props) {

    const defaultState = {
        username: "",
        password: "",
    };
    const [user, setUser] = useState({})
    const [formState, setFormState] = useState(defaultState);
    const [errorState, setErrorState] = useState(defaultState)
    const [buttonDisabled, setButtonDisabled] = useState(true);


    useEffect(() => {
        formSchema.isValid(formState).then(valid => setButtonDisabled(!valid));
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post('https://app-anywherefitness.herokuapp.com/api/auth/login', formState)
            .then((res) => {
                console.log('Form submitted successfully!', res.data)
                // props.setUser([...props.user, res.data])
            })
            .catch(err => console.log(err))
    }

    const validate = (e) => {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                })
            }).catch(err => {

                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    const inputChange = e => {
        e.persist()
        validate(e)
        setFormState({ ...formState, [e.target.name]: e.target.value })

    }

    return (
        <FormStyle onSubmit={formSubmit}>
            <label htmlFor='usernameInput'>Email
            <Input
                    type='name'
                    placeholder='username'
                    name='username'
                    id='usernameInput'
                    error={errorState}
                    value={formState.username}
                    onChange={inputChange}
                />
            </label>
            <div>{errorState.email}</div>
            <label htmlFor='passwordInput'>Password
            <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    id='passwordInput'
                    error={errorState}
                    value={formState.password}
                    onChange={inputChange}
                />
            </label>
            {/* <label>Role
            <Select id='roleInput' name='role' onChange={inputChange}>
                    <option>Select</option>
                    <option value='Instuctor'>Instructor</option>
                    <option value='Client'>Client</option>
                </Select>
            </label> */}

            <Button type='login' >Log in</Button>
        </FormStyle>
    )
}
// const RoleSelect = styled.select`
// `
// const PasswordInput = styled.input`
// `
// const EmailInput = styled.input`
// `
// const UserNameInput = styled.input`
// `
// const Button = styled.button`
// width: 140px;
// height: 45px;
// font-family: 'Roboto', sans-serif;
// font-size: 11px;
// text-transform: uppercase;
// letter-spacing: 2.5px;
// font-weight: 500;
// color: #000;
// background-color: #fff;
// border: none;
// border-radius: 45px;
// box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
// transition: all 0.3s ease 0s;
// cursor: pointer;
// outline: none;
// display:flex;
// align-items:center;
// justify-content: center;
// margin: 10px;
// &:hover {
// background-color: #2EE59D;
// box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
// color: #fff;
// transform: translateY(-7px);
// }
// }
// `

// const FormStyle = styled.form`
// display:flex;
// flex-direction: column;
// justify-content: center;
// align-items:center;
// margin: 10px;
// `
// const NameInput = styled.input`
// `
// export default Login;





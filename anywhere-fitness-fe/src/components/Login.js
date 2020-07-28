import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components'

function Form(props){
    const defaultState = {
        email:"",
        password:"",
        role:""
    };
    const [formState,setFormState]=useState(defaultState);

    const [errors,setErrors]=useState(defaultState)

    const [buttonDisabled,setButtonDisabled]=useState(true);


    const formSchema=yup.object().shape({
        email: Yup
        .string()
        .email('Must be a valid Email Address')
        .required('Must Include Email Address'),
        password: Yup
        .string()
        .min(8, 'Must be atleast 8 characters long')
        .required('must be a valid email address'),
        role: Yup
        .boolean()
        .oneOf([true], 'Must select an option')
        
        
    })
    const [post,setPost] = useState([]);

    useEffect(()=>{
        formSchema.isValid(formState).then(valid=> setButtonDisabled(!valid));},[formState]);

    const formSubmit=e=>{
        e.preventDefault();

        axios
        .post('https://app-anywherefitness.herokuapp.com/api/auth/login', formState)
        .then((res)=>{ 
        console.log('Form submitted successfully!',res.data)
        props.setUser([...props.user,res.data])
        })
        .catch(err=>console.log(err))

    }
    const validateChange= e => {
        e.persist()
        Yup
        .reach(formSchema, e.target.email)
        .then(valid =>{
            setErrors({
                ...errors,[e.target.email]:''
            })
        })
        .catch(err => {
            setErrors({
                ...errors,[e.target.email]:err.errors[0]
            })
        })
    }
    const inputChange = e => {
        const value=e.target.type ==='select' ? e.target.selected : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]:value 
        })
        validateChange(e);
    }
    console.log(errors)
    return(
        <form onSubmit={formSubmit}>
        <label htmlFor='emailInput'>Email
            <EmailInput
            type='email'
            placeholder='Email'
            email='email'
            id='emailInput'
            error={errors}
            value={formState.email}
            onChange={inputChange}
            />
            </label>
            <div>{errors.email}</div>
            <label htmlFor='passwordInput'>Password
            <PasswordInput
            type='password'
            placeholder='Password'
            name='password'
            id='passwordInput'
            error={errors}
            value={formState.password}
            onChange={inputChange}
            />
            </label>
            <label>Role
            <RoleSelect id ='roleInput' name='role' onChange={inputChange}>
                <option>Select</option>
                <option value='Instuctor'>Instructor</option>
                <option value='Client'>Client</option>
            </RoleSelect>
            </label>

            <Button type='login' disabled={buttonDisabled}>Log in</Button>
        </form>
    )
}
const RoleSelect = styled.select`
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
export default Login;





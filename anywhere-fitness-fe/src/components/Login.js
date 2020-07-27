import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import axios from 'axios';

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
        .post('https://reqres.in/api/users', formState)
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
            <input
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
            <input
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
            <select id ='roleInput' name='role' onChange={inputChange}>
                <option>Select</option>
                <option value='Instuctor'>Instructor</option>
                <option value='Customer'>Customer</option>
            </select>
            </label>

            <button type='login' disabled={buttonDisabled}>Log in</button>
        </form>
    )
}

export default Login;





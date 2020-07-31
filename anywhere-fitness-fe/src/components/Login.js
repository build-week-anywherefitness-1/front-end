import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from "react-redux";
// import axios from "axios";
import { login } from "../store/actions";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Input, Button, Form } from "./formStyles";

const formSchema = yup.object().shape({
    username: yup.string().required("Must Include username"),
    password: yup
        .string()
        .min(8, "Must be atleast 8 characters long")
        .required("must be a valid email address"),
});
const defaultState = {
    username: "",
    password: "",
};

function Login(props) {
    const [formState, setFormState] = useState(defaultState);
    const [errorState, setErrorState] = useState(defaultState);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const history = useHistory();
    useEffect(() => {
        formSchema.isValid(formState).then((valid) => setButtonDisabled(!valid));
    }, [formState]);

    const formSubmit = (e) => {
        e.preventDefault();
        props.login(formState).then((res) => {
            if (res) {
                history.push("/login");
            } else {
                const token = localStorage.getItem("token");
                const { userid, role } = jwt_decode(token);
                if (role === "instructor") {
                    history.push("/instructor");
                } else {
                    history.push("/client");
                }
            }
        });
        setFormState(defaultState);
    };

    const validate = (e) => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: "",
                });
            })
            .catch((err) => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0],
                });
            });
    };

    const inputChange = (e) => {
        e.preventDefault();
        e.persist();
        validate(e);
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={formSubmit}>
            <label htmlFor="usernameInput">
                Email
        <Input
                    type="name"
                    placeholder="username"
                    name="username"
                    id="usernameInput"
                    error={errorState}
                    value={formState.username}
                    onChange={inputChange}
                />
            </label>
            <div>{errorState.email}</div>
            <label htmlFor="passwordInput">
                Password
        <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="passwordInput"
                    error={errorState}
                    value={formState.password}
                    onChange={inputChange}
                />
            </label>

            <Button type="login">Log in</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        classes: state.userReducer.classes,
    };
};
export default connect(mapStateToProps, { login })(Login);
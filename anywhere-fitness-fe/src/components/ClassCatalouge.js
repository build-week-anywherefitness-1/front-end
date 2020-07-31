import React, { useState, useEffect } from "react";

import ClassCard from "./ClassCard";
import axiosWithAuth from "../utils/axiosWithAuth";

import { CardDiv, CardDiv2 } from './formStyles'

const ClassCatalouge = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axiosWithAuth()
            .get("/instructor/classes/all")
            .then((res) => {
                setClasses(res.data.data);
            })
            //replace .then with redux function
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <CardDiv>
            <h3>Welcome Back Lambda Instructor</h3>
            <h1>Available Classes</h1>

            <CardDiv2>
                {classes.map((item) => {
                    return <ClassCard key={item.id} details={item}></ClassCard>;
                })}
            </CardDiv2>
        </CardDiv>
    );
}

export default ClassCatalouge
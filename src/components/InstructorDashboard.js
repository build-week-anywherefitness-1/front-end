import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import CreateClass from './CreateClass'
import { HomeDiv } from './formStyles'
import ClassCatalouge from './ClassCatalouge'

const InstructorDashboard = () => {
    const [myClasses, setMyClasses] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get("/instructor/classes")
            .then((res) => {
                setMyClasses(res.data.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <HomeDiv>
            <ClassCatalouge />
            <CreateClass />
        </HomeDiv>
    );
};
export default InstructorDashboard;
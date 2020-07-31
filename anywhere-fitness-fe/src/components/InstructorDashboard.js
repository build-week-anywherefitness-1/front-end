import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ClassCard from "./ClassCard"
import CreateClass from './CreateClass'
import { HomeDiv } from './formStyles'
import ClassSelector from './ClassSelector'

const InstructorDashboard = () => {
    const [myClasses, setMyClasses] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        axiosWithAuth()
            .get("/instructor/classes")
            .then((res) => {
                setMyClasses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    return (
        <HomeDiv>
            <ClassSelector />
            <CreateClass />

            <h1>My Classes</h1>
            <div>
                {myClasses.map((item) => {
                    return <ClassCard key={item.id} details={item}></ClassCard>;
                })}
            </div>
        </HomeDiv>
    );
};
export default InstructorDashboard;
import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ClassCard from "./classCard"
import InstructorForm from './InstructorForm'
import { HomeDiv } from './formStyles'
import ClassSelector from './ClassSelector'

const InstructorDashboard = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [myClasses, setMyClasses] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        axiosWithAuth()
            .get("/instructor/classes")
            .then((res) => {
                console.log(res.data.data);
                setMyClasses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    return (
        <HomeDiv>
            {/* <button>Create a Class</button> */}
            <ClassSelector />
            <InstructorForm />

            <h1>My Classes</h1>
            <>
                {myClasses.map((item) => {
                    return <ClassCard key={item.id} details={item}></ClassCard>;
                })}
            </>
        </HomeDiv>
    );
};
export default InstructorDashboard;
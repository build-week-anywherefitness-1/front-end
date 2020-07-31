import React, { useState, useEffect } from "react";

import ClassCard from "./classCard";
import axiosWithAuth from "../utils/axiosWithAuth";


const ClassSelector = (props) => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axiosWithAuth()
            .get("https://app-anywherefitness.herokuapp.com/api/client/classes/all")
            .then((res) => {
                console.log(res);
                setClasses(res.data.classes);
            })

            //replace .then with redux function
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="classList">
            {classes.map((item) => {
                return <ClassCard key={item.id} details={item}></ClassCard>;
            })}
        </div>
    );
}

export default ClassSelector
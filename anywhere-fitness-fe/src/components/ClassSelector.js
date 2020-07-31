import React, { useState, useEffect } from "react";
import axios from "axios";

import ClassCard from "./ClassCard";
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
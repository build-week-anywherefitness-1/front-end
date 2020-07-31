import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ClassCard from "./ClassCard";
import { CardDiv2 } from './formStyles'

const ClientDashboard = () => {
    // const [allClasses, setAllClasses] = useState([]);
    const [myClasses, setMyClasses] = useState([]);
    // const [refresh, setRefresh] = useState(false);
    const refresh = false
    useEffect(() => {
        axiosWithAuth()
            .get("/client/classes")
            .then((res) => {
                // console.log(res.data.data);
                setMyClasses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    const [allClasses, setAllClasses] = useState([]);
    useEffect(() => {
        axiosWithAuth()
            .get("/client/classes/all")
            .then((res) => {
                setAllClasses(res.data.data);
            })
            //replace .then with redux function
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <h1>My Classes</h1>
            <CardDiv2>
                {myClasses.map((item) => {
                    return <ClassCard key={item.id} details={item}></ClassCard>;
                })}
            </CardDiv2>
            <h1>Available Classes</h1>
            <CardDiv2>
                {allClasses.map((item) => {
                    return <ClassCard key={item.id} details={item}></ClassCard>;
                })}
            </CardDiv2>
        </>
    );
};

export default ClientDashboard;
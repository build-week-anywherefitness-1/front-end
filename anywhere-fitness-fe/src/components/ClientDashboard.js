import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ClassCard from "./ClassCard";

const ClientDashboard = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [myClasses, setMyClasses] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        axiosWithAuth()
            .get("/client/classes")
            .then((res) => {
                console.log(res.data.data);
                setMyClasses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    return (
        <>
            <button>Create a Class</button>
            <h1>My Classes</h1>
            <div class="classList">
                {myClasses.map((item) => {
                    return <ClassCard key={item.id} details={item}></ClassCard>;
                })}
            </div>
        </>
    );
};

export default ClientDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import classCard from "./ClassCard";

export default function ClassSelector(props) {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    axios
      .get("https://app-anywherefitness.herokuapp.com/api/client/classes/all")
      .then((res) => {
        console.log(res);
        setClasses(res.data.classes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div class="classList">
      {classes.map((item) => {
        return <classCard key={item.id} details={item}></classCard>;
      })}
    </div>
  );
}
// export default ClassSelector;

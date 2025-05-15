import { useState, useEffect } from "react"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskListPage() {

    const data = useContext(GlobalContext);

    console.log(data);

    return (

        <h1>TASK LIST PAGE</h1>



    );
}
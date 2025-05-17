import { useState } from "react";
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";
export default function useTask() {
    const { setData } = useContext(GlobalContext);

    function addTask(formInput) {
        console.log(formInput)
        const url = "http://localhost:3001/tasks";
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(formInput),
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setData(prev => [...prev, data.task]);
                alert("task aggiunta")
            }).catch(err => console.error(err), alert(err))
    }

    function removeTask() {

    }

    function updateTask() {

    }

    return { addTask, removeTask, updateTask }
}
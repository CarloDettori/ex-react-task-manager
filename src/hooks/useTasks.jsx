import { useState } from "react";
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function useTask() {
    const { setData } = useContext(GlobalContext);
    const navigate = useNavigate();
    /*async function fetchData(url, option) {
        fetch(url, option)
            .then((response) => response.json())
            .then((obj) => {
                console.log(data)
                setData(prev => [...prev, obj.task]);
                alert("task aggiunta")
            }).catch(err => console.error(err), alert(err))
    }*/

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
            .then((obj) => {
                if (obj.success === true) {
                    console.log(obj)
                    setData(prev => [...prev, obj.task]);
                    alert("task aggiunta")
                    navigate("/")
                } else {
                    throw new Error(obj.message);
                    alert("errore durante la aggiunta")
                }
            })
    }

    function removeTask(id) {
        const url = "http://localhost:3001/tasks/" + id;
        const options = {
            method: "DELETE",
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((obj) => {
                if (obj.success === true) {
                    setData(prev => prev.filter(task => String(task.id) !== String(id)))
                    navigate("/")
                } else {
                    throw new Error(obj.message);
                    alert("errore durante la rimozione")
                }


            })
    }


    function updateTask() {

    }

    return { addTask, removeTask, updateTask }
}
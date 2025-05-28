import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function useTask() {

    const { setData } = useContext(GlobalContext);
    const navigate = useNavigate();

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
                    navigate("/")
                } else {
                    alert("errore durante la aggiunta")
                    throw new Error(obj.message);
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
                    alert("errore durante la rimozione")
                    throw new Error(obj.message);

                }


            })
    }

    async function updateTask(modalInput, id) {
        //console.log(modalInput)
        const url = "http://localhost:3001/tasks/" + id;
        const options = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(modalInput),
        };
        await fetch(url, options)
            .then((response) => response.json())
            .then((obj) => {
                //console.log(obj);
                if (obj.success === true) {
                    setData(prev => prev.map(task => task.id === obj.task.id ? obj.task : task));
                    navigate("/")
                    return obj.task;
                } else {
                    alert("errore durante la modifica")
                    throw new Error(obj.message);
                }
            });
    }

    return { addTask, removeTask, updateTask }
}
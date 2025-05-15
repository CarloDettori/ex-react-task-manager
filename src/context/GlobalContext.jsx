import { createContext } from "react";
import { useContext } from "react"
import { useState, useEffect } from "react";
import useTask from "../hooks/useTasks";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const url = import.meta.env.VITE_URL || "http://localhost:3001/tasks"
    //console.log(url)
    const [data, setData] = useState([])
    const [addTask, removeTask, updateTask] = useTask()
    async function fechData(url) {
        try {
            const response = await fetch(url);
            const jsonData = await response.json()
            //console.log(jsonData)
            return jsonData

        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fechData(url)
            .then((res) => {
                //console.log(res)
                setData(res);
                //console.log(data)
            })
            .catch((err) => { console.error(err) })
            .finally(() => { console.log("fetch end") })
    }, [])
    //console.log(data)


    return (
        <GlobalContext.Provider value={[data, addTask, removeTask, updateTask]}>
            {children}
        </GlobalContext.Provider>
    );

};

export { GlobalContext, GlobalProvider };
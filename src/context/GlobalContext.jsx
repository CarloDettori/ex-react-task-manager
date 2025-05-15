import { createContext } from "react";
import { useState, useEffect } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const url = import.meta.env.VITE_URL || "http://localhost:3001/tasks"
    //console.log(url)
    const [data, setData] = useState([])

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
        <GlobalContext.Provider value={{ data }}>
            {children}
        </GlobalContext.Provider>
    );

};

export { GlobalContext, GlobalProvider };
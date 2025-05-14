import { createContext } from "react";
import { useState, useEffect } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [data, setData] = useState(null)

    async function fechData(url) {
        try {
            const response = await fetch(url);
            const jsonData = await response.json()
            setData(jsonData)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => fechData(process.env.URL), [])
        .then(obj => setData(obj), console.log(data))
        .catch(err => console.error(err))
        .finally(() => console.log(data))



    return (
        <GlobalContext.Provider value={{ data }}>
            {children}
        </GlobalContext.Provider>
    );

};

export { GlobalContext, GlobalProvider };
import { useState, useEffect } from "react"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import TaskRowComponent from "../components/common/TaskRowComponent.jsx";
import { Button } from "bootstrap";

export default function TaskListPage() {
    const [count, setCount] = useState(0)
    const data = useContext(GlobalContext);
    const tasks = data.data
    //console.log(tasks);

    return (
        <>
            <h1>TASK LIST PAGE</h1>

            <table>
                <tr>
                    <th>Nome</th>
                    <th>Stato</th>
                    <th>Data di Creazione</th>
                </tr>
                {
                    tasks.map((task) => {
                        return <TaskRowComponent key={task.id} tasks={task} />
                    })
                }

            </table>


        </>
    );
}
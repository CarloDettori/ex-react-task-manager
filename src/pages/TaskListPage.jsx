import { useState, useEffect } from "react"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import TaskRowComponent from "../components/common/TaskRowComponent.jsx";
import { Button } from "bootstrap";

export default function TaskListPage() {

    //const data = useContext(GlobalContext)
    const [data, addTask, removeTask, updateTask] = useContext(GlobalContext);

    //console.log(data);


    return (
        <section>
            <h1>LISTA TASK</h1>

            <table>

                <tr>
                    <th>Nome</th>
                    <th>Stato</th>
                    <th>Data di Creazione</th>
                </tr>

                {data.map((task) => {
                    return <TaskRowComponent key={task.id} tasks={task} />
                })}

            </table>


        </section>
    );
}
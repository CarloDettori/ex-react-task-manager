import { useState, useEffect } from "react"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import TaskRowComponent from "../components/common/TaskRowComponent.jsx";


export default function TaskListPage() {

    //const data = useContext(GlobalContext)
    const { data, addTask } = useContext(GlobalContext);

    //console.log(data);


    return (
        <section>
            <h1>LISTA TASK</h1>
            <p>Clicca su un Task per visualizzare i Dettaagli</p>
            <table>

                <thead>
                    <tr>
                        <th>Titolo</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((task) => {
                        return <TaskRowComponent key={task.id} task={task} />
                    })}
                </tbody>

            </table>

        </section>
    );
}
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import useTask from "../hooks/useTasks.jsx";

export default function TaskDetailPage({ title, description, status, createdAt }) {

    const { id } = useParams();
    const { data } = useContext(GlobalContext);
    const { removeTask } = useTask()


    const task = data.find(t => String(t.id) === id);

    return (
        <section>

            <h1>DETTAGLI TASK</h1>

            <div className="card">

                <h4 className="card-header p-3 text-center">
                    {task.title}
                </h4>

                <div className="card-body p-4">
                    <p className="card-text"><strong>Descrizione: </strong>{task.description}</p>
                    <p className="card-text"><strong>Stato: </strong>{task.status}</p>
                    <p className="card-text"><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleString()}</p>
                    <a onClick={() => removeTask(id)} className="btn btn-danger mt-3">Elimina Task</a>
                </div>

            </div>

        </section>
    );
}
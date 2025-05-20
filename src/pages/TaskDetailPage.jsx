import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import useTask from "../hooks/useTasks.jsx";
import Modal from "../components/common/ModalComponent.jsx";
import EditTaskModalComponent from "../components/common/EditTaskModalComponent.jsx";


export default function TaskDetailPage() {

    const { id } = useParams();
    const { removeTask, updateTask } = useTask()
    const { data } = useContext(GlobalContext);
    const task = data.find(t => String(t.id) === id);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);



    return (
        task ? <section>

            <h1>DETTAGLI TASK</h1>

            <div className="card">

                <h2 className="card-header p-4 text-center">
                    {task.title}
                </h2>

                <div className="card-body p-4">
                    <div className="p-2 d-flex flex-column gap-3">
                        <p className="card-text"><strong>Descrizione: </strong>{task.description}</p>
                        <p className="card-text"><strong>Stato: </strong>{task.status}</p>
                        <p className="card-text"><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="d-flex mt-4 pt-3">
                        <a onClick={() => setShowEditModal(true)} className="btn btn-primary">Modifica</a>
                        <a onClick={() => setShowModal(true)} className="btn btn-danger ms-auto">Elimina</a>
                    </div>
                </div>

            </div>

            <Modal
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questo task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    removeTask(id);
                    setShowModal(false);
                }}
                confirmText="Conferma"
            />

            <EditTaskModalComponent
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={(updatedTask, id) => {
                    updateTask(updatedTask, id);
                    setShowEditModal(false);
                }}
                confirmText="Salva"
            />

        </section> : <p>Loading...</p>
    );
}
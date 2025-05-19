import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import useTask from "../hooks/useTasks.jsx";
import Modal from "../components/common/ModalComponent.jsx";


export default function TaskDetailPage() {

    const { id } = useParams();
    const { removeTask } = useTask()
    const { data } = useContext(GlobalContext);
    const task = data.find(t => String(t.id) === id);

    const [showModal, setShowModal] = useState(false); // stato per la modale

    const handleDelete = () => setShowModal(true);
    const handleConfirm = () => {
        removeTask(id);
        setShowModal(false);
    };
    const handleClose = () => setShowModal(false);

    return (
        task ? <section>
            <div className="modal-root"></div>
            <h1>DETTAGLI TASK</h1>

            <div className="card">

                <h4 className="card-header p-3 text-center">
                    {task.title}
                </h4>

                <div className="card-body p-4">
                    <p className="card-text"><strong>Descrizione: </strong>{task.description}</p>
                    <p className="card-text"><strong>Stato: </strong>{task.status}</p>
                    <p className="card-text"><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleString()}</p>
                    <a onClick={handleDelete} className="btn btn-danger mt-3">Elimina Task</a>
                </div>

            </div>
            {showModal && (
                <Modal
                    title="Conferma eliminazione"
                    content="Sei sicuro di voler eliminare questo task?"
                    show={showModal}
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                    confirmText=""
                />
            )}
        </section> : <p>loading</p>
    );
}
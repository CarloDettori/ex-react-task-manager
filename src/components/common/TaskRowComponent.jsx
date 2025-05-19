import { memo } from "react"
import { useState } from "react";
import Modal from "./ModalComponent";
import { Link } from "react-router-dom"

function TaskRowComponent({ task }) {

    const [showModal, setShowModal] = useState(true); // stato per la modale

    const handleDelete = () => setShowModal(true);
    const handleConfirm = () => {
        removeTask(id);
        setShowModal(false);
    };
    const handleClose = () => setShowModal(false);

    return (
        <tr>
            <td style={{ backgroundColor: "rgba(201, 26, 26, 0.17)" }}><Link className="task-link" to={`/${task.id}`}>{task.title}</Link></td>
            <td style={{ backgroundColor: "rgba(201, 198, 26, 0.17)" }} >{task.status}</td>
            <td style={{ backgroundColor: "rgba(41, 201, 26, 0.17)" }}>{new Date(task.createdAt).toLocaleString()}</td>
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
        </tr>

    )
}
export default memo(TaskRowComponent)
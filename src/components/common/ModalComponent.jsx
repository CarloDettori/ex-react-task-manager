import React from "react";
import ReactDOM from "react-dom"

export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

    return ReactDOM.createPortal(
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h1>{title}</h1>
                <p className="p-3 pb-5">{content}</p>
                <div className="d-flex">
                    <button className="btn btn-primary" onClick={onConfirm} style={styles.closeButton} type="button">Conferma</button>
                    <button className="btn btn-danger ms-auto" onClick={onClose} style={styles.closeButton}>Annulla</button>
                    {confirmText}
                </div>
            </div>
        </div>,
        document.querySelector(".modal-root")
    );
}

const styles = {
    overlay: {
        position: "fixed",

        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
    },
    modal: {
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        minWidth: "300px",
        position: "relative"
    },
};
import { createPortal } from "react-dom";
export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

    return createPortal(
        show && <div style={styles.overlay}>
            <div style={styles.modal}>
                <h1>{title}</h1>
                <div className="p-3 pb-5">{content}</div>
                <div className="d-flex">
                    <button className="btn btn-primary" onClick={onConfirm} style={styles.closeButton} type="button">{confirmText}</button>
                    <button className="btn btn-danger ms-auto" onClick={onClose} style={styles.closeButton}>Annulla</button>


                </div>
            </div>
        </div>,
        document.body
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
        minWidth: "500px",
        position: "relative",
        boxShadow: "0px 0px 5px"
    },
};
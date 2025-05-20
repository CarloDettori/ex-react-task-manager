import React from "react";
import ReactDOM from "react-dom"
import { useParams } from "react-router-dom";
import { useContext, useState, useRef, useMemo, useEffect } from "react";
import useTask from "../../hooks/useTasks.jsx";
import Modal from "../common/ModalComponent.jsx";
import { GlobalContext } from "../../context/GlobalContext.jsx";

export default function EditTaskModalComponent({ show, onClose, task, onSave, onConfirm, confirmText }) {

    const { id } = useParams()

    const [formInput, setFormInput] = useState(task)

    useEffect(() => {
        if (task) {
            setFormInput({
                title: task.title || "",
                description: task.description || "",
                status: task.status || "To do",
            });
        }
    }, [task]);
    console.log(task)

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;
    const titleRef = useRef()
    const statusRef = useRef()
    const descriptionRef = useRef()

    const [error, setError] = useState({
        noTitle: false,
        symbolName: false,
    })

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        if (name === "title") {

            if (value.length === 1 && value[0] === " ") return;
            setError((prevError) => ({
                ...prevError,
                noTitle: !value.trim(),
                symbolName: symbols.split("").some((symbol) => value.includes(symbol)),
            }));

        }

        setFormInput((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

    };

    const anyError = []
    const anyInput = []

    Object.values(error).forEach((value) => {
        anyError.push(value);
    })
    Object.values(formInput).forEach((value) => {
        anyInput.push(value);
    });
    const noError = anyError.every(error => error === false)
    const noInput = anyInput.every(input => input === "")



    const editFormRef = useRef()
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formInput)
        if (
            !formInput.title.trim() || formInput.title.trim().includes(symbols) || !["To do", "Doing", "Done"].includes(formInput.status)
        ) {
            alert("Compila tutti i campi correttamente!");
            return;
        }
        editFormRef.current.requestSubmit()
        onSave(formInput, id);
        setFormInput({
            title: "",
            description: "",
            status: "To do",
        });
    };
    return (

        <Modal
            title="Modifica Task"
            show={show}
            onClose={onClose}
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="title" className="form-label">Scrivi un <strong>Titolo</strong><span style={{ color: "red" }}> *</span></label>
                        <input
                            ref={titleRef}
                            name="title"
                            value={formInput.title}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            id="title"


                        />
                        {formInput.title === ""
                            ? null
                            : (error.symbolName === true
                                ? <p className="info" style={{ color: "red" }}>non inserire simboli (solo lettere o numeri)</p>
                                : <p className="info" style={{ color: "rgb(73, 208, 141)" }}> ✅<strong>OK</strong></p>
                            )
                        }
                    </div>


                    <p className="form-label">Clicca e scegli uno <strong>Stato</strong></p>
                    <select
                        name="status"
                        id="status"
                        ref={statusRef}
                        className="form-control selector"
                        value={formInput.status}
                        onChange={handleChange}
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>


                    <div className="my-4">
                        <label htmlFor="description" className="form-label">Scrivi una <strong>Descrizione</strong></label>
                        <textarea
                            ref={descriptionRef}
                            value={formInput.description}
                            onChange={handleChange}
                            name="description"
                            type="text"
                            className="form-control"
                            id="description"
                        />
                    </div>





                    <div className="d-flex">
                        <button type="reset" onClick={() => {
                            setFormInput(task);
                            titleRef.current.focus()
                        }} className="btn btn-danger mt-4 mx-auto">Reset</button>
                    </div>
                </form>
            }

            onConfirm={handleSubmit}

            confirmText="Invia"
        />

    )

}


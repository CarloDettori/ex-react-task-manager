import { useRef } from "react"
import { useState, useEffect } from "react"
import { useMemo } from "react"
import useTask from "../hooks/useTasks"



export default function AddTaskPage() {
    useEffect(() => { titleRef.current.focus() }, [])

    const { addTask } = useTask()
    const TaskTemplate = {
        title: "",
        description: "",
        status: "",
    }

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        status: "To do",
    })

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;
    const titleRef = useRef()
    const statusRef = useRef()
    const descriptionRef = useRef()

    const [error, setError] = useState({
        noTitle: true,
        symbolName: false,
    })

    const virgo = useMemo(() => {
        return formInput.title === "" && formInput.description === "" && formInput.status === "To do";
    }, [formInput]);
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const status = statusRef.current.value
        const description = descriptionRef.current.value.trim()

        formInput.status = status;
        formInput.description = description;
        //console.log(formInput)
        addTask(formInput)
        setFormInput(TaskTemplate)

    };



    return (<section>

        <h1>AGGIUNGI UNA NUOVA TASK</h1>
        <p className="text-end info">i campi con <span style={{ color: "red" }}>*</span> sono obbligatori</p>
        <form onSubmit={handleSubmit}>

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
                    name="description"
                    type="text"
                    className="form-control"
                    id="description"
                />
            </div>





            <div className="d-flex">
                {
                    noInput || virgo
                        ? < button type="submit" className="btn btn-primary mt-5" disabled>Compila i campi come richiesto</button> :
                        (noError
                            ? <button type="submit" onClick={() => { titleRef.current.focus() }} className="btn btn-primary mt-5">Invia</button>
                            : <button type="submit" className="btn btn-primary mt-5" disabled>Alcuni campi sono sbagliati</button>
                        )
                }
                <button type="reset" onClick={() => {
                    setFormInput({ title: "", description: "", status: "", });
                    titleRef.current.focus()
                }} className="btn btn-danger mt-5 ms-auto">Reset</button>
            </div>
        </form>
    </section>
    )
}
import { useRef } from "react"
import { useState, useEffect } from "react"

export default function AddTaskPage() {

    const newTask = {
        title: "",
        stat: "",
        dex: "",
    }

    const [formInput, setFormInput] = useState(newTask)

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;
    const titleRef = useRef()
    const statRef = useRef()
    const dexRef = useRef()

    const [error, setError] = useState({
        noTitle: false,
        symbolName: false,
    })


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;



        if (name === "title") {
            setError((prevError) => ({
                ...prevError,
                noTitle: !value,
                symbolName: symbols.split("").some((symbol) => value.includes(symbol)),
            }));
        }



        setFormInput((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        console.log(value)

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

        const anyError = []
        Object.values(error).forEach((value) => {
            anyError.push(value);
        });
        const noError = anyError.every(error => error === false)

        if (noError) {
            const stat = statRef.current.value
            formInput.spec = stat
            const dex = dexRef.current.value
            formInput.exp = dex
            console.log(formInput)
            setFormInput(newTask)
        } else {
            console.error("vlidazione non consentita")
            console.error(error)
        }
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
                    id="name"


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
                name="spec"
                id="spec"
                ref={statRef}
                className="form-control selector"
            >
                <option value="" defaultValue>To do</option>
                <option value="Backend">Doing</option>
                <option value="FullStack">Done</option>
            </select>


            <div className="my-4">
                <label htmlFor="dex" className="form-label">Scrivi una <strong>Descrizione</strong></label>
                <textarea
                    ref={dexRef}
                    name="dex"
                    type="text"
                    className="form-control"
                    id="dex"
                />
            </div>





            <div className="d-flex">
                {
                    noInput
                        ? < button type="submit" className="btn btn-primary mt-5" disabled>Compila i campi come richiesto</button> :
                        (noError
                            ? <button type="submit" className="btn btn-primary mt-5">Invia</button>
                            : <button type="submit" className="btn btn-primary mt-5" disabled>Alcuni campi sono sbagliati</button>
                        )
                }
                <button type="reset" onClick={() => { setFormInput(newTask); titleRef.current.focus() }} className="btn btn-danger mt-5 ms-auto">Reset</button>
            </div>
        </form>
    </section>
    )
}
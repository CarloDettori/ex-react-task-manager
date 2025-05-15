import { useRef } from "react"
import { useState, useEffect } from "react"

export default function AddTaskPage() {

    const newTask = {
        name: "",
        stat: "",
        dex: "",
    }

    const [formInput, setFormInput] = useState(newTask)

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;
    const titleRef = useRef()
    const statRef = useRef()
    const expRef = useRef()

    const [error, setError] = useState({
        //name error
        noName: false,
        symbolName: false,
        //stat error
        noStat: false,
        //dex error
        noDex: false,
        symbolDex: false,
    })


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        switch (name) {

            case "title":
                setError((prevError) => ({
                    ...prevError,
                    noName: !value,
                    symbolName: symbols.split("").some((symbol) => value.includes(symbol)),
                }));
                break;

            case "stat":
                setError((prevError) => ({
                    ...prevError,
                    noStat: !value,
                }));
                break;

            case "dex":
                setError((prevError) => ({
                    ...prevError,
                    noDex: !value,
                    symbolDex: symbols.split("").some((symbol) => value.includes(symbol)),
                }));
                break

            default:
                console.log("uncontrolled input");
        }

        setFormInput((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        console.log(value)

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const anyError = []
        Object.values(error).forEach((value) => {
            anyError.push(value);
        });
        const noError = anyError.every(error => error === false)

        if (noError) {
            const name = nameRef.current.value
            formInput.name = name
            const specialization = specRef.current.value
            formInput.spec = specialization
            const experience = expRef.current.value
            formInput.exp = experience
            console.log(formInput)
            setFormInput(newTask)
        } else {
            console.error("vlidazione non consentita")
            console.error(error)
        }
    };

    const anyError = []
    const anyInput = []
    Object.values(error).forEach((value) => {
        anyError.push(value);
    })
    Object.values(newTask).forEach((value) => {
        anyError.push(value);
    });
    const noError = anyError.every(error => error === false)
    const noInput = anyInput.every(input => input === "")



    return (<section>

        <h1>ADD NEW TASK</h1>
        <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label htmlFor="title" className="form-label">Write a Task Title</label>
                <input
                    ref={titleRef}
                    name="title"
                    value=""
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Gianpiergiorgio Frastinellucci"
                    required
                />
            </div>


            <p className="form-label">Click and choose a Task State</p>
            <select name="spec" id="spec" ref={statRef} className="form-control selector" required>
                <option value="" selected="selected">To do</option>
                <option value="Backend">Doing</option>
                <option value="FullStack">Done</option>
            </select>


            <div className="my-4">
                <label htmlFor="dex" className="form-label">Write a new Task Description</label>
                <textarea
                    value={formInput.dex}
                    onChange={handleChange}
                    name="dex"
                    type="text"
                    className="form-control"
                    id="dex"
                    placeholder="Go to groceries an buy bananas..."
                    required
                />
                {formInput.dex === ""
                    ? null
                    : (error.longDex === true
                        ? <p style={{ color: "red" }}>Too long</p>
                        : <p style={{ color: "green" }}>OK</p>
                    )
                }
            </div>
            <div className="d-flex">
                {
                    noInput
                        ? < button type="submit" className="btn btn-primary mt-5" disabled>Fill each champ as requested</button> :
                        (noError
                            ? <button type="submit" className="btn btn-primary mt-5">Invia</button>
                            : <button type="submit" className="btn btn-primary mt-5" disabled>Some champ is wrong</button>
                        )
                }
                <button type="reset" onClick={() => { setFormInput(newTask); titleRef.current.focus() }} className="btn btn-danger mt-5 ms-auto">Reset champs</button>
            </div>
        </form>
    </section>
    )
}